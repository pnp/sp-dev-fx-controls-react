import { WebPartContext } from "@microsoft/sp-webpart-base";
import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import { IFile, ILibrary } from "../../services/FileBrowserService.types";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface FilePickerBreadcrumbItem extends IBreadcrumbItem {
  libraryData?: ILibrary;
  folderData?: IFile;
}

export interface IFilePickerTab {
  context: ApplicationCustomizerContext | WebPartContext;
  accepts: string[];
  onSave: (value: IFilePickerResult) => void;
  onClose: () => void;
}

export interface IFilePickerResult {
  fileName: string;
  fileNameWithoutExtension: string;
  fileAbsoluteUrl: string;
  file: File;
}
