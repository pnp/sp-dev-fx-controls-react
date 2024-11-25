export interface IUploadFileResult {
  '@odata.context': string;
  '@content.downloadUrl': string;
  '@deprecated.Decorator': string;
  createdBy: CreatedBy;
  createdDateTime: string;
  eTag: string;
  id: string;
  lastModifiedBy: CreatedBy;
  lastModifiedDateTime: string;
  name: string;
  parentReference: ParentReference;
  webUrl: string;
  cTag: string;
  file: File;
  fileSystemInfo: FileSystemInfo;
  image: Image;
  photo: Image;
  size: number;
}

interface Image {
}

interface FileSystemInfo {
  createdDateTime: string;
  lastModifiedDateTime: string;
}

interface File {
  hashes: Hashes;
  irmEffectivelyEnabled: boolean;
  irmEnabled: boolean;
  mimeType: string;
}

interface Hashes {
  quickXorHash: string;
}

interface ParentReference {
  driveType: string;
  driveId: string;
  id: string;
  name: string;
  path: string;
  siteId: string;
}

interface CreatedBy {
  application: Application;
  user: User;
}

interface User {
  email: string;
  id: string;
  displayName: string;
}

interface Application {
  id: string;
  displayName: string;
}