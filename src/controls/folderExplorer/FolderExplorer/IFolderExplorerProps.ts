import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ExtensionContext } from '@microsoft/sp-extension-base';
import { IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import { IFolder } from '../../../services/IFolderExplorerService';


export interface IFolderExplorerProps {
  /**
   * Current context
   */
  context: WebPartContext | ExtensionContext;

  /**
   * The absolute url of the target site. Only required if not the current site
   */
  siteAbsoluteUrl?: string;

  /**
   * The lowest level folder that can be explored. This can be the root folder of a library.
   * If site url is provided, it will allow the user to select a document library
   */
  rootFolder: IFolder;

  /**
   * The default folder to be explored
   */
  defaultFolder: IFolder;

  /**
   * Allow current user to create folders on the target location. If enabled, you need to ensure that the user has the required permissions
   */
  canCreateFolders?: boolean;

  /**
   * Hide the breadcrumb control
   */
  hiddenBreadcrumb?: boolean;

  /**
   * Additional items to be added to the beginning of the breadcrumb
   */
  initialBreadcrumbItems?: IBreadcrumbItem[];

  /**
   * Hide the filter box
   */
  hiddenFilterBox?: boolean;

  /**
   * Callback function called after a folder is selected
   * @argument folder The selected folder
   */
  onSelect: (folder: IFolder) => void;
}
