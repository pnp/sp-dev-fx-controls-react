import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFilePickerResult } from "./FilePicker.types";

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
   * Content of the file.
   */
  filePickerResult: IFilePickerResult;

  /**
   * Handler when the file has been selected
   */
  onSave:(filePickerResult: IFilePickerResult)=>void;

  /**
   * File extensions to be displayed.
   */
  accepts?: string;

  /**
   * Used to execute WebSearch.
   */
  bingAPIKey?: string;

  webPartContext: WebPartContext;
  /**
   * Specifies if the picker button is disabled
   */
  disabled?: boolean;

  hideRecentTab?: boolean;
  hideWebSearchTab?: boolean;
  hideOrganisationalAssetTab?: boolean;
  hideOneDriveTab?: boolean;
  hideSiteFilesTab?: boolean;
  hideLocalUploadTab?: boolean;
  hideLinkUploadTab?: boolean;

  required?: boolean;
  onChanged: (filePickerResult: IFilePickerResult) => void;
}
