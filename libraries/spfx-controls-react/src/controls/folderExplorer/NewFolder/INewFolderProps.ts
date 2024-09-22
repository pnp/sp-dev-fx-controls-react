import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IFolder } from '../../../services/IFolderExplorerService';

export interface INewFolderProps {
  /**
   * Current context
   */
  context: BaseComponentContext;

  /**
   * The absolute url of the target site. Only required if not the current site
   */
  siteAbsoluteUrl?: string;

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
