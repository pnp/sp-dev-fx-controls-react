import { ViewType } from ".";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IFile } from "../../../../services/FileBrowserService.types";

export interface IFileBrowserState {
  isLoading: boolean;
  items: IFile[];
  // currentPath: string;
  fileUrl?: string;
  columns: IColumn[];
  selectedView: ViewType;
}
