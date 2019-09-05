import { IRecentFile } from ".";
import { IFilePickerResult } from "../FilePicker.types";

export interface IRecentFilesTabState {
  results: IRecentFile[];
  isLoading: boolean;
  filePickerResult: IFilePickerResult;
}
