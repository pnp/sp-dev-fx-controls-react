import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFile, FilesQueryResult, ILibrary } from "./FileBrowserService.types";
import { SPHttpClient } from "@microsoft/sp-http";
import { GeneralHelper } from "..";
import { ExtensionContext } from "@microsoft/sp-extension-base";

export class FileBrowserService {
  protected itemsToDownloadCount: number;
  protected context: ExtensionContext | WebPartContext;

  protected driveAccessToken: string;
  protected mediaBaseUrl: string;
  protected callerStack: string;

  constructor(context: ExtensionContext | WebPartContext, itemsToDownloadCount: number = 100) {
    this.context = context;

    this.itemsToDownloadCount = itemsToDownloadCount;
    this.driveAccessToken = null;
  }

  /**
   * Gets files from current sites library
   * @param libraryName
   * @param folderPath
   * @param acceptedFilesExtensions
   */
  public getListItems = async (libraryName: string, folderPath: string, acceptedFilesExtensions?: string[], nextPageQueryStringParams?: string): Promise<FilesQueryResult> => {
    let filesQueryResult: FilesQueryResult = { items: [], nextHref: null };
    try {
      let restApi = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${libraryName}')/RenderListDataAsStream`;

      // Do not pass FolderServerRelativeUrl as query parameter
      // Attach passed nextPageQueryStringParams values to REST URL
      if (nextPageQueryStringParams) {
        restApi += `${nextPageQueryStringParams}`;
        folderPath = null;
      }

      filesQueryResult = await this._getListDataAsStream(restApi, folderPath, acceptedFilesExtensions);
    } catch (error) {
      filesQueryResult.items = null;
      console.error(error.message);
    }
    return filesQueryResult;
  }


  /**
   * Provides the URL for file preview.
   */
  public getFileThumbnailUrl = (file: IFile, thumbnailWidth: number, thumbnailHeight: number): string => {
    const thumbnailUrl = `${this.mediaBaseUrl}/transform/thumbnail?provider=spo&inputFormat=${file.fileType}&cs=${this.callerStack}&docid=${file.spItemUrl}&${this.driveAccessToken}&width=${thumbnailWidth}&height=${thumbnailHeight}`;
    return thumbnailUrl;
  }


  /**
   * Gets document and media libraries from the site
   */
  public getSiteMediaLibraries = async (includePageLibraries: boolean = false) => {
    try {
      const absoluteUrl = this.context.pageContext.web.absoluteUrl;
      const restApi = `${absoluteUrl}/_api/SP.Web.GetDocumentAndMediaLibraries?webFullUrl='${encodeURIComponent(absoluteUrl)}'&includePageLibraries='${includePageLibraries}'`;
      const mediaLibrariesResult = await this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1);

      if (!mediaLibrariesResult || !mediaLibrariesResult.ok) {
        throw new Error(`Something went wrong when executing request. Status='${mediaLibrariesResult.status}'`);
      }
      const libResults = await mediaLibrariesResult.json();
      if (!libResults || !libResults.value) {
        throw new Error(`Cannot read data from the results.`);
      }

      const result: ILibrary[] = libResults.value.map((libItem) => { return this.parseLibItem(libItem); });
      return result;
    } catch (error) {
      console.error(`[FileBrowserService.getSiteMediaLibraries]: Err='${error.message}'`);
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
      const blob : Blob = await fileDownloadResult.blob();
      return  new File([blob], fileName);
    } catch (err) {
      console.error(`[FileBrowserService.fetchFileContent] Err='${err.message}'`);
      return null;
    }
  }

  /**
   * Executes query to load files with possible extension filtering
   * @param restApi
   * @param folderPath
   * @param acceptedFilesExtensions
   */
  protected _getListDataAsStream = async (restApi: string, folderPath: string, acceptedFilesExtensions?: string[]): Promise<FilesQueryResult> => {
    let filesQueryResult: FilesQueryResult = { items: [], nextHref: null };
    try {
      const body = {
        parameters: {
          AllowMultipleValueFilterForTaxonomyFields: true,
          // ContextInfo (1), ListData (2), ListSchema (4), ViewMetadata (1024), EnableMediaTAUrls (4096), ParentInfo (8192)
          RenderOptions: 1 | 2 | 4 | 1024 | 4096 | 8192,
          ViewXml: this.getFilesCamlQueryViewXml(acceptedFilesExtensions)
        }
      };
      if (folderPath) {
          body.parameters["FolderServerRelativeUrl"] = folderPath;
      }
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
      filesQueryResult.items = null;
      console.error(error.message);
    }
    return filesQueryResult;
  }

  /**
   * Generates CamlQuery files filter.
   * @param accepts
   */
  protected getFileTypeFilter(accepts: string[]) {
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
   */
  protected getFilesCamlQueryViewXml = (accepts: string[]) => {
    const fileFilter: string = this.getFileTypeFilter(accepts);
    let queryCondition = fileFilter && fileFilter != "" ?
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
      </Query>` : "";

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
   */
  protected parseFileItem = (fileItem: any): IFile => {
    const modifiedFriendly: string = fileItem["Modified.FriendlyDisplay"];

    // Get the modified date
    const modifiedParts: string[] = modifiedFriendly!.split('|');
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
      fileSize: fileItem.File_x0020_Size,
      fileType: fileItem.File_x0020_Type,
      modifiedBy: fileItem.Editor![0]!.title,
      isFolder: fileItem.FSObjType === "1",
      absoluteUrl: this.buildAbsoluteUrl(fileItem.FileRef),

      // Required for item thumbnail
      supportsThumbnail: true,
      spItemUrl: fileItem[".spItemUrl"]
    };
    return file;
  }

  protected parseLibItem = (libItem: any): ILibrary => {
    const library: ILibrary = {
      title: libItem.Title,
      absoluteUrl: libItem.AbsoluteUrl,
      serverRelativeUrl: libItem.ServerRelativeUrl
    };

    return library;
  }

  /**
   * Creates an absolute URL
   */
  protected buildAbsoluteUrl = (relativeUrl: string) => {
    const siteUrl: string = GeneralHelper.getAbsoluteDomainUrl(this.context.pageContext.web.absoluteUrl);
    return siteUrl + relativeUrl;
  }

  protected processResponse = (fileResponse: any): void => {
    // Extract media base URL
    this.mediaBaseUrl = fileResponse.ListSchema[".mediaBaseUrl"];
    this.callerStack = fileResponse.ListSchema[".callerStack"];
    this.driveAccessToken = fileResponse.ListSchema[".driveAccessToken"];
  }
}
