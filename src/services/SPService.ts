import { ISPService, ILibsOptions, LibsOrderBy } from "./ISPService";
import { ISPLists } from "../common/SPEntities";
import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { SPHttpClient, SPHttpClientResponse } from "@microsoft/sp-http";

export default class SPService implements ISPService {

  constructor(private _context: WebPartContext | ApplicationCustomizerContext) {}

  /**
   * Get lists or libraries
   * @param options
   */
  public getLibs(options?: ILibsOptions): Promise<ISPLists> {
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

    return this._context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)
    .then(response => response.json()) as Promise<ISPLists>;
  }
}
