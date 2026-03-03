import * as React from 'react';
import { IListViewProps, IListViewState } from './IListView';
/**
 * File type icon component
 */
export declare class ListView extends React.Component<IListViewProps, IListViewState> {
    private _selection;
    private originalItems;
    private originalGroups;
    private originalColumns;
    constructor(props: IListViewProps);
    /**
     * Lifecycle hook when component is mounted
     */
    componentDidMount(): void;
    /**
     * Lifecycle hook when component did update after state or property changes
     * @param prevProps
     * @param prevState
     */
    UNSAFE_componentWillReceiveProps(nextProps: IListViewProps): void;
    /**
     * Select all the items that should be selected by default
     */
    private _setSelectedItems;
    /**
     * Specify result grouping for the list rendering
     * @param items
     * @param groupByFields
     */
    private _getGroups;
    /**
     * Process all the component properties
     */
    private _processProperties;
    /**
     * Flatten all objects in every item
     * @param items
     */
    private _flattenItems;
    /**
     * Flatten all object in the item
     * @param item
     */
    private _flattenItem;
    /**
     * Create an icon column rendering
     * @param iconField
     */
    private _createIconColumn;
    /**
     * Returns required set of columns for the list view
     * @param viewFields
     */
    private _createColumns;
    /**
     * Check how field needs to be rendered
     * @param field
     */
    private _fieldRender;
    /**
     * Check if sorting needs to be set to the column
     * @param ev
     * @param column
     */
    private _columnClick;
    /**
     * Method updates the controlled value of the filter field
     * @param newValue
     */
    private _updateFilterValue;
    /**
     * Sort the list of items by the clicked column
     * @param items
     * @param columnName
     * @param descending
     */
    private _sortItems;
    /**
     * Executes filtering. Method tries to indicate if filtering should be executed on a single or all columns.
     * @param filterValue
     * @param items
     * @param columns
     */
    private _executeFiltering;
    /**
     * Execute filtering on the provided data set and columns
     * @param filterValue
     * @param items
     * @param columns
     */
    private _getFilteredItems;
    /**
     * Check if the item contains property with proper value
     * @param item
     * @param property
     * @param filterValue
     */
    private _doesPropertyContainsValue;
    private _filterFunctions;
    /**
    * Custom render of header
    * @param props
    * @param defaultRender
    */
    private _onRenderDetailsHeader;
    /**
     * Default React component render method
     */
    render(): React.ReactElement<IListViewProps>;
}
//# sourceMappingURL=ListView.d.ts.map