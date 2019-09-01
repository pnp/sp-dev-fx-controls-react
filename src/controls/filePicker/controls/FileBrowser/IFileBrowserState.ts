import { ViewType } from ".";
import { IColumn } from "office-ui-fabric-react/lib/DetailsList";
import { IFile } from "../../../../services/FileBrowserService.types";

export enum LoadingState {
  idle = 1,
  loading = 2,
  loadingNextPage
}

export interface IFileBrowserState {
  // isLoading: boolean;
  // isLoadingNextPage: boolean;
  loadingState: LoadingState;
  items: IFile[];
  nextPageUrl: string;
  // currentPath: string;
  fileUrl?: string;
  columns: IColumn[];
  selectedView: ViewType;
}
