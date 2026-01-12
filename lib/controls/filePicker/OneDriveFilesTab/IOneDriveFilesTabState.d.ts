import { OneDriveFilesBreadcrumbItem } from "./OneDriveFilesTab.types";
import { IFilePickerResult } from "../FilePicker.types";
export interface IOneDriveFilesTabState {
    filePickerResults: IFilePickerResult[];
    libraryAbsolutePath: string;
    libraryUrl: string;
    folderPath: string;
    folderName: string;
    breadcrumbItems: OneDriveFilesBreadcrumbItem[];
}
//# sourceMappingURL=IOneDriveFilesTabState.d.ts.map