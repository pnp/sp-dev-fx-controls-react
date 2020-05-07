import { IFolder } from '../../services/IFolderExplorerService';

export interface IFolderPickerState {
  showPanel: boolean;
  selectedFolder: IFolder;
}
