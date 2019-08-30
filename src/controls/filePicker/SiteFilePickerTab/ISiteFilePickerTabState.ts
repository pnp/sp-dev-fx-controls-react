import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import { SiteFilePickerBreadcrumbItem } from ".";

export interface ISiteFilePickerTabState {
  fileUrl?: string;
  libraryAbsolutePath: string;
  libraryTitle: string;
  libraryPath: string;
  folderName: string;

  breadcrumbItems: SiteFilePickerBreadcrumbItem[];
}
