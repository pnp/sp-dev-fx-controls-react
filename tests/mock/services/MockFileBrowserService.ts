import { FilesQueryResult, IFile, ILibrary } from "../../../src/services/FileBrowserService.types";

export class MockFileBrowserService {
    public getListItemsResult: FilesQueryResult;
    public getFileThumbnailUrlResultMap: Map<string, string> = new Map<string, string>();
    public getSiteMediaLibrariesResult: ILibrary[] = [];
    constructor() {

    }
    public getListItems = (listUrl: string, folderPath: string, acceptedFilesExtensions?: string[], nextPageQueryStringParams?: string): Promise<FilesQueryResult> => {
        return Promise.resolve(this.getListItemsResult);
    }
    public getFileThumbnailUrl = (file: IFile, thumbnailWidth: number, thumbnailHeight: number): string => {
        return this.getFileThumbnailUrlResultMap.get(file.name);
    }
    public getSiteMediaLibraries = (includePageLibraries: boolean = false) => {
        return Promise.resolve(this.getSiteMediaLibrariesResult);
    }
    public downloadSPFileContent = (absoluteFileUrl: string, fileName: string): Promise<File> => {
        return Promise.resolve(new File([], "test.file"));
    }
}