export interface IImageFile {
     fileName: string;
     fileSize: number;
    fileType: string;
     downLoadFileContent: () => Promise<string>;
     url: string;
}