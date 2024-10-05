import { IFilePickerResult } from "../FilePicker.types";

export interface IMultipleUploadFilePickerTabState {
  filePickerResult: IFilePickerResult[];
  filePreview?: string;
}
