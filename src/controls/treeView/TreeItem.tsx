import * as React from 'react';
import * as strings from 'ControlStrings';
import { IconButton } from '@fluentui/react/lib/Button';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { ITheme } from '@fluentui/react/lib/Styling';
import { css } from '@fluentui/react/lib/Utilities';
import { ITreeItem } from './ITreeItem';
import { TreeItemActionsDisplayMode } from './ITreeItemActions';
import { TreeViewSelectionMode } from './ITreeViewProps';
import TreeItemActionsControl from './TreeItemActionsControl';
import styles from './TreeView.module.scss';

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

  nodesToExpand: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
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
  constructor(props: ITreeItemProps, state: ITreeItemState) {
    super(props);

    // Check if current item is selected
    const active = props.activeItems.filter(item => item.key === props.treeItem.key);

    let expanded = props.defaultExpanded;
    if (!expanded && (props.nodesToExpand && props.nodesToExpand.indexOf(props.treeItem.key) !== -1)) {
      expanded = true;
    }

    this.state = {
      selected: active.length > 0,
      // expanded: this.props.defaultExpanded
      expanded: expanded
    };

    // Bind control events
    this._itemSelected = this._itemSelected.bind(this);
    this._handleExpandCollapse = this._handleExpandCollapse.bind(this);
  }

  /**
   * Handle the checkbox change trigger
   */
  private _itemSelected(ev: React.FormEvent<HTMLElement | HTMLInputElement>, isChecked: boolean): void {
    this.setState({
      selected: !this.state.selected
    });

    this.props.parentCallbackOnSelect(this.props.treeItem, isChecked);
  }

  /**
   * Handle the click event: collapse or expand
   */
  private _handleExpandCollapse(): void {
    this.setState({
      expanded: !this.state.expanded
    });

    this.props.parentCallbackExpandCollapse(this.props.treeItem, !this.state.expanded);
  }

  /**
   * Lifecycle event hook when component retrieves new properties
   * @param nextProps
   * @param nextContext
   */
  public UNSAFE_componentWillReceiveProps(nextProps: ITreeItemProps): void {
    const {
      selectionMode,
      nodesToExpand,
      treeItem
    } = this.props;
    // If selection is turned on, set the item as selected
    if (selectionMode !== TreeViewSelectionMode.None) {

      const active = nextProps.activeItems.filter(item => item.key === treeItem.key);

      let _isExpanded: boolean = this.state.expanded;

      if (!_isExpanded && nodesToExpand.indexOf(this.props.treeItem.key) === -1) {
        _isExpanded = false;
      }

      this.setState({
        selected: active.length > 0,
        expanded: _isExpanded
      });
    }
  }

  /**
   * Default or custom rendering of tree item
   */
  private renderItem(item: ITreeItem): JSX.Element {
    if (typeof this.props.onRenderItem === "function") {
      // Custom rendering of tree item
      return this.props.onRenderItem(item);
    }
    else {
      return (
        // Default rendering of tree item
        <div
          className={styles.labels}
          onClick={(e) => {
            if (this.props.selectionMode !== TreeViewSelectionMode.None && item.selectable !== false) {
              e.stopPropagation();
              if (!item.disabled) {
                this._itemSelected(e, !this.state.selected);
              }
            }
          }}>
          {
            this.props.showCheckboxes && item.selectable === false && !item.children &&
            <span className={styles.blankspace}>&nbsp;</span>
          }

          {
            // Rendering when item has iconProps
            item.iconProps &&
            <span>
              <Icon className={styles.icon} iconName={item.iconProps.iconName} style={item.iconProps.style} theme={this.props.theme} />
              &nbsp;
            </span>
          }

          {item.label}
          {
            // Render sublabel
            item.subLabel &&
            <div className={styles.itemSubLabel}>
              {item.subLabel}
            </div>
          }
        </div>
      );
    }
  }

  /**
   * Process the child nodes
   */
  public createChildNodes = (list: ITreeItem[], paddingLeft: number): JSX.Element[] => {
    if (list.length) {
      const {
        selectionMode,
        activeItems,
        parentCallbackExpandCollapse,
        parentCallbackOnSelect,
        onRenderItem,
        showCheckboxes,
        treeItemActionsDisplayMode,
        defaultExpandedChildren
      } = this.props;

      const { expanded } = this.state;

      const childrenWithHandlers = list.map((item) => {
        return (
          <TreeItem
            key={item.key}
            treeItem={item}
            defaultExpanded={defaultExpandedChildren ? expanded : expanded && !item.children}
            defaultExpandedChildren={defaultExpandedChildren}
            leftOffset={paddingLeft}
            selectionMode={selectionMode}
            activeItems={activeItems}
            isFirstRender={!paddingLeft ? true : false}
            parentCallbackExpandCollapse={parentCallbackExpandCollapse}
            parentCallbackOnSelect={parentCallbackOnSelect}
            onRenderItem={onRenderItem}
            showCheckboxes={showCheckboxes}
            treeItemActionsDisplayMode={treeItemActionsDisplayMode}
            nodesToExpand={this.props.nodesToExpand}
            theme={this.props.theme}
          />
        );
      });

      return childrenWithHandlers;
    }
  }

  /**
   * Default action callback
   */
  private treeItemActionCallback = (): void => {
    // no-op;
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<ITreeItemProps> {
    const { treeItem, leftOffset, showCheckboxes, selectionMode, treeItemActionsDisplayMode } = this.props;

    const {
      expanded,
      selected
    } = this.state;

    const styleProps: React.CSSProperties = {
      marginLeft: `${leftOffset}px`
    };

    const contentStyles: React.CSSProperties = {
      marginLeft: treeItem.children ? '0' : `${leftOffset}px`
    };

    return (
      <div>
        <div className={`${styles.listItem} ${styles.tree}`}>
          <div className={`${styles.treeSelector}`}>
            {
              // Render expand / collapse icons for items which has children.
              treeItem.children &&
              <IconButton
                iconProps={expanded ? { iconName: 'ChevronDown' } : { iconName: 'ChevronRight' }}
                alt={expanded ? strings.TreeViewCollapseTitle : strings.TreeViewExpandTitle}
                title={expanded ? strings.TreeViewCollapseTitle : strings.TreeViewExpandTitle}
                onClick={() => this._handleExpandCollapse()}
                theme={this.props.theme} />
            }
          </div>
          <div
            className={css({
              [styles.itemContent]: true,
              [styles.noCheckBox]: !showCheckboxes,
              [styles.checked]: selected,
              [styles.disabled]: !!treeItem.disabled
            })}
            style={contentStyles}
            onClick={(e) => {
              if (this.props.selectionMode !== TreeViewSelectionMode.None && treeItem.selectable !== false) {
                e.stopPropagation();
                if (!treeItem.disabled && e.currentTarget === e.target) {
                  this._itemSelected(e, !this.state.selected);
                }
              }
            }}
          >
            {
              // Render checkbox (if item is selectable, Selection mode is not None, and showCheckboxes property is set to true)
              (treeItem.selectable !== false) && selectionMode !== TreeViewSelectionMode.None && showCheckboxes &&
              <Checkbox
                checked={selected}
                disabled={treeItem.disabled}
                className={styles.checkbox}
                onChange={this._itemSelected}
                theme={this.props.theme}
              />
            }
            {
              // Call default render item function
              this.renderItem(treeItem)
            }
            {
              // Render actions for tree item
              treeItem.actions &&
              <div className={styles.itemMenu}>
                <TreeItemActionsControl treeItem={treeItem}
                  treeItemActions={{
                    actions: treeItem.actions,
                    treeItemActionsDisplayMode: treeItemActionsDisplayMode
                  }}
                  treeItemActionCallback={this.treeItemActionCallback}
                  theme={this.props.theme} />
              </div>
            }
          </div>
        </div>
        <div style={styleProps || {}}>
          {
            // Render child nodes
            expanded && treeItem.children
              ? this.createChildNodes(treeItem.children, leftOffset) // we double left padding on every recursion/depth
              : null
          }
        </div>
      </div>
    );
  }
}
