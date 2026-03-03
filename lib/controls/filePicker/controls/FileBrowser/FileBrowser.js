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
import { GeneralHelper, sortDate, sortString } from '../../../../common/utilities/GeneralHelper';
import { LoadingState } from './IFileBrowserState';
import { TilesList } from '../TilesList/TilesList';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, DetailsRow } from '@fluentui/react/lib/DetailsList';
import { CommandBar } from '@fluentui/react/lib/CommandBar';
import { ScrollablePane } from '@fluentui/react/lib/ScrollablePane';
import styles from './FileBrowser.module.scss';
import * as strings from 'ControlStrings';
import { FileTypeIcon } from '../../../fileTypeIcon/FileTypeIcon';
import { IconType, ImageSize } from '../../../fileTypeIcon';
var LAYOUT_STORAGE_KEY = 'comparerSiteFilesLayout';
var FileBrowser = /** @class */ (function (_super) {
    __extends(FileBrowser, _super);
    function FileBrowser(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Triggers paged data load
         */
        _this._loadNextDataRequest = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.state.loadingState === LoadingState.idle)) return [3 /*break*/, 2];
                        // Load next list items from next page
                        return [4 /*yield*/, this._getListItems(true)];
                    case 1:
                        // Load next list items from next page
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        }); };
        /**
        * Renders a placeholder to indicate that the folder is empty
        */
        _this._renderEmptyFolder = function () {
            return (React.createElement("div", { className: styles.emptyFolder },
                React.createElement("div", { className: styles.emptyFolderImage },
                    React.createElement("img", { className: styles.emptyFolderImageTag, src: strings.OneDriveEmptyFolderIconUrl, alt: strings.OneDriveEmptyFolderAlt })),
                React.createElement("div", { role: "alert" },
                    React.createElement("div", { className: styles.emptyFolderTitle }, strings.OneDriveEmptyFolderTitle),
                    React.createElement("div", { className: styles.emptyFolderSubText },
                        React.createElement("span", { className: styles.emptyFolderPc }, strings.OneDriveEmptyFolderDescription)))));
        };
        /**
         * Renders row with file or folder style.
         */
        _this._onRenderRow = function (props) {
            var fileItem = props.item;
            return React.createElement(DetailsRow, __assign({}, props, { className: fileItem.isFolder ? styles.folderRow : styles.fileRow }));
        };
        /**
         * Get the list of toolbar items on the left side of the toolbar.
         * We leave it empty for now, but we may add the ability to upload later.
         */
        _this._getToolbarItems = function () {
            return [];
        };
        _this.getFarItems = function () {
            var selectedView = _this.state.selectedView;
            var viewIconName = undefined;
            var viewName = undefined;
            switch (_this.state.selectedView) {
                case 'list':
                    viewIconName = 'List';
                    viewName = strings.ListLayoutList;
                    break;
                case 'compact':
                    viewIconName = 'AlignLeft';
                    viewName = strings.ListLayoutCompact;
                    break;
                default:
                    viewIconName = 'GridViewMedium';
                    viewName = strings.ListLayoutTile;
            }
            var farItems = [
                {
                    key: 'listOptions',
                    className: styles.commandBarNoChevron,
                    title: strings.ListOptionsTitle,
                    ariaLabel: strings.ListOptionsAlt.replace('{0}', viewName),
                    iconProps: {
                        iconName: viewIconName
                    },
                    iconOnly: true,
                    subMenuProps: {
                        items: [
                            {
                                key: 'list',
                                name: strings.ListLayoutList,
                                iconProps: {
                                    iconName: 'List'
                                },
                                canCheck: true,
                                checked: _this.state.selectedView === 'list',
                                ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutList).replace('{1}', selectedView === 'list' ? strings.Selected : undefined),
                                title: strings.ListLayoutListDescrition,
                                onClick: function (_ev, item) { return _this._handleSwitchLayout(item); }
                            },
                            {
                                key: 'compact',
                                name: strings.ListLayoutCompact,
                                iconProps: {
                                    iconName: 'AlignLeft'
                                },
                                canCheck: true,
                                checked: _this.state.selectedView === 'compact',
                                ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutCompact).replace('{1}', selectedView === 'compact' ? strings.Selected : undefined),
                                title: strings.ListLayoutCompactDescription,
                                onClick: function (_ev, item) { return _this._handleSwitchLayout(item); }
                            },
                            {
                                key: 'tiles',
                                name: 'Tiles',
                                iconProps: {
                                    iconName: 'GridViewMedium'
                                },
                                canCheck: true,
                                checked: _this.state.selectedView === 'tiles',
                                ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutTile).replace('{1}', selectedView === 'tiles' ? strings.Selected : undefined),
                                title: strings.ListLayoutTileDescription,
                                onClick: function (_ev, item) { return _this._handleSwitchLayout(item); }
                            }
                        ]
                    }
                }
            ];
            return farItems;
        };
        /**
         * Called when users switch the view
         */
        _this._handleSwitchLayout = function (item) {
            if (item) {
                // Store the user's favourite layout
                if (localStorage) {
                    localStorage.setItem(LAYOUT_STORAGE_KEY, item.key);
                }
                _this.setState({
                    selectedView: item.key
                });
            }
        };
        /**
         * Gratuitous sorting
         */
        _this._onColumnClick = function (event, column) {
            var columns = _this.state.columns;
            var items = _this.state.items;
            var isSortedDescending = column.isSortedDescending;
            // If we've sorted this column, flip it.
            if (column.isSorted) {
                isSortedDescending = !isSortedDescending;
            }
            var updatedColumns = columns.map(function (col) {
                col.isSorted = col.key === column.key;
                if (col.isSorted) {
                    col.isSortedDescending = isSortedDescending;
                }
                return col;
            });
            if (!_this.state.nextPageQueryString) { // all items have been loaded to the client
                // Sort the items.
                items = items.concat([]).sort(function (a, b) {
                    if (a.isFolder && !b.isFolder) {
                        return 1;
                    }
                    else if (!a.isFolder && b.isFolder) {
                        return -1;
                    }
                    var firstValue = a[column.fieldName] || '';
                    var secondValue = b[column.fieldName] || '';
                    if (column.data === 'string') {
                        return sortString(firstValue, secondValue, isSortedDescending);
                    }
                    else if (column.data === 'date') {
                        return sortDate(firstValue, secondValue, isSortedDescending);
                    }
                    else if (column.data === 'number') {
                        firstValue = parseFloat(firstValue);
                        secondValue = parseFloat(secondValue);
                    }
                    return isSortedDescending ? secondValue - firstValue : firstValue - secondValue;
                });
                // Reset the items and columns to match the state.
                _this.setState({
                    items: items,
                    columns: updatedColumns
                });
            }
            else {
                _this.setState({
                    items: [],
                    columns: updatedColumns
                }, function () {
                    _this._getListItems(false).then(function () { }).catch(function () { });
                });
            }
        };
        /**
         * When a folder is opened, calls parent tab to navigate down
         */
        _this._handleOpenFolder = function (item) {
            // De-select the list item that was clicked, the item in the same position
            _this._selection.setAllSelected(false);
            // item in the folder will appear selected
            _this.setState({
                loadingState: LoadingState.loading,
                filePickerResults: undefined
            }, function () { _this.props.onOpenFolder(item); });
        };
        /**
         * Handles selected item change
         */
        _this._itemSelectionChanged = function () {
            var filePickerResults = [];
            _this._selection.getSelection().map(function (item, index) {
                if (!item.isFolder) {
                    filePickerResults.push({
                        fileAbsoluteUrl: item.absoluteUrl,
                        fileName: GeneralHelper.getFileNameFromUrl(item.name),
                        fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(item.name),
                        spItemUrl: item.spItemUrl,
                        downloadFileContent: null
                    });
                }
            });
            _this.props.onChange(filePickerResults);
            _this.setState({ filePickerResults: filePickerResults });
        };
        // If possible, load the user's favourite layout
        var lastLayout = localStorage ?
            localStorage.getItem(LAYOUT_STORAGE_KEY)
            : 'list';
        var columns = [
            {
                key: 'column1',
                name: 'Type',
                ariaLabel: strings.TypeAriaLabel,
                iconName: 'Page',
                isIconOnly: true,
                fieldName: 'docIcon',
                headerClassName: styles.iconColumnHeader,
                minWidth: 20,
                maxWidth: 20,
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    // const folderIcon: string = strings.FolderIconUrl;
                    // // TODO: Improve file icon URL
                    // const isPhoto = GeneralHelper.isImage(item.name);
                    // let fileType = item.fileType;
                    // if (fileType.toLowerCase() === 'aspx') {
                    //   fileType = 'html';
                    // }
                    // const iconUrl = isPhoto ? strings.PhotoIconUrl : `https://spoprod-a.akamaihd.net/files/odsp-next-prod_2019-01-11_20190116.001/odsp-media/images/itemtypes/20_2x/${fileType}.png`;
                    // const altText: string = item.isFolder ? strings.FolderAltText : strings.ImageAltText.replace('{0}', item.fileType);
                    // return <div className={styles.fileTypeIcon}>
                    //   <img src={item.isFolder ? folderIcon : iconUrl} className={styles.fileTypeIconIcon} alt={altText} title={altText} />
                    // </div>;
                    if (item.isFolder) {
                        return React.createElement("div", { className: styles.fileTypeIcon },
                            React.createElement("img", { src: strings.FolderIconUrl, className: styles.fileTypeIconIcon, alt: strings.FolderAltText, title: strings.FolderAltText }));
                    }
                    return React.createElement(FileTypeIcon, { type: IconType.image, path: item.serverRelativeUrl, size: ImageSize.normal });
                }
            },
            {
                key: 'column2',
                name: strings.NameField,
                fieldName: 'name',
                minWidth: 210,
                isRowHeader: true,
                isResizable: true,
                isSorted: true,
                isSortedDescending: false,
                sortAscendingAriaLabel: strings.SortedAscending,
                sortDescendingAriaLabel: strings.SortedDescending,
                onColumnClick: _this._onColumnClick,
                data: 'string',
                isPadded: true,
                onRender: function (item) {
                    if (item.isFolder) {
                        return React.createElement("span", { className: styles.folderItem, onClick: function (_event) { return _this._handleOpenFolder(item); } }, item.name);
                    }
                    else {
                        return React.createElement("span", { className: styles.fileItem }, item.name);
                    }
                },
            },
            {
                key: 'column3',
                name: strings.ModifiedField,
                fieldName: 'modified',
                minWidth: 120,
                isResizable: true,
                onColumnClick: _this._onColumnClick,
                data: 'date',
                onRender: function (item) {
                    //const dateModified = moment(item.modified).format(strings.DateFormat);
                    return React.createElement("span", null, item.modified);
                },
                isPadded: true
            },
            {
                key: 'column4',
                name: strings.ModifiedByField,
                fieldName: 'modifiedBy',
                minWidth: 120,
                isResizable: true,
                data: 'string',
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return React.createElement("span", null, item.modifiedBy);
                },
                isPadded: true
            },
            {
                key: 'column5',
                name: strings.FileSizeField,
                fieldName: 'fileSize',
                minWidth: 70,
                maxWidth: 90,
                isResizable: true,
                data: 'number',
                onColumnClick: _this._onColumnClick,
                onRender: function (item) {
                    return React.createElement("span", null, item.fileSize ? GeneralHelper.formatBytes(item.fileSize, 1) : undefined);
                }
            }
        ];
        _this.state = {
            columns: columns,
            items: [],
            nextPageQueryString: null,
            loadingState: LoadingState.loading,
            selectedView: lastLayout,
            filePickerResults: []
        };
        return _this;
    }
    /**
     * Gets the list of files when settings change
     * @param prevProps
     * @param prevState
     */
    FileBrowser.prototype.componentDidUpdate = function (prevProps, prevState) {
        if (this.props.folderPath !== prevProps.folderPath) {
            this._selection.setAllSelected(false);
            this._getListItems().then(function () { }).catch(function () { });
        }
    };
    /**
     * Gets the list of files when tab first loads
     */
    FileBrowser.prototype.componentDidMount = function () {
        this._getListItems().then(function () { }).catch(function () { });
        this._selection = new Selection({
            selectionMode: SelectionMode.multiple,
            onSelectionChanged: this._itemSelectionChanged
        });
    };
    FileBrowser.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            (this.state.items && this.state.items.length > 0 && this.state.loadingState !== LoadingState.loading) &&
                React.createElement("div", null,
                    React.createElement("div", { className: styles.itemPickerTopBar },
                        React.createElement(CommandBar, { items: this._getToolbarItems(), farItems: this.getFarItems() })),
                    React.createElement("div", { className: styles.scrollablePaneWrapper },
                        React.createElement(ScrollablePane, null, this.state.selectedView !== 'tiles' ?
                            (React.createElement(DetailsList, { items: this.state.items, compact: this.state.selectedView === 'compact', columns: this.state.columns, selectionMode: SelectionMode.multiple, setKey: "set", layoutMode: DetailsListLayoutMode.justified, isHeaderVisible: true, selection: this._selection, selectionPreservedOnEmptyClick: true, enterModalSelectionOnTouch: true, onRenderRow: this._onRenderRow, onRenderMissingItem: function () { _this._loadNextDataRequest().then(function () { }).catch(function () { }); return null; } })) :
                            (React.createElement(TilesList, { fileBrowserService: this.props.fileBrowserService, filePickerResults: this.state.filePickerResults ? this.state.filePickerResults : null, selection: this._selection, items: this.state.items, onFolderOpen: this._handleOpenFolder, onFileSelected: this._itemSelectionChanged, onNextPageDataRequest: this._loadNextDataRequest }))))),
            (this.state.loadingState === LoadingState.idle && (!this.state.items || this.state.items.length <= 0)) &&
                /* Render information about empty folder */
                this._renderEmptyFolder(),
            this.state.loadingState !== LoadingState.idle &&
                React.createElement(Spinner, { label: strings.Loading })));
    };
    /**
     * Gets all files in a library with a matchihg path
     */
    FileBrowser.prototype._getListItems = function (concatenateResults) {
        if (concatenateResults === void 0) { concatenateResults = false; }
        return __awaiter(this, void 0, void 0, function () {
            var _a, libraryUrl, folderPath, accepts, fileBrowserService, items, nextPageQueryString, filesQueryResult, loadingState, sortField, isDesc, sortByCol, error_1, newItems;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, libraryUrl = _a.libraryUrl, folderPath = _a.folderPath, accepts = _a.accepts, fileBrowserService = _a.fileBrowserService;
                        items = this.state.items;
                        nextPageQueryString = this.state.nextPageQueryString;
                        filesQueryResult = { items: [], nextHref: null };
                        loadingState = concatenateResults ? LoadingState.loadingNextPage : LoadingState.loading;
                        // If concatenate results is set to false -> it's needed to load new data without nextPageUrl
                        nextPageQueryString = concatenateResults ? nextPageQueryString : null;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, 4, 5]);
                        this.setState({
                            loadingState: loadingState,
                            nextPageQueryString: nextPageQueryString
                        });
                        sortField = undefined;
                        isDesc = undefined;
                        sortByCol = this.state.columns.filter(function (c) { return c.isSorted; })[0];
                        if (sortByCol) {
                            sortField = fileBrowserService.getSPFieldNameForFileProperty(sortByCol.fieldName);
                            isDesc = !!sortByCol.isSortedDescending;
                        }
                        return [4 /*yield*/, this.props.fileBrowserService.getListItems(libraryUrl, folderPath, accepts, nextPageQueryString, sortField, isDesc)];
                    case 2:
                        // Load files in the folder
                        filesQueryResult = _b.sent();
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _b.sent();
                        filesQueryResult.items = null;
                        console.error(error_1.message);
                        return [3 /*break*/, 5];
                    case 4:
                        // Remove the null mark from the end of the items array
                        if (concatenateResults && items && items.length > 0 && items[items.length - 1] === null) {
                            // Remove the null mark
                            items.splice(items.length - 1, 1);
                        }
                        newItems = concatenateResults ? items.concat(filesQueryResult.items) : filesQueryResult.items;
                        // If there are more items to load -> add null mark at the end of the array
                        if (filesQueryResult.nextHref) {
                            newItems.push(null);
                        }
                        this._selection.setItems(newItems);
                        if (!concatenateResults) {
                            // de-select anything that was previously selected
                            this._selection.setAllSelected(false);
                        }
                        this.setState({
                            items: newItems,
                            nextPageQueryString: filesQueryResult.nextHref,
                            // isLoading: false,
                            // isLoadingNextPage: false
                            loadingState: LoadingState.idle
                        });
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    return FileBrowser;
}(React.Component));
export { FileBrowser };
//# sourceMappingURL=FileBrowser.js.map