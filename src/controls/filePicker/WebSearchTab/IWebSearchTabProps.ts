import { IFilePickerTab } from "..";
import { ISearchSuggestion } from ".";

export interface IWebSearchTabProps extends IFilePickerTab {
  suggestions?: ISearchSuggestion[];
}
