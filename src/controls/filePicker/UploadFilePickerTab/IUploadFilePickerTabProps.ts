import { IFilePickerResult, IFilePickerTab } from "../FilePicker.types";

export interface IUploadFilePickerTabProps extends IFilePickerTab {
  onChange: (value: IFilePickerResult) => void;
}
