import { ViewType } from "./FileBrowser.types";
import { IFile } from "../../../../services/FileBrowserService.types";
import { IColumn } from '@fluentui/react/lib/DetailsList';
import { IFilePickerResult } from "../../FilePicker.types";

export enum LoadingState {
  idle = 'idle',
  loading = 'loading',
  loadingNextPage = 'loadingNextPage'
}

export interface IFileBrowserState {
  // isLoading: boolean;
  // isLoadingNextPage: boolean;
  loadingState: LoadingState;
  items: IFile[];
  nextPageQueryString: string;
  // currentPath: string;
  filePickerResults: IFilePickerResult[];
  columns: IColumn[];
  selectedView: ViewType;
}
