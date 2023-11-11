import { IBreadcrumbItem } from "@fluentui/react/lib/components/Breadcrumb";
import { IFile } from "../../../services/FileBrowserService.types";

export interface OneDriveFilesBreadcrumbItem extends IBreadcrumbItem {
  folderData?: IFile;
}
