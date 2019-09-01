export interface IFile {
  docIcon: string;
  fileRef: string;
  fileLeafRef: string;
  modifiedBy?: string;
  modified: string;
  fileType?: string;
  fileSize?: number;
  isFolder: boolean;
  absoluteRef: string;
}

export interface FilesQueryResult {
  nextHref: string;
  items: IFile[];
}
