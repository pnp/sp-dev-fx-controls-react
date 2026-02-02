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
import { FileBrowserService } from "./FileBrowserService";
import { SPHttpClient } from "@microsoft/sp-http";
/**
 * OrgAssetsService class
 */
var OrgAssetsService = /** @class */ (function (_super) {
    __extends(OrgAssetsService, _super);
    /**
     * Constructor
     * @param context Component context
     * @param itemsToDownloadCount Items to download count
     */
    function OrgAssetsService(context, itemsToDownloadCount) {
        var _this = _super.call(this, context, itemsToDownloadCount) || this;
        // Site organization assets library server relative URL
        _this._orgAssetsLibraryServerRelativeSiteUrl = null;
        /**
         * Gets files from current sites library
         * @param _listUrl Unused parameter (not used in this implementation)
         * @param folderPath Folder path to get items from
         * @param acceptedFilesExtensions File extensions to filter the results
         * @param nextPageQueryStringParams Query string parameters to get the next page of results
         * @returns Items in the specified folder
         */
        _this.getListItems = function (_listUrl, folderPath, acceptedFilesExtensions, nextPageQueryStringParams) { return __awaiter(_this, void 0, void 0, function () {
            var filesQueryResult, libName, libFullUrl, queryStringParams, restApi, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filesQueryResult = { items: [], nextHref: null };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        if (folderPath.charAt(0) !== '/') {
                            folderPath = "/".concat(folderPath);
                        }
                        libName = folderPath.replace("".concat(this.orgAssetsLibraryServerRelativeSiteUrl, "/"), '');
                        libName = libName.split('/')[0];
                        libFullUrl = this.buildAbsoluteUrl("".concat(this.orgAssetsLibraryServerRelativeSiteUrl, "/").concat(libName));
                        queryStringParams = "";
                        // Do not pass FolderServerRelativeUrl as query parameter
                        // Attach passed nextPageQueryStringParams values to REST URL
                        if (nextPageQueryStringParams) {
                            // Remove start ? from the query params
                            if (nextPageQueryStringParams.charAt(0) === "?") {
                                nextPageQueryStringParams = nextPageQueryStringParams.substring(1);
                            }
                            queryStringParams = nextPageQueryStringParams;
                        }
                        else {
                            queryStringParams = "RootFolder=".concat(folderPath);
                        }
                        restApi = "".concat(this.context.pageContext.web.absoluteUrl, "/_api/SP.List.GetListDataAsStream?listFullUrl='").concat(libFullUrl, "'&").concat(queryStringParams);
                        return [4 /*yield*/, this._getListDataAsStream(restApi, null, acceptedFilesExtensions)];
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
         * Gets document and media libraries from the site
         * @param includePageLibraries Unused parameter (not used in this implementation)
         * @returns Document and media libraries from the site
         */
        _this.getSiteMediaLibraries = function (includePageLibraries) {
            if (includePageLibraries === void 0) { includePageLibraries = false; }
            return __awaiter(_this, void 0, void 0, function () {
                var restApi, orgAssetsResult, orgAssetsData, libs, error_2;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 3, , 4]);
                            restApi = "".concat(this.context.pageContext.web.absoluteUrl, "/_api/SP.Publishing.SitePageService.FilePickerTabOptions");
                            return [4 /*yield*/, this.context.spHttpClient.get(restApi, SPHttpClient.configurations.v1)];
                        case 1:
                            orgAssetsResult = _a.sent();
                            if (!orgAssetsResult || !orgAssetsResult.ok) {
                                throw new Error("Something went wrong when executing request. Status='".concat(orgAssetsResult.status, "'"));
                            }
                            return [4 /*yield*/, orgAssetsResult.json()];
                        case 2:
                            orgAssetsData = _a.sent();
                            if (!orgAssetsData || !orgAssetsData.OrgAssets || !orgAssetsData.OrgAssets.OrgAssetsLibraries || !orgAssetsData.OrgAssets.OrgAssetsLibraries.Items || orgAssetsData.OrgAssets.OrgAssetsLibraries.Items.length <= 0) {
                                return [2 /*return*/, null];
                            }
                            this.orgAssetsLibraryServerRelativeSiteUrl = orgAssetsData ? orgAssetsData.OrgAssets.Url.DecodedUrl : null;
                            libs = orgAssetsData && orgAssetsData.OrgAssets ? orgAssetsData.OrgAssets.OrgAssetsLibraries.Items.map(function (libItem) { return _this._parseOrgAssetsLibraryItem(libItem); }) : [];
                            return [2 /*return*/, libs];
                        case 3:
                            error_2 = _a.sent();
                            console.error("[OrgAssetsService.getOrganisationAssetsLibraries]: Err='".concat(error_2.message, "'"));
                            return [2 /*return*/, null];
                        case 4: return [2 /*return*/];
                    }
                });
            });
        };
        /**
         * Parses the organisation assets library item
         * @param libItem Library item to parse
         * @returns Organisation assets library
         */
        _this._parseOrgAssetsLibraryItem = function (libItem) {
            var orgAssetsLibrary = {
                absoluteUrl: _this.buildAbsoluteUrl(libItem.LibraryUrl.DecodedUrl),
                title: libItem.DisplayName,
                serverRelativeUrl: libItem.LibraryUrl.DecodedUrl,
                iconPath: libItem.ThumbnailUrl && libItem.ThumbnailUrl.DecodedUrl ? _this.buildAbsoluteUrl("".concat(_this.orgAssetsLibraryServerRelativeSiteUrl, "/").concat(libItem.ThumbnailUrl.DecodedUrl)) : null
            };
            return orgAssetsLibrary;
        };
        return _this;
    }
    Object.defineProperty(OrgAssetsService.prototype, "orgAssetsLibraryServerRelativeSiteUrl", {
        get: function () {
            return this._orgAssetsLibraryServerRelativeSiteUrl;
        },
        set: function (value) {
            var _a;
            if (value === "/") {
                this._orgAssetsLibraryServerRelativeSiteUrl = "";
            }
            else {
                this._orgAssetsLibraryServerRelativeSiteUrl = (_a = value === null || value === void 0 ? void 0 : value.replace(/\/$/, "")) !== null && _a !== void 0 ? _a : null;
            }
        },
        enumerable: false,
        configurable: true
    });
    return OrgAssetsService;
}(FileBrowserService));
export { OrgAssetsService };
//# sourceMappingURL=OrgAssetsService.js.map