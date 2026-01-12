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
import { SPHttpClient } from '@microsoft/sp-http';
import { FileBrowserService } from "./FileBrowserService";
import { GeneralHelper } from "../common/utilities/GeneralHelper";
var OneDriveService = /** @class */ (function (_super) {
    __extends(OneDriveService, _super);
    function OneDriveService(context, itemsToDownloadCount) {
        var _this = _super.call(this, context, itemsToDownloadCount) || this;
        /**
         * Gets files from OneDrive personal library
         */
        _this.getListItems = function (listUrl, folderPath, acceptedFilesExtensions, nextPageQueryStringParams) { return __awaiter(_this, void 0, void 0, function () {
            var filesQueryResult, oneDriveRootFolder, encodedListUrl, queryStringParams, encodedFolderPath, restApi, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filesQueryResult = { items: [], nextHref: null };
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.getOneDriveRootFolderFullUrl()];
                    case 2:
                        oneDriveRootFolder = _a.sent();
                        encodedListUrl = encodeURIComponent(oneDriveRootFolder);
                        queryStringParams = "";
                        folderPath = folderPath ? folderPath : this.oneDriveRootFolderRelativeUrl;
                        encodedFolderPath = encodeURIComponent(folderPath);
                        if (nextPageQueryStringParams) {
                            // Remove start ? from the query params
                            if (nextPageQueryStringParams.charAt(0) === "?") {
                                nextPageQueryStringParams = nextPageQueryStringParams.substring(1);
                            }
                            queryStringParams = nextPageQueryStringParams;
                        }
                        else {
                            queryStringParams = "RootFolder=".concat(encodedFolderPath);
                        }
                        restApi = "".concat(this.context.pageContext.web.absoluteUrl, "/_api/SP.List.GetListDataAsStream?listFullUrl='").concat(encodedListUrl, "'&").concat(queryStringParams);
                        return [4 /*yield*/, this._getListDataAsStream(restApi, null, acceptedFilesExtensions)];
                    case 3:
                        filesQueryResult = _a.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        filesQueryResult.items = null;
                        console.error(error_1.message);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, filesQueryResult];
                }
            });
        }); };
        /**
         * Downloads document content from OneDrive location.
         */
        _this.downloadSPFileContent = function (absoluteFileUrl, fileName) { return __awaiter(_this, void 0, void 0, function () {
            var urlTokens, fileUrl, fileInfoResult, fileInfo, oneDrvieFileUrl, fileDownloadResult, blob, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        urlTokens = absoluteFileUrl.split("/_api/");
                        fileUrl = "".concat(this.context.pageContext.web.absoluteUrl, "/_api/").concat(urlTokens[1], "?");
                        return [4 /*yield*/, this.context.spHttpClient.get(fileUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        fileInfoResult = _a.sent();
                        return [4 /*yield*/, fileInfoResult.json()];
                    case 2:
                        fileInfo = _a.sent();
                        oneDrvieFileUrl = fileInfo["@content.downloadUrl"];
                        return [4 /*yield*/, this.context.httpClient.get(oneDrvieFileUrl, SPHttpClient.configurations.v1, {
                                headers: new Headers(),
                                method: 'GET',
                                mode: 'cors'
                            })];
                    case 3:
                        fileDownloadResult = _a.sent();
                        if (!fileDownloadResult || !fileDownloadResult.ok) {
                            throw new Error("Something went wrong when downloading the file. Status='".concat(fileDownloadResult.status, "'"));
                        }
                        return [4 /*yield*/, fileDownloadResult.blob()];
                    case 4:
                        blob = _a.sent();
                        return [2 /*return*/, GeneralHelper.getFileFromBlob(blob, fileName)];
                    case 5:
                        err_1 = _a.sent();
                        console.error("[OneDriveService.fetchFileContent] Err='".concat(err_1.message, "'"));
                        return [2 /*return*/, null];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        /**
           * Gets users one drive personal documents library path
           */
        _this.getOneDriveRootFolderFullUrl = function () { return __awaiter(_this, void 0, void 0, function () {
            var oneDriveUrl, apiUrl, oneDriveFolderResult, oneDriveLibsData, isDefaultLang, myDocumentsLibrary, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        // Return result if already obtained
                        if (this.oneDriveRootFolderAbsoluteUrl) {
                            return [2 /*return*/, this.oneDriveRootFolderAbsoluteUrl];
                        }
                        return [4 /*yield*/, this.getOneDrivePersonalUrl()];
                    case 1:
                        oneDriveUrl = _a.sent();
                        if (!oneDriveUrl) {
                            throw new Error("Cannot obtain OneDrive personal URL.");
                        }
                        apiUrl = "".concat(this.context.pageContext.web.absoluteUrl, "/_api/SP.RemoteWeb(@a1)/Web/Lists?$filter=BaseTemplate eq 700 and BaseType eq 1&@a1='").concat(encodeURIComponent(oneDriveUrl), "'");
                        return [4 /*yield*/, this.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1, {
                                headers: {
                                    "accept": "application/json;odata=nometadata",
                                    "content-type": "application/json;odata=nometadata",
                                    "odata-version": ""
                                }
                            })];
                    case 2:
                        oneDriveFolderResult = _a.sent();
                        if (!oneDriveFolderResult || !oneDriveFolderResult.ok) {
                            throw new Error("Something went wrong when executing oneDriveRootFolder retrieve request. Status='".concat(oneDriveFolderResult.status, "'"));
                        }
                        return [4 /*yield*/, oneDriveFolderResult.json()];
                    case 3:
                        oneDriveLibsData = _a.sent();
                        if (!oneDriveLibsData || !oneDriveLibsData.value || oneDriveLibsData.value.length === 0) {
                            throw new Error("Cannot read one drive libs data.");
                        }
                        isDefaultLang = this.isCurrentLanguageDefault();
                        myDocumentsLibrary = oneDriveLibsData.value[0];
                        this.oneDrivePersonalLibraryTitle = isDefaultLang ? myDocumentsLibrary.Title : myDocumentsLibrary.EntityTypeName;
                        this.oneDriveRootFolderRelativeUrl = "".concat(myDocumentsLibrary.ParentWebUrl, "/").concat(isDefaultLang ? myDocumentsLibrary.Title : myDocumentsLibrary.EntityTypeName);
                        this.oneDriveRootFolderAbsoluteUrl = "".concat(this.oneDrivePersonalUrl).concat(isDefaultLang ? myDocumentsLibrary.Title : myDocumentsLibrary.EntityTypeName);
                        return [3 /*break*/, 5];
                    case 4:
                        error_2 = _a.sent();
                        console.error("[FileBrowserService.getOneDrivePersonalUrl] Err='".concat(error_2.message, "'"));
                        this.oneDriveRootFolderAbsoluteUrl = null;
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/, this.oneDriveRootFolderAbsoluteUrl];
                }
            });
        }); };
        /**
         * Gets OneDrive RootFolder server relative URL.
         */
        _this.getOneDriveRootFolderRelativeUrl = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.oneDriveRootFolderRelativeUrl) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getOneDriveRootFolderFullUrl()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.oneDriveRootFolderRelativeUrl];
                }
            });
        }); };
        /**
         * Gets OneDrive personal library Title
         */
        _this.getOneDrivePersonalLibraryTitle = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.oneDrivePersonalLibraryTitle) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getOneDriveRootFolderFullUrl()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/, this.oneDrivePersonalLibraryTitle];
                }
            });
        }); };
        /**
         * Gets personal site path.
         */
        _this.getOneDrivePersonalUrl = function () { return __awaiter(_this, void 0, void 0, function () {
            var userProfileApi, userProfileResult, profileData, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        // Return result if already obtained
                        if (this.oneDrivePersonalUrl) {
                            return [2 /*return*/, this.oneDrivePersonalUrl];
                        }
                        userProfileApi = "".concat(this.context.pageContext.web.absoluteUrl, "/_api/SP.UserProfiles.ProfileLoader.GetProfileLoader/GetUserProfile");
                        return [4 /*yield*/, this.context.spHttpClient.post(userProfileApi, SPHttpClient.configurations.v1, {})];
                    case 1:
                        userProfileResult = _a.sent();
                        if (!userProfileResult || !userProfileResult.ok) {
                            throw new Error("Something went wrong when executing user profile request. Status='".concat(userProfileResult.status, "'"));
                        }
                        return [4 /*yield*/, userProfileResult.json()];
                    case 2:
                        profileData = _a.sent();
                        if (!profileData) {
                            throw new Error("Cannot read user profile data.");
                        }
                        this.oneDrivePersonalUrl = profileData.FollowPersonalSiteUrl;
                        return [3 /*break*/, 4];
                    case 3:
                        error_3 = _a.sent();
                        console.error("[FileBrowserService.getOneDrivePersonalUrl] Err='".concat(error_3.message, "'"));
                        this.oneDrivePersonalUrl = null;
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, this.oneDrivePersonalUrl];
                }
            });
        }); };
        /**
         * Creates an absolute URL
         */
        _this.buildAbsoluteUrl = function (relativeUrl) {
            return "https://".concat(_this.oneDrivePersonalUrl.split("//")[1].split("/")[0]).concat(relativeUrl);
        };
        _this.oneDrivePersonalUrl = null;
        _this.oneDriveRootFolderRelativeUrl = null;
        _this.oneDriveRootFolderAbsoluteUrl = null;
        _this.oneDrivePersonalLibraryTitle = null;
        return _this;
    }
    /**
     * Checks if the current language is default (en-US)
     */
    OneDriveService.prototype.isCurrentLanguageDefault = function () {
        return this.context.pageContext.cultureInfo.currentUICultureName === 'en-US';
    };
    return OneDriveService;
}(FileBrowserService));
export { OneDriveService };
//# sourceMappingURL=OneDriveService.js.map