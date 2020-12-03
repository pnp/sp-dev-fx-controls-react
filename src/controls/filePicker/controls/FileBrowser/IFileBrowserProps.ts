import { FileBrowserService } from "../../../../services/FileBrowserService";
import { IFile } from "../../../../services/FileBrowserService.types";
import { IFilePickerResult } from "../../FilePicker.types";

export interface IFileBrowserProps {
  fileBrowserService: FileBrowserService;
  libraryUrl: string;
  folderPath: string;
  accepts: string[];
  onChange: (filePickerResult: IFilePickerResult) => void;
  onOpenFolder: (folder: IFile) => void;
}
