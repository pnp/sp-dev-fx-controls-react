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
import { ThemeContext } from '@fluentui/react-theme-provider/lib/ThemeContext';
import uniqBy from 'lodash/uniqBy';
import * as telemetry from '../../common/telemetry';
import { getFluentUIThemeOrDefault } from '../../common/utilities/ThemeUtility';
import { SelectChildrenMode, TreeViewSelectionMode } from './ITreeViewProps';
import TreeItem from './TreeItem';
import styles from './TreeView.module.scss';
/**
 * Renders the controls for TreeItem component
 */
var TreeView = /** @class */ (function (_super) {
    __extends(TreeView, _super);
    /**
     * Constructor method
     * @param props properties interface
     */
    function TreeView(props) {
        var _this = _super.call(this, props) || this;
        _this.nodesToExpand = [];
        _this.divToInjectCssVariables = React.createRef();
        _this.pathTo = function (array, target) {
            var result;
            if (array) {
                array.some(function (_a) {
                    var key = _a.key, _b = _a.children, children = _b === void 0 ? [] : _b;
                    var alreadyExistInNodesToExpand = _this.nodesToExpand.some(function (node) { return node === key; });
                    if (key === target) {
                        if (!alreadyExistInNodesToExpand) {
                            _this.nodesToExpand.push(key);
                        }
                        result = key;
                        return true;
                    }
                    var temp = _this.pathTo(children, target);
                    if (temp) {
                        if (!alreadyExistInNodesToExpand) {
                            _this.nodesToExpand.push(key);
                        }
                        result = key + '.' + temp;
                        return true;
                    }
                });
            }
            return result;
        };
        telemetry.track('TreeView');
        _this.state = {
            loaded: true,
            defaultExpanded: props.defaultExpanded,
            activeItems: []
        };
        // Bind control events
        _this.handleTreeExpandCollapse = _this.handleTreeExpandCollapse.bind(_this);
        _this.handleOnSelect = _this.handleOnSelect.bind(_this);
        if (props.expandToSelected && props.defaultSelectedKeys) {
            props.defaultSelectedKeys.forEach(function (element) {
                _this.pathTo(props.items, element);
            });
        }
        return _this;
    }
    TreeView.prototype.getSelectedItems = function (treeItems, selectedKeys, selectedChildren) {
        var _this = this;
        var selectedItems = [];
        treeItems.forEach(function (item) {
            if (selectedKeys.indexOf(item.key) !== -1 && item.selectable !== false && !item.disabled) {
                selectedItems.push(item);
                if (selectedChildren) {
                    _this.selectAllChildren(item, selectedItems);
                }
                else {
                    if (item.children) {
                        selectedItems.push.apply(selectedItems, _this.getSelectedItems(item.children, selectedKeys, selectedChildren));
                    }
                }
            }
            else {
                if (item.children) {
                    selectedItems.push.apply(selectedItems, _this.getSelectedItems(item.children, selectedKeys, selectedChildren));
                }
            }
        });
        return selectedItems;
    };
    /**
     * Fires When expand / collapse item in TreeView
     * @argument item The expanded / collapsed item
     * @argument isExpanded The status of item  (expanded / collapsed)
     */
    TreeView.prototype.handleTreeExpandCollapse = function (item, isExpanded) {
        if (isExpanded) {
            this.nodesToExpand.push(item.key);
        }
        else {
            this.nodesToExpand = this.nodesToExpand.filter(function (node) { return node !== item.key; });
        }
        if (typeof this.props.onExpandCollapse === "function") {
            this.props.onExpandCollapse(item, isExpanded);
        }
    };
    /**
     * Selects all child nodes when parent node is selected.
     * @param item current tree item
     */
    TreeView.prototype.selectAllChildren = function (item, selectedItems) {
        var _this = this;
        if (item.children) {
            item.children.forEach(function (element) {
                if (!element.disabled && element.selectable !== false) {
                    selectedItems.push(element);
                }
                if (element.children) {
                    _this.selectAllChildren(element, selectedItems);
                }
            });
        }
    };
    /**
     * Unselects all child nodes of selected parent.
     */
    TreeView.prototype.unSelectChildren = function (item, unselectArray) {
        var _this = this;
        var tempItem = item; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (tempItem.children) {
            tempItem.children.forEach(function (element) {
                unselectArray.push(element.key);
                if (element.children) {
                    _this.unSelectChildren(element, unselectArray);
                }
            });
        }
    };
    /**
     * Fires When Tree Item is selected in TreeView
     * @argument item The selected item
     * @argument isSelected The status of item selection
     */
    TreeView.prototype.handleOnSelect = function (item, isSelected) {
        var selectedItems = this.state.activeItems;
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
            var unselectArray = [];
            unselectArray.push(item.key);
            if (this.checkIfChildrenShouldBeSelected(SelectChildrenMode.Unselect)) {
                this.unSelectChildren(item, unselectArray);
            }
            unselectArray.forEach(function (element) {
                selectedItems = selectedItems.filter(function (i) { return i.key !== element; });
            });
            this.setState({
                activeItems: selectedItems
            });
        }
        if (typeof this.props.onSelect === "function") {
            this.props.onSelect(selectedItems);
        }
    };
    TreeView.prototype.checkIfChildrenShouldBeSelected = function (testMode) {
        var selectChildrenMode = SelectChildrenMode.None;
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
    };
    TreeView.prototype.componentDidMount = function () {
        var _a = this.props, items = _a.items, defaultSelectedKeys = _a.defaultSelectedKeys;
        if (defaultSelectedKeys) {
            var selectedItems = this.getSelectedItems(items, defaultSelectedKeys, this.checkIfChildrenShouldBeSelected(SelectChildrenMode.Mount));
            this.setState({
                activeItems: selectedItems
            });
        }
    };
    TreeView.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var items = nextProps.items, defaultSelectedKeys = nextProps.defaultSelectedKeys;
        if (defaultSelectedKeys) {
            var selectedItems = this.getSelectedItems(items, defaultSelectedKeys, this.checkIfChildrenShouldBeSelected(SelectChildrenMode.Update));
            this.setState({
                activeItems: selectedItems
            });
        }
    };
    /**
     * Default React render method
     */
    TreeView.prototype.render = function () {
        var _this = this;
        var _a, _b;
        var _c = this.props, items = _c.items, selectionMode = _c.selectionMode, onRenderItem = _c.onRenderItem, showCheckboxes = _c.showCheckboxes, treeItemActionsDisplayMode = _c.treeItemActionsDisplayMode, defaultExpanded = _c.defaultExpanded, _d = _c.defaultExpandedChildren, defaultExpandedChildren = _d === void 0 ? (_a = this.props.defaultExpandedChildren) !== null && _a !== void 0 ? _a : true : _d, _e = _c.defaultExpandedKeys, defaultExpandedKeys = _e === void 0 ? (_b = this.props.defaultExpandedKeys) !== null && _b !== void 0 ? _b : [] : _e, theme = _c.theme;
        return (React.createElement("div", { ref: this.divToInjectCssVariables },
            React.createElement(ThemeContext.Consumer, null, function (contextTheme) {
                var themeToApply = getFluentUIThemeOrDefault((theme) ? theme : contextTheme);
                var div = _this.divToInjectCssVariables.current;
                if (div) {
                    div.style.setProperty("--treeview-disabledBodyText", themeToApply.semanticColors.disabledBodyText);
                    div.style.setProperty("--treeview-disabledSubtext", themeToApply.semanticColors.disabledSubtext);
                    div.style.setProperty("--treeview-listItemBackgroundHovered", themeToApply.semanticColors.listItemBackgroundHovered);
                    div.style.setProperty("--treeview-listItemBackgroundChecked", themeToApply.semanticColors.listItemBackgroundChecked);
                    div.style.setProperty("--treeview-bodySubtext", themeToApply.semanticColors.bodySubtext);
                    div.style.setProperty("--treeview-buttonBackgroundHovered", themeToApply.semanticColors.buttonBackgroundHovered);
                    div.style.setProperty("--treeview-buttonTextHovered", themeToApply.semanticColors.buttonTextHovered);
                    div.style.setProperty("--treeview-buttonBackgroundPressed", themeToApply.semanticColors.buttonBackgroundPressed);
                    div.style.setProperty("--treeview-buttonTextPressed", themeToApply.semanticColors.buttonTextPressed);
                }
                return (React.createElement("div", { className: styles.treeView }, items.map(function (treeNodeItem, index) { return (React.createElement(TreeItem, { key: treeNodeItem.key, treeItem: treeNodeItem, leftOffset: 20, isFirstRender: true, defaultExpanded: defaultExpanded, defaultExpandedChildren: defaultExpandedChildren, selectionMode: selectionMode, activeItems: _this.state.activeItems, parentCallbackExpandCollapse: _this.handleTreeExpandCollapse, parentCallbackOnSelect: _this.handleOnSelect, onRenderItem: onRenderItem, showCheckboxes: showCheckboxes, treeItemActionsDisplayMode: treeItemActionsDisplayMode, nodesToExpand: __spreadArray(__spreadArray([], _this.nodesToExpand, true), defaultExpandedKeys, true), theme: themeToApply })); })));
            })));
    };
    return TreeView;
}(React.Component));
export { TreeView };
//# sourceMappingURL=TreeView.js.map