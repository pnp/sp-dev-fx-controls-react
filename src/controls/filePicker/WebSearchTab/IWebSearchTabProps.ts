import { IFilePickerTab } from "..";
import { ISearchSuggestion } from ".";

export interface IWebSearchTabProps extends IFilePickerTab {
  bingAPIKey: string;
  suggestions?: ISearchSuggestion[];
}
