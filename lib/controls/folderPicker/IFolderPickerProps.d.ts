import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IFolder } from '../../services/IFolderExplorerService';
export interface IFolderPickerProps {
    /**
     * Current context
     */
    context: BaseComponentContext;
    /**
     * The absolute url of the target site. Only required if not the current site
     */
    siteAbsoluteUrl?: string;
    /**
     * The label for the control
     */
    label: string;
    /**
     * The lowest level folder that can be explored. This can be the root folder of a library.
     */
    rootFolder: IFolder;
    /**
     * The default folder to be explored
     */
    defaultFolder?: IFolder;
    /**
     * Is selection required
     */
    required?: boolean;
    /**
     * Is the control disabled
     */
    disabled?: boolean;
    /**
     * Allow current user to create folders on the target location. If enabled, you need to ensure that the user has the required permissions
     */
    canCreateFolders?: boolean;
    /**
     * Callback function called after a folder is selected
     * @argument folder The selected folder
     */
    onSelect: (folder: IFolder) => void;
}
//# sourceMappingURL=IFolderPickerProps.d.ts.map