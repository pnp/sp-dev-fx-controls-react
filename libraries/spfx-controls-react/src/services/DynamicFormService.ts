import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import { IFileInfo, IInstalledLanguageInfo, ISiteUserInfo } from '../common/SPRestTypes';
import { SPRestClient, escapeODataString } from './SPRestClient';

export interface IDynamicFormItemReference {
  readonly webAbsoluteUrl: string;
  readonly listId: string;
  readonly listItemId: number;
  readonly etag?: string;
}

export interface IDynamicFormSaveResult {
  data: Record<string, unknown>;
  reference: IDynamicFormItemReference;
}

export interface IDynamicFormPersistedReference {
  readonly webAbsoluteUrl: string;
  readonly listId: string;
  readonly listItemId?: number;
  readonly serverRelativeUrl?: string;
}

export class DynamicFormSaveError extends Error {
  public readonly name = 'DynamicFormSaveError';
  public readonly saveCommitted = true;

  constructor(
    public readonly itemReference: IDynamicFormPersistedReference,
    public readonly originalError: unknown,
    public readonly failedPhase: 'identify' | 'upload' | 'metadata' | 'read' = 'read',
    public readonly partialCommit = false
  ) {
    super(`A SharePoint resource was ${partialCommit ? 'partially saved' : 'saved'}, but the ${failedPhase} step failed: ${originalError instanceof Error ? originalError.message : String(originalError)}`);
    Object.setPrototypeOf(this, DynamicFormSaveError.prototype);
  }
}

const chunkSize = 10485760;
const entityLifetime = 5 * 24 * 60 * 60 * 1000;

export class DynamicFormService {
  private readonly rest: SPRestClient;
  private readonly entityNames = new Map<string, Promise<string>>();

  constructor(context: BaseComponentContext, webAbsoluteUrl?: string) {
    this.rest = new SPRestClient(context.spHttpClient, webAbsoluteUrl || context.pageContext.web.absoluteUrl);
  }

  public dispose(): void {
    this.rest.dispose();
  }

  public ensureUser(loginName: string): Promise<ISiteUserInfo> {
    return this.rest.ensureUser(loginName);
  }

  public getInstalledLanguages(): Promise<IInstalledLanguageInfo[]> {
    return this.rest.get('/_api/web/regionalSettings/installedLanguages');
  }

  public async getItem(listId: string, itemId: number, includeFileName = false): Promise<Record<string, unknown>> {
    const item = await this.rest.get<Record<string, unknown>>(
      `${this.list(listId)}/items(${itemId})${includeFileName ? '?$select=*,FileLeafRef' : ''}`
    );
    const metadata = item.__metadata as { etag?: string } | undefined;
    const etag = item['odata.etag'] || item['@odata.etag'] || metadata?.etag;
    if (typeof etag === 'string') item['odata.etag'] = etag;
    return item;
  }

  public async addItem(listId: string, values: Record<string, unknown>): Promise<IDynamicFormSaveResult> {
    const item = await this.rest.post<{ Id: number }>(`${this.list(listId)}/items`, {
      __metadata: { type: await this.entityName(listId) }, ...values
    });
    if (!item?.Id) throw new DynamicFormSaveError(
      { webAbsoluteUrl: this.rest.webAbsoluteUrl, listId },
      new Error('SharePoint created an item without returning its ID.'), 'identify'
    );
    return this.savedResult(listId, item.Id);
  }

  public async updateItem(
    listId: string, itemId: number, values: Record<string, unknown>, etag = '*', retryConflicts = false
  ): Promise<IDynamicFormSaveResult> {
    await this.rest.post(`${this.list(listId)}/items(${itemId})`, {
      __metadata: { type: await this.entityName(listId) }, ...values
    }, {
      headers: { 'X-HTTP-Method': 'MERGE', 'IF-MATCH': etag },
      retryConflicts
    });
    return this.savedResult(listId, itemId);
  }

  public async addFolder(
    listId: string, name: string, values: Record<string, unknown>, folderPath?: string
  ): Promise<IDynamicFormSaveResult> {
    const parent = await this.folderPath(listId, folderPath);
    await this.rest.post(`${this.folder(parent)}/AddSubFolderUsingPath`, {
      leafPath: { __metadata: { type: 'SP.ResourcePath' }, DecodedUrl: name }
    });
    const reference: IDynamicFormPersistedReference = {
      webAbsoluteUrl: this.rest.webAbsoluteUrl, listId, serverRelativeUrl: name ? `${parent}/${name}` : undefined
    };
    let phase: 'identify' | 'metadata' = 'identify';
    let itemId: number | undefined;
    try {
      if (!reference.serverRelativeUrl) throw new Error('Unable to identify a folder created without a name.');
      const item = await this.rest.get<{ Id: number }>(`${this.folder(reference.serverRelativeUrl)}/ListItemAllFields`);
      if (!item?.Id) throw new Error('Unable to read the ID of the created folder or document set.');
      itemId = item.Id;
      phase = 'metadata';
      return await this.updateItem(listId, itemId, values, '*', true);
    } catch (error) {
      if (error instanceof DynamicFormSaveError) throw error;
      throw new DynamicFormSaveError({ ...reference, listItemId: itemId }, error, phase, true);
    }
  }

  public async addFile(
    listId: string, name: string, content: Blob, values: Record<string, unknown>, folderPath?: string
  ): Promise<IDynamicFormSaveResult> {
    const parent = await this.folderPath(listId, folderPath);
    const file = await this.rest.post<IFileInfo>(
      `${this.folder(parent)}/files/AddUsingPath(decodedurl='${escapeODataString(name)}',overwrite=true)`, new Blob([])
    );
    const reference: IDynamicFormPersistedReference = {
      webAbsoluteUrl: this.rest.webAbsoluteUrl, listId, serverRelativeUrl: file?.ServerRelativeUrl
    };
    let phase: 'identify' | 'upload' | 'metadata' = 'identify';
    let itemId: number | undefined;
    try {
      if (!file?.ServerRelativeUrl) throw new Error('SharePoint did not return the uploaded file path.');
      phase = 'upload';
      const path = `/_api/web/GetFileByServerRelativePath(decodedurl='${escapeODataString(file.ServerRelativeUrl)}')`;
      const uploadId = Guid.newGuid().toString();
      let offset = this.offset(await this.rest.post(
        `${path}/StartUpload(uploadId=guid'${uploadId}')`, content.slice(0, chunkSize), { retrySafe: true }
      ), 'StartUpload');
      if (offset !== Math.min(chunkSize, content.size)) throw new Error('SharePoint returned an unexpected upload offset.');
      while (content.size - offset > chunkSize) {
        const next = this.offset(await this.rest.post(
          `${path}/ContinueUpload(uploadId=guid'${uploadId}',fileOffset=${offset})`, content.slice(offset, offset + chunkSize)
        ), 'ContinueUpload');
        if (next !== offset + chunkSize) throw new Error('SharePoint returned an unexpected upload offset.');
        offset = next;
      }
      await this.rest.post(`${path}/FinishUpload(uploadId=guid'${uploadId}',fileOffset=${offset})`, content.slice(offset));
      phase = 'identify';
      const item = await this.rest.get<{ Id: number }>(`${path}/ListItemAllFields`);
      if (!item?.Id) throw new Error('Unable to read the ID of the uploaded document.');
      itemId = item.Id;
      phase = 'metadata';
      return await this.updateItem(listId, itemId, values, '*', true);
    } catch (error) {
      if (error instanceof DynamicFormSaveError) throw error;
      throw new DynamicFormSaveError({ ...reference, listItemId: itemId }, error, phase, true);
    }
  }

  private offset(value: unknown, operation: string): number {
    const number = Number(value && typeof value === 'object' ? (value as Record<string, unknown>)[operation] : value);
    if (!Number.isFinite(number) || number < 0) throw new Error(`Invalid ${operation} offset.`);
    return number;
  }

  private list(listId: string): string {
    return `/_api/web/lists(guid'${Guid.parse(listId).toString()}')`;
  }

  private folder(path: string): string {
    return `/_api/web/GetFolderByServerRelativePath(decodedurl='${escapeODataString(path)}')`;
  }

  private async folderPath(listId: string, requested?: string): Promise<string> {
    const root = await this.rest.get<{ ServerRelativeUrl: string }>(`${this.list(listId)}/RootFolder?$select=ServerRelativeUrl`);
    const rootPath = root.ServerRelativeUrl.replace(/\/$/, '');
    if (!requested) return rootPath;
    let path = requested.replace(/\/$/, '');
    if (/%[0-9a-f]{2}/i.test(path)) {
      try {
        path = decodeURIComponent(path);
      } catch (error) {
        if (!(error instanceof URIError)) throw error;
        console.warn('[DynamicFormService] Treating a folder path with literal percent characters as decoded.', error);
      }
    }
    if (path.toLowerCase() === rootPath.toLowerCase() || path.toLowerCase().startsWith(`${rootPath.toLowerCase()}/`)) return path;
    if (path.startsWith('/')) throw new Error('The folder must be inside the selected document library.');
    return `${rootPath}/${path}`;
  }

  private async savedResult(listId: string, itemId: number): Promise<IDynamicFormSaveResult> {
    const reference: IDynamicFormItemReference = {
      webAbsoluteUrl: this.rest.webAbsoluteUrl, listId, listItemId: itemId
    };
    try {
      const data = await this.getItem(listId, itemId);
      return { data, reference: { ...reference, etag: data['odata.etag'] as string | undefined } };
    } catch (error) {
      throw new DynamicFormSaveError(reference, error);
    }
  }

  private async entityName(listId: string): Promise<string> {
    const key = `spfx-controls:entity-name:${this.rest.webAbsoluteUrl}:${listId.toLowerCase()}`;
    const existing = this.entityNames.get(key);
    if (existing) return existing;
    const load = async (): Promise<string> => {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          const cached = JSON.parse(stored) as { name?: string; expires?: number };
          if (typeof cached.name === 'string' && cached.expires > Date.now()) return cached.name;
        }
      } catch (error) {
        console.warn('[DynamicFormService] Cannot read entity metadata cache.', error);
      }
      const list = await this.rest.get<{ ListItemEntityTypeFullName: string }>(`${this.list(listId)}?$select=ListItemEntityTypeFullName`);
      if (!list.ListItemEntityTypeFullName) throw new Error('SharePoint did not return a list item entity type.');
      try {
        localStorage.setItem(key, JSON.stringify({ name: list.ListItemEntityTypeFullName, expires: Date.now() + entityLifetime }));
      } catch (error) {
        console.warn('[DynamicFormService] Cannot persist entity metadata cache.', error);
      }
      return list.ListItemEntityTypeFullName;
    };
    const promise = load();
    this.entityNames.set(key, promise);
    try {
      return await promise;
    } finally {
      this.entityNames.delete(key);
    }
  }
}
