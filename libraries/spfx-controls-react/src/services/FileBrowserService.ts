import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IFile, FilesQueryResult, ILibrary } from "./FileBrowserService.types";
import { SPHttpClient } from "@microsoft/sp-http";
import { GeneralHelper } from "../common/utilities/GeneralHelper";

/**
 * File Browser Service
 */
export class FileBrowserService {
  // Number of items to download
  protected itemsToDownloadCount: number;

  // Component context
  protected context: BaseComponentContext;

  // Site absolute URL
  protected siteAbsoluteUrl: string;

  // Drive access token (additional file info)
  protected driveAccessToken: string;

  // Media base URL (additional file info)
  protected mediaBaseUrl: string;

  // Caller stack (additional file info)
  protected callerStack: string;

  /**
   * Constructor
   * @param context Component context
   * @param itemsToDownloadCount Number of items to download
   * @param siteAbsoluteUrl Site absolute URL
   */
  constructor(context: BaseComponentContext, itemsToDownloadCount: number = 100, siteAbsoluteUrl?: string) {
    this.context = context;
    this.siteAbsoluteUrl = siteAbsoluteUrl || context.pageContext.web.absoluteUrl;

    this.itemsToDownloadCount = itemsToDownloadCount;
    this.driveAccessToken = null;
  }

  /**
   * Gets files from current sites library
   * @param listUrl web-relative url of the list
   * @param folderPath Folder path to get items from
   * @param acceptedFilesExtensions File extensions to filter the results
   * @param nextPageQueryStringParams Query string parameters to get the next page of results
   * @param sortBy Field to sort by
   * @param isDesc Sort in descending order
   */
  public getListItems = async (listUrl: string, folderPath: string, acceptedFilesExtensions?: string[], nextPageQueryStringParams?: string, sortBy?: string, isDesc?: boolean): Promise<FilesQueryResult> => {
    let filesQueryResult: FilesQueryResult = { items: [], nextHref: null };
    try {
      let restApi = `${this.siteAbsoluteUrl}/_api/web/GetList('${listUrl}')/RenderListDataAsStream`;

      // Do not pass FolderServerRelativeUrl as query parameter
      // Attach passed nextPageQueryStringParams values to REST URL
      if (nextPageQueryStringParams) {
        restApi += `${nextPageQueryStringParams}`;
        folderPath = null;
      }

      filesQueryResult = await this._getListDataAsStream(restApi, folderPath, acceptedFilesExtensions, sortBy, isDesc);
    } catch (error) {
      filesQueryResult.items = null;
      console.error(error.message);
    }
    return filesQueryResult;
  }


  /**
   * Provides the URL for file preview.
   * @param file File to get thumbnail URL
   * @param thumbnailWidth Thumbnail width
   * @param thumbnailHeight Thumbnail height
   * @returns Thumbnail URL with the specified dimensions
   */
  public getFileThumbnailUrl = (file: IFile, thumbnailWidth: number, thumbnailHeight: number): string => {
    const thumbnailUrl = `${this.mediaBaseUrl}/transform/thumbnail?provider=spo&inputFormat=${file.fileType}&cs=${this.callerStack}&docid=${file.spItemUrl}&${this.driveAccessToken}&width=${thumbnailWidth}&height=${thumbnailHeight}`;
    return thumbnailUrl;
  }


  /**
   * Gets document and media libraries from the site
   * @param includePageLibraries Include page libraries (default `false`)
   * @returns Media libraries information
   */
  public getSiteMediaLibraries = async (includePageLibraries: boolean = false): Promise<ILibrary[] | undefined> => {
    try {
      const absoluteUrl = this.siteAbsoluteUrl;
      const restApi = `${absoluteUrl}/_api/SP.Web.GetDocumentAndMediaLibraries?webFullUrl='${encodeURIComponent(absoluteUrl)}'&includePageLibraries='${includePageLibraries}'`;
      const mediaLibrariesResult = await this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1);

      if (!mediaLibrariesResult || !mediaLibrariesResult.ok) {
        throw new Error(`Something went wrong when executing request. Status='${mediaLibrariesResult.status}'`);
      }
      const libResults = await mediaLibrariesResult.json();
      if (!libResults || !libResults.value) {
        throw new Error(`Cannot read data from the results.`);
      }

      const result: ILibrary[] = libResults.value.map((libItem) => { return this.parseLibItem(libItem, absoluteUrl); });
      return result;
    } catch (error) {
      console.error(`[FileBrowserService.getSiteMediaLibraries]: Err='${error.message}'`);
      return undefined;
    }
  }

  /**
   * Gets document and media libraries from the site
   * @param internalName Internal name of the library
   * @returns Library name
   */
  public getLibraryNameByInternalName = async (internalName: string): Promise<string> => {
    try {
      const absoluteUrl = this.siteAbsoluteUrl;
      const restApi = `${absoluteUrl}/_api/web/GetFolderByServerRelativeUrl('${internalName}')/Properties?$select=vti_x005f_listtitle`;
      const libraryResult = await this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1);

      if (!libraryResult || !libraryResult.ok) {
        throw new Error(`Something went wrong when executing request. Status='${libraryResult.status}'`);
      }
      const libResults: { vti_x005f_listtitle: string } = await libraryResult.json();
      if (!libResults || !libResults.vti_x005f_listtitle) {
        throw new Error(`Cannot read data from the results.`);
      }

      return libResults.vti_x005f_listtitle !== internalName && libResults.vti_x005f_listtitle || "";
    } catch (error) {
      console.error(`[FileBrowserService.getSiteLibraryNameByInternalName]: Err='${error.message}'`);
      return null;
    }
  }

  /**
   * Downloads document content from SP location.
   * @param absoluteFileUrl Absolute URL of the file
   * @param fileName Name of the file
   * @returns File content
   */
  public downloadSPFileContent = async (absoluteFileUrl: string, fileName: string): Promise<File> => {
    try {
      const fileDownloadResult = await this.context.spHttpClient.get(absoluteFileUrl, SPHttpClient.configurations.v1);

      if (!fileDownloadResult || !fileDownloadResult.ok) {
        throw new Error(`Something went wrong when downloading the file. Status='${fileDownloadResult.status}'`);
      }

      // Return file created from blob
      const blob: Blob = await fileDownloadResult.blob();
      return GeneralHelper.getFileFromBlob(blob, fileName);
    } catch (err) {
      console.error(`[FileBrowserService.fetchFileContent] Err='${err.message}'`);
      return null;
    }
  }

  /**
   * Maps IFile property name to SharePoint item field name
   * @param filePropertyName File Property
   * @returns SharePoint Field Name
   */
  public getSPFieldNameForFileProperty(filePropertyName: string): string {
    let fieldName = '';
    switch (filePropertyName) {
      case 'fileIcon':
        fieldName = 'DocIcon';
        break;
      case 'serverRelativeUrl':
        fieldName = 'FileRef';
        break;
      case 'modified':
      case 'modifiedDate':
        fieldName = 'Modified';
        break;
      case 'fileSize':
        fieldName = 'File_x0020_Size';
        break;
      case 'fileType':
        fieldName = 'File_x0020_Type';
        break;
      case 'modifiedBy':
        fieldName = 'Editor';
        break;
    }

    return fieldName;
  }

  /**
   * Gets the Title and Id of the current Web
   * @returns SharePoint Site Title and Id
   */
  public getSiteTitleAndId = async (): Promise<{ title: string, id: string }> => {
    const restApi = `${this.siteAbsoluteUrl}/_api/web?$select=Title,Id`;
    const webResult = await this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1);

    if (!webResult || !webResult.ok) {
      throw new Error(`Something went wrong when executing request. Status='${webResult.status}'`);
    }
    if (!webResult || !webResult) {
      throw new Error(`Cannot read data from the results.`);
    }
    const webJson = await webResult.json();
    return { title: webJson.Title, id: webJson.Id };

  }

  /**
   * Executes query to load files with possible extension filtering
   * @param restApi REST API URL
   * @param folderPath Folder path to get items from
   * @param acceptedFilesExtensions File extensions to filter the results
   * @param sortBy Field to sort by
   * @param isDesc Sort in descending order
   * @returns Files query result
   */
  protected _getListDataAsStream = async (restApi: string, folderPath: string, acceptedFilesExtensions?: string[], sortBy?: string, isDesc?: boolean): Promise<FilesQueryResult> => {
    let filesQueryResult: FilesQueryResult = { items: [], nextHref: null };
    try {
      const body = {
        parameters: {
          AllowMultipleValueFilterForTaxonomyFields: true,
          // ContextInfo (1), ListData (2), ListSchema (4), ViewMetadata (1024), EnableMediaTAUrls (4096), ParentInfo (8192)
          RenderOptions: 1 | 2 | 4 | 1024 | 4096 | 8192,
          ViewXml: this.getFilesCamlQueryViewXml(acceptedFilesExtensions, sortBy || 'FileLeafRef', !!isDesc)
        }
      };
      if (folderPath) {
        // eslint-disable-next-line dot-notation
        body.parameters["FolderServerRelativeUrl"] = folderPath;
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data: any = await this.context.spHttpClient.fetch(restApi, SPHttpClient.configurations.v1, {
        method: "POST",
        body: JSON.stringify(body)
      });

      if (!data || !data.ok) {
        throw new Error(`[FileBrowser._getListItems]: Something went wrong when executing request. Status='${data.statusMessage}'`);
      }
      const filesResult = await data.json();
      if (!filesResult || !filesResult.ListData || !filesResult.ListData.Row) {
        throw new Error(`[FileBrowser._getListItems]: No data is available. Status='${data.statusMessage}'`);
      }

      // Set additional information from the ListResponse
      this.processResponse(filesResult);

      const items = filesResult.ListData.Row.map(fileItem => this.parseFileItem(fileItem));
      filesQueryResult = {
        items: items,
        nextHref: filesResult.ListData.NextHref
      };
    } catch (error) {
      filesQueryResult.items = undefined;
      console.error(error.message);
    }
    return filesQueryResult;
  }

  /**
   * Generates CamlQuery files filter.
   * @param accepts File extensions to filter the results
   * @returns CamlQuery filter
   */
  protected getFileTypeFilter(accepts: string[]): string {
    let fileFilter: string = "";

    if (accepts && accepts.length > 0) {
      fileFilter = "<Values>";
      accepts.forEach((fileType: string, index: number) => {
        fileType = fileType.replace(".", "");
        if (index >= 0) {
          fileFilter = fileFilter + `<Value Type="Text">${fileType}</Value>`;
        }
      });
      fileFilter = fileFilter + "</Values>";
    }

    return fileFilter;
  }

  /**
   * Generates Files CamlQuery ViewXml
   * @param accepts File extensions to filter the results
   * @param sortBy Field to sort by
   * @param isDesc Sort in descending order
   * @returns CamlQuery ViewXml
   */
  protected getFilesCamlQueryViewXml = (accepts: string[], sortBy: string, isDesc: boolean): string => {
    const fileFilter: string = this.getFileTypeFilter(accepts);
    const queryCondition = fileFilter && fileFilter !== "" ?
      `<Query>
        <Where>
          <Or>
            <And>
              <Eq>
                <FieldRef Name="FSObjType" />
                <Value Type="Text">1</Value>
              </Eq>
              <Eq>
                <FieldRef Name="SortBehavior" />
                <Value Type="Text">1</Value>
              </Eq>
            </And>
            <In>
              <FieldRef Name="File_x0020_Type" />
              ${fileFilter}
            </In>
          </Or>
        </Where>
        <OrderBy><FieldRef Name="${sortBy}" Ascending="${isDesc ? 'False' : 'True'}" /></OrderBy>
      </Query>` : `<Query><OrderBy><FieldRef Name="${sortBy}" Ascending="${isDesc ? 'False' : 'True'}" /></OrderBy></Query>`;

    // Add files types condiiton
    const viewXml = `<View>
                      ${queryCondition}
                      <ViewFields>
                        <FieldRef Name="DocIcon"/>
                        <FieldRef Name="LinkFilename"/>
                        <FieldRef Name="Modified"/>
                        <FieldRef Name="Editor"/>
                        <FieldRef Name="FileSizeDisplay"/>
                        <FieldRef Name="SharedWith"/>
                        <FieldRef Name="MediaServiceFastMetadata"/>
                        <FieldRef Name="MediaServiceOCR"/>
                        <FieldRef Name="_ip_UnifiedCompliancePolicyUIAction"/>
                        <FieldRef Name="ItemChildCount"/>
                        <FieldRef Name="FolderChildCount"/>
                        <FieldRef Name="SMTotalFileCount"/>
                        <FieldRef Name="SMTotalSize"/>
                      </ViewFields>
                      <RowLimit Paged="TRUE">${this.itemsToDownloadCount}</RowLimit>
                    </View>`;

    return viewXml;
  }

  /**
   * Converts REST call results to IFile
   * @param fileItem File item from REST call
   * @returns File information
   */
  protected parseFileItem = (fileItem: any): IFile => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const modifiedFriendly: string = fileItem["Modified.FriendlyDisplay"];

    // Get the modified date
    const modifiedParts: string[] = modifiedFriendly.split('|');
    let modified: string = fileItem.Modified;

    // If there is a friendly modified date, use that
    if (modifiedParts.length === 2) {
      modified = modifiedParts[1];
    }

    const file: IFile = {
      name: fileItem.FileLeafRef,
      fileIcon: fileItem.DocIcon,
      serverRelativeUrl: fileItem.FileRef,
      modified: modified,
      modifiedDate: new Date(fileItem.Modified),
      fileSize: fileItem.File_x0020_Size,
      fileType: fileItem.File_x0020_Type,
      modifiedBy: fileItem.Editor[0].title,
      isFolder: fileItem.FSObjType === "1",
      absoluteUrl: this.buildAbsoluteUrl(fileItem.FileRef),

      // Required for item thumbnail
      supportsThumbnail: true,
      spItemUrl: fileItem[".spItemUrl"]
    };
    return file;
  }

  /**
   * Converts REST call results to ILibrary
   * @param libItem Library item from REST call
   * @param webUrl Web URL
   * @returns Library information
   */
  protected parseLibItem = (libItem: any, webUrl: string): ILibrary => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const library: ILibrary = {
      title: libItem.Title,
      absoluteUrl: libItem.AbsoluteUrl,
      serverRelativeUrl: libItem.ServerRelativeUrl,
      webRelativeUrl: libItem.AbsoluteUrl.replace(webUrl, '')
    };

    return library;
  }

  /**
   * Creates an absolute URL
   * @param relativeUrl Relative URL
   * @returns Absolute URL
   */
  protected buildAbsoluteUrl = (relativeUrl: string): string => {
    const siteUrl: string = GeneralHelper.getAbsoluteDomainUrl(this.siteAbsoluteUrl);
    return `${siteUrl}${relativeUrl.indexOf('/') === 0 ? '' : '/'}${relativeUrl}`;
  }

  /**
   * Processes the response from the REST call to get additional information for the requested file
   * @param fileResponse REST call response
   */
  protected processResponse = (fileResponse: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Extract media base URL
    this.mediaBaseUrl = fileResponse.ListSchema[".mediaBaseUrl"];
    this.callerStack = fileResponse.ListSchema[".callerStack"];
    this.driveAccessToken = fileResponse.ListSchema[".driveAccessToken"];
  }
}
