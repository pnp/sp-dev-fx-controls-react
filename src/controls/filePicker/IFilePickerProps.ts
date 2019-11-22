import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IFilePickerResult } from "./FilePicker.types";
import { ExtensionContext } from "@microsoft/sp-extension-base";

export interface IFilePickerProps {
  /**
   * Specifies the text describing the file picker
   */
  label?: string;
  /**
   * Specifies the label of the file picker button
   */
  buttonLabel?: string;

  /**
   * Specifies the icon to be used to display Icon Button.
   */
  buttonIcon?: string;

  /**
   * Handler when the file has been selected
   */
  onSave:(filePickerResult: IFilePickerResult)=>void;

  /**
   * Handler when file has been changed.
   */
  onChanged?: (filePickerResult: IFilePickerResult) => void;

  /**
   * Current context.
   */
  context: ExtensionContext |  WebPartContext;

  /**
   * File extensions to be displayed.
   */
  accepts?: string[];

  /**
   * Sets the label to inform that the value is required.
   */
  required?: boolean;

  /**
   * Used to execute WebSearch. If not provided SearchTab will not be available.
   */
  bingAPIKey?: string;

  /**
   * Specifies if the picker button is disabled
   */
  disabled?: boolean;

  /**
   * Number of itmes to obtain when executing REST queries. Default 100.
   */
  itemsCountQueryLimit?: number;

  /**
   * Specifies if RecentTab should be hidden.
   */
  hideRecentTab?: boolean;

  /**
   * Specifies if WebSearchTab should be hidden.
   */
  hideWebSearchTab?: boolean;

  /**
   * Specifies if OrganisationalAssetTab should be hidden.
   */
  hideOrganisationalAssetTab?: boolean;

  /**
   * Specifies if OneDriveTab should be hidden.
   */
  hideOneDriveTab?: boolean;

  /**
   * Specifies if SiteFilesTab should be hidden.
   */
  hideSiteFilesTab?: boolean;

  /**
   * Specifies if LocalUploadTab should be hidden.
   */
  hideLocalUploadTab?: boolean;

  /**
   * Specifies if LinkUploadTab should be hidden.
   */
  hideLinkUploadTab?: boolean;
}
