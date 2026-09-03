import { BaseComponentContext } from "@microsoft/sp-component-base";
import { IToolbarItem } from "./IToolbarItem";
import { Theme } from "@fluentui/react";

/**
 * Props for the ListToolbar component
 */

export interface IListToolbarProps {
    /** Array of toolbar items */
    items: IToolbarItem[];
    /** Far items that appear on the right side of the toolbar */
    farItems?: IToolbarItem[];
    /** Whether the toolbar is in a loading state */
    isLoading?: boolean;
    /** Aria label for the toolbar */
    ariaLabel?: string;
    /** Total count to display (optional) */
    totalCount?: number;
    /** Custom class name */
    className?: string;
    /** Whether to show dividers between groups */
    showGroupDividers?: boolean;
    /** Theme for the toolbar */
    theme?: Theme;
    /** Context for the web part */
    context?: BaseComponentContext;
}
