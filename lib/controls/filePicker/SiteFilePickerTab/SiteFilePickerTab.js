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
import findIndex from 'lodash/findIndex';
import { DocumentLibraryBrowser } from '../controls/DocumentLibraryBrowser/DocumentLibraryBrowser';
import { FileBrowser } from '../controls/FileBrowser/FileBrowser';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { ScrollablePane } from '@fluentui/react/lib/ScrollablePane';
import { Breadcrumb } from '@fluentui/react/lib/Breadcrumb';
import styles from './SiteFilePickerTab.module.scss';
import * as strings from 'ControlStrings';
import { toRelativeUrl, urlCombine } from '../../../common/utilities';
import { cloneDeep } from '@microsoft/sp-lodash-subset';
var SiteFilePickerTab = /** @class */ (function (_super) {
    __extends(SiteFilePickerTab, _super);
    function SiteFilePickerTab(props) {
        var _this = _super.call(this, props) || this;
        _this._defaultLibraryNamePromise = Promise.resolve();
        /**
         * Handles breadcrumb item click
         */
        _this.onBreadcrumbItemClick = function (node) {
            var breadcrumbItems = _this.state.breadcrumbItems;
            var breadcrumbClickedItemIndx = 0;
            // Site node clicked
            if (!node.libraryData && !node.folderData) {
                _this.setState({
                    libraryAbsolutePath: undefined,
                    libraryPath: undefined,
                    folderName: undefined
                });
            }
            // Check if it is folder item
            else if (node.folderData) {
                _this._handleOpenFolder(node.folderData, false);
                // select which node has been clicked
                breadcrumbClickedItemIndx = findIndex(breadcrumbItems, function (item) { return item.folderData && item.folderData.absoluteUrl === node.key; });
            }
            // Check if it is library node
            else if (node.libraryData) {
                _this._handleOpenLibrary(node.libraryData, false);
                // select which node has been clicked
                breadcrumbClickedItemIndx = findIndex(breadcrumbItems, function (item) { return item.libraryData && item.libraryData.serverRelativeUrl === node.key; });
            }
            // Trim nodes array
            breadcrumbItems = breadcrumbItems.slice(0, breadcrumbClickedItemIndx + 1);
            // Set new current node
            breadcrumbItems[breadcrumbItems.length - 1].isCurrentItem = true;
            _this.setState({
                breadcrumbItems: breadcrumbItems,
                filePickerResults: undefined
            });
        };
        /**
         * Is called when user selects a different file
         */
        _this._handleSelectionChange = function (filePickerResults) {
            filePickerResults.map(function (filePickerResult) {
                filePickerResult.downloadFileContent = function () { return _this.props.fileBrowserService.downloadSPFileContent(filePickerResult.fileAbsoluteUrl, filePickerResult.fileName); };
            });
            // this.props.fileBrowserService
            _this.setState({ filePickerResults: filePickerResults });
        };
        /**
         * Called when user saves
         */
        _this._handleSave = function () {
            _this.props.onSave(_this.state.filePickerResults);
        };
        /**
         * Called when user closes tab
         */
        _this._handleClose = function () {
            _this.props.onClose();
        };
        /**
         * Triggered when user opens a file folder
         */
        _this._handleOpenFolder = function (folder, addBreadcrumbNode) {
            var breadcrumbItems = _this.state.breadcrumbItems;
            if (addBreadcrumbNode) {
                breadcrumbItems.map(function (item) { item.isCurrentItem = false; });
                var breadcrumbNode = {
                    folderData: folder,
                    isCurrentItem: true,
                    text: folder.name,
                    key: folder.absoluteUrl,
                    onClick: function (ev, itm) { _this.onBreadcrumbItemClick(itm); }
                };
                breadcrumbItems.push(breadcrumbNode);
            }
            _this.setState({
                filePickerResults: null,
                libraryPath: folder.serverRelativeUrl,
                folderName: folder.name,
                libraryAbsolutePath: folder.absoluteUrl,
                breadcrumbItems: breadcrumbItems
            });
        };
        /**
         * Triggered when user opens a top-level document library
         */
        _this._handleOpenLibrary = function (library, addBreadcrumbNode) {
            var breadcrumbItems = _this.state.breadcrumbItems;
            if (addBreadcrumbNode) {
                breadcrumbItems.map(function (item) { item.isCurrentItem = false; });
                var breadcrumbNode = {
                    libraryData: library,
                    isCurrentItem: true,
                    text: library.title,
                    key: library.serverRelativeUrl,
                    onClick: function (ev, itm) { _this.onBreadcrumbItemClick(itm); }
                };
                breadcrumbItems.push(breadcrumbNode);
            }
            _this.setState({
                libraryAbsolutePath: library.absoluteUrl,
                libraryUrl: library.serverRelativeUrl,
                libraryPath: library.serverRelativeUrl,
                breadcrumbItems: breadcrumbItems
            });
        };
        // Add current site to the breadcrumb or the provided node
        var breadcrumbSiteNode = _this.props.breadcrumbFirstNode ? _this.props.breadcrumbFirstNode : {
            isCurrentItem: false,
            text: props.webTitle || props.context.pageContext.web.title,
            key: props.webId || props.context.pageContext.web.id.toString(),
        };
        // add click event after defining breadcrumb so that it also applies to breadcrumb items passed to the component as properties
        breadcrumbSiteNode.onClick = function (ev, itm) { _this.onBreadcrumbItemClick(itm); };
        var breadcrumbItems = [breadcrumbSiteNode];
        var webAbsoluteUrl = props.webAbsoluteUrl || props.context.pageContext.web.absoluteUrl;
        var webServerRelativeUrl = toRelativeUrl(webAbsoluteUrl);
        var _a = props.defaultFolderAbsolutePath
            ? _this._parseInitialLocationState(props.defaultFolderAbsolutePath, {
                serverRelativeUrl: webServerRelativeUrl,
                absoluteUrl: webAbsoluteUrl
            })
            : {}, _b = _a.folderAbsPath, folderAbsPath = _b === void 0 ? undefined : _b, _c = _a.libraryServRelUrl, libraryServRelUrl = _c === void 0 ? undefined : _c, _d = _a.folderServRelPath, folderServRelPath = _d === void 0 ? undefined : _d, _e = _a.folderBreadcrumbs, folderBreadcrumbs = _e === void 0 ? [] : _e;
        breadcrumbItems.push.apply(breadcrumbItems, folderBreadcrumbs);
        breadcrumbItems[breadcrumbItems.length - 1].isCurrentItem = true;
        _this.state = {
            filePickerResults: [],
            libraryAbsolutePath: folderAbsPath || undefined,
            libraryUrl: libraryServRelUrl || urlCombine(props.context.pageContext.web.serverRelativeUrl, '/Shared%20Documents'),
            libraryPath: folderServRelPath,
            folderName: strings.DocumentLibraries,
            breadcrumbItems: breadcrumbItems
        };
        return _this;
    }
    SiteFilePickerTab.prototype.componentDidMount = function () {
        var _this = this;
        this._defaultLibraryNamePromise.then(function (docLibName) {
            if (docLibName) {
                var updatedBCItems = cloneDeep(_this.state.breadcrumbItems);
                updatedBCItems.forEach(function (crumb) {
                    if (crumb.libraryData) {
                        crumb.text = docLibName;
                        crumb.libraryData.title = docLibName;
                    }
                });
                _this.setState({ breadcrumbItems: updatedBCItems });
            }
        }).catch(function (err) {
            console.log("[SiteFilePicker] Failed To Fetch defaultLibraryName, defaulting to internal name");
        });
    };
    SiteFilePickerTab.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", { className: styles.tabContainer },
            React.createElement("div", { className: styles.tabHeaderContainer },
                React.createElement(Breadcrumb, { items: this.state.breadcrumbItems, className: styles.breadcrumbNav })),
            React.createElement("div", { className: styles.tabFiles },
                this.state.libraryAbsolutePath === undefined &&
                    React.createElement("div", { className: styles.scrollablePaneWrapper },
                        React.createElement(ScrollablePane, null,
                            React.createElement(DocumentLibraryBrowser, { fileBrowserService: this.props.fileBrowserService, includePageLibraries: this.props.includePageLibraries, onOpenLibrary: function (selectedLibrary) { return _this._handleOpenLibrary(selectedLibrary, true); } }))),
                this.state.libraryAbsolutePath !== undefined &&
                    React.createElement(FileBrowser, { onChange: function (filePickerResults) { return _this._handleSelectionChange(filePickerResults); }, onOpenFolder: function (folder) { return _this._handleOpenFolder(folder, true); }, fileBrowserService: this.props.fileBrowserService, libraryUrl: this.state.libraryUrl, folderPath: decodeURIComponent(this.state.libraryPath), accepts: this.props.accepts })),
            React.createElement("div", { className: styles.actionButtonsContainer },
                React.createElement("div", { className: styles.actionButtons },
                    React.createElement(PrimaryButton, { disabled: this.state.filePickerResults && !this.state.filePickerResults.length, onClick: function () { return _this._handleSave(); }, className: styles.actionButton }, strings.OpenButtonLabel),
                    React.createElement(DefaultButton, { onClick: function () { return _this._handleClose(); }, className: styles.actionButton }, strings.CancelButtonLabel)))));
    };
    /**
     * Initializes the initial location for the navigation
     * @param folderAbsPath Absolute folder path
     * @param param1 custom object with absolute & relative Url
     * @returns initial location parameters set
     */
    SiteFilePickerTab.prototype._parseInitialLocationState = function (folderAbsPath, _a) {
        // folderAbsPath: "https://tenant.sharepoint.com/teams/Test/DocLib/Folder"
        var webServRelUrl = _a.serverRelativeUrl, webAbsUrl = _a.absoluteUrl;
        // folderServRelPath: "/teams/Test/DocLib/Folder"
        var folderServRelPath = folderAbsPath && folderAbsPath.substr(folderAbsPath.indexOf(webServRelUrl));
        // folderAbsPath: "https://tenant.sharepoint.com/DocLib/Folder"
        if (webServRelUrl === "/") {
            folderServRelPath = folderAbsPath && folderAbsPath.split(webAbsUrl)[1];
        }
        // folderWebRelPath: "/DocLib/Folder"
        var folderWebRelPath = folderServRelPath && folderServRelPath.substr(webServRelUrl.length);
        var libInternalName = folderWebRelPath && folderWebRelPath.substring(1, Math.max(folderWebRelPath.indexOf("/", 2), 0) || undefined);
        if (webServRelUrl === "/") {
            libInternalName = folderWebRelPath && folderWebRelPath.substring(0, Math.max(folderWebRelPath.indexOf("/", 2), 0) || undefined);
        }
        // libraryServRelUrl: "/teams/Test/DocLib/"
        var libraryServRelUrl = urlCombine(webServRelUrl, libInternalName);
        var tenantUrl = folderAbsPath.substring(0, folderAbsPath.indexOf(webServRelUrl));
        if (webAbsUrl === "/") {
            tenantUrl = webAbsUrl;
        }
        var folderBreadcrumbs = this.parseBreadcrumbsFromPaths(libraryServRelUrl, folderServRelPath, folderWebRelPath, webAbsUrl, tenantUrl, libInternalName, webServRelUrl);
        return { libraryServRelUrl: libraryServRelUrl, folderServRelPath: folderServRelPath, folderAbsPath: folderAbsPath, folderBreadcrumbs: folderBreadcrumbs };
    };
    /**
     * Creates a breadcrumb from the paths
     * @param libraryServRelUrl Library server relative URL
     * @param folderServRelPath Folder server relative path
     * @param folderWebRelPath Folder web relative path
     * @param webAbsUrl Web absolute URL
     * @param tenantUrl Tenant URL
     * @param libInternalName Library internal name
     * @param webServRelUrl Web server relative URL
     * @returns Breadcrumb items
     */
    SiteFilePickerTab.prototype.parseBreadcrumbsFromPaths = function (libraryServRelUrl, folderServRelPath, folderWebRelPath, webAbsUrl, tenantUrl, libInternalName, webServRelUrl) {
        var _this = this;
        this._defaultLibraryNamePromise = this.props.fileBrowserService.getLibraryNameByInternalName(libInternalName);
        var folderBreadcrumbs = [];
        folderBreadcrumbs.push({
            isCurrentItem: false,
            text: libInternalName,
            key: libraryServRelUrl,
            libraryData: {
                serverRelativeUrl: libraryServRelUrl,
                absoluteUrl: urlCombine(webAbsUrl, libInternalName),
                title: libInternalName
            },
            onClick: function (ev, itm) { _this.onBreadcrumbItemClick(itm); }
        });
        if (folderServRelPath !== libraryServRelUrl) {
            var folderLibRelPath = folderWebRelPath.substring(libInternalName.length + 2);
            if (webServRelUrl === "/") {
                folderLibRelPath = folderWebRelPath.substring(libInternalName.length + 1);
            }
            var breadcrumbFolderServRelPath_1 = libraryServRelUrl;
            var crumbs = folderLibRelPath.split("/").map((function (currFolderName) {
                breadcrumbFolderServRelPath_1 += "/".concat(currFolderName);
                return {
                    isCurrentItem: false,
                    text: currFolderName,
                    key: urlCombine(tenantUrl, breadcrumbFolderServRelPath_1),
                    folderData: {
                        name: currFolderName,
                        absoluteUrl: urlCombine(tenantUrl, breadcrumbFolderServRelPath_1),
                        serverRelativeUrl: breadcrumbFolderServRelPath_1,
                    },
                    onClick: function (ev, itm) { _this.onBreadcrumbItemClick(itm); }
                };
            }));
            folderBreadcrumbs.push.apply(folderBreadcrumbs, crumbs);
        }
        return folderBreadcrumbs;
    };
    return SiteFilePickerTab;
}(React.Component));
export default SiteFilePickerTab;
//# sourceMappingURL=SiteFilePickerTab.js.map