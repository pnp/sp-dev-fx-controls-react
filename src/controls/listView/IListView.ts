import { IColumn, IGroup, SelectionMode, IDetailsRowProps } from '@fluentui/react/lib/components/DetailsList';

export { SelectionMode };

export enum GroupOrder {
  ascending = 1,
  descending
}

export interface IListViewProps {
  /**
  * Specify if drag and drop option is selected.
  **/
  dragDropFiles?: boolean;
  /**
  * Handler to return the files from drag and drop.
  **/
  onDrop?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Specify the name of the file URL path which will be used to show the file icon.
   */
  iconFieldName?: string;
  /**
   * The items to render.
   */
  items?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * The fields you want to view in your list view
   */
  viewFields?: IViewField[];
  /**
   * The fields you want to group your list view by
   */
  groupByFields?: IGrouping[];
  /**
   * Boolean value to indicate if the component should render in compact mode.
   * Set to false by default
   */
  compact?: boolean;
  /**
   * Specify the item selection mode.
   * By default this is set to none.
   */
  selectionMode?: SelectionMode;
  /**
   * Selection event that passes the selected item(s)
   */
  selection?: (items: any[]) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * The index of the items to be select by default
   */
  defaultSelection?: number[];
  /**
   * Specify the placeholder for the filter text box. Default 'Search'
   */
  filterPlaceHolder?: string;
  /**
   * Specify if the filter text box should be rendered.
   */
  showFilter?: boolean;
  /**
   * Specify the initial filter to be applied to the list.
   */
  defaultFilter?: string;
    /**
   * Boolean value to create a fixed/sticky header.
   * Set to false by default
   */
  stickyHeader?: boolean;
  /**
   * Callback to override the default row rendering.
   */
  onRenderRow?: (props: IDetailsRowProps) => JSX.Element | undefined;
   /**
   * Class name to apply additional styles on list view wrapper
   */
  className?: string;
  /**
   * Class name to apply additional styles on list view
   */
  listClassName?: string;
  /**
   * Custom sorting function.
   * @returns sorted collection of items
   */
  sortItems?: (items: any[], columnName: string, descending: boolean) => any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IListViewState {
  /**
   * Current value of the filter input
   */
  filterValue?: string;
  /**
   * The items to render.
   */
  items?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Given column defitions.
   * If none are provided, default columns will be created based on the item's properties.
   */
  columns?: IColumn[];

  groups?: IGroup[];

}

export interface IGrouping {
  name: string;
  order: GroupOrder;
}

export interface IGroupsItems {
  items: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  groups: IGroup[];
}

export interface IViewField {

  /**
   * Name of the field
   */
  name: string;
  /**
   * Name of the field that will be used as the column title
   */
  displayName?: string;
  /**
   * Specify the field name that needs to be used to render a link
   */
  linkPropertyName?: string;
  /**
   * Specify if you want to enable column sorting
   */
  sorting?: boolean;
  /**
   * Specify the minimum width of the column
   */
  minWidth?: number;
  /**
   * Specify the maximum width of the column
   */
  maxWidth?: number;
  /**
   * Determines if the column can be resized.
   */
  isResizable?: boolean;
  /**
   * Override the render method of the field
   */
  render?: (item?: any, index?: number, column?: IColumn) => any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
