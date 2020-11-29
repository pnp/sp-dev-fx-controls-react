import { IFilePickerTab, IFilePickerResult } from "../FilePicker.types";
import { FilesSearchService } from "../../../services/FilesSearchService";

export interface ILinkFilePickerTabProps extends IFilePickerTab {
  allowExternalTenantLinks: boolean;
  fileSearchService: FilesSearchService;
  renderCustomLinkTabContent: (filePickerResult: IFilePickerResult) => JSX.Element | null;
}
