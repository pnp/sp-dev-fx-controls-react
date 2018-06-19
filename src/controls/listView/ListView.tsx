import * as React from 'react';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IGroup } from 'office-ui-fabric-react/lib/DetailsList';
import { IListViewProps, IListViewState, IViewField, IGrouping, GroupOrder } from './IListView';
import { IColumn, IGroupRenderProps } from 'office-ui-fabric-react/lib/components/DetailsList';
import { findIndex, has, sortBy, isEqual, cloneDeep } from '@microsoft/sp-lodash-subset';
import { FileTypeIcon, IconType } from '../fileTypeIcon/index';
import * as strings from 'ControlStrings';
import { IGroupsItems } from './IListView';
import * as appInsights from '../../common/appInsights';

/**
 * File type icon component
 */
export class ListView extends React.Component<IListViewProps, IListViewState> {
  private _selection: Selection;

  constructor(props: IListViewProps) {
    super(props);

    appInsights.track('ReactListView', {
      viewFields: !!props.viewFields,
      groupByFields: !!props.groupByFields,
      selectionMode: !!props.selectionMode,
      selection: !!props.selection,
      defaultSelection: !!props.defaultSelection
    });

    // Initialize state
    this.state = {
      items: []
    };

    // Binding the functions
    this._columnClick = this._columnClick.bind(this);

    if (typeof this.props.selection !== 'undefined' && this.props.selection !== null) {
      // Initialize the selection
      this._selection = new Selection({
        // Create the event handler when a selection changes
        onSelectionChanged: () => this.props.selection(this._selection.getSelection())
      });
    }
  }

  /**
   * Lifecycle hook when component is mounted
   */
  public componentDidMount(): void {
    this._processProperties();
  }

  /**
   * Lifecycle hook when component did update after state or property changes
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IListViewProps, prevState: IListViewState): void {
    // select default items
    this._setSelectedItems();

    if (!isEqual(prevProps, this.props)) {
      // Reset the selected items
      if (this._selection) {
        this._selection.setItems(this.props.items, true);
      }
      // Process list view properties
      this._processProperties();
    }
  }

  /**
   * Select all the items that should be selected by default
   */
  private _setSelectedItems(): void {
    if (this.props.items &&
        this.props.items.length > 0 &&
        this.props.defaultSelection &&
        this.props.defaultSelection.length > 0) {
      for (const index of this.props.defaultSelection) {
        if (index > -1) {
          this._selection.setIndexSelected(index, true, false);
        }
      }
    }
  }

  /**
   * Specify result grouping for the list rendering
   * @param items
   * @param groupByFields
   */
  private _getGroups(items: any[], groupByFields: IGrouping[], level: number = 0, startIndex: number = 0): IGroupsItems {
    // Group array which stores the configured grouping
    let groups: IGroup[] = [];
    let updatedItemsOrder: any[] = [];
    // Check if there are groupby fields set
    if (groupByFields) {
      const groupField = groupByFields[level];
      // Check if grouping is configured
      if (groupByFields && groupByFields.length > 0) {
        // Create grouped items object
        const groupedItems = {};
        items.forEach((item: any) => {
          let groupName = item[groupField.name];
          // Check if the group name exists
          if (typeof groupName === "undefined") {
            // Set the default empty label for the field
            groupName = strings.ListViewGroupEmptyLabel;
          }
          // Check if group name is a number, this can cause sorting issues
          if (typeof groupName === "number") {
            groupName = `${groupName}.`;
          }

          // Check if current group already exists
          if (typeof groupedItems[groupName] === "undefined") {
            // Create a new group of items
            groupedItems[groupName] = [];
          }
          groupedItems[groupName].push(item);
        });

        // Sort the grouped items object by its key
        const sortedGroups = {};
        let groupNames = Object.keys(groupedItems);
        groupNames = groupField.order === GroupOrder.ascending ? groupNames.sort() : groupNames.sort().reverse();
        groupNames.forEach((key: string) => {
          sortedGroups[key] = groupedItems[key];
        });

        // Loop over all the groups
        for (const groupItems in sortedGroups) {
          // Retrieve the total number of items per group
          const totalItems = groupedItems[groupItems].length;
          // Create the new group
          const group: IGroup = {
            name: groupItems === "undefined" ? strings.ListViewGroupEmptyLabel : groupItems,
            key: groupItems === "undefined" ? strings.ListViewGroupEmptyLabel : groupItems,
            startIndex: startIndex,
            count: totalItems,
          };
          // Check if child grouping available
          if (groupByFields[level + 1]) {
            // Get the child groups
            const subGroup = this._getGroups(groupedItems[groupItems], groupByFields, (level + 1), startIndex);
            subGroup.items.forEach((item) => {
              updatedItemsOrder.push(item);
            });
            group.children = subGroup.groups;
          } else {
            // Add the items to the updated items order array
            groupedItems[groupItems].forEach((item) => {
              updatedItemsOrder.push(item);
            });
          }
          // Increase the start index for the next group
          startIndex = startIndex + totalItems;
          groups.push(group);
        }
      }
    }
    return {
      items: updatedItemsOrder,
      groups
    };
  }

  /**
   * Process all the component properties
   */
  private _processProperties() {
    let tempState: IListViewState = cloneDeep(this.state);
    let columns: IColumn[] = null;
    // Check if a set of items was provided
    if (typeof this.props.items !== 'undefined' && this.props.items !== null) {
      tempState.items = this._flattenItems(this.props.items);
    }

    // Check if an icon needs to be shown
    if (typeof this.props.iconFieldName !== 'undefined' && this.props.iconFieldName !== null) {
      if (columns === null) { columns = []; }
      const iconColumn = this._createIconColumn(this.props.iconFieldName);
      columns.push(iconColumn);
    }

    // Check if view fields were provided
    if (typeof this.props.viewFields !== 'undefined' && this.props.viewFields !== null) {
      if (columns === null) { columns = []; }
      columns = this._createColumns(this.props.viewFields, columns);
    }

    // Add the columns to the temporary state
    tempState.columns = columns;

    // Add grouping to the list view
    const grouping = this._getGroups(tempState.items, this.props.groupByFields);
    if (grouping.groups.length > 0) {
      tempState.groups = grouping.groups;
      // Update the items
      tempState.items = grouping.items;
    } else {
      tempState.groups = null;
    }

    // Update the current component state with the new values
    this.setState(tempState);
  }

  /**
   * Flatten all objects in every item
   * @param items
   */
  private _flattenItems(items: any[]): any[] {
    // Flatten items
    const flattenItems = items.map(item => {
      // Flatten all objects in the item
      return this._flattenItem(item);
    });
    return flattenItems;
  }

  /**
   * Flatten all object in the item
   * @param item
   */
  private _flattenItem(item: any): any {
    let flatItem = {};
    for (let parentPropName in item) {
      // Check if property already exists
      if (!item.hasOwnProperty(parentPropName)) continue;

      // Check if the property is of type object
      if ((typeof item[parentPropName]) === 'object') {
        // Flatten every object
        const flatObject = this._flattenItem(item[parentPropName]);
        for (let childPropName in flatObject) {
          if (!flatObject.hasOwnProperty(childPropName)) continue;
          flatItem[`${parentPropName}.${childPropName}`] = flatObject[childPropName];
        }
      } else {
        flatItem[parentPropName] = item[parentPropName];
      }
    }
    return flatItem;
  }

  /**
   * Create an icon column rendering
   * @param iconField
   */
  private _createIconColumn(iconFieldName: string): IColumn {
    return {
      key: 'fileType',
      name: 'File Type',
      iconName: 'Page',
      isIconOnly: true,
      fieldName: 'fileType',
      minWidth: 16,
      maxWidth: 16,
      onRender: (item: any) => {
        return (
          <FileTypeIcon type={IconType.image} path={item[iconFieldName]} />
        );
      }
    };
  }

  /**
   * Returns required set of columns for the list view
   * @param viewFields
   */
  private _createColumns(viewFields: IViewField[], crntColumns: IColumn[]): IColumn[] {
    viewFields.forEach(field => {
      crntColumns.push({
        key: field.name,
        name: field.displayName || field.name,
        fieldName: field.name,
        minWidth: field.minWidth || 50,
        maxWidth: field.maxWidth,
        onRender: this._fieldRender(field),
        onColumnClick: this._columnClick
      });
    });
    return crntColumns;
  }

  /**
   * Check how field needs to be rendered
   * @param field
   */
  private _fieldRender(field: IViewField): any | void {
    // Check if a render function is specified
    if (field.render) {
      return field.render;
    }

    // Check if the URL property is specified
    if (field.linkPropertyName) {
      return (item: any, index?: number, column?: IColumn) => {
        return <a href={item[field.linkPropertyName]}>{item[column.fieldName]}</a>;
      };
    }
  }

  /**
   * Check if sorting needs to be set to the column
   * @param ev
   * @param column
   */
  private _columnClick(ev: React.MouseEvent<HTMLElement>, column: IColumn): void {
    // Find the field in the viewFields list
    const columnIdx = findIndex(this.props.viewFields, field => field.name === column.key);
    // Check if the field has been found
    if (columnIdx !== -1) {
      const field = this.props.viewFields[columnIdx];
      // Check if the field needs to be sorted
      if (has(field, 'sorting')) {
        // Check if the sorting option is true
        if (field.sorting) {
          const sortDescending = typeof column.isSortedDescending === 'undefined' ? false : !column.isSortedDescending;
          const sortedItems = this._sortItems(this.state.items, column.key, sortDescending);
          // Update the columns
          const sortedColumns = this.state.columns.map(c => {
            if (c.key === column.key) {
              c.isSortedDescending = sortDescending;
              c.isSorted = true;
            } else {
              c.isSorted = false;
              c.isSortedDescending = false;
            }
            return c;
          });
          // Update the grouping
          const groupedItems = this._getGroups(sortedItems, this.props.groupByFields);
          // Update the items and columns
          this.setState({
            items: groupedItems.groups.length > 0 ? groupedItems.items : sortedItems,
            columns: sortedColumns,
            groups: groupedItems.groups.length > 0 ? groupedItems.groups : null,
          });
        }
      }
    }
  }

  /**
   * Sort the list of items by the clicked column
   * @param items
   * @param columnName
   * @param descending
   */
  private _sortItems(items: any[], columnName: string, descending = false): any[] {
    // Sort the items
    const ascItems = sortBy(items, [columnName]);
    const sortedItems = descending ? ascItems.reverse() : ascItems;

    // Check if selection needs to be updated
    if (this._selection) {
      const selection = this._selection.getSelection();
      if (selection && selection.length > 0) {
        // Clear selection
        this._selection.setItems([], true);
        setTimeout(() => {
          // Find new index
          let idxs: number[] = selection.map(item => findIndex(sortedItems, item));
          idxs.forEach(idx => this._selection.setIndexSelected(idx, true, false));
        }, 0);
      }
    }

    // Return the sorted items list
    return sortedItems;
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IListViewProps> {
    let groupProps: IGroupRenderProps = {};
    // Check if selection mode is single selection,
    // if that is the case, disable the selection on grouping headers
    if (this.props.selectionMode === SelectionMode.single) {
      groupProps = {
        headerProps: {
          onToggleSelectGroup: () => null,
          onGroupHeaderClick: () => null,
        }
      };
    }

    return (
      <div>
        <DetailsList
          items={this.state.items}
          columns={this.state.columns}
          groups={this.state.groups}
          selectionMode={this.props.selectionMode || SelectionMode.none}
          selection={this._selection}
          layoutMode={DetailsListLayoutMode.justified}
          compact={this.props.compact}
          setKey="ListViewControl"
          groupProps={groupProps} />
      </div>
    );
  }
}
