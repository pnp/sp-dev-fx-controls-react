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
import { SPHttpClient } from "@microsoft/sp-http";
import { GeneralHelper } from "../common/utilities/GeneralHelper";
/**
 * File Browser Service
 */
var FileBrowserService = /** @class */ (function () {
    /**
     * Constructor
     * @param context Component context
     * @param itemsToDownloadCount Number of items to download
     * @param siteAbsoluteUrl Site absolute URL
     */
    function FileBrowserService(context, itemsToDownloadCount, siteAbsoluteUrl) {
        if (itemsToDownloadCount === void 0) { itemsToDownloadCount = 100; }
        var _this = this;
        /**
         * Gets files from current sites library
         * @param listUrl web-relative url of the list
         * @param folderPath Folder path to get items from
         * @param acceptedFilesExtensions File extensions to filter the results
         * @param nextPageQueryStringParams Query string parameters to get the next page of results
         * @param sortBy Field to sort by
         * @param isDesc Sort in descending order
         */
        this.getListItems = function (listUrl, folderPath, acceptedFilesExtensions, nextPageQueryStringParams, sortBy, isDesc) { return __awaiter(_this, void 0, void 0, function () {
            var filesQueryResult, restApi, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filesQueryResult = { items: [], nextHref: null };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        restApi = "".concat(this.siteAbsoluteUrl, "/_api/web/GetList('").concat(listUrl, "')/RenderListDataAsStream");
                        // Do not pass FolderServerRelativeUrl as query parameter
                        // Attach passed nextPageQueryStringParams values to REST URL
                        if (nextPageQueryStringParams) {
                            restApi += "".concat(nextPageQueryStringParams);
                            folderPath = null;
                        }
                        return [4 /*yield*/, this._getListDataAsStream(restApi, folderPath, acceptedFilesExtensions, sortBy, isDesc)];
                    case 2:
                        filesQueryResult = _a.sent();
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        filesQueryResult.items = null;
                        console.error(error_1.message);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, filesQueryResult];
                }
            });
        }); };
        /**
         * Provides the URL for file preview.
         * @param file File to get thumbnail URL
         * @param thumbnailWidth Thumbnail width
         * @param thumbnailHeight Thumbnail height
         * @returns Thumbnail URL with the specified dimensions
         */
        this.getFileThumbnailUrl = function (file, thumbnailWidth, thumbnailHeight) {
            var thumbnailUrl = "".concat(_this.mediaBaseUrl, "/transform/thumbnail?provider=spo&inputFormat=").concat(file.fileType, "&cs=").concat(_this.callerStack, "&docid=").concat(file.spItemUrl, "&").concat(_this.driveAccessToken, "&width=").concat(thumbnailWidth, "&height=").concat(thumbnailHeight);
            return thumbnailUrl;
        };
        /**
         * Gets document and media libraries from the site
         * @param includePageLibraries Include page libraries (default `false`)
         * @returns Media libraries information
         */
        this.getSiteMediaLibraries = function (includePageLibraries) {
            if (includePageLibraries === void 0) { includePageLibraries = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var absoluteUrl_1, restApi, mediaLibrariesResult, libResults, result, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            absoluteUrl_1 = this.siteAbsoluteUrl;
                            restApi = "".concat(absoluteUrl_1, "/_api/SP.Web.GetDocumentAndMediaLibraries?webFullUrl='").concat(encodeURIComponent(absoluteUrl_1), "'&includePageLibraries='").concat(includePageLibraries, "'");
                            return [4 /*yield*/, this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)];
                        case 1:
                            mediaLibrariesResult = _a.sent();
                            if (!mediaLibrariesResult || !mediaLibrariesResult.ok) {
                                throw new Error("Something went wrong when executing request. Status='".concat(mediaLibrariesResult.status, "'"));
                            }
                            return [4 /*yield*/, mediaLibrariesResult.json()];
                        case 2:
                            libResults = _a.sent();
                            if (!libResults || !libResults.value) {
                                throw new Error("Cannot read data from the results.");
                            }
                            result = libResults.value.map(function (libItem) { return _this.parseLibItem(libItem, absoluteUrl_1); });
                            return [2 /*return*/, result];
                        case 3:
                            error_2 = _a.sent();
                            console.error("[FileBrowserService.getSiteMediaLibraries]: Err='".concat(error_2.message, "'"));
                            return [2 /*return*/, undefined];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Gets document and media libraries from the site
         * @param internalName Internal name of the library
         * @returns Library name
         */
        this.getLibraryNameByInternalName = function (internalName) { return __awaiter(_this, void 0, void 0, function () {
            var absoluteUrl, restApi, libraryResult, libResults, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        absoluteUrl = this.siteAbsoluteUrl;
                        restApi = "".concat(absoluteUrl, "/_api/web/GetFolderByServerRelativeUrl('").concat(internalName, "')/Properties?$select=vti_x005f_listtitle");
                        return [4 /*yield*/, this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)];
                    case 1:
                        libraryResult = _a.sent();
                        if (!libraryResult || !libraryResult.ok) {
                            throw new Error("Something went wrong when executing request. Status='".concat(libraryResult.status, "'"));
                        }
                        return [4 /*yield*/, libraryResult.json()];
                    case 2:
                        libResults = _a.sent();
                        if (!libResults || !libResults.vti_x005f_listtitle) {
                            throw new Error("Cannot read data from the results.");
                        }
                        return [2 /*return*/, libResults.vti_x005f_listtitle !== internalName && libResults.vti_x005f_listtitle || ""];
                    case 3:
                        error_3 = _a.sent();
                        console.error("[FileBrowserService.getSiteLibraryNameByInternalName]: Err='".concat(error_3.message, "'"));
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Downloads document content from SP location.
         * @param absoluteFileUrl Absolute URL of the file
         * @param fileName Name of the file
         * @returns File content
         */
        this.downloadSPFileContent = function (absoluteFileUrl, fileName) { return __awaiter(_this, void 0, void 0, function () {
            var fileDownloadResult, blob, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.context.spHttpClient.get(absoluteFileUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        fileDownloadResult = _a.sent();
                        if (!fileDownloadResult || !fileDownloadResult.ok) {
                            throw new Error("Something went wrong when downloading the file. Status='".concat(fileDownloadResult.status, "'"));
                        }
                        return [4 /*yield*/, fileDownloadResult.blob()];
                    case 2:
                        blob = _a.sent();
                        return [2 /*return*/, GeneralHelper.getFileFromBlob(blob, fileName)];
                    case 3:
                        err_1 = _a.sent();
                        console.error("[FileBrowserService.fetchFileContent] Err='".concat(err_1.message, "'"));
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Gets the Title and Id of the current Web
         * @returns SharePoint Site Title and Id
         */
        this.getSiteTitleAndId = function () { return __awaiter(_this, void 0, void 0, function () {
            var restApi, webResult, webJson;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        restApi = "".concat(this.siteAbsoluteUrl, "/_api/web?$select=Title,Id");
                        return [4 /*yield*/, this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)];
                    case 1:
                        webResult = _a.sent();
                        if (!webResult || !webResult.ok) {
                            throw new Error("Something went wrong when executing request. Status='".concat(webResult.status, "'"));
                        }
                        if (!webResult || !webResult) {
                            throw new Error("Cannot read data from the results.");
                        }
                        return [4 /*yield*/, webResult.json()];
                    case 2:
                        webJson = _a.sent();
                        return [2 /*return*/, { title: webJson.Title, id: webJson.Id }];
                }
            });
        }); };
        /**
         * Executes query to load files with possible extension filtering
         * @param restApi REST API URL
         * @param folderPath Folder path to get items from
         * @param acceptedFilesExtensions File extensions to filter the results
         * @param sortBy Field to sort by
         * @param isDesc Sort in descending order
         * @returns Files query result
         */
        this._getListDataAsStream = function (restApi, folderPath, acceptedFilesExtensions, sortBy, isDesc) { return __awaiter(_this, void 0, void 0, function () {
            var filesQueryResult, body, data, filesResult, items, error_4;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filesQueryResult = { items: [], nextHref: null };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        body = {
                            parameters: {
                                AllowMultipleValueFilterForTaxonomyFields: true,
                                // ContextInfo (1), ListData (2), ListSchema (4), ViewMetadata (1024), EnableMediaTAUrls (4096), ParentInfo (8192)
                                RenderOptions: 1 | 2 | 4 | 1024 | 4096 | 8192,
                                ViewXml: this.getFilesCamlQueryViewXml(acceptedFilesExtensions, sortBy || 'FileLeafRef', !!isDesc)
                            }
                        };
                        if (folderPath) {
                            // eslint-disable-next-line dot-notation
                            body.parameters["FolderServerRelativeUrl"] = folderPath;
                        }
                        return [4 /*yield*/, this.context.spHttpClient.fetch(restApi, SPHttpClient.configurations.v1, {
                                method: "POST",
                                body: JSON.stringify(body)
                            })];
                    case 2:
                        data = _a.sent();
                        if (!data || !data.ok) {
                            throw new Error("[FileBrowser._getListItems]: Something went wrong when executing request. Status='".concat(data.statusMessage, "'"));
                        }
                        return [4 /*yield*/, data.json()];
                    case 3:
                        filesResult = _a.sent();
                        if (!filesResult || !filesResult.ListData || !filesResult.ListData.Row) {
                            throw new Error("[FileBrowser._getListItems]: No data is available. Status='".concat(data.statusMessage, "'"));
                        }
                        // Set additional information from the ListResponse
                        this.processResponse(filesResult);
                        items = filesResult.ListData.Row.map(function (fileItem) { return _this.parseFileItem(fileItem); });
                        filesQueryResult = {
                            items: items,
                            nextHref: filesResult.ListData.NextHref
                        };
                        return [3 /*break*/, 5];
                    case 4:
                        error_4 = _a.sent();
                        filesQueryResult.items = undefined;
                        console.error(error_4.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, filesQueryResult];
                }
            });
        }); };
        /**
         * Generates Files CamlQuery ViewXml
         * @param accepts File extensions to filter the results
         * @param sortBy Field to sort by
         * @param isDesc Sort in descending order
         * @returns CamlQuery ViewXml
         */
        this.getFilesCamlQueryViewXml = function (accepts, sortBy, isDesc) {
            var fileFilter = _this.getFileTypeFilter(accepts);
            var queryCondition = fileFilter && fileFilter !== "" ?
                "<Query>\n        <Where>\n          <Or>\n            <And>\n              <Eq>\n                <FieldRef Name=\"FSObjType\" />\n                <Value Type=\"Text\">1</Value>\n              </Eq>\n              <Eq>\n                <FieldRef Name=\"SortBehavior\" />\n                <Value Type=\"Text\">1</Value>\n              </Eq>\n            </And>\n            <In>\n              <FieldRef Name=\"File_x0020_Type\" />\n              ".concat(fileFilter, "\n            </In>\n          </Or>\n        </Where>\n        <OrderBy><FieldRef Name=\"").concat(sortBy, "\" Ascending=\"").concat(isDesc ? 'False' : 'True', "\" /></OrderBy>\n      </Query>") : "<Query><OrderBy><FieldRef Name=\"".concat(sortBy, "\" Ascending=\"").concat(isDesc ? 'False' : 'True', "\" /></OrderBy></Query>");
            // Add files types condiiton
            var viewXml = "<View>\n                      ".concat(queryCondition, "\n                      <ViewFields>\n                        <FieldRef Name=\"DocIcon\"/>\n                        <FieldRef Name=\"LinkFilename\"/>\n                        <FieldRef Name=\"Modified\"/>\n                        <FieldRef Name=\"Editor\"/>\n                        <FieldRef Name=\"FileSizeDisplay\"/>\n                        <FieldRef Name=\"SharedWith\"/>\n                        <FieldRef Name=\"MediaServiceFastMetadata\"/>\n                        <FieldRef Name=\"MediaServiceOCR\"/>\n                        <FieldRef Name=\"_ip_UnifiedCompliancePolicyUIAction\"/>\n                        <FieldRef Name=\"ItemChildCount\"/>\n                        <FieldRef Name=\"FolderChildCount\"/>\n                        <FieldRef Name=\"SMTotalFileCount\"/>\n                        <FieldRef Name=\"SMTotalSize\"/>\n                      </ViewFields>\n                      <RowLimit Paged=\"TRUE\">").concat(_this.itemsToDownloadCount, "</RowLimit>\n                    </View>");
            return viewXml;
        };
        /**
         * Converts REST call results to IFile
         * @param fileItem File item from REST call
         * @returns File information
         */
        this.parseFileItem = function (fileItem) {
            var modifiedFriendly = fileItem["Modified.FriendlyDisplay"];
            // Get the modified date
            var modifiedParts = modifiedFriendly.split('|');
            var modified = fileItem.Modified;
            // If there is a friendly modified date, use that
            if (modifiedParts.length === 2) {
                modified = modifiedParts[1];
            }
            var file = {
                name: fileItem.FileLeafRef,
                fileIcon: fileItem.DocIcon,
                serverRelativeUrl: fileItem.FileRef,
                modified: modified,
                modifiedDate: new Date(fileItem.Modified),
                fileSize: fileItem.File_x0020_Size,
                fileType: fileItem.File_x0020_Type,
                modifiedBy: fileItem.Editor[0].title,
                isFolder: fileItem.FSObjType === "1",
                absoluteUrl: _this.buildAbsoluteUrl(fileItem.FileRef),
                // Required for item thumbnail
                supportsThumbnail: true,
                spItemUrl: fileItem[".spItemUrl"]
            };
            return file;
        };
        /**
         * Converts REST call results to ILibrary
         * @param libItem Library item from REST call
         * @param webUrl Web URL
         * @returns Library information
         */
        this.parseLibItem = function (libItem, webUrl) {
            var library = {
                title: libItem.Title,
                absoluteUrl: libItem.AbsoluteUrl,
                serverRelativeUrl: libItem.ServerRelativeUrl,
                webRelativeUrl: libItem.AbsoluteUrl.replace(webUrl, '')
            };
            return library;
        };
        /**
         * Creates an absolute URL
         * @param relativeUrl Relative URL
         * @returns Absolute URL
         */
        this.buildAbsoluteUrl = function (relativeUrl) {
            var siteUrl = GeneralHelper.getAbsoluteDomainUrl(_this.siteAbsoluteUrl);
            return "".concat(siteUrl).concat(relativeUrl.indexOf('/') === 0 ? '' : '/').concat(relativeUrl);
        };
        /**
         * Processes the response from the REST call to get additional information for the requested file
         * @param fileResponse REST call response
         */
        this.processResponse = function (fileResponse) {
            // Extract media base URL
            _this.mediaBaseUrl = fileResponse.ListSchema[".mediaBaseUrl"];
            _this.callerStack = fileResponse.ListSchema[".callerStack"];
            _this.driveAccessToken = fileResponse.ListSchema[".driveAccessToken"];
        };
        this.context = context;
        this.siteAbsoluteUrl = siteAbsoluteUrl || context.pageContext.web.absoluteUrl;
        this.itemsToDownloadCount = itemsToDownloadCount;
        this.driveAccessToken = null;
    }
    /**
     * Maps IFile property name to SharePoint item field name
     * @param filePropertyName File Property
     * @returns SharePoint Field Name
     */
    FileBrowserService.prototype.getSPFieldNameForFileProperty = function (filePropertyName) {
        var fieldName = '';
        switch (filePropertyName) {
            case 'fileIcon':
                fieldName = 'DocIcon';
                break;
            case 'serverRelativeUrl':
                fieldName = 'FileRef';
                break;
            case 'modified':
            case 'modifiedDate':
                fieldName = 'Modified';
                break;
            case 'fileSize':
                fieldName = 'File_x0020_Size';
                break;
            case 'fileType':
                fieldName = 'File_x0020_Type';
                break;
            case 'modifiedBy':
                fieldName = 'Editor';
                break;
        }
        return fieldName;
    };
    /**
     * Generates CamlQuery files filter.
     * @param accepts File extensions to filter the results
     * @returns CamlQuery filter
     */
    FileBrowserService.prototype.getFileTypeFilter = function (accepts) {
        var fileFilter = "";
        if (accepts && accepts.length > 0) {
            fileFilter = "<Values>";
            accepts.forEach(function (fileType, index) {
                fileType = fileType.replace(".", "");
                if (index >= 0) {
                    fileFilter = fileFilter + "<Value Type=\"Text\">".concat(fileType, "</Value>");
                }
            });
            fileFilter = fileFilter + "</Values>";
        }
        return fileFilter;
    };
    return FileBrowserService;
}());
export { FileBrowserService };
//# sourceMappingURL=FileBrowserService.js.map