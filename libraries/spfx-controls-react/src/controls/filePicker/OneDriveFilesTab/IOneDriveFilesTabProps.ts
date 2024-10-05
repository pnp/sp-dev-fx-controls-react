import { IFilePickerTab } from "../FilePicker.types";
import { OneDriveService } from "../../../services/OneDriveService";

export interface IOneDriveFilesTabProps extends IFilePickerTab {
  oneDriveService: OneDriveService;
}
