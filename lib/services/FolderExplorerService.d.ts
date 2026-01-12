import { ServiceKey, ServiceScope } from "@microsoft/sp-core-library";
import { IFolderExplorerService } from "./IFolderExplorerService";
import { IFolder } from "./IFolderExplorerService";
import "@pnp/sp/webs";
import "@pnp/sp/folders";
import "@pnp/sp/files";
import "@pnp/sp/lists";
import { IFileInfo } from "@pnp/sp/files";
export declare class FolderExplorerService implements IFolderExplorerService {
    static readonly serviceKey: ServiceKey<IFolderExplorerService>;
    constructor(serviceScope: ServiceScope);
    /**
     * Get libraries within a given site
     * @param webAbsoluteUrl - the url of the target site
     */
    GetDocumentLibraries: (webAbsoluteUrl: string) => Promise<IFolder[]>;
    /**
     * Get libraries within a given site
     * @param webAbsoluteUrl - the url of the target site
     */
    private _getDocumentLibraries;
    /**
   * Get folders within a given library or sub folder
   * @param webAbsoluteUrl - the url of the target site
   * @param folderRelativeUrl - the relative url of the folder
   */
    GetFolders: (webAbsoluteUrl: string, folderRelativeUrl: string, orderby: string, orderAscending: boolean) => Promise<IFolder[]>;
    /**
   * Get files within a given library or sub folder
   * @param webAbsoluteUrl - the url of the target site
   * @param folderRelativeUrl - the relative url of the folder
   */
    GetFiles: (webAbsoluteUrl: string, folderRelativeUrl: string, orderby: string, orderAscending: boolean) => Promise<IFileInfo[]>;
    /**
     * Get folders within a given library or sub folder
     * @param webAbsoluteUrl - the url of the target site
     * @param folderRelativeUrl - the relative url of the folder
     */
    private _getFolders;
    /**
     * Get files within a given library or sub folder
     * @param webAbsoluteUrl - the url of the target site
     * @param folderRelativeUrl - the relative url of the folder
     */
    private _getFiles;
    /**
     * Create a new folder
     * @param webAbsoluteUrl - the url of the target site
     * @param folderRelativeUrl - the relative url of the base folder
     * @param name - the name of the folder to be created
     */
    AddFolder: (webAbsoluteUrl: string, folderRelativeUrl: string, name: string) => Promise<IFolder>;
    /**
   * Create a new folder
   * @param webAbsoluteUrl - the url of the target site
   * @param folderRelativeUrl - the relative url of the base folder
   * @param name - the name of the folder to be created
   */
    private _addFolder;
}
//# sourceMappingURL=FolderExplorerService.d.ts.map