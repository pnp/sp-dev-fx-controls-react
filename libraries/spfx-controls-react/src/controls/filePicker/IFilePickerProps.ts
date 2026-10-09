import { IIconProps } from "@fluentui/react/lib/Icon";

import { BaseComponentContext } from '@microsoft/sp-component-base';

import { IFilePickerResult } from "./FilePicker.types";
import { FilePickerTab } from "./FilePickerTab";

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
  onSave: (filePickerResult: IFilePickerResult[]) => void;

  /**
   * Handler when file has been changed.
   */
  onChange?: (filePickerResult: IFilePickerResult[]) => void;

  /**
   * Current context.
   */
  context: BaseComponentContext;

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
   * Specifies if the picker button is hidden (if hidden, panel visibility can still be controlled with isPanelOpen)
   */
  hidden?: boolean;

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
   * Specifies if LocalMultipleUploadTab should be hidden.
   */
  hideLocalMultipleUploadTab?: boolean;

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
  renderCustomLinkTabContent?: (filePickerResult: IFilePickerResult) => JSX.Element | undefined;
  /**
   * Optional additional renderer for Upload tab
   */
  renderCustomUploadTabContent?: (filePickerResult: IFilePickerResult) => JSX.Element | undefined;

  /**
   * Optional additional renderer for Multiple Upload tab
   */
  renderCustomMultipleUploadTabContent?: (filePickerResult: IFilePickerResult[]) => JSX.Element | undefined;

  /**
   * Specifies if Site Pages library to be visible on Sites tab
   */
  includePageLibraries?: boolean;

  /**
   * Specifies a default folder to be active in the Site Files tab
   */
  defaultFolderAbsolutePath?: string;

  /**
   * Specifies a default site in the Site Files tab
   */
   webAbsoluteUrl?: string;

   /**
   * Specifies if external links are allowed
   */
  allowExternalLinks?: boolean;
  /**
   * Specifies if file check should be done
   */
   checkIfFileExists?: boolean;
  /**
   * Specifies tab order
   * Default [FilePickerTab.Recent, FilePickerTab.StockImages, FilePickerTab.Web, FilePickerTab.OrgAssets, FilePickerTab.OneDrive, FilePickerTab.Site, FilePickerTab.Upload, FilePickerTab.Link, FilePickerTab.MultipleUpload]
   */
   tabOrder?: FilePickerTab[];
  /**
   * Specifies default selected tab
   * One of the values from the FilePickerTab enum: Recent, StockImages, Web, OrgAssets, OneDrive, Site, Upload, Link, or MultipleUpload.
  */
  defaultSelectedTab?: FilePickerTab;
}
