import * as React from "react";
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import { IListViewProps, IListViewState, IViewField } from "./IListView";
import { IColumn } from "office-ui-fabric-react/lib/components/DetailsList";
import { findIndex, has, sortBy, isEqual, cloneDeep } from '@microsoft/sp-lodash-subset';
import { FileTypeIcon, IconType } from "../fileTypeIcon/index";

/**
 * File type icon component
 */
export class ListView extends React.Component<IListViewProps, IListViewState> {
  private _selection: Selection;

  constructor(props: IListViewProps) {
    super(props);

    // Initialize state
    this.state = {
      items: []
    };

    // Binding the functions
    this._columnClick = this._columnClick.bind(this);

    if (typeof this.props.selection !== "undefined" && this.props.selection !== null) {
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
    if (!isEqual(prevProps, this.props)) {
      this._processProperties();
    }
  }

  /**
   * Process all the component properties
   */
  private _processProperties() {
    let tempState: IListViewState = cloneDeep(this.state);
    let columns: IColumn[] = null;
    // Check if a set of items was provided
    if (typeof this.props.items !== "undefined" && this.props.items !== null) {
      tempState.items = this._flattenItems(this.props.items);
    }

    // Check if an icon needs to be shown
    if (typeof this.props.iconFieldName !== "undefined" && this.props.iconFieldName !== null) {
      if (columns === null) { columns = []; }
      const iconColumn = this._createIconColumn(this.props.iconFieldName);
      columns.push(iconColumn);
    }

    // Check if view fields were provided
    if (typeof this.props.viewFields !== "undefined" && this.props.viewFields !== null) {
      if (columns === null) { columns = []; }
      columns = this._createColumns(this.props.viewFields, columns);
    }

    // Add the columns to the temporary state
    tempState.columns = columns;
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
      if (has(field, "sorting")) {
        // Check if the sorting option is true
        if (field.sorting) {
          const sortDescending = typeof column.isSortedDescending === "undefined" ? false : !column.isSortedDescending;
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
          // Update the items and columns
          this.setState({
            items: sortedItems,
            columns: sortedColumns
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
    const ascItems = sortBy(items, [columnName]);
    return descending ? ascItems.reverse() : ascItems;
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<IListViewProps> {
    return (
      <div>
        <DetailsList
          items={this.state.items}
          columns={this.state.columns}
          selectionMode={this.props.selectionMode || SelectionMode.none}
          selection={this._selection}
          layoutMode={DetailsListLayoutMode.justified}
          compact={this.props.compact} />
      </div>
    );
  }
}
