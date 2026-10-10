import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import { SPRestClient, escapeODataString } from './SPRestClient';
import { ITermInfo, ITermSetInfo, ITermStoreInfo } from './SPTaxonomyService.types';
export * from './SPTaxonomyService.types';

interface ITermPage {
  value: ITermInfo[];
  '@odata.nextLink'?: string;
}

export class SPTaxonomyService {
  private readonly rest: SPRestClient;
  private readonly base = '/_api/v2.1/termstore';

  constructor(context: BaseComponentContext, webAbsoluteUrl?: string) {
    this.rest = new SPRestClient(context.spHttpClient, webAbsoluteUrl || context.pageContext.web.absoluteUrl);
    this.getTerms = this.getTerms.bind(this);
  }

  public dispose(): void {
    this.rest.dispose();
  }

  public async getTerms(
    termSetId: Guid, parentTermId?: Guid, skiptoken?: string, hideDeprecatedTerms?: boolean, pageSize = 50
  ): Promise<{ value: ITermInfo[]; skiptoken: string }> {
    const query = new URLSearchParams({ '$top': String(pageSize) });
    if (hideDeprecatedTerms) query.set('$filter', 'isDeprecated eq false');
    if (skiptoken) query.set('$skiptoken', skiptoken);
    const page = await this.rest.getRaw<ITermPage>(`${this.termPath(termSetId, parentTermId)}/getLegacyChildren?${query}`);
    if (!Array.isArray(page.value)) throw new Error('SharePoint returned an invalid taxonomy page.');
    const next = page['@odata.nextLink'];
    return {
      value: page.value,
      skiptoken: next ? new URL(this.rest.resolveUrl(next)).searchParams.get('$skiptoken') || '' : ''
    };
  }

  public async getTermById(termSetId: Guid, termId: Guid): Promise<ITermInfo | undefined> {
    if (!this.hasId(termId)) return undefined;
    return this.rest.get(`${this.termPath(termSetId, termId)}?$expand=parent`);
  }

  public async searchTerm(
    termSetId: Guid, label: string, languageTag: string, parentTermId?: Guid,
    allowSelectingChildren = true, stringMatchOption = 'StartsWith', pageSize = 50
  ): Promise<ITermInfo[]> {
    const args = [
      `label='${escapeODataString(label)}'`, `setId='${termSetId}'`,
      `languageTag='${escapeODataString(languageTag)}'`, `stringMatchOption='${escapeODataString(stringMatchOption)}'`
    ];
    if (this.hasId(parentTermId)) args.push(`parentTermId='${parentTermId}'`);
    const terms = await this.rest.get<ITermInfo[]>(`${this.base}/searchTerm(${args.join(',')})?$top=${pageSize}`);
    if (allowSelectingChildren) return terms;
    const ids = new Set<string>();
    let url = `${this.termPath(termSetId, parentTermId)}/children?$select=id`;
    while (url) {
      const page = await this.rest.getRaw<ITermPage>(url);
      if (!Array.isArray(page.value)) throw new Error('SharePoint returned an invalid taxonomy children page.');
      page.value.forEach(term => ids.add(term.id));
      url = page['@odata.nextLink'];
    }
    return terms.filter(term => ids.has(term.id));
  }

  public getTermSetInfo(termSetId: Guid): Promise<ITermSetInfo> {
    return this.rest.get(this.termPath(termSetId));
  }

  public getTermStoreInfo(): Promise<ITermStoreInfo> {
    return this.rest.get(this.base);
  }

  private hasId(id?: Guid): boolean {
    return !!id && id.toString() !== Guid.empty.toString();
  }

  private termPath(setId: Guid, termId?: Guid): string {
    return `${this.base}/sets/${setId}${this.hasId(termId) ? `/terms/${termId}` : ''}`;
  }
}
