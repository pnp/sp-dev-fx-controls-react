export interface IFilePickerResult {
    /**
     * Selected file name with extension.
     */
    fileName: string;
    /**
     * Selected file name without extension.
     */
    fileNameWithoutExtension: string;
    /**
     * Absolute file URL. Undefined in case of file upload.
     */
    fileAbsoluteUrl: string;
  
    /**
     * Size of a selected file (in bytes). Undefined in all cases but file upload
     */
    fileSize?: number;
  
    /**
     * Absolute not modified file SharePoint URL.
     */
    spItemUrl?: string;
  
    /**
     * Downloads file picker result content.
     */
    downloadFileContent: () => Promise<File>;
  
    /**
     * Preview
     */
    previewDataUrl?: string;
  }
  