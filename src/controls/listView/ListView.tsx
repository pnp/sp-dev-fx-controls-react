import * as React from 'react';

import { ScrollablePane, ScrollbarVisibility } from '@fluentui/react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from '@fluentui/react/lib/Sticky';
import { IRenderFunction } from '@fluentui/react/lib/Utilities';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IGroup, IDetailsHeaderProps } from '@fluentui/react/lib/DetailsList';
import { IListViewProps, IListViewState, IViewField, IGrouping, GroupOrder } from './IListView';
import { IColumn, IGroupRenderProps } from '@fluentui/react/lib/components/DetailsList';
import { findIndex, has, sortBy, isEqual, cloneDeep } from '@microsoft/sp-lodash-subset';
import { FileTypeIcon, IconType } from '../fileTypeIcon/index';
import * as strings from 'ControlStrings';
import { IGroupsItems } from './IListView';
import * as telemetry from '../../common/telemetry';
import { DragDropFiles } from "../dragDropFiles";

import filter from 'lodash/filter';
import omit from 'lodash/omit';
import functions from 'lodash/functions';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Guid } from '@microsoft/sp-core-library';

const classNames = mergeStyleSets({
  wrapper: {
    height: '50vh',
    position: 'relative'
  }
});

/**
* Wrap the listview in a scrollable pane if sticky header = true
*/
const ListViewWrapper: ({ stickyHeader, children, className }: {
  stickyHeader: boolean;
  children: React.ReactNode;
  className: string | undefined;
}) => JSX.Element = ({ stickyHeader, children, className }) => (stickyHeader ?
  <div className={`${classNames.wrapper} ${className ?? ""}`} >
    <ScrollablePane scrollbarVisibility={ScrollbarVisibility.auto}>
      {children}
    </ScrollablePane>
  </div>
  : <>{children}</>
);

/**
* Lock the searchbox when scrolling if sticky header = true
*/
const SearchBoxWrapper: ({ stickyHeader, children }: {
  stickyHeader: boolean;
  children: React.ReactNode;
}) => JSX.Element = ({ stickyHeader, children }) => (stickyHeader ?
  <Sticky stickyPosition={StickyPositionType.Header}>
    {children}
  </Sticky>
  : <>{children}</>
);


/**
 * File type icon component
 */
export class ListView extends React.Component<IListViewProps, IListViewState> {
  private _selection: Selection;
  private originalItems: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  private originalGroups: IGroup[];
  private originalColumns: IColumn[];

  constructor(props: IListViewProps) {
    super(props);

    telemetry.track('ReactListView', {
      viewFields: !!props.viewFields,
      groupByFields: !!props.groupByFields,
      selectionMode: !!props.selectionMode,
      selection: !!props.selection,
      defaultSelection: !!props.defaultSelection
    });

    // Initialize state
    this.state = {
      filterValue: this.props.defaultFilter
    };

    if (this.props.selection) {
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
    this._processProperties(this.props);
  }

  /**
   * Lifecycle hook when component did update after state or property changes
   * @param prevProps
   * @param prevState
   */
  public UNSAFE_componentWillReceiveProps(nextProps: IListViewProps): void {

    const modifiedNextProps = this._filterFunctions(nextProps);
    const modifiedProps = this._filterFunctions(this.props);

    if (!isEqual(modifiedProps, modifiedNextProps)) {
      // Reset the selected items
      if (this._selection) {
        if (!isEqual(modifiedNextProps.items, modifiedProps.items)) {
          this._selection.setItems(nextProps.items, true);
        }
        if (!isEqual(modifiedNextProps.defaultSelection, modifiedProps.defaultSelection)) {
          this._selection.setAllSelected(false);
          // select default items
          this._setSelectedItems(nextProps);
        }
      }
      // Process list view properties
      this._processProperties(nextProps);
    }
  }

  /**
   * Select all the items that should be selected by default
   */
  private _setSelectedItems(props: IListViewProps): void {
    if (props.items &&
      props.items.length > 0 &&
      props.defaultSelection &&
      props.defaultSelection.length > 0) {
      for (const index of props.defaultSelection) {
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
  private _getGroups(items: any[], groupByFields: IGrouping[], level: number = 0, startIndex: number = 0): IGroupsItems { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Group array which stores the configured grouping
    const groups: IGroup[] = [];
    const updatedItemsOrder: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
    // Check if there are groupby fields set
    if (groupByFields) {
      const groupField = groupByFields[level];
      // Check if grouping is configured
      if (groupByFields && groupByFields.length > 0) {
        // Create grouped items object
        const groupedItems = {};
        items.forEach((item: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
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
          if (!Object.prototype.hasOwnProperty.call(sortedGroups, groupItems)) {
            continue;
          }
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
  private _processProperties(props: IListViewProps): void {
    const { items, iconFieldName, viewFields, groupByFields, showFilter } = props;

    const tempState: IListViewState = cloneDeep(this.state);
    let columns: IColumn[] = null;
    // Check if a set of items was provided
    if (typeof items !== 'undefined' && items !== null) {
      tempState.items = this._flattenItems(items);
    }

    // Check if an icon needs to be shown
    if (iconFieldName) {
      if (columns === null) { columns = []; }
      const iconColumn = this._createIconColumn(iconFieldName);
      columns.push(iconColumn);
    }

    // Check if view fields were provided
    if (viewFields) {
      if (columns === null) { columns = []; }
      columns = this._createColumns(viewFields, columns);
    }

    // Add the columns to the temporary state
    tempState.columns = columns;

    if (tempState.items) {
      // Add grouping to the list view
      const grouping = this._getGroups(tempState.items, groupByFields);
      if (grouping.groups.length > 0) {
        tempState.groups = grouping.groups;
        // Update the items
        tempState.items = grouping.items;
      } else {
        tempState.groups = null;
      }
    }

    // Store the original items and groups objects
    this.originalItems = tempState.items;
    this.originalGroups = tempState.groups;
    this.originalColumns = tempState.columns;

    // Check if component needs to be filtered
    const { filterValue } = this.state;
    if (filterValue && showFilter) {
      this.setState({
        columns: tempState.columns
      });
      this._updateFilterValue(filterValue);
    } else {
      // Update the current component state with the new values
      this.setState(tempState);
    }
  }

  /**
   * Flatten all objects in every item
   * @param items
   */
  private _flattenItems(items: any[]): any[] { // eslint-disable-line @typescript-eslint/no-explicit-any
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
  private _flattenItem(item: any): any { // eslint-disable-line @typescript-eslint/no-explicit-any
    const flatItem: any = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
    for (const parentPropName in item) {
      // Check if property already exists
      if (!Object.prototype.hasOwnProperty.call(item, parentPropName)) continue;

      // Check if the property is of type object
      if ((typeof item[parentPropName]) === 'object') {
        // Flatten every object
        const flatObject = this._flattenItem(item[parentPropName]);
        for (const childPropName in flatObject) {
          if (!Object.prototype.hasOwnProperty.call(flatObject, childPropName)) continue;
          flatItem[`${parentPropName}.${childPropName}`] = flatObject[childPropName];
        }
      } else {
        flatItem[parentPropName] = item[parentPropName];
      }
    }

    if (!flatItem.key) {
      flatItem.key = flatItem.ID || flatItem.Id;

      if (!flatItem.key) {
        flatItem.key = Guid.newGuid().toString();
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
      onRender: (item: any): any => { // eslint-disable-line @typescript-eslint/no-explicit-any
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
        isResizable: field.isResizable,
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
  private _fieldRender(field: IViewField): any | void { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Check if a render function is specified
    if (field.render) {
      return field.render;
    }

    // Check if the URL property is specified
    if (field.linkPropertyName) {
      return (item: any, index?: number, column?: IColumn) => { // eslint-disable-line @typescript-eslint/no-explicit-any
        return <a href={item[field.linkPropertyName]}>{item[column.fieldName]}</a>;
      };
    }
  }

  /**
   * Check if sorting needs to be set to the column
   * @param ev
   * @param column
   */
  private _columnClick = (ev: React.MouseEvent<HTMLElement>, column: IColumn): void => {
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
   * Method updates the controlled value of the filter field
   * @param newValue
   */
  private _updateFilterValue = (filterValue: string): void => {
    let items = cloneDeep(this.originalItems);
    let groups = cloneDeep(this.originalGroups);
    const columns = cloneDeep(this.originalColumns);

    // Check if a value is provided, otherwise revert back to the original list of items
    if (filterValue && items && items.length > 0) {
      items = this._executeFiltering(filterValue, items, columns);
      const grouping = this._getGroups(items, this.props.groupByFields);

      // Update grouping
      if (grouping.groups.length > 0) {
        groups = grouping.groups;
        // Update the items
        items = grouping.items;
      } else {
        groups = null;
      }
    }

    this.setState({
      filterValue,
      items,
      groups
    });
  }

  /**
   * Sort the list of items by the clicked column
   * @param items
   * @param columnName
   * @param descending
   */
  private _sortItems(items: any[], columnName: string, descending = false): any[] { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (this.props.sortItems) {
      return this.props.sortItems(items, columnName, descending);
    }
    // Sort the items
    const ascItems = sortBy(items, [columnName]);
    const sortedItems = descending ? ascItems.reverse() : ascItems;

    // Return the sorted items list
    return sortedItems;
  }

  /**
   * Executes filtering. Method tries to indicate if filtering should be executed on a single or all columns.
   * @param filterValue
   * @param items
   * @param columns
   */
  private _executeFiltering(filterValue: string, items: any[], columns: IColumn[]): any[] { // eslint-disable-line @typescript-eslint/no-explicit-any
    const filterSeparator = ":";

    let filterColumns = [...columns];
    if (filterValue && filterValue.indexOf(filterSeparator) >= 0) {
      const columnName = filterValue.split(filterSeparator)[0];
      filterValue = filterValue.split(filterSeparator)[1];

      filterColumns = filter(columns, column => column.fieldName === columnName || column.name === columnName);
    }

    return this._getFilteredItems(filterValue, items, filterColumns);
  }

  /**
   * Execute filtering on the provided data set and columns
   * @param filterValue
   * @param items
   * @param columns
   */
  private _getFilteredItems(filterValue: string, items: any[], columns: IColumn[]): any[] { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!filterValue) {
      return items;
    }

    const result: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
    for (const item of items) {
      let addItemToResultSet: boolean = false;
      for (const viewField of columns) {
        if (this._doesPropertyContainsValue(item, viewField.fieldName, filterValue)) {
          addItemToResultSet = true;
          break;
        }
        if (this._doesPropertyContainsValue(item, viewField.name, filterValue)) {
          addItemToResultSet = true;
          break;
        }
      }

      if (addItemToResultSet) {
        result.push(item);
      }
    }

    return result;
  }

  /**
   * Check if the item contains property with proper value
   * @param item
   * @param property
   * @param filterValue
   */
  private _doesPropertyContainsValue(item: any, property: string, filterValue: string): boolean { // eslint-disable-line @typescript-eslint/no-explicit-any
    const propertyValue = item[property];
    let result = false;
    if (propertyValue) {
      // Case insensitive
      result = propertyValue.toString().toLowerCase().indexOf(filterValue.toLowerCase()) >= 0;
    }

    return result;
  }

  private _filterFunctions(p: IListViewProps): Partial<IListViewProps> {
    const modifiedProps = omit(p, functions(p));
    if (modifiedProps.items) {
      modifiedProps.items = modifiedProps.items.map(i => omit(i, functions(i)));
    }
    if (modifiedProps.viewFields) {
      modifiedProps.viewFields = modifiedProps.viewFields.map(vf => omit(vf, functions(vf)) as IViewField);
    }
    return modifiedProps;
  }

  /**
  * Custom render of header
  * @param props
  * @param defaultRender
  */
  private _onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = (props, defaultRender) => {
    if (!props) {
      return null;
    }

    if (this.props.stickyHeader) {
      return (
        <Sticky stickyPosition={StickyPositionType.Header} isScrollSynced>
          {defaultRender({
            ...props,
          })}
        </Sticky>
      );
    }

    return defaultRender(props);
  }
  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IListViewProps> {
    let groupProps: IGroupRenderProps = {};

    const { showFilter, filterPlaceHolder, dragDropFiles, stickyHeader, selectionMode, compact, className, listClassName, onRenderRow } = this.props;
    const { filterValue, items, columns, groups } = this.state;

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
      <ListViewWrapper stickyHeader={!!stickyHeader} className={className}>
        <DragDropFiles enable={dragDropFiles}
          iconName="BulkUpload"
          labelMessage={strings.UploadFileHeader}
          onDrop={
            dragDropFiles ?
              (files) => {
                this.props.onDrop(files);
              } : []
          } >
          {
            showFilter &&
            <SearchBoxWrapper stickyHeader={!!stickyHeader}>
              <SearchBox placeholder={filterPlaceHolder || strings.ListViewFilterLabel} onSearch={this._updateFilterValue} onChange={(e, value) => this._updateFilterValue(value)} value={filterValue} />
            </SearchBoxWrapper>
          }
          {!!items && <DetailsList
            key="ListViewControl"
            items={items}
            columns={columns}
            groups={groups}
            selectionMode={selectionMode || SelectionMode.none}
            selectionPreservedOnEmptyClick={true}
            selection={this._selection}
            layoutMode={DetailsListLayoutMode.justified}
            compact={compact}
            setKey='ListViewControl'
            groupProps={groupProps}
            className={listClassName}
            onRenderDetailsHeader={this._onRenderDetailsHeader}
            onRenderRow={onRenderRow}
            componentRef={ref => {
              if (ref) {
                ref.forceUpdate();
              }
            }}
          />}
        </DragDropFiles>
      </ListViewWrapper>
    );
  }
}
