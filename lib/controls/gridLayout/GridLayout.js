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
import * as React from 'react';
import styles from './GridLayout.module.scss';
// Used to render list grid
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import * as telemetry from '../../common/telemetry';
/**
 * Grid layout component
 */
var GridLayout = /** @class */ (function (_super) {
    __extends(GridLayout, _super);
    /**
    * Constructor method
    */
    function GridLayout(props) {
        var _a, _b, _c, _d, _e;
        var _this = _super.call(this, props) || this;
        //Get constants from SCSS if they are not passed in props
        _this.ROWS_PER_PAGE = (_a = _this.props.rowsPerPage) !== null && _a !== void 0 ? _a : +styles.rowsPerPage;
        _this.MAX_WIDTH = (_b = _this.props.itemMaxWidth) !== null && _b !== void 0 ? _b : +styles.maxWidth;
        _this.MIN_WIDTH = (_c = _this.props.itemMinWidth) !== null && _c !== void 0 ? _c : +styles.minWidth;
        _this.PADDING = (_d = _this.props.itemPadding) !== null && _d !== void 0 ? _d : +styles.padding;
        _this.COMPACT_THRESHOLD = (_e = _this.props.compactThreshold) !== null && _e !== void 0 ? _e : +styles.compactThreshold;
        /**
         * Calculates how many items in the page
         */
        _this._getItemCountForPage = function (itemIndex, surfaceRect) {
            if (itemIndex === 0) {
                _this._isCompact = surfaceRect.width < _this.COMPACT_THRESHOLD;
                if (_this._isCompact) {
                    _this._columnCount = 1;
                    _this._columnWidth = surfaceRect.width;
                    return _this.props.items.length;
                }
                else {
                    _this._columnCount = Math.ceil(surfaceRect.width / (_this.MAX_WIDTH));
                    _this._columnWidth = Math.max(_this.MIN_WIDTH, Math.floor(surfaceRect.width / _this._columnCount) + Math.floor(_this.PADDING / _this._columnCount));
                    _this._rowHeight = _this._columnWidth;
                }
            }
            return _this._columnCount * _this.ROWS_PER_PAGE;
        };
        /**
         * Calculates the page height for the grid
         */
        _this._getPageHeight = function () {
            if (_this._isCompact) {
                return _this.props.items.length * _this._rowHeight;
            }
            return _this._rowHeight * _this.ROWS_PER_PAGE;
        };
        /**
         * Calls the passed onRenderCell
         */
        _this._onRenderCell = function (item, index) {
            var isCompact = _this._isCompact;
            var cellPadding = index % _this._columnCount !== _this._columnCount - 1 && !isCompact ? _this.PADDING : 0;
            var finalSize = { width: _this._columnWidth, height: _this._rowHeight };
            var cellWidth = isCompact ? _this._columnWidth + _this.PADDING : _this._columnWidth - _this.PADDING;
            return (React.createElement("div", { style: {
                    width: "".concat(cellWidth, "px"),
                    marginRight: "".concat(cellPadding, "px")
                } }, _this.props.onRenderGridItem(item, finalSize, isCompact)));
        };
        telemetry.track('ReactGridLayout');
        return _this;
    }
    /**
     * Renders the grid control
     */
    GridLayout.prototype.render = function () {
        return (React.createElement("div", { className: styles.gridLayout, role: "group", "aria-label": this.props.ariaLabel },
            React.createElement(FocusZone, null,
                React.createElement(List, __assign({ role: "presentation", className: styles.gridLayoutList, items: this.props.items, getItemCountForPage: this._getItemCountForPage, getPageHeight: this._getPageHeight, onRenderCell: this._onRenderCell }, this.props.listProps)))));
    };
    return GridLayout;
}(React.Component));
export { GridLayout };
//# sourceMappingURL=GridLayout.js.map