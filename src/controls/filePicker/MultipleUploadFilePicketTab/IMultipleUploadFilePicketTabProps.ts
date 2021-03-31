import { IFilePickerResult, IFilePickerTab } from "../FilePicker.types";

export interface IMultipleUploadFilePicketTabProps extends IFilePickerTab {
  onChange: (value: IFilePickerResult) => void;
  renderCustomMultipleUploadTabContent: (filePickerResult: IFilePickerResult) => JSX.Element | null;
}
