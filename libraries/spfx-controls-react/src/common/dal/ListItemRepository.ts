import { SPHttpClient } from '@microsoft/sp-http';

export class ListItemRepository {
  constructor(protected SiteUrl: string, protected SPClient: SPHttpClient) {

  }
  /**
   *
   * @param filterText text value of the filter part of oData query 'Id eq 1'
   * @param listId
   * @param internalColumnName
   * @param keyInternalColumnName
   * @param webUrl
   * @param top
   * @param orderBy text value of the filter part of oData query 'Title desc, Created'
   */
  public async getListItemsByFilterClause(
    filterText: string,
    listId: string,
    internalColumnName: string,
    keyInternalColumnName?: string,
    webUrl?: string,
    top?: number,
    orderBy?: string
  ): Promise<any[]> { // eslint-disable-line @typescript-eslint/no-explicit-any
    try {
      const webAbsoluteUrl = !webUrl ? this.SiteUrl : webUrl;
      let apiUrl = `${webAbsoluteUrl}/_api/web/lists('${listId}')/items?$select=${keyInternalColumnName || 'Id'},${internalColumnName}&$filter=${filterText}&$top=${top}`;
      if (orderBy) {
        apiUrl += `&$orderBy=${orderBy}`;
      }
      const data = await this.SPClient.get(apiUrl, SPHttpClient.configurations.v1);
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

  public async getListId(
    listName: string,
    webUrl?: string,
  ): Promise<string> {

    const webAbsoluteUrl = !webUrl ? this.SiteUrl : webUrl;  
    const apiUrl = `${webAbsoluteUrl}/_api/web/lists/getByTitle(@listName)/Id?@listName='${encodeURIComponent(listName)}'`;
    const data = await this.SPClient.get(apiUrl, SPHttpClient.configurations.v1);
    if (data.ok) {
      const results = await data.json();
      if (results) {
        return results.value;
      }
    }

    return;
}
}
