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
import { find } from "@fluentui/react/lib/Utilities";
import { GeneralHelper } from "../common/utilities/GeneralHelper";
import { getSiteWebInfo } from './SPSitesService';
/**
 * Maximum file size when searching
 */
var MAXFILESIZE = 52428800;
/**
 * Maximum number of search results
 */
var MAXRESULTS = 100;
var FilesSearchService = /** @class */ (function () {
    function FilesSearchService(context, bingAPIKey, siteAbsoluteUrl) {
        var _this = this;
        /**
         * Checks if file exists
         */
        this.checkFileExists = function (fileUrl) { return __awaiter(_this, void 0, void 0, function () {
            var fetchFileResult, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.context.httpClient.fetch(fileUrl, SPHttpClient.configurations.v1, {
                                headers: new Headers(),
                                method: 'HEAD',
                                mode: 'cors'
                            })];
                    case 1:
                        fetchFileResult = _a.sent();
                        if (!fetchFileResult || !fetchFileResult.ok) {
                            throw new Error("Something went wrong when executing search query. Status='".concat(fetchFileResult.status, "'"));
                        }
                        return [2 /*return*/, true];
                    case 2:
                        err_1 = _a.sent();
                        console.error("[BingFilesService.fetchFile]: Err='".concat(err_1.message, "'"));
                        return [2 /*return*/, false];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Executes Recent files search.
         */
        this.executeRecentSearch = function (accepts) { return __awaiter(_this, void 0, void 0, function () {
            var webId, siteId, siteinfo, fileFilter, queryTemplate, queryData, searchApi, recentSearchDataResult, recentSearchData, recentFilesResult, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        webId = this.context.pageContext.web.id.toString();
                        siteId = this.context.pageContext.site.id.toString();
                        if (!(this.siteAbsoluteUrl !== this.context.pageContext.web.absoluteUrl)) return [3 /*break*/, 2];
                        return [4 /*yield*/, getSiteWebInfo(this.context, this.siteAbsoluteUrl)];
                    case 1:
                        siteinfo = _a.sent();
                        webId = siteinfo.webId;
                        siteId = siteinfo.siteId;
                        _a.label = 2;
                    case 2:
                        fileFilter = this._getFileFilter(accepts);
                        queryTemplate = "((SiteID:".concat(siteId, " OR SiteID: {").concat(siteId, "}) AND (WebId: ").concat(webId, " OR WebId: {").concat(webId, "})) AND LastModifiedTime < {Today} AND -Title:OneNote_DeletedPages AND -Title:OneNote_RecycleBin").concat(fileFilter);
                        queryData = {
                            __metadata: { "type": "Microsoft.Office.Server.Search.REST.SearchRequest" },
                            QueryTemplate: queryTemplate,
                            RowLimit: 20,
                            SelectProperties: {
                                results: [
                                    "Title",
                                    "Path",
                                    "Filename",
                                    "FileExtension",
                                    "FileType",
                                    "Created",
                                    "Author",
                                    "LastModifiedTime",
                                    "EditorOwsUser",
                                    "ModifiedBy",
                                    "LinkingUrl",
                                    "SiteTitle",
                                    "ParentLink",
                                    "DocumentPreviewMetadata",
                                    "ListID",
                                    "ListItemID",
                                    "SPSiteURL",
                                    "SiteID",
                                    "WebId",
                                    "UniqueID",
                                    "SPWebUrl",
                                    "DefaultEncodingURL",
                                    "PictureThumbnailURL",
                                ]
                            },
                            SortList: {
                                results: [
                                    {
                                        "Property": "LastModifiedTime",
                                        "Direction": 1
                                    }
                                ]
                            }
                        };
                        searchApi = "".concat(this.siteAbsoluteUrl, "/_api/search/postquery");
                        return [4 /*yield*/, this.context.spHttpClient.post(searchApi, SPHttpClient.configurations.v1, {
                                headers: {
                                    'accept': 'application/json;odata=nometadata',
                                    'content-type': 'application/json;odata=verbose',
                                    "odata-version": ""
                                },
                                body: JSON.stringify({
                                    request: queryData
                                })
                            })];
                    case 3:
                        recentSearchDataResult = _a.sent();
                        if (!recentSearchDataResult || !recentSearchDataResult.ok) {
                            throw new Error("Something went wrong when executing search query. Status='".concat(recentSearchDataResult.status, "'"));
                        }
                        return [4 /*yield*/, recentSearchDataResult.json()];
                    case 4:
                        recentSearchData = _a.sent();
                        if (!recentSearchData || !recentSearchData.PrimaryQueryResult.RelevantResults.Table.Rows) {
                            throw new Error("Cannot read JSON result");
                        }
                        recentFilesResult = recentSearchData.PrimaryQueryResult.RelevantResults.Table.Rows.map(function (row) { return _this.parseRecentSearchResult(row.Cells); });
                        return [2 /*return*/, recentFilesResult];
                    case 5:
                        err_2 = _a.sent();
                        console.error("[BingFilesService.executeRecentSearch]: Err='".concat(err_2.message, "'"));
                        return [2 /*return*/, undefined];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Executes bing search for a file.
         */
        this.executeBingSearch = function (queryParams) { return __awaiter(_this, void 0, void 0, function () {
            var aspect, size, license, query, maxResults, maxFileSize, apiUrl, searchDataResponse, searchData, bingResults, searchResults, err_3;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        aspect = queryParams.aspect ? queryParams.aspect : 'All';
                        size = queryParams.size ? queryParams.size : 'All';
                        license = queryParams.license ? queryParams.license : 'Any';
                        query = queryParams.query;
                        maxResults = queryParams.maxResults ? queryParams.maxResults : MAXRESULTS;
                        maxFileSize = queryParams.maxFileSize ? queryParams.maxFileSize : MAXFILESIZE;
                        // No query
                        if (query === undefined) {
                            return [2 /*return*/];
                        }
                        apiUrl = "https://api.bing.microsoft.com/v7.0/images/search?q=".concat(encodeURIComponent(query), "&count=").concat(maxResults, "&aspect=").concat(aspect, "&maxFileSize=").concat(maxFileSize, "&size=").concat(size, "&mkt=en-US&license=").concat(license);
                        return [4 /*yield*/, this.context.httpClient.get(apiUrl, SPHttpClient.configurations.v1, {
                                method: 'GET',
                                mode: 'cors',
                                headers: {
                                    'Ocp-Apim-Subscription-Key': this.bingAPIKey,
                                }
                            })];
                    case 1:
                        searchDataResponse = _a.sent();
                        if (!searchDataResponse || !searchDataResponse.ok) {
                            throw new Error("Something went wrong when executing search query. Status='".concat(searchDataResponse.statusText, "'"));
                        }
                        return [4 /*yield*/, searchDataResponse.json()];
                    case 2:
                        searchData = _a.sent();
                        if (!searchData || !searchData.value) {
                            throw new Error("Cannot read JSON result");
                        }
                        bingResults = searchData.value;
                        searchResults = bingResults.map(function (item) { return _this.parseBingSearchResult(item); });
                        return [2 /*return*/, searchResults];
                    case 3:
                        err_3 = _a.sent();
                        console.error("[BingFilesService.executeSearch]: Err='".concat(err_3.message, "'"));
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Downloads document content from SP location.
         */
        this.downloadSPFileContent = function (absoluteFileUrl, fileName) { return __awaiter(_this, void 0, void 0, function () {
            var fileDownloadResult, blob, err_4;
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
                        // Retrieve file from blob - method supports IE11
                        return [2 /*return*/, GeneralHelper.getFileFromBlob(blob, fileName)];
                    case 3:
                        err_4 = _a.sent();
                        console.error("[FileSearchService.fetchFileContent] Err='".concat(err_4.message, "'"));
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Downloads document content from Remote location.
         */
        this.downloadBingContent = function (absoluteFileUrl, fileName) { return __awaiter(_this, void 0, void 0, function () {
            var fileDownloadResult, blob, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.context.httpClient.get(absoluteFileUrl, SPHttpClient.configurations.v1, {
                                method: "GET",
                                mode: "cors"
                            })];
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
                        err_5 = _a.sent();
                        console.error("[FileSearchService.fetchFileContent] Err='".concat(err_5.message, "'"));
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        /**
         * Parses Recent Search results.
         */
        this.parseRecentSearchResult = function (cells) {
            var titleCell = find(cells, function (x) { return x.Key === "Title"; });
            var keyCell = find(cells, function (x) { return x.Key === "UniqueID"; });
            var fileUrlCell = find(cells, function (x) { return x.Key === "DefaultEncodingURL"; });
            var editedByCell = find(cells, function (x) { return x.Key === "ModifiedBy"; });
            var recentFile = {
                key: keyCell ? keyCell.Value : null,
                name: titleCell ? titleCell.Value : null,
                fileUrl: fileUrlCell ? fileUrlCell.Value : null,
                editedBy: editedByCell ? editedByCell.Value : null,
                isFolder: !fileUrlCell.Value
            };
            return recentFile;
        };
        /**
         * Parses Bing search results.
         */
        this.parseBingSearchResult = function (bingResult) {
            // Get dimensions
            var width = bingResult.thumbnail.width ? bingResult.thumbnail.width : bingResult.width;
            var height = bingResult.thumbnail.height ? bingResult.thumbnail.height : bingResult.height;
            // Create a search result
            var searchResult = {
                thumbnailUrl: bingResult.thumbnailUrl,
                contentUrl: bingResult.contentUrl,
                displayUrl: _this.getDisplayUrl(bingResult.hostPageDisplayUrl),
                key: bingResult.imageId,
                width: width,
                height: height,
            };
            return searchResult;
        };
        /**
         * Removes protocol and retrieves only the domain, just like Bing search results does
         * in the SharePoint file picker
         * @param url The display url as provided by Bing
         */
        this.getDisplayUrl = function (url) {
            // remove any protocols
            if (url.indexOf('://') > -1) {
                var urlParts = url.split('://');
                url = urlParts.pop();
            }
            // Split the URL on the first slash
            var splitUrl = url.split('/');
            return splitUrl[0];
        };
        this.context = context;
        this.bingAPIKey = bingAPIKey;
        this.siteAbsoluteUrl = siteAbsoluteUrl || context.pageContext.web.absoluteUrl;
    }
    /**
     * Builds a file filter using the accepted file extensions
     */
    FilesSearchService.prototype._getFileFilter = function (accepts) {
        var fileFilter = undefined;
        if (accepts) {
            fileFilter = " AND (";
            accepts.forEach(function (fileType, index) {
                fileType = fileType.replace(".", "");
                if (index > 0) {
                    fileFilter = fileFilter + " OR ";
                }
                fileFilter = fileFilter + "FileExtension:".concat(fileType, " OR SecondaryFileExtension:").concat(fileType);
            });
            fileFilter = fileFilter + ")";
        }
        return fileFilter;
    };
    return FilesSearchService;
}());
export { FilesSearchService };
//# sourceMappingURL=FilesSearchService.js.map