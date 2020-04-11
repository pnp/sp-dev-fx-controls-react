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
   * Specify the item selection mode.
   * By default this is set to Single.
   */
  selectionMode?: TreeViewSelectionMode;
  /**
   * Specify if the childrens should be selected when parent is selected.
   * By default this is set to false.
   */
  selectChildrenIfParentSelected?: boolean;
  /**
  * Specify if the checkboxes should be displayed for selection.
  */
  showCheckboxes?: boolean;
  /**
   * Display mode of the tree item actions.
   */
  treeItemActionsDisplayMode?: TreeItemActionsDisplayMode;
  /**
   * Keys of items selected by default
   */
  defaultSelectedKeys?: string[];

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
}
