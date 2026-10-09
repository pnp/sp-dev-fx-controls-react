import { ToolbarButtonProps } from "@fluentui/react-components";
import * as React from "react";

/**
 * Extended toolbar item interface
 */

export interface IToolbarItem {
    /** Unique key for the item */
    key: string;
    /** Label text for the button */
    label?: string;
    /** Tooltip content */
    tooltip?: string;
    /** Icon element */
    icon?: React.ReactElement;
    /** Click handler */
    onClick?: () => void;
    /** Whether the item is disabled */
    disabled?: boolean;
    /** Whether to show the item */
    visible?: boolean;
    /** Group name - items with the same group will be grouped together */
    group?: string;
    /** Whether this is a far item (appears on the right side) */
    isFarItem?: boolean;
    /** Button appearance */
    appearance?: ToolbarButtonProps["appearance"];
    /** Custom render function for complete control */
    onRender?: () => React.ReactElement;
    /** Whether to add a divider after this item */
    dividerAfter?: boolean;
    /** Whether to add a divider before this item */
    dividerBefore?: boolean;
    /** Aria label override */
    ariaLabel?: string;
}
