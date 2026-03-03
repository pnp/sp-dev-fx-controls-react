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
import * as React from 'react';
import * as strings from 'ControlStrings';
import { IconButton } from '@fluentui/react/lib/Button';
import { Checkbox } from '@fluentui/react/lib/Checkbox';
import { Icon } from '@fluentui/react/lib/Icon';
import { css } from '@fluentui/react/lib/Utilities';
import { TreeViewSelectionMode } from './ITreeViewProps';
import TreeItemActionsControl from './TreeItemActionsControl';
import styles from './TreeView.module.scss';
/**
 * Renders the controls for TreeItem component
 */
var TreeItem = /** @class */ (function (_super) {
    __extends(TreeItem, _super);
    /**
     * Constructor method
     * @param props properties interface
     */
    function TreeItem(props, state) {
        var _this = _super.call(this, props) || this;
        /**
         * Process the child nodes
         */
        _this.createChildNodes = function (list, paddingLeft) {
            if (list.length) {
                var _a = _this.props, selectionMode_1 = _a.selectionMode, activeItems_1 = _a.activeItems, parentCallbackExpandCollapse_1 = _a.parentCallbackExpandCollapse, parentCallbackOnSelect_1 = _a.parentCallbackOnSelect, onRenderItem_1 = _a.onRenderItem, showCheckboxes_1 = _a.showCheckboxes, treeItemActionsDisplayMode_1 = _a.treeItemActionsDisplayMode, defaultExpandedChildren_1 = _a.defaultExpandedChildren;
                var expanded_1 = _this.state.expanded;
                var childrenWithHandlers = list.map(function (item) {
                    return (React.createElement(TreeItem, { key: item.key, treeItem: item, defaultExpanded: defaultExpandedChildren_1 ? expanded_1 : expanded_1 && !item.children, defaultExpandedChildren: defaultExpandedChildren_1, leftOffset: paddingLeft, selectionMode: selectionMode_1, activeItems: activeItems_1, isFirstRender: !paddingLeft ? true : false, parentCallbackExpandCollapse: parentCallbackExpandCollapse_1, parentCallbackOnSelect: parentCallbackOnSelect_1, onRenderItem: onRenderItem_1, showCheckboxes: showCheckboxes_1, treeItemActionsDisplayMode: treeItemActionsDisplayMode_1, nodesToExpand: _this.props.nodesToExpand, theme: _this.props.theme }));
                });
                return childrenWithHandlers;
            }
        };
        /**
         * Default action callback
         */
        _this.treeItemActionCallback = function () {
            // no-op;
        };
        // Check if current item is selected
        var active = props.activeItems.filter(function (item) { return item.key === props.treeItem.key; });
        var expanded = props.defaultExpanded;
        if (!expanded && (props.nodesToExpand && props.nodesToExpand.indexOf(props.treeItem.key) !== -1)) {
            expanded = true;
        }
        _this.state = {
            selected: active.length > 0,
            // expanded: this.props.defaultExpanded
            expanded: expanded
        };
        // Bind control events
        _this._itemSelected = _this._itemSelected.bind(_this);
        _this._handleExpandCollapse = _this._handleExpandCollapse.bind(_this);
        return _this;
    }
    /**
     * Handle the checkbox change trigger
     */
    TreeItem.prototype._itemSelected = function (ev, isChecked) {
        this.setState({
            selected: !this.state.selected
        });
        this.props.parentCallbackOnSelect(this.props.treeItem, isChecked);
    };
    /**
     * Handle the click event: collapse or expand
     */
    TreeItem.prototype._handleExpandCollapse = function () {
        this.setState({
            expanded: !this.state.expanded
        });
        this.props.parentCallbackExpandCollapse(this.props.treeItem, !this.state.expanded);
    };
    /**
     * Lifecycle event hook when component retrieves new properties
     * @param nextProps
     * @param nextContext
     */
    TreeItem.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var _a = this.props, selectionMode = _a.selectionMode, nodesToExpand = _a.nodesToExpand, treeItem = _a.treeItem;
        // If selection is turned on, set the item as selected
        if (selectionMode !== TreeViewSelectionMode.None) {
            var active = nextProps.activeItems.filter(function (item) { return item.key === treeItem.key; });
            var _isExpanded = this.state.expanded;
            if (!_isExpanded && nodesToExpand.indexOf(this.props.treeItem.key) === -1) {
                _isExpanded = false;
            }
            this.setState({
                selected: active.length > 0,
                expanded: _isExpanded
            });
        }
    };
    /**
     * Default or custom rendering of tree item
     */
    TreeItem.prototype.renderItem = function (item) {
        var _this = this;
        if (typeof this.props.onRenderItem === "function") {
            // Custom rendering of tree item
            return this.props.onRenderItem(item);
        }
        else {
            return (
            // Default rendering of tree item
            React.createElement("div", { className: styles.labels, onClick: function (e) {
                    if (_this.props.selectionMode !== TreeViewSelectionMode.None && item.selectable !== false) {
                        e.stopPropagation();
                        if (!item.disabled) {
                            _this._itemSelected(e, !_this.state.selected);
                        }
                    }
                } },
                this.props.showCheckboxes && item.selectable === false && !item.children &&
                    React.createElement("span", { className: styles.blankspace }, "\u00A0"),
                // Rendering when item has iconProps
                item.iconProps &&
                    React.createElement("span", null,
                        React.createElement(Icon, { className: styles.icon, iconName: item.iconProps.iconName, style: item.iconProps.style, theme: this.props.theme }),
                        "\u00A0"),
                item.label,
                // Render sublabel
                item.subLabel &&
                    React.createElement("div", { className: styles.itemSubLabel }, item.subLabel)));
        }
    };
    /**
     * Default React render method
     */
    TreeItem.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this.props, treeItem = _b.treeItem, leftOffset = _b.leftOffset, showCheckboxes = _b.showCheckboxes, selectionMode = _b.selectionMode, treeItemActionsDisplayMode = _b.treeItemActionsDisplayMode;
        var _c = this.state, expanded = _c.expanded, selected = _c.selected;
        var styleProps = {
            marginLeft: "".concat(leftOffset, "px")
        };
        var contentStyles = {
            marginLeft: treeItem.children ? '0' : "".concat(leftOffset, "px")
        };
        return (React.createElement("div", null,
            React.createElement("div", { className: "".concat(styles.listItem, " ").concat(styles.tree) },
                React.createElement("div", { className: "".concat(styles.treeSelector) }, 
                // Render expand / collapse icons for items which has children.
                treeItem.children &&
                    React.createElement(IconButton, { iconProps: expanded ? { iconName: 'ChevronDown' } : { iconName: 'ChevronRight' }, alt: expanded ? strings.TreeViewCollapseTitle : strings.TreeViewExpandTitle, title: expanded ? strings.TreeViewCollapseTitle : strings.TreeViewExpandTitle, onClick: function () { return _this._handleExpandCollapse(); }, theme: this.props.theme })),
                React.createElement("div", { className: css((_a = {},
                        _a[styles.itemContent] = true,
                        _a[styles.noCheckBox] = !showCheckboxes,
                        _a[styles.checked] = selected,
                        _a[styles.disabled] = !!treeItem.disabled,
                        _a)), style: contentStyles, onClick: function (e) {
                        if (_this.props.selectionMode !== TreeViewSelectionMode.None && treeItem.selectable !== false) {
                            e.stopPropagation();
                            if (!treeItem.disabled && e.currentTarget === e.target) {
                                _this._itemSelected(e, !_this.state.selected);
                            }
                        }
                    } },
                    // Render checkbox (if item is selectable, Selection mode is not None, and showCheckboxes property is set to true)
                    (treeItem.selectable !== false) && selectionMode !== TreeViewSelectionMode.None && showCheckboxes &&
                        React.createElement(Checkbox, { checked: selected, disabled: treeItem.disabled, className: styles.checkbox, onChange: this._itemSelected, theme: this.props.theme }),
                    // Call default render item function
                    this.renderItem(treeItem),
                    // Render actions for tree item
                    treeItem.actions &&
                        React.createElement("div", { className: styles.itemMenu },
                            React.createElement(TreeItemActionsControl, { treeItem: treeItem, treeItemActions: {
                                    actions: treeItem.actions,
                                    treeItemActionsDisplayMode: treeItemActionsDisplayMode
                                }, treeItemActionCallback: this.treeItemActionCallback, theme: this.props.theme })))),
            React.createElement("div", { style: styleProps || {} }, 
            // Render child nodes
            expanded && treeItem.children
                ? this.createChildNodes(treeItem.children, leftOffset) // we double left padding on every recursion/depth
                : null)));
    };
    return TreeItem;
}(React.Component));
export default TreeItem;
//# sourceMappingURL=TreeItem.js.map