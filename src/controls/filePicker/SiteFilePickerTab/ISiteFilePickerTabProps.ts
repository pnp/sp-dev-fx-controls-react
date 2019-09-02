import { IFilePickerTab } from "..";
import { FileBrowserService } from "../../../services/FileBrowserService";
import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";

export interface ISiteFilePickerTabProps extends IFilePickerTab {
  fileBrowserService: FileBrowserService;

  /**
   * Represents the base node in the breadrumb navigation
   */
  breadcrumbFirstNode?: IBreadcrumbItem;
}
