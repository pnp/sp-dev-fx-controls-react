import { ViewType } from "./FileBrowser.types";
import { IFile } from "../../../../services/FileBrowserService.types";
import { IColumn } from '@fluentui/react/lib/DetailsList';
import { IFilePickerResult } from "../../FilePicker.types";
export declare enum LoadingState {
    idle = "idle",
    loading = "loading",
    loadingNextPage = "loadingNextPage"
}
export interface IFileBrowserState {
    loadingState: LoadingState;
    items: IFile[];
    nextPageQueryString: string;
    filePickerResults: IFilePickerResult[];
    columns: IColumn[];
    selectedView: ViewType;
}
//# sourceMappingURL=IFileBrowserState.d.ts.map