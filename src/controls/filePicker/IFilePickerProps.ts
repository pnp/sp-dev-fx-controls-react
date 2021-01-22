import { IIconProps } from "office-ui-fabric-react";

import { ExtensionContext } from "@microsoft/sp-extension-base";
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
  buttonLabel?: string;

  /**
   * Specifies the icon to be used to display Icon Button.
   */
  buttonIcon?: string;
 /**
   * Specifies props for icon to be used to display Icon Button.
   */
  buttonIconProps?: IIconProps;


  /**
   * Handler when the file has been selected
   */
  onSave:(filePickerResult: IFilePickerResult)=>void;

  /**
   * Handler when file has been changed.
   */
  onChange?: (filePickerResult: IFilePickerResult) => void;

  /**
   * Current context.
   */
  context: ExtensionContext |  WebPartContext;

  /**
   * ClassName to be applied to the opener button element.
   */
  buttonClassName?: string;

  /**
   * ClassName to be applied to the Panel root element.
   */
  panelClassName?: string;

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
   * Specifies if StockImagesTab should be hidden.
   */
  hideStockImages?: boolean;

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

  /**
   * Specifies if last active tab will be stored after the Upload panel has been closed.
   * Note: the value of selected tab is stored in the queryString hash.
   * @default true
   */
  storeLastActiveTab?: boolean;
  /**
   * Specifies if the file picker panel is open by default or not
   */
  isPanelOpen?: boolean;
  /**
   * Handler when file picker has been cancelled.
   */
  onCancel?: () => void;
  /**
   * Optional additional renderer for Link tab
   */
  renderCustomLinkTabContent?: (filePickerResult: IFilePickerResult) => JSX.Element | null;
  /**
   * Optional additional renderer for Upload tab
   */
  renderCustomUploadTabContent?: (filePickerResult: IFilePickerResult) => JSX.Element | null;
}
