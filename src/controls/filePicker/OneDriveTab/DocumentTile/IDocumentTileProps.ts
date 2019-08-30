import { IDimensions } from "../../../../services/IOneDriveService";
import { IOneDriveFile } from "..";

export interface IDocumentTileProps {
  item: IOneDriveFile;
  index: number;
  isSelected: boolean;
  pageWidth: number;
  tileDimensions: IDimensions;
  onItemInvoked: (item: IOneDriveFile) => void;
}
