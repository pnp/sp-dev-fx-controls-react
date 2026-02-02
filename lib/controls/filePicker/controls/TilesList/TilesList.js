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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from 'react';
import styles from './TilesList.module.scss';
import { SelectionZone } from '@fluentui/react/lib/Selection';
import { List } from '@fluentui/react/lib/List';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { css } from '@fluentui/react/lib/Utilities';
import { FolderTile } from '../FolderTile';
import { DocumentTile } from '../DocumentTile';
import { findIndex } from '@microsoft/sp-lodash-subset';
/**
 * Rows per page
 */
var ROWS_PER_PAGE = 3;
/**
 * Maximum row height
 */
var MAX_ROW_HEIGHT = 250;
/**
 * Maximum number of cells per page
 */
var CELLS_PER_PAGE = 48;
/**
 * Standard tile margin
 */
var STANDARD_TILE_MARGIN = 4;
/**
 * Standard left and right padding
 */
var TILE_HORZ_PADDING = 32;
/**
 * Standard bottom margin
 */
var BOTTOM_MARGIN = 36;
var TilesList = /** @class */ (function (_super) {
    __extends(TilesList, _super);
    function TilesList(props) {
        var _this = _super.call(this, props) || this;
        _this._listElem = undefined;
        /**
        * Gets called what a file is selected.
        */
        _this._handleItemInvoked = function (item) {
            // If a file is selected, open the library
            if (item.isFolder) {
                _this.props.onFolderOpen(item);
            }
            else {
                // Otherwise, remember it was selected
                _this.props.onFileSelected(item);
            }
        };
        /**
          * Calculates how many items there should be in the page
          */
        _this._getItemCountForPage = function (itemIndex, surfaceRect) {
            if (itemIndex === 0) {
                if (surfaceRect.width === 0) {
                    //surfaceRect.width is 0 on load of this component, so it won't render properly.
                    //setting _pageWidth to -1 will re-render the entire component so surfaceRect.width will be returned correctly
                    _this._pageWidth = -1;
                }
                else {
                    _this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
                    _this._columnWidth = Math.floor(surfaceRect.width / _this._columnCount);
                    _this._pageWidth = surfaceRect.width;
                }
                _this._rowHeight = _this._columnWidth;
            }
            // Get the list of items
            var items = _this.props.items;
            var isFolder = items && items.length > itemIndex && items[itemIndex] ? items[itemIndex].isFolder : undefined;
            // Group items by folders and files
            var pageLength = 0;
            for (var index = itemIndex; index < items.length; index++) {
                var element = items[index];
                if (element && element.isFolder === isFolder) {
                    pageLength++;
                }
                else {
                    break;
                }
            }
            // Return the page lenght, up to the maximum number of cells per page
            return Math.min(pageLength, CELLS_PER_PAGE);
        };
        /**
         * Renders a custom list page
         */
        _this._onRenderPage = function (pageProps, _defaultRender) {
            var page = pageProps.page, pageClassName = pageProps.className, divProps = __rest(pageProps, ["page", "className"]);
            var items = page.items;
            // If there are not items to be rendered or the last one is a null mark -> request for next page data
            if (!items) {
                return null;
            }
            return (React.createElement("div", __assign({}, divProps, { className: css(pageClassName, styles.listPage), key: page.key }),
                React.createElement("div", { className: styles.grid, style: {
                        width: _this._pageWidth,
                        marginTop: -STANDARD_TILE_MARGIN,
                        marginBottom: BOTTOM_MARGIN,
                        marginLeft: -STANDARD_TILE_MARGIN,
                        marginRight: -STANDARD_TILE_MARGIN
                    } }, items.map(function (item, index) {
                    return _this._onRenderCell(item, index);
                }))));
        };
        /** Calculates the list "page" height (a.k.a. row) */
        _this._getPageHeight = function () {
            return _this._rowHeight * ROWS_PER_PAGE;
        };
        /**
         * Renders a file folder cover
         */
        _this._onRenderCell = function (item, index) {
            var _a;
            if (!item) {
                _this.props.onNextPageDataRequest();
                return null;
            }
            //If List component have more than 1 page, it starts to index items from 0,
            //but for Selection index should be unique
            var itemIndex = findIndex(_this.props.items, item);
            var isSelected = ((_a = _this.props.filePickerResults) === null || _a === void 0 ? void 0 : _a.filter(function (x) { return x.fileAbsoluteUrl === item.absoluteUrl; }).length) > 0;
            // I know this is a lot of divs and spans inside of each other, but my
            // goal was to mimic the HTML and style of the out-of-the-box file picker
            // to the best of my ability.
            return (React.createElement("div", { className: styles.listCell, "data-item-index": itemIndex, style: {
                    flexBasis: _this._columnWidth,
                    maxWidth: _this._columnWidth,
                    margin: STANDARD_TILE_MARGIN,
                    borderStyle: "none",
                    borderWidth: 0
                } },
                React.createElement("div", { role: "presentation", className: styles.cell, 
                    // I don't agree with this magic number. Where does this come from?
                    style: { paddingTop: "97.16%" } },
                    React.createElement("div", { role: "presentation", className: styles.cellContent }, item.isFolder ?
                        React.createElement(FolderTile, { item: item, index: itemIndex, isSelected: isSelected, pageWidth: _this._pageWidth, tileDimensions: {
                                width: _this._columnWidth - TILE_HORZ_PADDING,
                                height: _this._rowHeight - TILE_HORZ_PADDING
                            }, onItemInvoked: function (itemInvoked) { return _this._handleItemInvoked(itemInvoked); } })
                        :
                            React.createElement(DocumentTile, { fileBroserService: _this.props.fileBrowserService, item: item, index: itemIndex, isSelected: isSelected, pageWidth: _this._pageWidth, tileDimensions: {
                                    width: _this._columnWidth - TILE_HORZ_PADDING,
                                    height: _this._rowHeight - TILE_HORZ_PADDING
                                }, onItemInvoked: function (itemInvoked) { return _this._handleItemInvoked(itemInvoked); } })))));
        };
        return _this;
    }
    TilesList.prototype.componentDidUpdate = function (prevProps) {
        if ((this.props.filePickerResults !== prevProps.filePickerResults) || (this._pageWidth === -1)) {
            this._listElem.forceUpdate();
        }
    };
    TilesList.prototype.componentDidMount = function () {
        if (this._pageWidth === -1) {
            this.forceUpdate();
        }
    };
    TilesList.prototype.render = function () {
        var _this = this;
        return (React.createElement(SelectionZone, { selection: this.props.selection, onItemInvoked: function (item) { _this._handleItemInvoked(item); } },
            React.createElement(FocusZone, null,
                React.createElement("div", { "data-is-scrollable": true },
                    React.createElement(List, { ref: function (e) { _this._listElem = e; }, className: styles.folderList, items: this.props.items, getItemCountForPage: this._getItemCountForPage, getPageHeight: this._getPageHeight, onRenderPage: function (pageProps, defaultRender) { return _this._onRenderPage(pageProps, defaultRender); } })))));
    };
    return TilesList;
}(React.Component));
export { TilesList };
//# sourceMappingURL=TilesList.js.map