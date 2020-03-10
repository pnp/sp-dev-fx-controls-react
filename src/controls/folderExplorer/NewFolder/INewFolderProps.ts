import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { IFolder } from '../../../services/IFolderExplorerService';

export interface INewFolderProps {
  /**
   * Current context
   */
  context: WebPartContext | ExtensionContext;

  /**
   * Folder currently selected
   */
  selectedFolder: IFolder;

  /**
   * Callback function called after the folder has been added
   * @argument newFolder The new folder created. Null if error occurred.
   */
  addSubFolder: (newFolder: IFolder) => Promise<void>;
}
