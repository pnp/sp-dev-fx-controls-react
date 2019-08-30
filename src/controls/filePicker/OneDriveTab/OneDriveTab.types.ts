import { IDimensions } from "../../../services/IOneDriveService";

export interface IOneDriveFile {
  name: string;
  absoluteUrl: string;
  serverRelativeUrl: string;
  isFolder: boolean;
  modified: string;
  modifiedBy: string;
  fileType: string;
  fileIcon: string;
  fileSizeDisplay: string;
  totalFileCount: number;
  key: string;
  thumbnail: string;
  dimensions?: IDimensions;
  isShared: boolean;
}

export type ViewType = 'list' | 'compact' | 'tiles';
