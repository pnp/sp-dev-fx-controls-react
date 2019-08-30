import { IOneDriveFile } from "..";
import { IDimensions } from "../../../../services/IOneDriveService";

export interface IFolderTileProps {
  item: IOneDriveFile;
  index: number;
  isSelected: boolean;
  pageWidth: number;
  onItemInvoked: (item: IOneDriveFile) => void;
  tileDimensions: IDimensions;
}
