import { BaseComponentContext } from '@microsoft/sp-component-base';
import { SPHttpClient, HttpClientResponse } from "@microsoft/sp-http";
import { ISearchResult, BingQuerySearchParams, IRecentFile } from "./FilesSearchService.types";
import { find } from "@fluentui/react/lib/Utilities";
import { GeneralHelper } from "../common/utilities/GeneralHelper";
import type { IBingSearchResult } from '../controls/filePicker/WebSearchTab/IBingSearchResult';
import { getSiteWebInfo } from './SPSitesService';

/**
 * Maximum file size when searching
 */
const MAXFILESIZE = 52428800;

/**
 * Maximum number of search results
 */
const MAXRESULTS = 100;

export class FilesSearchService {
  private context: BaseComponentContext;
  private bingAPIKey: string;
  private siteAbsoluteUrl: string;

  constructor(context: BaseComponentContext, bingAPIKey: string, siteAbsoluteUrl?: string) {
    this.context = context;
    this.bingAPIKey = bingAPIKey;
    this.siteAbsoluteUrl = siteAbsoluteUrl || context.pageContext.web.absoluteUrl
  }

  /**
   * Checks if file exists
   */
  public checkFileExists = async (fileUrl: string): Promise<boolean> => {
    try {
      const fetchFileResult = await this.context.httpClient.fetch(fileUrl, SPHttpClient.configurations.v1, {
        headers: new Headers(),
        method: 'HEAD',
        mode: 'cors'
      });

      if (!fetchFileResult || !fetchFileResult.ok) {
        throw new Error(`Something went wrong when executing search query. Status='${fetchFileResult.status}'`);
      }

      return true;
    } catch (err) {
      console.error(`[BingFilesService.fetchFile]: Err='${err.message}'`);
      return false;
    }
  }

  /**
   * Executes Recent files search.
   */
  public executeRecentSearch = async (accepts?: string[]): Promise<IRecentFile[] | undefined> => {
    try {
      let webId = this.context.pageContext.web.id.toString();
      let siteId = this.context.pageContext.site.id.toString();
      if (this.siteAbsoluteUrl !== this.context.pageContext.web.absoluteUrl) {
        const siteinfo = await getSiteWebInfo(this.context, this.siteAbsoluteUrl);
        webId = siteinfo.webId;
        siteId = siteinfo.siteId;
      }
      const fileFilter = this._getFileFilter(accepts);

      const queryTemplate: string = `((SiteID:${siteId} OR SiteID: {${siteId}}) AND (WebId: ${webId} OR WebId: {${webId}})) AND LastModifiedTime < {Today} AND -Title:OneNote_DeletedPages AND -Title:OneNote_RecycleBin${fileFilter}`;
      const queryData = {
        __metadata: { "type": "Microsoft.Office.Server.Search.REST.SearchRequest" },
        QueryTemplate: queryTemplate,
        RowLimit: 20,
        SelectProperties: {
          results: [
            "Title",
            "Path",
            "Filename",
            "FileExtension",
            "FileType",
            "Created",
            "Author",
            "LastModifiedTime",
            "EditorOwsUser",
            "ModifiedBy",
            "LinkingUrl",
            "SiteTitle",
            "ParentLink",
            "DocumentPreviewMetadata",
            "ListID",
            "ListItemID",
            "SPSiteURL",
            "SiteID",
            "WebId",
            "UniqueID",
            "SPWebUrl",
            "DefaultEncodingURL",
            "PictureThumbnailURL",
          ]
        },
        SortList: {
          results: [
            {
              "Property": "LastModifiedTime",
              "Direction": 1
            }
          ]
        }
      };
      const searchApi = `${this.siteAbsoluteUrl}/_api/search/postquery`;

      const recentSearchDataResult = await this.context.spHttpClient.post(searchApi, SPHttpClient.configurations.v1, {
        headers: {
          'accept': 'application/json;odata=nometadata',
          'content-type': 'application/json;odata=verbose',
          "odata-version": ""
        },
        body: JSON.stringify({
          request: queryData
        })
      });
      if (!recentSearchDataResult || !recentSearchDataResult.ok) {
        throw new Error(`Something went wrong when executing search query. Status='${recentSearchDataResult.status}'`);
      }

      const recentSearchData = await recentSearchDataResult.json();
      if (!recentSearchData || !recentSearchData.PrimaryQueryResult.RelevantResults.Table.Rows) {
        throw new Error(`Cannot read JSON result`);
      }

      const recentFilesResult: IRecentFile[] = recentSearchData.PrimaryQueryResult.RelevantResults.Table.Rows.map((row) => { return this.parseRecentSearchResult(row.Cells); });
      return recentFilesResult;
    } catch (err) {
      console.error(`[BingFilesService.executeRecentSearch]: Err='${err.message}'`);
      return undefined;
    }
  }

  /**
   * Executes bing search for a file.
   */
  public executeBingSearch = async (queryParams: BingQuerySearchParams): Promise<ISearchResult[]> => {
    try {
      const aspect: string = queryParams.aspect ? queryParams.aspect : 'All';
      const size: string = queryParams.size ? queryParams.size : 'All';
      const license: string = queryParams.license ? queryParams.license : 'Any';
      const query: string = queryParams.query;

      const maxResults = queryParams.maxResults ? queryParams.maxResults : MAXRESULTS;
      const maxFileSize = queryParams.maxFileSize ? queryParams.maxFileSize : MAXFILESIZE;

      // No query
      if (query === undefined) {
        return;
      }

      // Submit the request
      const apiUrl: string = `https://api.bing.microsoft.com/v7.0/images/search?q=${encodeURIComponent(query)}&count=${maxResults}&aspect=${aspect}&maxFileSize=${maxFileSize}&size=${size}&mkt=en-US&license=${license}`;

      const searchDataResponse: HttpClientResponse = await this.context.httpClient.get(apiUrl, SPHttpClient.configurations.v1, {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Ocp-Apim-Subscription-Key': this.bingAPIKey,
        }
      });

      if (!searchDataResponse || !searchDataResponse.ok) {
        throw new Error(`Something went wrong when executing search query. Status='${searchDataResponse.statusText}'`);
      }
      const searchData = await searchDataResponse.json();
      if (!searchData || !searchData.value) {
        throw new Error(`Cannot read JSON result`);
      }
      const bingResults: IBingSearchResult[] = searchData.value;
      const searchResults = bingResults.map(item => this.parseBingSearchResult(item));

      return searchResults;
    } catch (err) {
      console.error(`[BingFilesService.executeSearch]: Err='${err.message}'`);
      return null;
    }
  }

  /**
   * Downloads document content from SP location.
   */
  public downloadSPFileContent = async (absoluteFileUrl: string, fileName: string): Promise<File> => {
    try {
      const fileDownloadResult = await this.context.spHttpClient.get(absoluteFileUrl, SPHttpClient.configurations.v1);

      if (!fileDownloadResult || !fileDownloadResult.ok) {
        throw new Error(`Something went wrong when downloading the file. Status='${fileDownloadResult.status}'`);
      }

      // Return file created from blob
      const blob: Blob = await fileDownloadResult.blob();
      // Retrieve file from blob - method supports IE11
      return GeneralHelper.getFileFromBlob(blob, fileName);
    } catch (err) {
      console.error(`[FileSearchService.fetchFileContent] Err='${err.message}'`);
      return null;
    }
  }

  /**
   * Downloads document content from Remote location.
   */
  public downloadBingContent = async (absoluteFileUrl: string, fileName: string): Promise<File> => {
    try {
      const fileDownloadResult = await this.context.httpClient.get(absoluteFileUrl, SPHttpClient.configurations.v1, {
        method: "GET",
        mode: "cors"
      });

      if (!fileDownloadResult || !fileDownloadResult.ok) {
        throw new Error(`Something went wrong when downloading the file. Status='${fileDownloadResult.status}'`);
      }

      // Return file created from blob
      const blob: Blob = await fileDownloadResult.blob();
      return GeneralHelper.getFileFromBlob(blob, fileName);
    } catch (err) {
      console.error(`[FileSearchService.fetchFileContent] Err='${err.message}'`);
      return null;
    }
  }

  /**
   * Parses Recent Search results.
   */
  private parseRecentSearchResult = (cells: Array<any>): IRecentFile => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const titleCell = find(cells, x => x.Key === "Title");
    const keyCell = find(cells, x => x.Key === "UniqueID");
    const fileUrlCell = find(cells, x => x.Key === "DefaultEncodingURL");
    const editedByCell = find(cells, x => x.Key === "ModifiedBy");

    const recentFile: IRecentFile = {
      key: keyCell ? keyCell.Value : null,
      name: titleCell ? titleCell.Value : null,
      fileUrl: fileUrlCell ? fileUrlCell.Value : null,
      editedBy: editedByCell ? editedByCell.Value : null,
      isFolder: !fileUrlCell.Value
    };
    return recentFile;
  }

  /**
   * Parses Bing search results.
   */
  private parseBingSearchResult = (bingResult: IBingSearchResult): ISearchResult => {
    // Get dimensions
    const width: number = bingResult.thumbnail.width ? bingResult.thumbnail.width : bingResult.width;
    const height: number = bingResult.thumbnail.height ? bingResult.thumbnail.height : bingResult.height;

    // Create a search result
    const searchResult: ISearchResult = {
      thumbnailUrl: bingResult.thumbnailUrl,
      contentUrl: bingResult.contentUrl,
      displayUrl: this.getDisplayUrl(bingResult.hostPageDisplayUrl),
      key: bingResult.imageId,
      width: width,
      height: height,
    };
    return searchResult;
  }

  /**
   * Builds a file filter using the accepted file extensions
   */
  private _getFileFilter(accepts?: string[]): string | undefined {
    let fileFilter: string = undefined;
    if (accepts) {
      fileFilter = " AND (";
      accepts.forEach((fileType: string, index: number) => {
        fileType = fileType.replace(".", "");
        if (index > 0) {
          fileFilter = fileFilter + " OR ";
        }
        fileFilter = fileFilter + `FileExtension:${fileType} OR SecondaryFileExtension:${fileType}`;
      });
      fileFilter = fileFilter + ")";
    }
    return fileFilter;
  }

  /**
   * Removes protocol and retrieves only the domain, just like Bing search results does
   * in the SharePoint file picker
   * @param url The display url as provided by Bing
   */
  private getDisplayUrl = (url: string): string => {
    // remove any protocols
    if (url.indexOf('://') > -1) {
      const urlParts: string[] = url.split('://');
      url = urlParts.pop();
    }

    // Split the URL on the first slash
    const splitUrl = url.split('/');
    return splitUrl[0];
  }
}
