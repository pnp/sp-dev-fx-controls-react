import { OneDriveFilesBreadcrumbItem } from "./OneDriveFilesTab.types";

export interface IOneDriveFilesTabState {
  fileUrl?: string;
  libraryAbsolutePath: string;
  libraryTitle: string;
  folderPath: string;
  folderName: string;

  breadcrumbItems: OneDriveFilesBreadcrumbItem[];
}
