import { IFileInfo } from '@pnp/sp/files';
import { IFolder } from '../../../services/IFolderExplorerService';
export interface IFolderExplorerState {
    foldersLoading: boolean;
    folders: IFolder[];
    files: IFileInfo[];
    selectedFolder: IFolder;
}
//# sourceMappingURL=IFolderExplorerState.d.ts.map