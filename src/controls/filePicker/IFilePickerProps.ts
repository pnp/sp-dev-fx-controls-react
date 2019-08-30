import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface IFilePickerProps {
  /**
   * Specifies the text describing the file picker
   */
  label?: string;
  /**
   * Specifies the label of the file picker button
   */
  buttonLabel: string;

  /**
   * Content of the file. TODO: change to bytes?
   */
  value: string;

  /**
   * Handler when the file has been selected
   */
  onSave:(value:string)=>void;

  /**
   * File extensions to be displayed. TODO: Change to string[] ?
   */
  accepts?: string;

  webPartContext: WebPartContext;
  /**
   * Specifies if the picker button is disabled
   */
  disabled?: boolean;

  disableLocalUpload?: boolean;
  disableWebSearchTab?: boolean;
  disableCentralAssetRepo?: boolean; // not supported yet
  hasMySiteTab?: boolean;
  required?: boolean;
  onChanged: (value: string) => void;
}
