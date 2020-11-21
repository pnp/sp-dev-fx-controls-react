import { IFilePickerTab } from "../FilePicker.types";
import { ISearchSuggestion } from "./WebSearchTab.types";
import { FilesSearchService } from "../../../services/FilesSearchService";

export interface IWebSearchTabProps extends IFilePickerTab {
  bingSearchService: FilesSearchService;
  suggestions?: ISearchSuggestion[];
}
