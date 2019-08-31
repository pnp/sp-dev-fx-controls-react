import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import { ILibrary } from "../controls";
import { IFile } from "../../../services/FileBrowserService.types";

export interface SiteFilePickerBreadcrumbItem extends IBreadcrumbItem {
  libraryData?: ILibrary;
  folderData?: IFile;
}
