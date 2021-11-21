import { ISite } from '../controls/sitePicker/ISitePicker';
import { SPHttpClient } from '@microsoft/sp-http';
import { SPFxContext } from '../common/Types';

const getAllSitesInternal = async (ctx: SPFxContext, queryText: string, trimDuplicates: boolean): Promise<ISite[]> => {
  let startRow = 0;
  let rowLimit = 500;
  let totalRows = 0;
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

    let searchResponse = await ctx.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, {
      body: JSON.stringify({ request: searchRequest }),
      headers: {
        'Accept': 'application/json;odata=nometadata',
        'Content-Type': 'application/json;charset=utf-8',
        'odata-version': '3.0'
      }
    });
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

export const getAllSites = async (ctx: SPFxContext, includeWebs: boolean, currentSiteCollectionOnly: boolean, trimDuplicates: boolean, additionaQuery?: string | undefined): Promise<ISite[]> => {

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

export const getHubSites = async (ctx: SPFxContext): Promise<ISite[]> => {
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
