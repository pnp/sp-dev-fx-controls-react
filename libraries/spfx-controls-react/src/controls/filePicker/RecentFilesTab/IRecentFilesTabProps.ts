import { IFilePickerTab } from "../FilePicker.types";
import { FilesSearchService } from "../../../services/FilesSearchService";

export interface IRecentFilesTabProps extends IFilePickerTab {
  fileSearchService: FilesSearchService;
}
