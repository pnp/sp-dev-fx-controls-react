import * as React from 'react';
import { ThemeContext } from '@fluentui/react-theme-provider/lib/ThemeContext';
import { Theme } from '@fluentui/react-theme-provider/lib/types';
import uniqBy from 'lodash/uniqBy';
import * as telemetry from '../../common/telemetry';
import { getFluentUIThemeOrDefault } from '../../common/utilities/ThemeUtility';
import { ITreeItem } from './ITreeItem';
import { ITreeViewProps, SelectChildrenMode, TreeViewSelectionMode } from './ITreeViewProps';
import { ITreeViewState } from './ITreeViewState';
import TreeItem from './TreeItem';
import styles from './TreeView.module.scss';

/**
 * Renders the controls for TreeItem component
 */
export class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {

  private nodesToExpand: string[] = [];
  private divToInjectCssVariables = React.createRef<HTMLDivElement>();
  /**
   * Constructor method
   * @param props properties interface
   */
  constructor(props: ITreeViewProps) {
    super(props);
    telemetry.track('TreeView');

    this.state = {
      loaded: true,
      defaultExpanded: props.defaultExpanded,
      activeItems: []
    };

    // Bind control events
    this.handleTreeExpandCollapse = this.handleTreeExpandCollapse.bind(this);
    this.handleOnSelect = this.handleOnSelect.bind(this);

    if (props.expandToSelected && props.defaultSelectedKeys) {
      props.defaultSelectedKeys.forEach(element => {
        this.pathTo(props.items, element);
      });
    }
  }

  private pathTo = (array: ITreeItem[], target: string): string => {
    let result: string;
    if (array) {
      array.some(({ key, children = [] }) => {
        const alreadyExistInNodesToExpand = this.nodesToExpand.some((node) => node === key);

        if (key === target) {
          if (!alreadyExistInNodesToExpand) {
            this.nodesToExpand.push(key);
          }
          result = key;
          return true;
        }
        const temp = this.pathTo(children, target);
        if (temp) {
          if (!alreadyExistInNodesToExpand) {
            this.nodesToExpand.push(key);
          }
          result = key + '.' + temp;
          return true;
        }
      });
    }
    return result;
  }

  private getSelectedItems(treeItems: ITreeItem[], selectedKeys: string[], selectedChildren: boolean): ITreeItem[] {
    const selectedItems: ITreeItem[] = [];

    treeItems.forEach(item => {
      if (selectedKeys.indexOf(item.key) !== -1 && item.selectable !== false && !item.disabled) {
        selectedItems.push(item);
        if (selectedChildren) {
          this.selectAllChildren(item, selectedItems);
        }
        else {
          if (item.children) {
            selectedItems.push(...this.getSelectedItems(item.children, selectedKeys, selectedChildren));
          }
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
    if (isExpanded) {
      this.nodesToExpand.push(item.key);
    } else {
      this.nodesToExpand = this.nodesToExpand.filter((node) => node !== item.key);
    }

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
    const tempItem: any = item; // eslint-disable-line @typescript-eslint/no-explicit-any

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
      if (this.props.selectionMode === TreeViewSelectionMode.Multiple) {
        // Add the checked term
        selectedItems.push(item);

        if (this.checkIfChildrenShouldBeSelected(SelectChildrenMode.Select)) {
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
      const unselectArray: string[] = [];
      unselectArray.push(item.key);

      if (this.checkIfChildrenShouldBeSelected(SelectChildrenMode.Unselect)) {
        this.unSelectChildren(item, unselectArray);
      }

      unselectArray.forEach(element => {
        selectedItems = selectedItems.filter(i => i.key !== element);
      });

      this.setState({
        activeItems: selectedItems
      });
    }

    if (typeof this.props.onSelect === "function") {
      this.props.onSelect(selectedItems);
    }
  }

  private checkIfChildrenShouldBeSelected(testMode: SelectChildrenMode): boolean {
    let selectChildrenMode = SelectChildrenMode.None;
    if (this.props.selectChildrenMode) {
      selectChildrenMode = this.props.selectChildrenMode;
    }
    else {
      if (this.props.selectChildrenIfParentSelected) {
        selectChildrenMode = SelectChildrenMode.All;
      }
    }

    if ((selectChildrenMode & testMode) === testMode) {
      return true;
    }
    return false;
  }

  public componentDidMount(): void {
    const {
      items,
      defaultSelectedKeys
    } = this.props;
    if (defaultSelectedKeys) {
      const selectedItems = this.getSelectedItems(items, defaultSelectedKeys, this.checkIfChildrenShouldBeSelected(SelectChildrenMode.Mount));
      this.setState({
        activeItems: selectedItems
      });
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: ITreeViewProps): void {
    const {
      items,
      defaultSelectedKeys
    } = nextProps;
    if (defaultSelectedKeys) {
      const selectedItems = this.getSelectedItems(items, defaultSelectedKeys, this.checkIfChildrenShouldBeSelected(SelectChildrenMode.Update));
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
      treeItemActionsDisplayMode,
      defaultExpanded,
      defaultExpandedChildren = this.props.defaultExpandedChildren ?? true,
      defaultExpandedKeys = this.props.defaultExpandedKeys ?? [],
      theme
    } = this.props;

    return (
      <div ref={this.divToInjectCssVariables}>
        <ThemeContext.Consumer>
          {(contextTheme: Theme | undefined) => {

            const themeToApply = getFluentUIThemeOrDefault((theme) ? theme : contextTheme);
            const div = this.divToInjectCssVariables.current;
            if (div) {
              div.style.setProperty(`--treeview-disabledBodyText`, themeToApply.semanticColors.disabledBodyText);
              div.style.setProperty(`--treeview-disabledSubtext`, themeToApply.semanticColors.disabledSubtext);
              div.style.setProperty(`--treeview-listItemBackgroundHovered`, themeToApply.semanticColors.listItemBackgroundHovered);
              div.style.setProperty(`--treeview-listItemBackgroundChecked`, themeToApply.semanticColors.listItemBackgroundChecked);
              div.style.setProperty(`--treeview-bodySubtext`, themeToApply.semanticColors.bodySubtext);
              div.style.setProperty(`--treeview-buttonBackgroundHovered`, themeToApply.semanticColors.buttonBackgroundHovered);
              div.style.setProperty(`--treeview-buttonTextHovered`, themeToApply.semanticColors.buttonTextHovered);
              div.style.setProperty(`--treeview-buttonBackgroundPressed`, themeToApply.semanticColors.buttonBackgroundPressed);
              div.style.setProperty(`--treeview-buttonTextPressed`, themeToApply.semanticColors.buttonTextPressed);
            }

            return (
              <div className={styles.treeView}>
                {
                  items.map((treeNodeItem, index) => (
                    <TreeItem
                      key={treeNodeItem.key}
                      treeItem={treeNodeItem}
                      leftOffset={20}
                      isFirstRender={true}
                      defaultExpanded={defaultExpanded}
                      defaultExpandedChildren={defaultExpandedChildren}
                      selectionMode={selectionMode}
                      activeItems={this.state.activeItems}
                      parentCallbackExpandCollapse={this.handleTreeExpandCollapse}
                      parentCallbackOnSelect={this.handleOnSelect}
                      onRenderItem={onRenderItem}
                      showCheckboxes={showCheckboxes}
                      treeItemActionsDisplayMode={treeItemActionsDisplayMode}
                      nodesToExpand={[...this.nodesToExpand, ...defaultExpandedKeys]}
                      theme={themeToApply}
                    />
                  ))
                }
              </div>);
          }}
        </ThemeContext.Consumer>
      </div>
    );
  }
}
