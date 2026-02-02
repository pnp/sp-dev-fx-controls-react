import { FileBrowserService } from "./FileBrowserService";
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ILibrary, FilesQueryResult } from "./FileBrowserService.types";
/**
 * OrgAssetsService class
 */
export declare class OrgAssetsService extends FileBrowserService {
    private _orgAssetsLibraryServerRelativeSiteUrl;
    private get orgAssetsLibraryServerRelativeSiteUrl();
    private set orgAssetsLibraryServerRelativeSiteUrl(value);
    /**
     * Constructor
     * @param context Component context
     * @param itemsToDownloadCount Items to download count
     */
    constructor(context: BaseComponentContext, itemsToDownloadCount?: number);
    /**
     * Gets files from current sites library
     * @param _listUrl Unused parameter (not used in this implementation)
     * @param folderPath Folder path to get items from
     * @param acceptedFilesExtensions File extensions to filter the results
     * @param nextPageQueryStringParams Query string parameters to get the next page of results
     * @returns Items in the specified folder
     */
    getListItems: (_listUrl: string, folderPath: string, acceptedFilesExtensions?: string[], nextPageQueryStringParams?: string) => Promise<FilesQueryResult>;
    /**
     * Gets document and media libraries from the site
     * @param includePageLibraries Unused parameter (not used in this implementation)
     * @returns Document and media libraries from the site
     */
    getSiteMediaLibraries: (includePageLibraries?: boolean) => Promise<ILibrary[]>;
    /**
     * Parses the organisation assets library item
     * @param libItem Library item to parse
     * @returns Organisation assets library
     */
    private _parseOrgAssetsLibraryItem;
}
//# sourceMappingURL=OrgAssetsService.d.ts.map