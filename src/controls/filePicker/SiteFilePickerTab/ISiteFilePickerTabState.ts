import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import { SiteFilePickerBreadcrumbItem } from ".";
import { IFilePickerResult } from "../FilePicker.types";

export interface ISiteFilePickerTabState {
  filePickerResult: IFilePickerResult;
  libraryAbsolutePath: string;
  libraryTitle: string;
  libraryPath: string;
  folderName: string;

  breadcrumbItems: SiteFilePickerBreadcrumbItem[];
}
