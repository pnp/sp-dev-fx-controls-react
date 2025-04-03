import { FileBrowserService } from "./FileBrowserService";
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { SPHttpClient } from "@microsoft/sp-http";
import { ILibrary, FilesQueryResult } from "./FileBrowserService.types";

/**
 * OrgAssetsService class
 */
export class OrgAssetsService extends FileBrowserService {
  // Site organization assets library server relative URL
  private _orgAssetsLibraryServerRelativeSiteUrl: string = null;

  private get orgAssetsLibraryServerRelativeSiteUrl(): string {
    return this._orgAssetsLibraryServerRelativeSiteUrl;
  }

  private set orgAssetsLibraryServerRelativeSiteUrl(value: string) {
    if (value === "/") {
      this._orgAssetsLibraryServerRelativeSiteUrl = "";
    }
    else {
      this._orgAssetsLibraryServerRelativeSiteUrl = value?.replace(/\/$/, "") ?? null
    }
  }

  /**
   * Constructor
   * @param context Component context
   * @param itemsToDownloadCount Items to download count
   */
  constructor(context: BaseComponentContext, itemsToDownloadCount?: number) {
    super(context, itemsToDownloadCount);
  }

  /**
   * Gets files from current sites library
   * @param _listUrl Unused parameter (not used in this implementation)
   * @param folderPath Folder path to get items from
   * @param acceptedFilesExtensions File extensions to filter the results
   * @param nextPageQueryStringParams Query string parameters to get the next page of results
   * @returns Items in the specified folder
   */
  public getListItems = async (_listUrl: string, folderPath: string, acceptedFilesExtensions?: string[], nextPageQueryStringParams?: string): Promise<FilesQueryResult> => {
    let filesQueryResult: FilesQueryResult = { items: [], nextHref: null };
    try {
      if (folderPath.charAt(0) !== '/') {
        folderPath = `/${folderPath}`;
      }

      // Remove all the rest of the folder path
      let libName = folderPath.replace(`${this.orgAssetsLibraryServerRelativeSiteUrl}/`, '');
      libName = libName.split('/')[0];

      // Build absolute library URL
      const libFullUrl = this.buildAbsoluteUrl(`${this.orgAssetsLibraryServerRelativeSiteUrl}/${libName}`);

      let queryStringParams: string = "";
      // Do not pass FolderServerRelativeUrl as query parameter
      // Attach passed nextPageQueryStringParams values to REST URL
      if (nextPageQueryStringParams) {
        // Remove start ? from the query params
        if (nextPageQueryStringParams.charAt(0) === "?") {
          nextPageQueryStringParams = nextPageQueryStringParams.substring(1);
        }
        queryStringParams = nextPageQueryStringParams;
      } else {
        queryStringParams = `RootFolder=${folderPath}`;
      }
      const restApi = `${this.context.pageContext.web.absoluteUrl}/_api/SP.List.GetListDataAsStream?listFullUrl='${libFullUrl}'&${queryStringParams}`;

      filesQueryResult = await this._getListDataAsStream(restApi, null, acceptedFilesExtensions);
    } catch (error) {
      filesQueryResult.items = null;
      console.error(error.message);
    }
    return filesQueryResult;
  }

  /**
   * Gets document and media libraries from the site
   * @param includePageLibraries Unused parameter (not used in this implementation)
   * @returns Document and media libraries from the site
   */
  public getSiteMediaLibraries = async (includePageLibraries: boolean = false): Promise<ILibrary[]> => {
    try {
      const restApi = `${this.context.pageContext.web.absoluteUrl}/_api/SP.Publishing.SitePageService.FilePickerTabOptions`;
      const orgAssetsResult = await this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1);

      if (!orgAssetsResult || !orgAssetsResult.ok) {
        throw new Error(`Something went wrong when executing request. Status='${orgAssetsResult.status}'`);
      }
      const orgAssetsData = await orgAssetsResult.json();
      if (!orgAssetsData || !orgAssetsData.OrgAssets || !orgAssetsData.OrgAssets.OrgAssetsLibraries || !orgAssetsData.OrgAssets.OrgAssetsLibraries.Items || orgAssetsData.OrgAssets.OrgAssetsLibraries.Items.length <= 0) {
        return null;
      }

      this.orgAssetsLibraryServerRelativeSiteUrl = orgAssetsData ? orgAssetsData.OrgAssets.Url.DecodedUrl : null;
      const libs: ILibrary[] = orgAssetsData && orgAssetsData.OrgAssets ? orgAssetsData.OrgAssets.OrgAssetsLibraries.Items.map((libItem) => { return this._parseOrgAssetsLibraryItem(libItem); }) : [];
      return libs;
    } catch (error) {
      console.error(`[OrgAssetsService.getOrganisationAssetsLibraries]: Err='${error.message}'`);
      return null;
    }
  }

  /**
   * Parses the organisation assets library item
   * @param libItem Library item to parse
   * @returns Organisation assets library
   */
  private _parseOrgAssetsLibraryItem = (libItem: any): ILibrary => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const orgAssetsLibrary: ILibrary = {
      absoluteUrl: this.buildAbsoluteUrl(libItem.LibraryUrl.DecodedUrl),
      title: libItem.DisplayName,
      serverRelativeUrl: libItem.LibraryUrl.DecodedUrl,
      iconPath: libItem.ThumbnailUrl && libItem.ThumbnailUrl.DecodedUrl ? this.buildAbsoluteUrl(`${this.orgAssetsLibraryServerRelativeSiteUrl}/${libItem.ThumbnailUrl.DecodedUrl}`) : null
    };

    return orgAssetsLibrary;
  }
}
