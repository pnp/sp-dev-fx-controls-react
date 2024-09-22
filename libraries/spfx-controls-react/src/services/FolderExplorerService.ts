import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { IFolderExplorerService } from "./IFolderExplorerService";
import { IFolder } from "./IFolderExplorerService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/lists";
import { IFolderAddResult } from "@pnp/sp/folders";
import { IFileInfo } from "@pnp/sp/files";

export class FolderExplorerService implements IFolderExplorerService {

  public static readonly serviceKey: ServiceKey<IFolderExplorerService> = ServiceKey.create<IFolderExplorerService>('SPFx:SPService', FolderExplorerService);

  constructor(serviceScope: ServiceScope) {

    serviceScope.whenFinished(() => {

      const pageContext = serviceScope.consume(PageContext.serviceKey);
      sp.setup({
        sp: {
          baseUrl: pageContext.web.absoluteUrl
        }
      });
    });
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
      const web = Web(webAbsoluteUrl);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const libraries: any[] = await web.lists.filter('BaseTemplate eq 101 and Hidden eq false').expand('RootFolder').select('Title', 'RootFolder/ServerRelativeUrl').orderBy('Title').get();

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
      const web = Web(webAbsoluteUrl);
      //folderRelativeUrl = folderRelativeUrl.replace(/'/ig, "''");
      const foldersResult: IFolder[] = await web.getFolderByServerRelativePath(folderRelativeUrl).folders.select('Name', 'ServerRelativeUrl').orderBy(orderby, orderAscending).get();
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
      const web = Web(webAbsoluteUrl);
      folderRelativeUrl = folderRelativeUrl.replace(/'/ig, "''");
      const filesResult = await web.getFolderByServerRelativePath(folderRelativeUrl).files.select('Name', 'ServerRelativeUrl', 'UniqueId', 'Length').orderBy(orderby, orderAscending).get();
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
      const web = Web(webAbsoluteUrl);
      folderRelativeUrl = folderRelativeUrl.replace(/'/ig, "''");
      const folderAddResult: IFolderAddResult = await web.getFolderByServerRelativePath(folderRelativeUrl).folders.addUsingPath(name);
      if (folderAddResult && folderAddResult.data) {
        folder = {
          Name: folderAddResult.data.Name,
          ServerRelativeUrl: folderAddResult.data.ServerRelativeUrl
        };
      }
    } catch (error) {
      console.error('Error adding folder', error);
    }
    return folder;
  }

}
