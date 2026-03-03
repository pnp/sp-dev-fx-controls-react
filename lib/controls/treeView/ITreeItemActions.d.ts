import { ITreeItem } from './ITreeItem';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { ITheme } from '@fluentui/react/lib/Styling';
/**
 * Specifies the display mode of the tree item action.
 */
export declare enum TreeItemActionsDisplayMode {
    Buttons = 1,
    ContextualMenu = 2
}
/**
 * Tree item actions.
 */
export interface ITreeItemActions {
    /**
     * List of actions.
     */
    actions: ITreeItemAction[];
    /**
     * Display mode of the tree item actions.
     */
    treeItemActionsDisplayMode?: TreeItemActionsDisplayMode;
}
/**
 * TreeItemActionsControl properties interface
 */
export interface ITreeItemActionsControlProps {
    /**
     * Current tree item.
     */
    treeItem: ITreeItem;
    /**
     * List of actions.
     */
    treeItemActions: ITreeItemActions;
    /**
     * Callback after execution of tree item action.
     */
    treeItemActionCallback: () => void;
    /**
    * Set Fluent UI Theme.
    * */
    theme: ITheme;
}
/**
 * TreeItemActionsControl state interface
 */
export interface ITreeItemActionsControlState {
    /**
     * Specifies the list of the available actions for the tree item.
     */
    availableActions: ITreeItemAction[];
    /**
     * TreeItemAction display mode.
     */
    displayMode: TreeItemActionsDisplayMode;
}
/**
 * ConcreteTreeItemAction properties interface
 */
export interface IConcreteTreeItemActionProps {
    /**
     * Specifies the list of the available actions for the tree item.
     */
    treeItemActions: ITreeItemAction[];
    /**
     * Current tree item
     */
    treeItem: ITreeItem;
    /**
     * Method to be executed when action is fired.
     */
    treeItemActionCallback: () => void;
    /**
    * Set Fluent UI Theme.v
    * */
    theme: ITheme;
}
/**
 * Interface represents the possible action that could be execute on tree item level.
 */
export interface ITreeItemAction {
    /**
     * Action ID
     */
    id: string;
    /**
     * Action title
     */
    title?: string;
    /**
     * Icon to be displayed for the action.
     */
    iconProps?: IIconProps;
    /**
     * Specify if the action is hidden. This could be used for instance when you want to invoke the action right after rendering.
     */
    hidden?: boolean;
    /**
     * Specifies if you want to invoke the action on render
     */
    invokeActionOnRender?: boolean;
    /**
     * Method to be executed when action is fired.
     *  @param currentTreeItem
     */
    actionCallback: (currentTreeItem: ITreeItem) => void;
}
//# sourceMappingURL=ITreeItemActions.d.ts.map