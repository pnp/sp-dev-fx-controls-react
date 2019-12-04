import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import { IFile, ILibrary } from "../../services/FileBrowserService.types";
import { ExtensionContext } from "@microsoft/sp-extension-base";

export interface FilePickerBreadcrumbItem extends IBreadcrumbItem {
  libraryData?: ILibrary;
  folderData?: IFile;
}

export interface IFilePickerTab {
  context: ExtensionContext | WebPartContext;
  accepts: string[];
  onSave: (value: IFilePickerResult) => void;
  onClose: () => void;
}

/**
 * Represents the result of the FilePicker.
 */
export interface IFilePickerResult {
  /**
   * Selected file name with extension.
   */
  fileName: string;
  /**
   * Selected file name without extension.
   */
  fileNameWithoutExtension: string;
  /**
   * Absolute file URL. Undefined in case of file upload.
   */
  fileAbsoluteUrl: string;

  /**
   * Absolute not modified file SharePoint URL.
   */
  spItemUrl?: string;

  /**
   * Downloads file picker result content.
   */
  downloadFileContent: () => Promise<File>;
}
