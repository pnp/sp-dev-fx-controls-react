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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import { DEFAULT_SUGGESTIONS, MAX_ROW_HEIGHT, ROWS_PER_PAGE } from './WebSearchTab.types';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Check } from '@fluentui/react/lib/Check';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { Link } from '@fluentui/react/lib/Link';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import { Selection, SelectionMode, SelectionZone } from '@fluentui/react/lib/Selection';
import { MessageBar } from '@fluentui/react/lib/MessageBar';
import { css } from '@fluentui/react/lib/Utilities';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import styles from './WebSearchTab.module.scss';
import * as strings from 'ControlStrings';
/**
 * Renders search suggestions and performs seach queries
 */
var WebSearchTab = /** @class */ (function (_super) {
    __extends(WebSearchTab, _super);
    function WebSearchTab(props) {
        var _this = _super.call(this, props) || this;
        _this._listElem = undefined;
        _this._onSelectionChanged = function () {
            // Get the selected item
            var selectedItems = _this._selection.getSelection();
            var filePickerResult = _this.state.filePickerResult;
            var selectedFileResult = null;
            if (selectedItems && selectedItems.length > 0) {
                //Get the selected key
                var selectedItem = selectedItems[0];
                //Brute force approach to making sure all URLs are loading over HTTPS
                // even if it breaks the page.
                var selectedUrl_1 = selectedItem.contentUrl.replace('http://', 'https://');
                selectedFileResult = {
                    fileAbsoluteUrl: selectedUrl_1,
                    fileName: GeneralHelper.getFileNameFromUrl(selectedUrl_1),
                    fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(selectedUrl_1),
                    downloadFileContent: function () { return _this.props.bingSearchService.downloadBingContent(selectedUrl_1, GeneralHelper.getFileNameFromUrl(selectedUrl_1)); }
                };
            }
            // If clicked on already selected file -> deselect it
            if (filePickerResult && selectedFileResult && filePickerResult.fileAbsoluteUrl === selectedFileResult.fileAbsoluteUrl) {
                _this._selection.setAllSelected(false);
                selectedFileResult = null;
            }
            // Save the selected file
            _this.setState({
                filePickerResult: selectedFileResult
            });
            if (_this._listElem) {
                // Force the list to update to show the selection check
                _this._listElem.forceUpdate();
            }
        };
        /**
         * Renders the returned search results
         */
        _this._renderSearchResults = function () {
            var results = _this.state.results;
            // If there are no results, tell 'em.
            if (results === undefined || results.length < 1) {
                return React.createElement(Label, { className: styles.noResultLabel }, strings.NoResultsBadEnglish);
            }
            return (React.createElement(FocusZone, null,
                React.createElement(SelectionZone, { selection: _this._selection, onItemInvoked: function (item) { return _this._selection.setKeySelected(item.key, true, true); } },
                    React.createElement(List, { ref: _this._linkElement, className: styles.bingGrildList, items: _this.state.results, getItemCountForPage: _this._getItemCountForPage, getPageHeight: _this._getPageHeight, renderedWindowsAhead: 4, onRenderCell: _this._onRenderSearchResultsCell }))));
        };
        /**
         * Show an individual search result item
         */
        _this._onRenderSearchResultsCell = function (item, index) {
            var query = _this.state.query;
            var isSelected = false;
            if (_this._selection && index !== undefined) {
                isSelected = _this._selection.isIndexSelected(index);
            }
            // The logic for calculating the thumbnail dimensions is not quite the same as the out-of-the-box file picker,
            // but it'll have to do.
            // Find the aspect ratio of the picture
            var ratio = item.width / item.height;
            // Fit the height to the desired row height
            var thumbnailHeight = Math.min(_this._rowHeight, item.height);
            // Resize the picture with the same aspect ratio
            var thumbnailWidth = thumbnailHeight * ratio;
            var searchResultAltText = strings.SearchResultAlt.replace('{0}', query);
            return (React.createElement("div", { className: styles.bingGridListCell, style: {
                    width: 100 / _this._columnCount + '%'
                } },
                React.createElement("div", { "aria-label": searchResultAltText, className: css(styles.bingTile, isSelected ? styles.isSelected : undefined), "data-is-focusable": true, "data-selection-index": index, style: {
                        width: "".concat(thumbnailWidth, "px"),
                        height: "".concat(thumbnailHeight, "px")
                    } },
                    React.createElement("div", { className: styles.bingTileContent, "data-selection-invoke": true },
                        React.createElement(Image, { src: item.thumbnailUrl, className: styles.bingTileThumbnail, alt: searchResultAltText, width: thumbnailWidth, height: thumbnailHeight }),
                        React.createElement("div", { className: styles.bingTileFrame }),
                        React.createElement("div", { className: styles.bingTileCheckCircle, role: 'checkbox', "aria-checked": isSelected, "data-item-index": index, "data-selection-toggle": true, "data-automationid": 'CheckCircle' },
                            React.createElement(Check, { checked: isSelected })),
                        React.createElement("div", { className: styles.bingTileNamePlate },
                            React.createElement(Link, { href: item.contentUrl, target: '_blank', "aria-label": strings.SearchResultAriaLabel }, item.displayUrl))))));
        };
        /**
         * Renders suggestions when there aren't any queries
         */
        _this._renderSearchSuggestions = function () {
            var suggestions = _this.props.suggestions !== undefined ? _this.props.suggestions : DEFAULT_SUGGESTIONS;
            return (React.createElement(FocusZone, null,
                React.createElement(List, { className: styles.filePickerFolderCardGrid, items: suggestions, getItemCountForPage: _this._getItemCountForPage, getPageHeight: _this._getPageHeight, renderedWindowsAhead: 4, onRenderCell: _this._onRenderSuggestionCell })));
        };
        /**
         * Gets search results from Bing
         */
        _this._getSearchResults = function () { return __awaiter(_this, void 0, void 0, function () {
            var searchParams, searchResults;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Do nothing
                        if (this.state.query === undefined || !this.props.bingSearchService) {
                            return [2 /*return*/];
                        }
                        // Show a loading indicator + remove selection
                        this.setState({
                            filePickerResult: null,
                            isLoading: true
                        });
                        searchParams = {
                            aspect: this.state.aspect,
                            size: this.state.size,
                            license: this.state.license,
                            query: this.state.query
                        };
                        return [4 /*yield*/, this.props.bingSearchService.executeBingSearch(searchParams)];
                    case 1:
                        searchResults = _a.sent();
                        // If the results were obtained
                        if (searchResults) {
                            // Set the items so that the selection zone can keep track of them
                            this._selection.setItems(searchResults, true);
                        }
                        // Save results and stop loading indicator
                        this.setState({
                            isLoading: false,
                            results: searchResults
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Calculates how many items there should be in the page
         */
        _this._getItemCountForPage = function (itemIndex, surfaceRect) {
            if (itemIndex === 0) {
                _this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
                _this._columnWidth = Math.floor(surfaceRect.width / _this._columnCount);
                _this._rowHeight = _this._columnWidth;
            }
            return _this._columnCount * ROWS_PER_PAGE;
        };
        /**
         * Gets the height of a list "page"
         */
        _this._getPageHeight = function () {
            return _this._rowHeight * ROWS_PER_PAGE;
        };
        /**
         * Renders a cell for search suggestions
         */
        _this._onRenderSuggestionCell = function (item, index) {
            return (React.createElement("div", { className: styles.filePickerFolderCardTile, "data-is-focusable": true, style: {
                    width: 100 / _this._columnCount + '%'
                } },
                React.createElement("div", { className: styles.filePickerFolderCardSizer },
                    React.createElement("div", { className: styles.filePickerFolderCardPadder },
                        React.createElement(Image, { src: item.backgroundUrl, className: styles.filePickerFolderCardImage, imageFit: ImageFit.cover }),
                        React.createElement(DefaultButton, { className: styles.filePickerFolderCardLabel, onClick: function (_event) { return _this._handleSearch(item.topic); } }, item.topic)))));
        };
        /**
         * Renders the search box
         */
        _this._renderSearchBox = function () {
            var query = _this.state.query;
            var hasQuery = query !== undefined;
            var license = _this.state.license ? _this.state.license : 'All';
            return (React.createElement("div", { className: styles.searchBoxContainer },
                React.createElement("div", { className: styles.searchBoxMedium },
                    React.createElement("div", { className: styles.searchBox },
                        React.createElement(SearchBox, { placeholder: strings.SearchBoxPlaceholder, value: query, onSearch: function (newQuery) { return _this._handleSearch(newQuery); } }))),
                React.createElement(Label, null, strings.PoweredByBing),
                hasQuery &&
                    React.createElement("div", { className: styles.dropdownContainer },
                        React.createElement(Dropdown, { className: styles.filterDropdown, onRenderPlaceHolder: function (props) { return _this._renderFilterPlaceholder(props); }, selectedKey: _this.state.size, options: [
                                { key: 'All', text: strings.SizeOptionAll },
                                { key: 'Small', text: strings.SizeOptionSmall },
                                { key: 'Medium', text: strings.SizeOptionMedium },
                                { key: 'Large', text: strings.SizeOptionLarge },
                                { key: 'Wallpaper', text: strings.SizeOptionExtraLarge }
                            ], onChanged: function (option, index) { return _this._handleChangeSize(option); } }),
                        React.createElement(Dropdown, { className: styles.filterDropdown, onRenderPlaceHolder: function (props) { return _this._renderFilterPlaceholder(props); }, selectedKey: _this.state.aspect, options: [
                                { key: 'All', text: strings.LayoutOptionAll },
                                { key: 'Square', text: strings.LayoutOptionSquare },
                                { key: 'Wide', text: strings.LayoutOptionWide },
                                { key: 'Tall', text: strings.LayoutOptionTall },
                            ], onChanged: function (option, index) { return _this._handleChangeLayout(option); } }),
                        React.createElement(Dropdown, { className: styles.filterDropdown, onRenderPlaceHolder: function (props) { return _this._renderFilterPlaceholder(props); }, selectedKey: license, options: [
                                { key: 'All', text: strings.LicenseOptionAll },
                                { key: 'Any', text: strings.LicenseOptionAny }
                            ], onChanged: function (option, index) { return _this._handleChangeLicense(option); } }))));
        };
        /**
         * Handles when a user changes the size drop down.
         * Resubmits search query
         */
        _this._handleChangeSize = function (option) {
            _this.setState({
                size: option.key
            }, function () { return _this._getSearchResults(); });
        };
        /**
         * Handles when user selects a new layout from the drop down.
         * Resubmits search query.
         */
        _this._handleChangeLayout = function (option) {
            _this.setState({
                aspect: option.key
            }, function () { return _this._getSearchResults(); });
        };
        /**
         * Handles when a user changes the license from the drop down
         * Resubits search query
         */
        _this._handleChangeLicense = function (option) {
            _this.setState({
                license: option.key
            }, function () { return _this._getSearchResults(); });
        };
        /**
         * Renders the drop down placeholders
         */
        _this._renderFilterPlaceholder = function (props) {
            // return <span>{props.placeholder}</span>;
            return React.createElement("span", null, "Pick the value");
        };
        /**
         * Handles when user triggers search query
         */
        _this._handleSearch = function (newQuery) {
            _this.setState({
                query: newQuery
            }, function () { return _this._getSearchResults(); });
        };
        /**
         * Handles when user closes search pane
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        /**
         * Handes when user saves selection
         * Calls property pane file picker's save function
         */
        _this._handleSave = function () {
            _this.props.onSave([_this.state.filePickerResult]);
        };
        /**
         * Creates a reference to the list
         */
        _this._linkElement = function (e) {
            _this._listElem = e;
        };
        _this._selection = new Selection({
            selectionMode: SelectionMode.single,
            onSelectionChanged: _this._onSelectionChanged
        });
        _this.state = {
            isLoading: false,
            results: undefined,
            filePickerResult: null
        };
        return _this;
    }
    /**
     * Render the tab
     */
    WebSearchTab.prototype.render = function () {
        var _this = this;
        var _a = this.state, query = _a.query, results = _a.results;
        return (React.createElement("div", { className: styles.tabContainer },
            React.createElement("div", { className: styles.tabHeaderContainer },
                React.createElement("h2", { className: styles.tabHeader }, strings.WebSearchLinkLabel)),
            this.props.bingSearchService && this._renderSearchBox(),
            React.createElement("div", { className: css(styles.tab, styles.tabOffset) },
                !query && this._renderSearchSuggestions(),
                query && results && this._renderSearchResults()),
            React.createElement("div", { className: styles.actionButtonsContainer },
                this.state.results && this.state.license === 'Any' &&
                    React.createElement(MessageBar, null, strings.CreativeCommonsMessage),
                React.createElement(Label, { className: styles.copyrightLabel },
                    strings.CopyrightWarning,
                    "\u00A0\u00A0",
                    React.createElement(Link, { target: '_blank', href: strings.CopyrightUrl }, strings.LearnMoreLink)),
                React.createElement("div", { className: styles.actionButtons },
                    React.createElement(PrimaryButton, { disabled: !this.state.filePickerResult, className: styles.actionButton, onClick: function () { return _this._handleSave(); } }, strings.OpenButtonLabel),
                    React.createElement(DefaultButton, { onClick: function () { return _this._handleClose(); }, className: styles.actionButton }, strings.CancelButtonLabel)))));
    };
    return WebSearchTab;
}(React.Component));
export default WebSearchTab;
//# sourceMappingURL=WebSearchTab.js.map