import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
import { IFolderExplorerService } from "./IFolderExplorerService";
import { IFolder } from "./IFolderExplorerService";
import { IFileInfo } from "../common/SPRestTypes";
import { SPRestClient } from "./SPRestClient";

export class FolderExplorerService implements IFolderExplorerService {

  public static readonly serviceKey: ServiceKey<IFolderExplorerService> = ServiceKey.create<IFolderExplorerService>('SPFx:SPService', FolderExplorerService);
  private readonly _ready: Promise<{ spHttpClient: SPHttpClient; webAbsoluteUrl: string }>;

  constructor(serviceScope: ServiceScope) {
    this._ready = new Promise((resolve, reject) => {
      serviceScope.whenFinished(() => {
        try {
          const pageContext = serviceScope.consume(PageContext.serviceKey);
          const spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
          resolve({ spHttpClient, webAbsoluteUrl: pageContext.web.absoluteUrl });
        } catch (error) {
          reject(error);
        }
      });
    });
  }

  private async _getClient(webAbsoluteUrl: string): Promise<SPRestClient> {
    const context = await this._ready;
    return new SPRestClient(context.spHttpClient, webAbsoluteUrl || context.webAbsoluteUrl);
  }

  private _encodePath(value: string): string {
    return encodeURIComponent(value.replace(/'/g, "''")).replace(/'/g, "%27");
  }

  /**
   * Get libraries within a given site
   * @param webAbsoluteUrl - the url of the target site
   */
  public GetDocumentLibraries = async (webAbsoluteUrl: string): Promise<IFolder[]> => {
    return this._getDocumentLibraries(webAbsoluteUrl);
  }

  /**
   * Get libraries within a given site
   * @param webAbsoluteUrl - the url of the target site
   */
  private _getDocumentLibraries = async (webAbsoluteUrl: string): Promise<IFolder[]> => {
    let results: IFolder[] = [];
    try {
      const client = await this._getClient(webAbsoluteUrl);
      const libraries = await client.get<{ Title: string; RootFolder: { ServerRelativeUrl: string } }[]>(
        "_api/web/lists?$filter=BaseTemplate%20eq%20101%20and%20Hidden%20eq%20false&$expand=RootFolder&$select=Title,RootFolder/ServerRelativeUrl&$orderby=Title%20asc"
      );

      results = libraries.map((library): IFolder => {
        return { Name: library.Title, ServerRelativeUrl: library.RootFolder.ServerRelativeUrl };
      });
    } catch (error) {
      console.error('Error loading folders', error);
    }
    return results;

  }

  /**
 * Get folders within a given library or sub folder
 * @param webAbsoluteUrl - the url of the target site
 * @param folderRelativeUrl - the relative url of the folder
 */
  public GetFolders = async (webAbsoluteUrl: string, folderRelativeUrl: string, orderby: string, orderAscending: boolean): Promise<IFolder[]> => {
    return this._getFolders(webAbsoluteUrl, folderRelativeUrl, orderby, orderAscending);
  }

  /**
 * Get files within a given library or sub folder
 * @param webAbsoluteUrl - the url of the target site
 * @param folderRelativeUrl - the relative url of the folder
 */
  public GetFiles = async (webAbsoluteUrl: string, folderRelativeUrl: string, orderby: string, orderAscending: boolean): Promise<IFileInfo[]> => {
    return this._getFiles(webAbsoluteUrl, folderRelativeUrl, orderby, orderAscending);
  }

  /**
   * Get folders within a given library or sub folder
   * @param webAbsoluteUrl - the url of the target site
   * @param folderRelativeUrl - the relative url of the folder
   */
  private _getFolders = async (webAbsoluteUrl: string, folderRelativeUrl: string, orderby: string, orderAscending: boolean): Promise<IFolder[]> => {
    let results: IFolder[] = [];
    try {
      const client = await this._getClient(webAbsoluteUrl);
      const foldersResult = await client.get<IFolder[]>(
        `_api/web/getFolderByServerRelativePath(decodedUrl='${this._encodePath(folderRelativeUrl)}')/folders?$select=Name,ServerRelativeUrl&$orderby=${encodeURIComponent(orderby)}%20${orderAscending ? "asc" : "desc"}`
      );
      results = foldersResult.filter(f => f.Name !== "Forms");
    } catch (error) {
      console.error('Error loading folders', error);
    }
    return results;
  }

  /**
   * Get files within a given library or sub folder
   * @param webAbsoluteUrl - the url of the target site
   * @param folderRelativeUrl - the relative url of the folder
   */
  private _getFiles = async (webAbsoluteUrl: string, folderRelativeUrl: string, orderby: string, orderAscending: boolean): Promise<IFileInfo[]> => {
    let results: IFileInfo[] = [];
    try {
      const client = await this._getClient(webAbsoluteUrl);
      const filesResult = await client.get<IFileInfo[]>(
        `_api/web/getFolderByServerRelativePath(decodedUrl='${this._encodePath(folderRelativeUrl)}')/files?$select=Name,ServerRelativeUrl,UniqueId,Length&$orderby=${encodeURIComponent(orderby)}%20${orderAscending ? "asc" : "desc"}`
      );
      results = filesResult;
    } catch (error) {
      console.error('Error loading files', error);
    }
    return results;
  }

  /**
   * Create a new folder
   * @param webAbsoluteUrl - the url of the target site
   * @param folderRelativeUrl - the relative url of the base folder
   * @param name - the name of the folder to be created
   */
  public AddFolder = async (webAbsoluteUrl: string, folderRelativeUrl: string, name: string): Promise<IFolder> => {
    return this._addFolder(webAbsoluteUrl, folderRelativeUrl, name);
  }

  /**
 * Create a new folder
 * @param webAbsoluteUrl - the url of the target site
 * @param folderRelativeUrl - the relative url of the base folder
 * @param name - the name of the folder to be created
 */
  private _addFolder = async (webAbsoluteUrl: string, folderRelativeUrl: string, name: string): Promise<IFolder> => {
    let folder: IFolder = null;
    try {
      const client = await this._getClient(webAbsoluteUrl);
      const folderAddResult = await client.post<IFolder>(
        `_api/web/getFolderByServerRelativePath(decodedUrl='${this._encodePath(folderRelativeUrl)}')/folders/addUsingPath(decodedUrl='${this._encodePath(name)}')`
      );
      if (folderAddResult) {
        folder = {
          Name: folderAddResult.Name,
          ServerRelativeUrl: folderAddResult.ServerRelativeUrl
        };
      }
    } catch (error) {
      console.error('Error adding folder', error);
    }
    return folder;
  }

}
