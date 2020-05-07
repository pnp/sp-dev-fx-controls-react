import * as React from 'react';
import styles from './TreeView.module.scss';
import { uniqBy } from '@microsoft/sp-lodash-subset';
import { ITreeViewProps, TreeViewSelectionMode } from './ITreeViewProps';
import { ITreeViewState } from './ITreeViewState';
import { ITreeItem } from './ITreeItem';
import TreeItem from './TreeItem';
import * as telemetry from '../../common/telemetry';

/**
 * Renders the controls for TreeItem component
 */
export class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {

  /**
   * Constructor method
   * @param props properties interface
   */
  constructor(props: ITreeViewProps) {
    super(props);
    telemetry.track('TreeView');

    this.state = {
      loaded: true,
      defaultExpanded: this.props.defaultExpanded,
      activeItems: []
    };

    // Bind control events
    this.handleTreeExpandCollapse = this.handleTreeExpandCollapse.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);
  }

  private getSelectedItems(treeItems: ITreeItem[], selectedKeys: string[], selectedChildren: boolean): ITreeItem[] {
    let selectedItems: ITreeItem[] = [];

    treeItems.forEach(item => {
      if (selectedKeys.indexOf(item.key) !== -1 && item.selectable !== false && !item.disabled) {
        selectedItems.push(item);
        if (selectedChildren) {
          this.selectAllChildren(item, selectedItems);
        }
      }
      else {
        if (item.children) {
          selectedItems.push(...this.getSelectedItems(item.children, selectedKeys, selectedChildren));
        }
      }
    });

    return selectedItems;
  }

  /**
   * Fires When expand / collapse item in TreeView
   * @argument item The expanded / collapsed item
   * @argument isExpanded The status of item  (expanded / collapsed)
   */
  private handleTreeExpandCollapse(item: ITreeItem, isExpanded: boolean): void {
    if (typeof this.props.onExpandCollapse === "function") {
      this.props.onExpandCollapse(item, isExpanded);
    }
  }

  /**
   * Selects all child nodes when parent node is selected.
   * @param item current tree item
   */
  private selectAllChildren(item: ITreeItem, selectedItems: ITreeItem[]): void {
    if (item.children) {
      item.children.forEach(element => {
        if (!element.disabled && element.selectable !== false) {
          selectedItems.push(element);
        }

        if (element.children) {
          this.selectAllChildren(element, selectedItems);
        }
      });
    }
  }

  /**
   * Unselects all child nodes of selected parent.
   */
  private unSelectChildren(item, unselectArray: string[]): void {
    var tempItem: any = item;

    if (tempItem.children) {
      tempItem.children.forEach(element => {
        unselectArray.push(element.key);

        if (element.children) {
          this.unSelectChildren(element, unselectArray);
        }
      });
    }
  }

  /**
   * Fires When Tree Item is selected in TreeView
   * @argument item The selected item
   * @argument isSelected The status of item selection
   */
  private handleOnSelect(item: ITreeItem, isSelected: boolean): void {
    let selectedItems: ITreeItem[] = this.state.activeItems;

    if (isSelected) {
      if (this.props.selectionMode == TreeViewSelectionMode.Multiple) {
        // Add the checked term
        selectedItems.push(item);

        if (this.props.selectChildrenIfParentSelected) {
          this.selectAllChildren(item, selectedItems);
        }

        selectedItems = uniqBy(selectedItems, 'key');

        // Filter out the duplicate terms
        this.setState({
          activeItems: selectedItems
        });
      }
      else {
        // Only store the current selected item
        this.setState({
          activeItems: [item]
        });

        selectedItems = [item];
      }
    }
    else {
      // Remove the item from the list of active nodes
      let unselectArray: string[] = [];
      unselectArray.push(item.key);

      if (this.props.selectChildrenIfParentSelected) {
        this.unSelectChildren(item, unselectArray);
      }

      unselectArray.forEach(element => {
        selectedItems = selectedItems.filter(i => i.key != element);
      });

      this.setState({
        activeItems: selectedItems
      });
    }

    if (typeof this.props.onSelect === "function") {
      this.props.onSelect(selectedItems);
    }
  }

  public componentDidMount() {
    const {
      items,
      defaultSelectedKeys,
      selectChildrenIfParentSelected
    } = this.props;
    if (defaultSelectedKeys) {
      const selectedItems = this.getSelectedItems(items, defaultSelectedKeys, selectChildrenIfParentSelected);
      this.setState({
        activeItems: selectedItems
      });
    }
  }

  /**
   * Default React render method
   */
  public render(): JSX.Element {
    const {
      items,
      selectionMode,
      onRenderItem,
      showCheckboxes,
      treeItemActionsDisplayMode
    } = this.props;

    return (
      <div className={styles.treeView}>
        {
          items.map((treeNodeItem, index) => (
            <TreeItem
              treeItem={treeNodeItem}
              leftOffset={20}
              isFirstRender={true}
              defaultExpanded={true}
              selectionMode={selectionMode}
              activeItems={this.state.activeItems}
              parentCallbackExpandCollapse={this.handleTreeExpandCollapse}
              parentCallbackOnSelect={this.handleOnSelect}
              onRenderItem={onRenderItem}
              showCheckboxes={showCheckboxes}
              treeItemActionsDisplayMode={treeItemActionsDisplayMode}
            />
          ))
        }
      </div>
    );
  }
}
