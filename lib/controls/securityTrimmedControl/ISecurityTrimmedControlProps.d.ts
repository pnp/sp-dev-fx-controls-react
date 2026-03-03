import { BaseComponentContext } from '@microsoft/sp-component-base';
import { SPPermission } from '@microsoft/sp-page-context';
import { PermissionLevel } from '.';
export interface ISecurityTrimmedControlProps {
    /**
     * Context of the web part, application customizer, field customizer, or list view command set.
     */
    context: BaseComponentContext;
    /**
     * The permissions to check for the user.
     */
    permissions: SPPermission[];
    /**
     * Specify where to check the user permissions: current site or list / remote site or list.
     */
    level: PermissionLevel;
    /**
     * The URL of the remote site. Required when you want to check permissions on remote site or list.
     */
    remoteSiteUrl?: string;
    /**
     * The relative URL of the list or library. Required when you want to check permissions on remote list.
     */
    relativeLibOrListUrl?: string;
    /**
     * Optional. Specify the name of a folder to check the user permissions against. Will be overridden if itemId is present.
     */
    folderPath?: string;
    /**
     * Optional. Specify the ID of the item to check the user permissions against. Takes precedence over folder.
     */
    itemId?: number;
    /**
     * Optional. Specify the className to be used on the parent element.
     */
    className?: string;
    /**
     * Optional. Specify the control you want to render if user doesn't have permissions
     */
    noPermissionsControl?: JSX.Element;
    /**
     * Optional. Specify should render loading animation
     */
    showLoadingAnimation?: boolean;
}
//# sourceMappingURL=ISecurityTrimmedControlProps.d.ts.map