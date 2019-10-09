import { IFilePickerTab } from "..";
import { FilesSearchService } from "../../../services/FilesSearchService";

export interface IRecentFilesTabProps extends IFilePickerTab {
  fileSearchService: FilesSearchService;
}
