import { IOneDriveFile, ViewType } from ".";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IParentFolderInfo } from "../../../services/IOneDriveService";

export interface IOneDriveTabState {
  isLoading: boolean;
  files: IOneDriveFile[];
  fileUrl?: string;
  serverRelativeFolderUrl?: string;
  folderName?: string;
  hideDialog: boolean;
  parentFolderInfo: IParentFolderInfo[];
  selectedView: ViewType;
  columns: IColumn[];
}
