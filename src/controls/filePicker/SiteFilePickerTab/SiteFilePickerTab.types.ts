import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import { ILibrary } from "./DocumentLibraryBrowser";
import { IFile } from ".";

export interface SiteFilePickerBreadcrumbItem extends IBreadcrumbItem {
  libraryData?: ILibrary;
  folderData?: IFile;

}
