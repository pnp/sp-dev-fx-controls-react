import { FileBrowserService } from "../../../../services/FileBrowserService";
import { IFile } from "../../../../services/FileBrowserService.types";
import { Selection } from '@fluentui/react/lib/Selection';
import { IFilePickerResult } from "../../FilePicker.types";
export interface ITilesListProps {
    fileBrowserService: FileBrowserService;
    filePickerResults: IFilePickerResult[];
    selection: Selection;
    items: IFile[];
    onFolderOpen: (item: IFile) => void;
    onFileSelected: (item: IFile) => void;
    onNextPageDataRequest: () => void;
}
//# sourceMappingURL=ITilesListProps.d.ts.map