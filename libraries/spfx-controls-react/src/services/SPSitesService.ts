import { BaseComponentContext } from '@microsoft/sp-component-base';
import { SPHttpClient } from '@microsoft/sp-http';
import { IHubSiteData } from '../common/Interfaces';

export interface ISite {
  /**
   * ID of the site
   */
  id?: string;
  /**
   * Title
   */
  title?: string;
  /**
  * Base URL
  */
  url?: string;

  /**
   * ID of the web
   */
  webId?: string;

  /**
   * ID of the hub site
   */
  hubSiteId?: string;
}

export interface ISiteWebInfo {
  title: string,
  webId: string,
  siteId: string
}

const getAllSitesInternal = async (ctx: BaseComponentContext, queryText: string, trimDuplicates: boolean): Promise<ISite[]> => {
  let startRow = 0;
  const rowLimit = 500;
  let totalRows = 0;
  let currentRows = 0;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const values: any[] = [];

  const searchRequest = {
    QueryTemplate: queryText,
    RowLimit: rowLimit,
    TrimDuplicates: trimDuplicates,
    SelectProperties: ['SiteId', 'SiteID', 'WebId', 'DepartmentId', 'Title', 'Path'],
    StartRow: 0
  };

  const requestUrl = `${ctx.pageContext.web.absoluteUrl}/_api/search/postquery`;

  //
  // getting all sites
  //
  do {
    searchRequest.StartRow = startRow;

    const searchResponse = await ctx.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, {
      body: JSON.stringify({ request: searchRequest }),
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-Type': 'application/json;charset=utf-8',
        'odata-version': '3.0'
      }
    });
    const sitesResponse = await searchResponse.json();
    const relevantResults = sitesResponse.PrimaryQueryResult.RelevantResults;

    values.push(...relevantResults.Table.Rows);
    totalRows = relevantResults.TotalRows;
    startRow += rowLimit;
    currentRows = relevantResults.Table.Rows?.length;

  } while (values.length < totalRows && currentRows !== 0);

  // Do the call against the SP REST API search endpoint

  let res: ISite[] = [];
  res = values.map(element => {
    const site: ISite = {} as ISite;
    element.Cells.forEach(cell => {
      switch (cell.Key) {
        case 'Title':
          site.title = cell.Value;
          break;
        case 'Path':
          site.url = cell.Value;
          break;
        case 'SiteId':
        case 'SiteID':
          site.id = cell.Value;
          break;
        case 'WebId':
          site.webId = cell.Value;
          break;
        case 'DepartmentId':
          if (cell.Value) {
            if (cell.Value.indexOf('{') === 0) {
              site.hubSiteId = cell.Value.slice(1, -1);
            }
            else {
              site.hubSiteId = cell.Value;
            }
          }
          break;
      }
    });

    return site;
  });
  return res;
};

export const getAllSites = async (ctx: BaseComponentContext, includeWebs: boolean, currentSiteCollectionOnly: boolean, trimDuplicates: boolean, additionaQuery?: string | undefined): Promise<ISite[]> => {

  let rootUrl: string = ctx.pageContext.web.absoluteUrl;
  if (ctx.pageContext.web.serverRelativeUrl !== '/' && (!includeWebs || !currentSiteCollectionOnly)) {
    rootUrl = ctx.pageContext.web.absoluteUrl.replace(ctx.pageContext.web.serverRelativeUrl, '');
  }

  let queryText = `(contentclass:STS_Site${includeWebs ? ' contentclass:STS_Web' : ''} Path:${rootUrl}*)`;
  if (additionaQuery) {
    queryText += ` AND (${additionaQuery})`;
  }

  return getAllSitesInternal(ctx, queryText, trimDuplicates);
};

export const getHubSites = async (ctx: BaseComponentContext): Promise<ISite[]> => {
  const hubSites: ISite[] = [];

  const requestUrl = `${ctx.pageContext.site.absoluteUrl}/_api/HubSites?$select=SiteId,ID,SiteUrl,Title`;
  const response = await ctx.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
  const json = await response.json();

  json.value.forEach(v => {
    hubSites.push({
      title: v.Title,
      id: v.SiteId,
      hubSiteId: v.ID,
      url: v.SiteUrl
    });
  });

  return hubSites;
};

export const getSiteWebInfo = async (ctx: BaseComponentContext, webUrl: string): Promise<ISiteWebInfo> => {
  const webInfo = await ctx.spHttpClient.get(`${webUrl}/_api/web?$select=id,Title`, SPHttpClient.configurations.v1);
  if (!webInfo || !webInfo.ok) {
    throw new Error(`[FileBrowser.getWebInfo]: Something went wrong when executing request. Status='${webInfo.statusText}'`);
  }
  const siteInfo = await ctx.spHttpClient.get(`${webUrl}/_api/site?$select=id`, SPHttpClient.configurations.v1);
  if (!siteInfo || !siteInfo.ok) {
    throw new Error(`[FileBrowser.getWebInfo]: Something went wrong when executing request. Status='${webInfo.statusText}'`);
  }
  const webInfoResult = await webInfo.json();
  const siteInfoResult = await siteInfo.json();
  return {
    title: webInfoResult.Title,
    webId: webInfoResult.Id,
    siteId: siteInfoResult.Id
  };
}

export const getAssociatedSites = async (ctx: BaseComponentContext, trimDuplicates: boolean, hubSiteId?: string): Promise<ISite[]> => {
  if (!hubSiteId){
  
    const requestUrl = `${ctx.pageContext.site.absoluteUrl}/_api/web/HubsiteData`;
    const response = await ctx.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1);
    const json = await response.json();
  
    const hubsiteData: IHubSiteData = JSON.parse(json.value);
  
    if (hubsiteData === null)
      return [];
  
    hubSiteId = hubsiteData.relatedHubSiteIds[0];

  }

  const queryText = `(contentclass:STS_Site DepartmentId:${hubSiteId})`;


  return getAllSitesInternal(ctx, queryText, trimDuplicates);
};