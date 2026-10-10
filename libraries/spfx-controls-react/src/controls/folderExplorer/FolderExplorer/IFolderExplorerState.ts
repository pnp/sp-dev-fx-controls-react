import { IFileInfo } from '../../../common/SPRestTypes';
import { IFolder } from '../../../services/IFolderExplorerService';

export interface IFolderExplorerState {
  foldersLoading: boolean;
  folders: IFolder[];
  files: IFileInfo[];
  selectedFolder: IFolder;
}
