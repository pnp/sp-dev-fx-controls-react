import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { PageContext } from "@microsoft/sp-page-context";
import { IFolderExplorerService } from "./IFolderExplorerService";
import { IFolder } from "./IFolderExplorerService";
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import { Web } from "@pnp/sp/webs";
import "@pnp/sp/folders";
import { IFolderAddResult } from "@pnp/sp/folders";

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
  public GetFolders = async (webAbsoluteUrl: string, folderRelativeUrl: string): Promise<IFolder[]> => {
    return this._getFolders(webAbsoluteUrl, folderRelativeUrl);
  }

  /**
   * Get folders within a given library or sub folder
   * @param webAbsoluteUrl - the url of the target site
   * @param folderRelativeUrl - the relative url of the folder
   */
  private _getFolders = async (webAbsoluteUrl: string, folderRelativeUrl: string): Promise<IFolder[]> => {
    let results: IFolder[] = [];
    try {
      const web = Web(webAbsoluteUrl);
      folderRelativeUrl = folderRelativeUrl.replace(/\'/ig, "''");
      let foldersResult: IFolder[] = await web.getFolderByServerRelativePath(encodeURIComponent(folderRelativeUrl)).folders.select('Name', 'ServerRelativeUrl').orderBy('Name').get();
      results = foldersResult.filter(f => f.Name != "Forms");
    } catch (error) {
      console.error('Error loading folders', error);
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
      folderRelativeUrl = folderRelativeUrl.replace(/\'/ig, "''");
      let folderAddResult: IFolderAddResult = await web.getFolderByServerRelativePath(encodeURIComponent(folderRelativeUrl)).folders.addUsingPath(encodeURIComponent(name));
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
