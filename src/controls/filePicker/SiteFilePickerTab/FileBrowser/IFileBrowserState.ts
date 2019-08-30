import { ViewType, IFile } from ".";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";

export interface IFileBrowserState {
  isLoading: boolean;
  items: IFile[];
  // currentPath: string;
  fileUrl?: string;
  columns: IColumn[];
  selectedView: ViewType;
}
