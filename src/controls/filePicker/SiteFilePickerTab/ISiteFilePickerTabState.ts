import { IFilePickerResult , FilePickerBreadcrumbItem} from "../FilePicker.types";

export interface ISiteFilePickerTabState {
  filePickerResult: IFilePickerResult;
  libraryAbsolutePath: string;
  libraryUrl: string;
  libraryPath: string;
  folderName: string;

  breadcrumbItems: FilePickerBreadcrumbItem[];
}
