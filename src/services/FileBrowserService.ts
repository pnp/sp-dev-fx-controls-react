import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFile } from "./FileBrowserService.types";
import { SPHttpClient } from "@microsoft/sp-http";
import { GeneralHelper } from "..";

export class FileBrowserService {
  protected context: WebPartContext;

  constructor(context: WebPartContext) {
    this.context = context;
  }

  public async getListItems(libraryName: string, folderPath: string, acceptedFilesExtensionsList?: string) {
    let fileItems: IFile[] = [];
    try {
      const restApi = `${this.context.pageContext.web.absoluteUrl}/_api/web/lists/GetByTitle('${libraryName}')/RenderListDataAsStream`;
      return this._getListDataAsStream(restApi, folderPath, acceptedFilesExtensionsList);
    } catch (error) {
      fileItems = null;
      console.error(error.message);
    }
    return fileItems;
  }

  protected _getListDataAsStream = async (restApi: string, folderPath: string, acceptedFilesExtensionsList?: string): Promise<IFile[]> => {
    let fileItems: IFile[] = [];
    try {
      const data = await this.context.spHttpClient.post(restApi, SPHttpClient.configurations.v1, {
        body: JSON.stringify({
          parameters: {
            AllowMultipleValueFilterForTaxonomyFields: true,
            FolderServerRelativeUrl: folderPath,
            // ContextInfo (1), ListData (2), ListSchema (4), ViewMetadata (1024), EnableMediaTAUrls (4096), ParentInfo (8192)
            RenderOptions: 1 | 2 | 4 | 1024 | 4096 | 8192,
            ViewXml: this.getFilesCamlQueryViewXml(acceptedFilesExtensionsList)
          }
        })
      });

      if (!data || !data.ok) {
        throw new Error(`[FileBrowser._getListItems]: Something went wrong when executing request. Status='${data.statusText}'`);
      }
      const filesResult = await data.json();
      if (!filesResult || !filesResult.ListData || !filesResult.ListData.Row) {
        throw new Error(`[FileBrowser._getListItems]: No data is available. Status='${data.statusText}'`);
      }
      fileItems = filesResult.ListData.Row.map(fileItem => this._parseFileItem(fileItem));
    } catch (error) {
      fileItems = null;
      console.error(error.message);
    }
    return fileItems;
  }

  protected getFileTypeFilter(accepts: string) {
    let fileFilter: string = "";

    if (accepts && accepts != "") {
      fileFilter = "<Values>";
      accepts.split(",").forEach((fileType: string, index: number) => {
        fileType = fileType.replace(".", "");
        if (index >= 0) {
          fileFilter = fileFilter + `<Value Type="Text">${fileType}</Value>`;
        }
      });
      fileFilter = fileFilter + "</Values>";
    }

    return fileFilter;
  }

  protected getFilesCamlQueryViewXml = (accepts: string) => {
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
    // TODO: Support more than 100 files
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
                      <RowLimit Paged="TRUE">100</RowLimit>
                    </View>`;

    return viewXml;
  }

  protected _parseFileItem = (fileItem: any): IFile => {
    const modifiedFriendly: string = fileItem["Modified.FriendlyDisplay"];

    // Get the modified date
    const modifiedParts: string[] = modifiedFriendly!.split('|');
    let modified: string = fileItem.Modified;

    // If there is a friendly modified date, use that
    if (modifiedParts.length === 2) {
      modified = modifiedParts[1];
    }

    const file: IFile = {
      fileLeafRef: fileItem.FileLeafRef,
      docIcon: fileItem.DocIcon,
      fileRef: fileItem.FileRef,
      modified: modified,
      fileSize: fileItem.File_x0020_Size,
      fileType: fileItem.File_x0020_Type,
      modifiedBy: fileItem.Editor![0]!.title,
      isFolder: fileItem.FSObjType === "1",
      absoluteRef: this._buildAbsoluteUrl(fileItem.FileRef)
    };
    return file;
  }

  /**
   * Creates an absolute URL
   */
  protected _buildAbsoluteUrl = (relativeUrl: string) => {
    const siteUrl: string = GeneralHelper.getAbsoluteDomainUrl(this.context.pageContext.web.absoluteUrl);
    return siteUrl + relativeUrl;
  }
}
