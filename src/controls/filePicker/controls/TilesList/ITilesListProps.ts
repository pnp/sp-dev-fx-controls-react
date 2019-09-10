import { FileBrowserService } from "../../../../services/FileBrowserService";
import { IFile } from "../../../../services/FileBrowserService.types";
import { SelectionZone, ISelection, Selection, SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { IFilePickerResult } from "../../FilePicker.types";

export interface ITilesListProps {
  fileBrowserService: FileBrowserService;
  filePickerResult: IFilePickerResult;
  selection: Selection;
  items: IFile[];

  onFolderOpen: (item: IFile) => void;
  onFileSelected: (item: IFile) => void;
  onNextPageDataRequest: () => void;
}
