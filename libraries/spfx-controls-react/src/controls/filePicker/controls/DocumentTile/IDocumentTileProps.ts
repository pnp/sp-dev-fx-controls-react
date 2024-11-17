import { IDimensions } from "../../../../services/IOneDriveService";
import { IFile } from "../../../../services/FileBrowserService.types";
import { FileBrowserService } from "../../../../services/FileBrowserService";

export interface IDocumentTileProps {
  fileBroserService: FileBrowserService;
  item: IFile;
  index: number;
  isSelected: boolean;
  pageWidth: number;
  tileDimensions: IDimensions;
  onItemInvoked: (item: IFile) => void;
}
