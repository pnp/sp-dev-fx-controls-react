import { IFilePickerTab, IFilePickerResult } from "../FilePicker.types";
import { FilesSearchService } from "../../../services/FilesSearchService";

export interface ILinkFilePickerTabProps extends IFilePickerTab {
  allowExternalLinks: boolean;
  checkIfFileExists: boolean;
  fileSearchService: FilesSearchService;
  renderCustomLinkTabContent: (filePickerResult: IFilePickerResult) => JSX.Element | undefined;
}
