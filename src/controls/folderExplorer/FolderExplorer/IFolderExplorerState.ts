import { IFolder } from '../../../services/IFolderExplorerService';

export interface IFolderExplorerState {
  foldersLoading: boolean;
  folders: IFolder[];
  selectedFolder: IFolder;
}
