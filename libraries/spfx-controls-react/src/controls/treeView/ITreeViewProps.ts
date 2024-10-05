import { IPartialTheme, ITheme } from '@fluentui/react/lib/Styling';
import { ITreeItem } from './ITreeItem';
import { TreeItemActionsDisplayMode } from './ITreeItemActions';

/**
 * Selection mode of tree item
 */
export enum TreeViewSelectionMode {
  Single = 0,
  Multiple = 1,
  None = 2
}

export enum SelectChildrenMode {
  None = 0,
  Select = 1 << 0, // 0001
  Unselect = 1 << 1,     // 0010
  Mount = 1 << 2,    // 0100
  Update = 1 << 3,   // 1000
  All = ~(~0 << 4)   // 1111
}

/**
 * TreeView properties interface
 */
export interface ITreeViewProps {
  /**
   * The items to render.
   */
  items: ITreeItem[];
  /**
   * Default expand / collapse behavior.
   * By default this is set to false.
   */
  defaultExpanded?: boolean;
  /**
   * Specifies the item selection mode.
   * By default this is set to Single.
   */
  selectionMode?: TreeViewSelectionMode;
  /**
   * @deprecated Use selectChildrenMode instead.
   * Specifies if the childrens should be selected when parent is selected.
   * By default this is set to false.
   */
  selectChildrenIfParentSelected?: boolean;
  /**
  * Specifies if the childrens should be selected when parent is selected. Flagged enum, so values can be combined eg. SelectChildrenMode.Select | SelectChildrenMode.Unselect
  * By default this is set to None.
  */
  selectChildrenMode?: SelectChildrenMode;
  /**
  * Specifies if the checkboxes should be displayed for selection.
  */
  showCheckboxes?: boolean;
  /**
   * Display mode of the tree item actions.
   */
  treeItemActionsDisplayMode?: TreeItemActionsDisplayMode;
  /**
   * Keys of items expanded by default
   */
  defaultExpandedKeys?: string[];
  /**
   * Keys of items selected by default
   */
  defaultSelectedKeys?: string[];

  /**
  * Specifies if the tree view is expanded to display selected nodes.
  */
  expandToSelected?: boolean;

  /**
   * Callback function called after a item is expanded / collapsed.
   * @argument item The expanded / collapsed item.
   * @argument isExpanded The status of item (expanded / collapsed).
   */
  onExpandCollapse?: (item: ITreeItem, isExpanded: boolean) => void;
  /**
   * Callback function called after an item is selected.
   * @argument items The selected items.
   */
  onSelect?: (items: ITreeItem[]) => void;
  /**
   * Customize how items are rendered.
   * @argument item The tree item.
   */
  onRenderItem?: (item: ITreeItem) => JSX.Element;
  /**
  * Default expand / collapse behavior for the child nodes.
  * By default this is set to true.
  */
  defaultExpandedChildren?: boolean;
  /**
  * Set Fluent UI Theme.
  * If not set or set to null or not defined, the theme passed through context will be used, or the default theme of the page will be loaded.
  */
  theme?: IPartialTheme | ITheme;
}
