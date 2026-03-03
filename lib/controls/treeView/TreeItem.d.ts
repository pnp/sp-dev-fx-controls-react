import * as React from 'react';
import { ITheme } from '@fluentui/react/lib/Styling';
import { ITreeItem } from './ITreeItem';
import { TreeItemActionsDisplayMode } from './ITreeItemActions';
import { TreeViewSelectionMode } from './ITreeViewProps';
/**
 * TreeItem properties interface
 */
export interface ITreeItemProps {
    /**
     * Current tree item.
     */
    treeItem: ITreeItem;
    /**
     * Selection mode of tree item.
     */
    selectionMode: TreeViewSelectionMode;
    /**
     * Specifies the left padding for current tree item based on hierarchy.
     */
    leftOffset: number;
    /**
     * Specifies whether current tree item is a root.
     */
    isFirstRender: boolean;
    /**
     * Specifies whether current tree item should be rendered as an expanded.
     */
    defaultExpanded: boolean;
    /**
     * Specifies whether current tree item should be rendered as an expanded.
     */
    showCheckboxes: boolean;
    /**
     * Stores the selected tree items
     */
    activeItems: ITreeItem[];
    /**
     * Display mode of the tree item actions.
     */
    treeItemActionsDisplayMode?: TreeItemActionsDisplayMode;
    /**
     * Callback function called when an item is expanded / collapsed.
     */
    parentCallbackExpandCollapse: (item: ITreeItem, isExpanded: boolean) => void;
    /**
     * Callback function called when an item is selected.
     */
    parentCallbackOnSelect: (item: ITreeItem, isSelected: boolean) => void;
    /**
     * Customize how item is rendered.
     */
    onRenderItem?: (item: ITreeItem) => JSX.Element;
    nodesToExpand: any[];
    /**
    * Specifies whether current tree item's children should be rendered as expanded.
    */
    defaultExpandedChildren?: boolean;
    /**
    * Set Fluent UI Theme.
    */
    theme: ITheme;
}
/**
 * TreeItem state interface
 */
export interface ITreeItemState {
    /**
     * Specifies whether current tree item is selected
     */
    selected?: boolean;
    /**
     * Specifies whether current tree item is expanded
     */
    expanded?: boolean;
}
/**
 * Renders the controls for TreeItem component
 */
export default class TreeItem extends React.Component<ITreeItemProps, ITreeItemState> {
    /**
     * Constructor method
     * @param props properties interface
     */
    constructor(props: ITreeItemProps, state: ITreeItemState);
    /**
     * Handle the checkbox change trigger
     */
    private _itemSelected;
    /**
     * Handle the click event: collapse or expand
     */
    private _handleExpandCollapse;
    /**
     * Lifecycle event hook when component retrieves new properties
     * @param nextProps
     * @param nextContext
     */
    UNSAFE_componentWillReceiveProps(nextProps: ITreeItemProps): void;
    /**
     * Default or custom rendering of tree item
     */
    private renderItem;
    /**
     * Process the child nodes
     */
    createChildNodes: (list: ITreeItem[], paddingLeft: number) => JSX.Element[];
    /**
     * Default action callback
     */
    private treeItemActionCallback;
    /**
     * Default React render method
     */
    render(): React.ReactElement<ITreeItemProps>;
}
//# sourceMappingURL=TreeItem.d.ts.map