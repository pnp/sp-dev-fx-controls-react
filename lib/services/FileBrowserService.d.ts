import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IFile, FilesQueryResult, ILibrary } from "./FileBrowserService.types";
/**
 * File Browser Service
 */
export declare class FileBrowserService {
    protected itemsToDownloadCount: number;
    protected context: BaseComponentContext;
    protected siteAbsoluteUrl: string;
    protected driveAccessToken: string;
    protected mediaBaseUrl: string;
    protected callerStack: string;
    /**
     * Constructor
     * @param context Component context
     * @param itemsToDownloadCount Number of items to download
     * @param siteAbsoluteUrl Site absolute URL
     */
    constructor(context: BaseComponentContext, itemsToDownloadCount?: number, siteAbsoluteUrl?: string);
    /**
     * Gets files from current sites library
     * @param listUrl web-relative url of the list
     * @param folderPath Folder path to get items from
     * @param acceptedFilesExtensions File extensions to filter the results
     * @param nextPageQueryStringParams Query string parameters to get the next page of results
     * @param sortBy Field to sort by
     * @param isDesc Sort in descending order
     */
    getListItems: (listUrl: string, folderPath: string, acceptedFilesExtensions?: string[], nextPageQueryStringParams?: string, sortBy?: string, isDesc?: boolean) => Promise<FilesQueryResult>;
    /**
     * Provides the URL for file preview.
     * @param file File to get thumbnail URL
     * @param thumbnailWidth Thumbnail width
     * @param thumbnailHeight Thumbnail height
     * @returns Thumbnail URL with the specified dimensions
     */
    getFileThumbnailUrl: (file: IFile, thumbnailWidth: number, thumbnailHeight: number) => string;
    /**
     * Gets document and media libraries from the site
     * @param includePageLibraries Include page libraries (default `false`)
     * @returns Media libraries information
     */
    getSiteMediaLibraries: (includePageLibraries?: boolean) => Promise<ILibrary[] | undefined>;
    /**
     * Gets document and media libraries from the site
     * @param internalName Internal name of the library
     * @returns Library name
     */
    getLibraryNameByInternalName: (internalName: string) => Promise<string>;
    /**
     * Downloads document content from SP location.
     * @param absoluteFileUrl Absolute URL of the file
     * @param fileName Name of the file
     * @returns File content
     */
    downloadSPFileContent: (absoluteFileUrl: string, fileName: string) => Promise<File>;
    /**
     * Maps IFile property name to SharePoint item field name
     * @param filePropertyName File Property
     * @returns SharePoint Field Name
     */
    getSPFieldNameForFileProperty(filePropertyName: string): string;
    /**
     * Gets the Title and Id of the current Web
     * @returns SharePoint Site Title and Id
     */
    getSiteTitleAndId: () => Promise<{
        title: string;
        id: string;
    }>;
    /**
     * Executes query to load files with possible extension filtering
     * @param restApi REST API URL
     * @param folderPath Folder path to get items from
     * @param acceptedFilesExtensions File extensions to filter the results
     * @param sortBy Field to sort by
     * @param isDesc Sort in descending order
     * @returns Files query result
     */
    protected _getListDataAsStream: (restApi: string, folderPath: string, acceptedFilesExtensions?: string[], sortBy?: string, isDesc?: boolean) => Promise<FilesQueryResult>;
    /**
     * Generates CamlQuery files filter.
     * @param accepts File extensions to filter the results
     * @returns CamlQuery filter
     */
    protected getFileTypeFilter(accepts: string[]): string;
    /**
     * Generates Files CamlQuery ViewXml
     * @param accepts File extensions to filter the results
     * @param sortBy Field to sort by
     * @param isDesc Sort in descending order
     * @returns CamlQuery ViewXml
     */
    protected getFilesCamlQueryViewXml: (accepts: string[], sortBy: string, isDesc: boolean) => string;
    /**
     * Converts REST call results to IFile
     * @param fileItem File item from REST call
     * @returns File information
     */
    protected parseFileItem: (fileItem: any) => IFile;
    /**
     * Converts REST call results to ILibrary
     * @param libItem Library item from REST call
     * @param webUrl Web URL
     * @returns Library information
     */
    protected parseLibItem: (libItem: any, webUrl: string) => ILibrary;
    /**
     * Creates an absolute URL
     * @param relativeUrl Relative URL
     * @returns Absolute URL
     */
    protected buildAbsoluteUrl: (relativeUrl: string) => string;
    /**
     * Processes the response from the REST call to get additional information for the requested file
     * @param fileResponse REST call response
     */
    protected processResponse: (fileResponse: any) => void;
}
//# sourceMappingURL=FileBrowserService.d.ts.map