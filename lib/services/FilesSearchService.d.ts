import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISearchResult, BingQuerySearchParams, IRecentFile } from "./FilesSearchService.types";
export declare class FilesSearchService {
    private context;
    private bingAPIKey;
    private siteAbsoluteUrl;
    constructor(context: BaseComponentContext, bingAPIKey: string, siteAbsoluteUrl?: string);
    /**
     * Checks if file exists
     */
    checkFileExists: (fileUrl: string) => Promise<boolean>;
    /**
     * Executes Recent files search.
     */
    executeRecentSearch: (accepts?: string[]) => Promise<IRecentFile[] | undefined>;
    /**
     * Executes bing search for a file.
     */
    executeBingSearch: (queryParams: BingQuerySearchParams) => Promise<ISearchResult[]>;
    /**
     * Downloads document content from SP location.
     */
    downloadSPFileContent: (absoluteFileUrl: string, fileName: string) => Promise<File>;
    /**
     * Downloads document content from Remote location.
     */
    downloadBingContent: (absoluteFileUrl: string, fileName: string) => Promise<File>;
    /**
     * Parses Recent Search results.
     */
    private parseRecentSearchResult;
    /**
     * Parses Bing search results.
     */
    private parseBingSearchResult;
    /**
     * Builds a file filter using the accepted file extensions
     */
    private _getFileFilter;
    /**
     * Removes protocol and retrieves only the domain, just like Bing search results does
     * in the SharePoint file picker
     * @param url The display url as provided by Bing
     */
    private getDisplayUrl;
}
//# sourceMappingURL=FilesSearchService.d.ts.map