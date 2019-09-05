import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFilePickerTab {
  context: WebPartContext;
  accepts: string;
  onSave: (value: IFilePickerResult) => void;
  onClose: () => void;
}

export interface IFilePickerResult {
  fileTitle: string;
  fileAbsoluteUrl: string;
  file: File;
}
