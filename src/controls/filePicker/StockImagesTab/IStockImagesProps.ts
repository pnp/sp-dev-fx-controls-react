import { IFilePickerTab } from "../FilePicker.types";
import { FilesSearchService } from "../../../services/FilesSearchService";

export interface IStockImagesProps extends IFilePickerTab {
  language: string;
  fileSearchService: FilesSearchService;
}
