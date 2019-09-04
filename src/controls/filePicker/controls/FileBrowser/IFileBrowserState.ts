import { ViewType } from ".";
import { IFile } from "../../../../services/FileBrowserService.types";
import { Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';

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
  nextPageQueryString: string;
  // currentPath: string;
  fileUrl?: string;
  columns: IColumn[];
  selectedView: ViewType;
}
