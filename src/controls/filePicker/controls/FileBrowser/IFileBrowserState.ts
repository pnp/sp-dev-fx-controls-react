import { ViewType } from ".";
import { IFile } from "../../../../services/FileBrowserService.types";
import { Selection, IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { IFilePickerResult } from "../../FilePicker.types";

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
  filePickerResult: IFilePickerResult;
  columns: IColumn[];
  selectedView: ViewType;
}
