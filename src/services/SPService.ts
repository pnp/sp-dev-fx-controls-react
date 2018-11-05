import { ISPService, ILibsOptions, LibsOrderBy } from "./ISPService";
import { ISPLists } from "../common/SPEntities";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export default class SPService implements ISPService {

  constructor(private _context: WebPartContext | ApplicationCustomizerContext) {}

  /**
   * Get lists or libraries
   * @param options
   */
  public async getLibs(options?: ILibsOptions): Promise<ISPLists> {
    let filtered: boolean;
    let queryUrl: string = `${this._context.pageContext.web.absoluteUrl}/_api/web/lists?$select=Title,id,BaseTemplate`;

    if (options.orderBy) {
      queryUrl += `&$orderby=${options.orderBy === LibsOrderBy.Id ? 'Id': 'Title'}`;
    }

    if (options.baseTemplate) {
      queryUrl += `&$filter=BaseTemplate eq ${options.baseTemplate}`;
      filtered = true;
    }

    if (options.includeHidden === false) {
      queryUrl += filtered ? ' and Hidden eq false' : '&$filter=Hidden eq false';
      filtered = true;
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
}
