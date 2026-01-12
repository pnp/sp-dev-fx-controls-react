var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import { ScrollablePane, ScrollbarVisibility } from '@fluentui/react/lib/ScrollablePane';
import { Sticky, StickyPositionType } from '@fluentui/react/lib/Sticky';
import { mergeStyleSets } from '@fluentui/react/lib/Styling';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode } from '@fluentui/react/lib/DetailsList';
import { GroupOrder } from './IListView';
import { findIndex, has, sortBy, isEqual, cloneDeep } from '@microsoft/sp-lodash-subset';
import { FileTypeIcon, IconType } from '../fileTypeIcon/index';
import * as strings from 'ControlStrings';
import * as telemetry from '../../common/telemetry';
import { DragDropFiles } from "../dragDropFiles";
import filter from 'lodash/filter';
import omit from 'lodash/omit';
import functions from 'lodash/functions';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Guid } from '@microsoft/sp-core-library';
var classNames = mergeStyleSets({
    wrapper: {
        height: '50vh',
        position: 'relative'
    }
});
/**
* Wrap the listview in a scrollable pane if sticky header = true
*/
var ListViewWrapper = function (_a) {
    var stickyHeader = _a.stickyHeader, children = _a.children, className = _a.className;
    return (stickyHeader ?
        React.createElement("div", { className: "".concat(classNames.wrapper, " ").concat(className !== null && className !== void 0 ? className : "") },
            React.createElement(ScrollablePane, { scrollbarVisibility: ScrollbarVisibility.auto }, children))
        : React.createElement(React.Fragment, null, children));
};
/**
* Lock the searchbox when scrolling if sticky header = true
*/
var SearchBoxWrapper = function (_a) {
    var stickyHeader = _a.stickyHeader, children = _a.children;
    return (stickyHeader ?
        React.createElement(Sticky, { stickyPosition: StickyPositionType.Header }, children)
        : React.createElement(React.Fragment, null, children));
};
/**
 * File type icon component
 */
var ListView = /** @class */ (function (_super) {
    __extends(ListView, _super);
    function ListView(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Check if sorting needs to be set to the column
         * @param ev
         * @param column
         */
        _this._columnClick = function (ev, column) {
            // Find the field in the viewFields list
            var columnIdx = findIndex(_this.props.viewFields, function (field) { return field.name === column.key; });
            // Check if the field has been found
            if (columnIdx !== -1) {
                var field = _this.props.viewFields[columnIdx];
                // Check if the field needs to be sorted
                if (has(field, 'sorting')) {
                    // Check if the sorting option is true
                    if (field.sorting) {
                        var sortDescending_1 = typeof column.isSortedDescending === 'undefined' ? false : !column.isSortedDescending;
                        var sortedItems = _this._sortItems(_this.state.items, column.key, sortDescending_1);
                        // Update the columns
                        var sortedColumns = _this.state.columns.map(function (c) {
                            if (c.key === column.key) {
                                c.isSortedDescending = sortDescending_1;
                                c.isSorted = true;
                            }
                            else {
                                c.isSorted = false;
                                c.isSortedDescending = false;
                            }
                            return c;
                        });
                        // Update the grouping
                        var groupedItems = _this._getGroups(sortedItems, _this.props.groupByFields);
                        // Update the items and columns
                        _this.setState({
                            items: groupedItems.groups.length > 0 ? groupedItems.items : sortedItems,
                            columns: sortedColumns,
                            groups: groupedItems.groups.length > 0 ? groupedItems.groups : null,
                        });
                    }
                }
            }
        };
        /**
         * Method updates the controlled value of the filter field
         * @param newValue
         */
        _this._updateFilterValue = function (filterValue) {
            var items = cloneDeep(_this.originalItems);
            var groups = cloneDeep(_this.originalGroups);
            var columns = cloneDeep(_this.originalColumns);
            // Check if a value is provided, otherwise revert back to the original list of items
            if (filterValue && items && items.length > 0) {
                items = _this._executeFiltering(filterValue, items, columns);
                var grouping = _this._getGroups(items, _this.props.groupByFields);
                // Update grouping
                if (grouping.groups.length > 0) {
                    groups = grouping.groups;
                    // Update the items
                    items = grouping.items;
                }
                else {
                    groups = null;
                }
            }
            _this.setState({
                filterValue: filterValue,
                items: items,
                groups: groups
            });
        };
        /**
        * Custom render of header
        * @param props
        * @param defaultRender
        */
        _this._onRenderDetailsHeader = function (props, defaultRender) {
            if (!props) {
                return null;
            }
            if (_this.props.stickyHeader) {
                return (React.createElement(Sticky, { stickyPosition: StickyPositionType.Header, isScrollSynced: true }, defaultRender(__assign({}, props))));
            }
            return defaultRender(props);
        };
        telemetry.track('ReactListView', {
            viewFields: !!props.viewFields,
            groupByFields: !!props.groupByFields,
            selectionMode: !!props.selectionMode,
            selection: !!props.selection,
            defaultSelection: !!props.defaultSelection
        });
        // Initialize state
        _this.state = {
            filterValue: _this.props.defaultFilter
        };
        if (_this.props.selection) {
            // Initialize the selection
            _this._selection = new Selection({
                // Create the event handler when a selection changes
                onSelectionChanged: function () { return _this.props.selection(_this._selection.getSelection()); }
            });
        }
        return _this;
    }
    /**
     * Lifecycle hook when component is mounted
     */
    ListView.prototype.componentDidMount = function () {
        this._processProperties(this.props);
    };
    /**
     * Lifecycle hook when component did update after state or property changes
     * @param prevProps
     * @param prevState
     */
    ListView.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var modifiedNextProps = this._filterFunctions(nextProps);
        var modifiedProps = this._filterFunctions(this.props);
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
    };
    /**
     * Select all the items that should be selected by default
     */
    ListView.prototype._setSelectedItems = function (props) {
        if (props.items &&
            props.items.length > 0 &&
            props.defaultSelection &&
            props.defaultSelection.length > 0) {
            for (var _i = 0, _a = props.defaultSelection; _i < _a.length; _i++) {
                var index = _a[_i];
                if (index > -1) {
                    this._selection.setIndexSelected(index, true, false);
                }
            }
        }
    };
    /**
     * Specify result grouping for the list rendering
     * @param items
     * @param groupByFields
     */
    ListView.prototype._getGroups = function (items, groupByFields, level, startIndex) {
        if (level === void 0) { level = 0; }
        if (startIndex === void 0) { startIndex = 0; }
        // Group array which stores the configured grouping
        var groups = [];
        var updatedItemsOrder = []; // eslint-disable-line @typescript-eslint/no-explicit-any
        // Check if there are groupby fields set
        if (groupByFields) {
            var groupField_1 = groupByFields[level];
            // Check if grouping is configured
            if (groupByFields && groupByFields.length > 0) {
                // Create grouped items object
                var groupedItems_1 = {};
                items.forEach(function (item) {
                    var groupName = item[groupField_1.name];
                    // Check if the group name exists
                    if (typeof groupName === "undefined") {
                        // Set the default empty label for the field
                        groupName = strings.ListViewGroupEmptyLabel;
                    }
                    // Check if group name is a number, this can cause sorting issues
                    if (typeof groupName === "number") {
                        groupName = "".concat(groupName, ".");
                    }
                    // Check if current group already exists
                    if (typeof groupedItems_1[groupName] === "undefined") {
                        // Create a new group of items
                        groupedItems_1[groupName] = [];
                    }
                    groupedItems_1[groupName].push(item);
                });
                // Sort the grouped items object by its key
                var sortedGroups_1 = {};
                var groupNames = Object.keys(groupedItems_1);
                groupNames = groupField_1.order === GroupOrder.ascending ? groupNames.sort() : groupNames.sort().reverse();
                groupNames.forEach(function (key) {
                    sortedGroups_1[key] = groupedItems_1[key];
                });
                // Loop over all the groups
                for (var groupItems in sortedGroups_1) {
                    if (!Object.prototype.hasOwnProperty.call(sortedGroups_1, groupItems)) {
                        continue;
                    }
                    // Retrieve the total number of items per group
                    var totalItems = groupedItems_1[groupItems].length;
                    // Create the new group
                    var group = {
                        name: groupItems === "undefined" ? strings.ListViewGroupEmptyLabel : groupItems,
                        key: groupItems === "undefined" ? strings.ListViewGroupEmptyLabel : groupItems,
                        startIndex: startIndex,
                        count: totalItems,
                    };
                    // Check if child grouping available
                    if (groupByFields[level + 1]) {
                        // Get the child groups
                        var subGroup = this._getGroups(groupedItems_1[groupItems], groupByFields, (level + 1), startIndex);
                        subGroup.items.forEach(function (item) {
                            updatedItemsOrder.push(item);
                        });
                        group.children = subGroup.groups;
                    }
                    else {
                        // Add the items to the updated items order array
                        groupedItems_1[groupItems].forEach(function (item) {
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
            groups: groups
        };
    };
    /**
     * Process all the component properties
     */
    ListView.prototype._processProperties = function (props) {
        var items = props.items, iconFieldName = props.iconFieldName, viewFields = props.viewFields, groupByFields = props.groupByFields, showFilter = props.showFilter;
        var tempState = cloneDeep(this.state);
        var columns = null;
        // Check if a set of items was provided
        if (typeof items !== 'undefined' && items !== null) {
            tempState.items = props.flattenItems === undefined || props.flattenItems ? this._flattenItems(items) : items;
        }
        // Check if an icon needs to be shown
        if (iconFieldName) {
            if (columns === null) {
                columns = [];
            }
            var iconColumn = this._createIconColumn(iconFieldName);
            columns.push(iconColumn);
        }
        // Check if view fields were provided
        if (viewFields) {
            if (columns === null) {
                columns = [];
            }
            columns = this._createColumns(viewFields, columns);
        }
        // Add the columns to the temporary state
        tempState.columns = columns;
        if (tempState.items) {
            // Add grouping to the list view
            var grouping = this._getGroups(tempState.items, groupByFields);
            if (grouping.groups.length > 0) {
                tempState.groups = grouping.groups;
                // Update the items
                tempState.items = grouping.items;
            }
            else {
                tempState.groups = null;
            }
        }
        // Store the original items and groups objects
        this.originalItems = tempState.items;
        this.originalGroups = tempState.groups;
        this.originalColumns = tempState.columns;
        // Check if component needs to be filtered
        var filterValue = this.state.filterValue;
        if (filterValue && showFilter) {
            this.setState({
                columns: tempState.columns
            });
            this._updateFilterValue(filterValue);
        }
        else {
            // Update the current component state with the new values
            this.setState(tempState);
        }
    };
    /**
     * Flatten all objects in every item
     * @param items
     */
    ListView.prototype._flattenItems = function (items) {
        var _this = this;
        // Flatten items
        var flattenItems = items.map(function (item) {
            // Flatten all objects in the item
            return _this._flattenItem(item);
        });
        return flattenItems;
    };
    /**
     * Flatten all object in the item
     * @param item
     */
    ListView.prototype._flattenItem = function (item) {
        var flatItem = {}; // eslint-disable-line @typescript-eslint/no-explicit-any
        for (var parentPropName in item) {
            // Check if property already exists
            if (!Object.prototype.hasOwnProperty.call(item, parentPropName))
                continue;
            // Check if the property is of type object
            if ((typeof item[parentPropName]) === 'object') {
                // Flatten every object
                var flatObject = this._flattenItem(item[parentPropName]);
                for (var childPropName in flatObject) {
                    if (!Object.prototype.hasOwnProperty.call(flatObject, childPropName))
                        continue;
                    flatItem["".concat(parentPropName, ".").concat(childPropName)] = flatObject[childPropName];
                }
            }
            else {
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
    };
    /**
     * Create an icon column rendering
     * @param iconField
     */
    ListView.prototype._createIconColumn = function (iconFieldName) {
        return {
            key: 'fileType',
            name: 'File Type',
            iconName: 'Page',
            isIconOnly: true,
            fieldName: 'fileType',
            minWidth: 16,
            maxWidth: 16,
            onRender: function (item) {
                return (React.createElement(FileTypeIcon, { type: IconType.image, path: item[iconFieldName] }));
            }
        };
    };
    /**
     * Returns required set of columns for the list view
     * @param viewFields
     */
    ListView.prototype._createColumns = function (viewFields, crntColumns) {
        var _this = this;
        viewFields.forEach(function (field) {
            crntColumns.push({
                key: field.name,
                name: field.displayName || field.name,
                fieldName: field.name,
                minWidth: field.minWidth || 50,
                maxWidth: field.maxWidth,
                isResizable: field.isResizable,
                onRender: _this._fieldRender(field),
                onColumnClick: _this._columnClick
            });
        });
        return crntColumns;
    };
    /**
     * Check how field needs to be rendered
     * @param field
     */
    ListView.prototype._fieldRender = function (field) {
        // Check if a render function is specified
        if (field.render) {
            return field.render;
        }
        // Check if the URL property is specified
        if (field.linkPropertyName) {
            return function (item, index, column) {
                return React.createElement("a", { href: item[field.linkPropertyName] }, item[column.fieldName]);
            };
        }
    };
    /**
     * Sort the list of items by the clicked column
     * @param items
     * @param columnName
     * @param descending
     */
    ListView.prototype._sortItems = function (items, columnName, descending) {
        if (descending === void 0) { descending = false; }
        if (this.props.sortItems) {
            return this.props.sortItems(items, columnName, descending);
        }
        // Sort the items
        var ascItems = sortBy(items, [columnName]);
        var sortedItems = descending ? ascItems.reverse() : ascItems;
        // Return the sorted items list
        return sortedItems;
    };
    /**
     * Executes filtering. Method tries to indicate if filtering should be executed on a single or all columns.
     * @param filterValue
     * @param items
     * @param columns
     */
    ListView.prototype._executeFiltering = function (filterValue, items, columns) {
        var filterSeparator = ":";
        var filterColumns = __spreadArray([], columns, true);
        if (filterValue && filterValue.indexOf(filterSeparator) >= 0) {
            var columnName_1 = filterValue.split(filterSeparator)[0];
            filterValue = filterValue.split(filterSeparator)[1];
            filterColumns = filter(columns, function (column) { return column.fieldName === columnName_1 || column.name === columnName_1; });
        }
        return this._getFilteredItems(filterValue, items, filterColumns);
    };
    /**
     * Execute filtering on the provided data set and columns
     * @param filterValue
     * @param items
     * @param columns
     */
    ListView.prototype._getFilteredItems = function (filterValue, items, columns) {
        if (!filterValue) {
            return items;
        }
        var result = []; // eslint-disable-line @typescript-eslint/no-explicit-any
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            var addItemToResultSet = false;
            for (var _a = 0, columns_1 = columns; _a < columns_1.length; _a++) {
                var viewField = columns_1[_a];
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
    };
    /**
     * Check if the item contains property with proper value
     * @param item
     * @param property
     * @param filterValue
     */
    ListView.prototype._doesPropertyContainsValue = function (item, property, filterValue) {
        var propertyValue = item[property];
        var result = false;
        if (propertyValue) {
            // Case insensitive
            result = propertyValue.toString().toLowerCase().indexOf(filterValue.toLowerCase()) >= 0;
        }
        return result;
    };
    ListView.prototype._filterFunctions = function (p) {
        var modifiedProps = omit(p, functions(p));
        if (modifiedProps.items) {
            modifiedProps.items = modifiedProps.items.map(function (i) { return omit(i, functions(i)); });
        }
        if (modifiedProps.viewFields) {
            modifiedProps.viewFields = modifiedProps.viewFields.map(function (vf) { return omit(vf, functions(vf)); });
        }
        return modifiedProps;
    };
    /**
     * Default React component render method
     */
    ListView.prototype.render = function () {
        var _this = this;
        var groupProps = {};
        var _a = this.props, showFilter = _a.showFilter, filterPlaceHolder = _a.filterPlaceHolder, dragDropFiles = _a.dragDropFiles, stickyHeader = _a.stickyHeader, selectionMode = _a.selectionMode, compact = _a.compact, className = _a.className, listClassName = _a.listClassName, onRenderRow = _a.onRenderRow;
        var _b = this.state, filterValue = _b.filterValue, items = _b.items, columns = _b.columns, groups = _b.groups;
        // Check if selection mode is single selection,
        // if that is the case, disable the selection on grouping headers
        if (this.props.selectionMode === SelectionMode.single) {
            groupProps = {
                headerProps: {
                    onToggleSelectGroup: function () { return null; },
                    onGroupHeaderClick: function () { return null; },
                }
            };
        }
        return (React.createElement(ListViewWrapper, { stickyHeader: !!stickyHeader, className: className },
            React.createElement(DragDropFiles, { enable: dragDropFiles, iconName: "BulkUpload", labelMessage: strings.UploadFileHeader, onDrop: dragDropFiles ?
                    function (files) {
                        _this.props.onDrop(files);
                    } : [] },
                showFilter &&
                    React.createElement(SearchBoxWrapper, { stickyHeader: !!stickyHeader },
                        React.createElement(SearchBox, { placeholder: filterPlaceHolder || strings.ListViewFilterLabel, onSearch: this._updateFilterValue, onChange: function (e, value) { return _this._updateFilterValue(value); }, value: filterValue })),
                !!items && React.createElement(DetailsList, { key: "ListViewControl", items: items, columns: columns, groups: groups, selectionMode: selectionMode || SelectionMode.none, selectionPreservedOnEmptyClick: true, selection: this._selection, layoutMode: DetailsListLayoutMode.justified, compact: compact, setKey: 'ListViewControl', groupProps: groupProps, className: listClassName, onRenderDetailsHeader: this._onRenderDetailsHeader, onRenderRow: onRenderRow, componentRef: function (ref) {
                        if (ref) {
                            ref.forceUpdate();
                        }
                    } }))));
    };
    return ListView;
}(React.Component));
export { ListView };
//# sourceMappingURL=ListView.js.map