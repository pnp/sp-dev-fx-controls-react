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
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
export var useGraphAPI = function (context) {
    var graphClient = React.useMemo(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!context)
                        return [2 /*return*/, undefined];
                    return [4 /*yield*/, context.msGraphClientFactory.getClient("3")];
                case 1: return [2 /*return*/, _a.sent()];
            }
        });
    }); }, [context]);
    var searchImages = React.useCallback(function (query, from) {
        if (from === void 0) { from = 0; }
        return __awaiter(void 0, void 0, void 0, function () {
            var client, searchResults, hasMoreResults, total, fields, error_1;
            var _a, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        if (!query || !graphClient)
                            return [2 /*return*/, undefined];
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, graphClient];
                    case 2:
                        client = _h.sent();
                        return [4 /*yield*/, client.api("/search/query").post({
                                requests: [
                                    {
                                        entityTypes: ["driveItem"],
                                        query: {
                                            queryString: "".concat(query, " AND -driveitem:\"\""),
                                        },
                                        fields: [
                                            "editor",
                                            "driveId",
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
                                            "DriveItem",
                                            "UniqueId",
                                            "BannerImageUrlOWSURLH",
                                        ],
                                        from: from,
                                        size: 50,
                                    },
                                ],
                            })];
                    case 3:
                        searchResults = _h.sent();
                        hasMoreResults = (_b = (_a = searchResults.value[0]) === null || _a === void 0 ? void 0 : _a.hitsContainers[0]) === null || _b === void 0 ? void 0 : _b.moreResultsAvailable;
                        total = (_d = (_c = searchResults.value[0]) === null || _c === void 0 ? void 0 : _c.hitsContainers[0]) === null || _d === void 0 ? void 0 : _d.total;
                        fields = (_g = (_f = (_e = searchResults.value[0]) === null || _e === void 0 ? void 0 : _e.hitsContainers[0]) === null || _f === void 0 ? void 0 : _f.hits) === null || _g === void 0 ? void 0 : _g.map(function (hit) {
                            var _a, _b;
                            return __assign(__assign({}, (_a = hit.resource) === null || _a === void 0 ? void 0 : _a.listItem.fields), { id: (_b = hit.resource) === null || _b === void 0 ? void 0 : _b.listItem.id });
                        });
                        return [2 /*return*/, { fields: fields, hasMoreResults: hasMoreResults, total: total }];
                    case 4:
                        error_1 = _h.sent();
                        console.error("[searchImages] error:", error_1);
                        throw error_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    }, [graphClient]);
    var getDriveItemDownloadUrl = React.useCallback(function (driveId, itemId) { return __awaiter(void 0, void 0, void 0, function () {
        var client, driveItem, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!graphClient || !driveId || !itemId)
                        return [2 /*return*/, undefined];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, graphClient];
                case 2:
                    client = _a.sent();
                    return [4 /*yield*/, client
                            .api("/drives/".concat(driveId, "/items/").concat(itemId, "?select=@microsoft.graph.downloadUrl"))
                            .get()];
                case 3:
                    driveItem = _a.sent();
                    return [2 /*return*/, driveItem["@microsoft.graph.downloadUrl"]];
                case 4:
                    error_2 = _a.sent();
                    console.error("[getDriveItemDownloadUrl] error:", error_2);
                    throw error_2;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient]);
    var getSiteAssetsLibrary = React.useCallback(function (site) { return __awaiter(void 0, void 0, void 0, function () {
        var client, query, searchResults, fields, error_3;
        var _a, _b, _c;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0:
                    if (!site || !graphClient)
                        return [2 /*return*/, undefined];
                    _d.label = 1;
                case 1:
                    _d.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, graphClient];
                case 2:
                    client = _d.sent();
                    query = "path:".concat(site, "/SiteAssets");
                    return [4 /*yield*/, client.api("/search/query").post({
                            requests: [
                                {
                                    entityTypes: ["drive"],
                                    query: {
                                        queryString: query,
                                    },
                                    fields: [
                                        "editor",
                                        "driveId",
                                        "Title",
                                        "Path",
                                        "Filename",
                                        "FileExtension",
                                        "id",
                                        "name",
                                        "path",
                                        "parentReference",
                                    ],
                                },
                            ],
                        })];
                case 3:
                    searchResults = _d.sent();
                    fields = (_c = (_b = (_a = searchResults.value[0]) === null || _a === void 0 ? void 0 : _a.hitsContainers[0]) === null || _b === void 0 ? void 0 : _b.hits) === null || _c === void 0 ? void 0 : _c.map(function (hit) { return (__assign({}, hit.resource)); });
                    return [2 /*return*/, fields[0]];
                case 4:
                    error_3 = _d.sent();
                    console.error("[getSiteAssetsLibrary] error:", error_3);
                    throw error_3;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient]);
    return {
        searchImages: searchImages,
        getDriveItemDownloadUrl: getDriveItemDownloadUrl,
        getSiteAssetsLibrary: getSiteAssetsLibrary,
    };
};
//# sourceMappingURL=useGrapAPI.js.map