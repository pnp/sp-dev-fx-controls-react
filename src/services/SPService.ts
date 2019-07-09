import { ISPService, ILibsOptions, LibsOrderBy } from "./ISPService";
import { ISPLists } from "../common/SPEntities";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ExtensionContext } from "@microsoft/sp-extension-base";
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from "@microsoft/sp-http";
import { sp, Web } from '@pnp/sp';

export default class SPService implements ISPService {

  constructor(private _context: WebPartContext | ExtensionContext) { }

  /**
   * Get lists or libraries
   *
   * @param options
   */
  public async getLibs(options?: ILibsOptions): Promise<ISPLists> {
    let filtered: boolean;
    let queryUrl: string = `${this._context.pageContext.web.absoluteUrl}/_api/web/lists?$select=Title,id,BaseTemplate`;

    if (options.orderBy) {
      queryUrl += `&$orderby=${options.orderBy === LibsOrderBy.Id ? 'Id' : 'Title'}`;
    }

    if (options.filter) {
      queryUrl += `&$filter=${encodeURIComponent(options.filter)}`;
    } else {
      if (options.baseTemplate) {
        queryUrl += `&$filter=BaseTemplate eq ${options.baseTemplate}`;
        filtered = true;
      }

      if (options.includeHidden === false) {
        queryUrl += filtered ? ' and Hidden eq false' : '&$filter=Hidden eq false';
        filtered = true;
      }
    }

    const data = await this._context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1);
    if (data.ok) {
      return await data.json() as Promise<ISPLists>;
    } else {
      return null;
    }
  }

  /**
   * Get List Items
   */
  public async getListItems(filterText: string, listId: string, internalColumnName: string, webUrl?: string): Promise<any[]> {
    let returnItems: any[];

    try {
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists('${listId}')/items?$select=Id,${internalColumnName}&$filter=startswith(${internalColumnName},'${filterText}')`;
      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results && results.value && results.value.length > 0) {
          return results.value;
        }
      }

      return [];
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get list item attachments
   *
   * @param listId
   * @param itemId
   * @param webUrl
   */
  public async getListItemAttachments(listId: string, itemId: number, webUrl?: string): Promise<any[]> {
    try {
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles?@listId=guid'${encodeURIComponent(listId)}'&@itemId=${encodeURIComponent(String(itemId))}`;
      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results && results.value) {
          return results.value;
        }
      }

      return null;
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  /**
   * Delete attachment
   *
   * @param fileName
   * @param listId
   * @param itemId
   * @param webUrl
   */
  public async deleteAttachment(fileName: string, listId: string, itemId: number, webUrl?: string): Promise<void> {
    try {
      const spOpts: ISPHttpClientOptions = {
        headers: { "X-HTTP-Method": 'DELETE', }
      };
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles/getByFileName(@fileName)/RecycleObject?@listId=guid'${encodeURIComponent(listId)}'&@itemId=${encodeURIComponent(String(itemId))}&@fileName='${encodeURIComponent(fileName.replace(/'/g, "''"))}'`;
      const data = await this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spOpts);
    } catch (error) {
      console.dir(error);
      return Promise.reject(error);
    }
  }

  /**
   * Add attachment
   *
   * @param listId
   * @param itemId
   * @param fileName
   * @param file
   * @param webUrl
   */
  public async addAttachment(listId: string, itemId: number, fileName: string, file: File, webUrl?: string): Promise<void> {
    try {
      // Remove special characters in FileName
      fileName = fileName.replace(/[^\.\w\s]/gi, '');
      // Check if attachment exists
      const fileExists = await this.checkAttachmentExists(listId, itemId, fileName, webUrl);
      // Delete attachment if it exists
      if (fileExists) {
        await this.deleteAttachment(fileName, listId, itemId, webUrl);
      }
      // Add attachment
      const spOpts: ISPHttpClientOptions = {
        body: file
      };
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles/add(FileName=@fileName)?@listId=guid'${encodeURIComponent(listId)}'&@itemId=${encodeURIComponent(String(itemId))}&@fileName='${encodeURIComponent(fileName.replace(/'/g, "''"))}'`;
      const data = await this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spOpts);
      return;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get attachement for list item
   *
   * @param listId
   * @param itemId
   * @param fileName
   * @param webUrl
   */
  public async getAttachment(listId: string, itemId: number, fileName: string, webUrl?: string): Promise<any> {
    const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
    const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles/GetByFileBame(@fileName))?@listId=guid'${encodeURIComponent(listId)}'&@itemId=${encodeURIComponent(String(itemId))}&@fileName='${encodeURIComponent(fileName.replace(/'/g, "''"))}'`;
    const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
    if (data.ok) {
      const file = await data.json();
      if (file) {
        return file;
      }
    }

    return null;
  }

  /**
   * Check if the attachment exists
   *
   * @param listId
   * @param itemId
   * @param fileName
   * @param webUrl
   */
  public async checkAttachmentExists(listId: string, itemId: number, fileName: string, webUrl?: string): Promise<any> {
    try {
      const listServerRelativeUrl = await this.getListServerRelativeUrl(listId, webUrl);
      const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
      const fileServerRelativeUrl = `${listServerRelativeUrl}/Attachments/${itemId}/${fileName}`;
      const apiUrl = `${webAbsoluteUrl}/_api/web/getfilebyserverrelativeurl(@url)/Exists?@url='${encodeURIComponent(fileServerRelativeUrl.replace(/'/g, "''"))}'`;
      const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
      if (data.ok) {
        const results = await data.json();
        if (results) {
          return results.value;
        }
      }

      return false;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * Get the list name
   *
   * @param listId
   * @param webUrl
   */
  public async getListName(listId: string, webUrl?: string): Promise<string> {
    const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
    const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/RootFolder/Name?@listId=guid'${encodeURIComponent(listId)}'`;
    const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
    if (data.ok) {
      const results = await data.json();
      if (results) {
        return results.value;
      }
    }

    return;
  }

  /**
   * Get the list server relative url
   *
   * @param listId
   * @param webUrl
   */
  public async getListServerRelativeUrl(listId: string, webUrl?: string): Promise<string> {
    const webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
    const apiUrl = `${webAbsoluteUrl}/_api/web/lists(@listId)/RootFolder/ServerRelativeUrl?@listId=guid'${encodeURIComponent(listId)}'`;
    const data = await this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
    if (data.ok) {
      const results = await data.json();
      if (results) {
        return results.value;
      }
    }

    return;
  }
}
