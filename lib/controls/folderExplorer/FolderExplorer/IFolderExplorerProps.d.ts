import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IFileInfo } from '@pnp/sp/files';
import { IBreadcrumbItem } from "@fluentui/react/lib/Breadcrumb";
import { IFolder } from '../../../services/IFolderExplorerService';
export interface IFolderExplorerProps {
    /**
     * Current context
     */
    context: BaseComponentContext;
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
     * The name of the folder field on which to sort. Name will be used as default. Other examples: Name, TimeCreated, TimeLastModified
     */
    orderby?: string;
    /**
     * If set to true, results will be sorted in ascending order. Otherwise, descending will be used as default
     */
    orderAscending?: boolean;
    /**
     * Display files in the folder explorer
     */
    showFiles?: boolean;
    /**
     * Callback function called after a folder is selected
     * @argument folder The selected folder
     */
    onSelect: (folder: IFolder) => void;
    /**
     * Callback function called after a file is clicked
     * @argument file The selected folder
     */
    onFileClick?: (file: IFileInfo) => void;
}
//# sourceMappingURL=IFolderExplorerProps.d.ts.map