import { IFilePickerResult } from "../FilePicker.types";

export interface IUploadFilePickerTabState {
  filePickerResult: IFilePickerResult;
  filePreview?: string;
}
