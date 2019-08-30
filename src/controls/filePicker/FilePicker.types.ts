import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFilePickerTab {
  context: WebPartContext;
  accepts: string;
  onSave: (value: string) => void;
  onClose: () => void;
}
