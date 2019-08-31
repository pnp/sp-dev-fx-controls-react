import { IFilePickerTab } from "..";
import { FileBrowserService } from "../../../services/FileBrowserService";

export interface ISiteFilePickerTabProps extends IFilePickerTab {
  fileBrowserService: FileBrowserService;
}
