import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISite } from '../controls/sitePicker/ISitePicker';
import { SPHttpClient } from '@microsoft/sp-http';

const getAllSitesInternal = async (ctx: BaseComponentContext, queryText: string): Promise<ISite[]> => {
  let startRow = 0;
  let rowLimit = 500;
  let totalRows = 0;
  const values: any[] = [];

  //
  // getting all sites
  //
  do {
    let userRequestUrl: string = `${ctx.pageContext.web.absoluteUrl}/_api/search/query?querytext='${queryText}'&selectproperties='SiteId,SiteID,WebId,DepartmentId,Title,Path'&rowlimit=${rowLimit}&startrow=${startRow}`;
    let searchResponse = await ctx.spHttpClient.get(userRequestUrl, SPHttpClient.configurations.v1);
    let sitesResponse = await searchResponse.json();
    let relevantResults = sitesResponse.PrimaryQueryResult.RelevantResults;

    values.push(...relevantResults.Table.Rows);
    totalRows = relevantResults.TotalRows;
    startRow += rowLimit;

  } while (values.length < totalRows);

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

export const getAllSites = async (ctx: BaseComponentContext, includeWebs: boolean, currentSiteCollectionOnly: boolean): Promise<ISite[]> => {

  let rootUrl: string = ctx.pageContext.web.absoluteUrl;
  if (ctx.pageContext.web.serverRelativeUrl !== '/' && (!includeWebs || !currentSiteCollectionOnly)) {
    rootUrl = ctx.pageContext.web.absoluteUrl.replace(ctx.pageContext.web.serverRelativeUrl, '');
  }

  const queryText = `contentclass:STS_Site${includeWebs ? ' contentclass:STS_Web' : ''} Path:${rootUrl}*`;

  return getAllSitesInternal(ctx, queryText);
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
