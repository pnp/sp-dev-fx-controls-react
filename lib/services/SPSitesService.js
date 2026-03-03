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
var getAllSitesInternal = function (ctx, queryText, trimDuplicates) { return __awaiter(void 0, void 0, void 0, function () {
    var startRow, rowLimit, totalRows, currentRows, values, searchRequest, requestUrl, searchResponse, sitesResponse, relevantResults, res;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                startRow = 0;
                rowLimit = 500;
                totalRows = 0;
                currentRows = 0;
                values = [];
                searchRequest = {
                    QueryTemplate: queryText,
                    RowLimit: rowLimit,
                    TrimDuplicates: trimDuplicates,
                    SelectProperties: ['SiteId', 'SiteID', 'WebId', 'DepartmentId', 'Title', 'Path'],
                    StartRow: 0
                };
                requestUrl = "".concat(ctx.pageContext.web.absoluteUrl, "/_api/search/postquery");
                _b.label = 1;
            case 1:
                searchRequest.StartRow = startRow;
                return [4 /*yield*/, ctx.spHttpClient.post(requestUrl, SPHttpClient.configurations.v1, {
                        body: JSON.stringify({ request: searchRequest }),
                        headers: {
                            'Accept': 'application/json;odata=nometadata',
                            'Content-Type': 'application/json;charset=utf-8',
                            'odata-version': '3.0'
                        }
                    })];
            case 2:
                searchResponse = _b.sent();
                return [4 /*yield*/, searchResponse.json()];
            case 3:
                sitesResponse = _b.sent();
                relevantResults = sitesResponse.PrimaryQueryResult.RelevantResults;
                values.push.apply(values, relevantResults.Table.Rows);
                totalRows = relevantResults.TotalRows;
                startRow += rowLimit;
                currentRows = (_a = relevantResults.Table.Rows) === null || _a === void 0 ? void 0 : _a.length;
                _b.label = 4;
            case 4:
                if (values.length < totalRows && currentRows !== 0) return [3 /*break*/, 1];
                _b.label = 5;
            case 5:
                res = [];
                res = values.map(function (element) {
                    var site = {};
                    element.Cells.forEach(function (cell) {
                        switch (cell.Key) {
                            case 'Title':
                                site.title = cell.Value;
                                break;
                            case 'Path':
                                site.url = cell.Value;
                                break;
                            case 'SiteId':
                            case 'SiteID':
                                site.id = cell.Value;
                                break;
                            case 'WebId':
                                site.webId = cell.Value;
                                break;
                            case 'DepartmentId':
                                if (cell.Value) {
                                    if (cell.Value.indexOf('{') === 0) {
                                        site.hubSiteId = cell.Value.slice(1, -1);
                                    }
                                    else {
                                        site.hubSiteId = cell.Value;
                                    }
                                }
                                break;
                        }
                    });
                    return site;
                });
                return [2 /*return*/, res];
        }
    });
}); };
export var getAllSites = function (ctx, includeWebs, currentSiteCollectionOnly, trimDuplicates, additionaQuery) { return __awaiter(void 0, void 0, void 0, function () {
    var rootUrl, queryText;
    return __generator(this, function (_a) {
        rootUrl = ctx.pageContext.web.absoluteUrl;
        if (ctx.pageContext.web.serverRelativeUrl !== '/' && (!includeWebs || !currentSiteCollectionOnly)) {
            rootUrl = ctx.pageContext.web.absoluteUrl.replace(ctx.pageContext.web.serverRelativeUrl, '');
        }
        queryText = "(contentclass:STS_Site".concat(includeWebs ? ' contentclass:STS_Web' : '', " Path:").concat(rootUrl, "*)");
        if (additionaQuery) {
            queryText += " AND (".concat(additionaQuery, ")");
        }
        return [2 /*return*/, getAllSitesInternal(ctx, queryText, trimDuplicates)];
    });
}); };
export var getHubSites = function (ctx) { return __awaiter(void 0, void 0, void 0, function () {
    var hubSites, requestUrl, response, json;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                hubSites = [];
                requestUrl = "".concat(ctx.pageContext.site.absoluteUrl, "/_api/HubSites?$select=SiteId,ID,SiteUrl,Title");
                return [4 /*yield*/, ctx.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _a.sent();
                json.value.forEach(function (v) {
                    hubSites.push({
                        title: v.Title,
                        id: v.SiteId,
                        hubSiteId: v.ID,
                        url: v.SiteUrl
                    });
                });
                return [2 /*return*/, hubSites];
        }
    });
}); };
export var getSiteWebInfo = function (ctx, webUrl) { return __awaiter(void 0, void 0, void 0, function () {
    var webInfo, siteInfo, webInfoResult, siteInfoResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, ctx.spHttpClient.get("".concat(webUrl, "/_api/web?$select=id,Title"), SPHttpClient.configurations.v1)];
            case 1:
                webInfo = _a.sent();
                if (!webInfo || !webInfo.ok) {
                    throw new Error("[FileBrowser.getWebInfo]: Something went wrong when executing request. Status='".concat(webInfo.statusText, "'"));
                }
                return [4 /*yield*/, ctx.spHttpClient.get("".concat(webUrl, "/_api/site?$select=id"), SPHttpClient.configurations.v1)];
            case 2:
                siteInfo = _a.sent();
                if (!siteInfo || !siteInfo.ok) {
                    throw new Error("[FileBrowser.getWebInfo]: Something went wrong when executing request. Status='".concat(webInfo.statusText, "'"));
                }
                return [4 /*yield*/, webInfo.json()];
            case 3:
                webInfoResult = _a.sent();
                return [4 /*yield*/, siteInfo.json()];
            case 4:
                siteInfoResult = _a.sent();
                return [2 /*return*/, {
                        title: webInfoResult.Title,
                        webId: webInfoResult.Id,
                        siteId: siteInfoResult.Id
                    }];
        }
    });
}); };
export var getAssociatedSites = function (ctx, trimDuplicates, hubSiteId) { return __awaiter(void 0, void 0, void 0, function () {
    var requestUrl, response, json, hubsiteData, queryText;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!hubSiteId) return [3 /*break*/, 3];
                requestUrl = "".concat(ctx.pageContext.site.absoluteUrl, "/_api/web/HubsiteData");
                return [4 /*yield*/, ctx.spHttpClient.get(requestUrl, SPHttpClient.configurations.v1)];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                json = _a.sent();
                hubsiteData = JSON.parse(json.value);
                if (hubsiteData === null)
                    return [2 /*return*/, []];
                hubSiteId = hubsiteData.relatedHubSiteIds[0];
                _a.label = 3;
            case 3:
                queryText = "(contentclass:STS_Site DepartmentId:".concat(hubSiteId, ")");
                return [2 /*return*/, getAllSitesInternal(ctx, queryText, trimDuplicates)];
        }
    });
}); };
//# sourceMappingURL=SPSitesService.js.map