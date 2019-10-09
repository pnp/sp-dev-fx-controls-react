import { IDimensions } from "../../../../services/IOneDriveService";
import { IFile } from "../../../../services/FileBrowserService.types";

export interface IFolderTileProps {
  item: IFile;
  index: number;
  isSelected: boolean;
  pageWidth: number;
  onItemInvoked: (item: IFile) => void;
  tileDimensions: IDimensions;
}
