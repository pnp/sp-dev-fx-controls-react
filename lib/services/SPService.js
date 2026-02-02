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
import filter from 'lodash/filter';
import find from 'lodash/find';
import { SPHelper, urlCombine } from "../common/utilities";
import { LibsOrderBy } from "./ISPService";
import { orderBy } from '../controls/viewPicker/IViewPicker';
var SPService = /** @class */ (function () {
    function SPService(_context, webAbsoluteUrl) {
        var _this = this;
        this._context = _context;
        this._cachedListItems = new Map();
        this.getField = function (listId, internalColumnName, webUrl) { return __awaiter(_this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, results, field, resultTypeRegEx, resultTypeMatch, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists('").concat(listId, "')/fields/getByInternalNameOrTitle('").concat(internalColumnName, "')");
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        results = _a.sent();
                        if (results) {
                            field = results;
                            if (field.TypeAsString === 'Calculated') {
                                resultTypeRegEx = /ResultType="(\w+)"/gmi;
                                resultTypeMatch = resultTypeRegEx.exec(field.SchemaXml);
                                field.ResultType = resultTypeMatch[1];
                            }
                            return [2 /*return*/, field];
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        error_1 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_1)];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this._webAbsoluteUrl = webAbsoluteUrl ? webAbsoluteUrl : this._context.pageContext.web.absoluteUrl;
    }
    SPService.prototype.getContentTypes = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var queryUrlString, queryUrl, usedFilter, filterPrefix, usedFilter, filterPrefix, data, result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        queryUrlString = options.listId ? "".concat(this._webAbsoluteUrl, "/_api/web/lists('").concat(options.listId, "')/ContentTypes?") : "".concat(this._webAbsoluteUrl, "/_api/web/ContentTypes?");
                        queryUrl = new URL(queryUrlString);
                        if (options.orderBy) {
                            queryUrl.searchParams.set('$orderby', options.orderBy.toString());
                        }
                        if (options.filter) {
                            queryUrl.searchParams.set('$filter', options.filter);
                        }
                        else {
                            if (options.group) {
                                queryUrl.searchParams.set('$filter', "Group eq '".concat(options.group, "'"));
                            }
                            if (!options.includeHidden) {
                                usedFilter = queryUrl.searchParams.get('$filter');
                                filterPrefix = usedFilter ? usedFilter + ' and ' : '';
                                queryUrl.searchParams.set('$filter', filterPrefix + 'Hidden eq false');
                            }
                            if (!options.includeReadOnly) {
                                usedFilter = queryUrl.searchParams.get('$filter');
                                filterPrefix = usedFilter ? usedFilter + ' and ' : '';
                                queryUrl.searchParams.set('$filter', filterPrefix + 'ReadOnly eq false');
                            }
                        }
                        return [4 /*yield*/, this._context.spHttpClient.get(queryUrl.toString(), SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, data.json()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.value];
                    case 3:
                        error_2 = _a.sent();
                        throw Error(error_2);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SPService.prototype.getFields = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var queryUrlString, queryUrl, usedFilter, filterPrefix, usedFilter, filterPrefix, data, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        queryUrlString = "".concat(this._webAbsoluteUrl, "/_api/web");
                        if (options.listId) {
                            queryUrlString += "/lists('".concat(options.listId, "')");
                        }
                        queryUrlString += "/fields?";
                        queryUrl = new URL(queryUrlString);
                        if (options.orderBy) {
                            queryUrl.searchParams.set('$orderby', options.orderBy.toString());
                        }
                        if (options.filter) {
                            queryUrl.searchParams.set('$filter', options.filter);
                        }
                        else {
                            if (options.group) {
                                queryUrl.searchParams.set('$filter', "Group eq '".concat(options.group, "'"));
                            }
                            if (!options.includeHidden) {
                                usedFilter = queryUrl.searchParams.get('$filter');
                                filterPrefix = usedFilter ? usedFilter + ' and ' : '';
                                queryUrl.searchParams.set('$filter', filterPrefix + 'Hidden eq false');
                            }
                            if (!options.includeReadOnly) {
                                usedFilter = queryUrl.searchParams.get('$filter');
                                filterPrefix = usedFilter ? usedFilter + ' and ' : '';
                                queryUrl.searchParams.set('$filter', filterPrefix + 'ReadOnlyField eq false');
                            }
                        }
                        return [4 /*yield*/, this._context.spHttpClient.get(queryUrl.toString(), SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) {
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, data.json()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.value];
                    case 3:
                        error_3 = _a.sent();
                        throw Error(error_3);
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get lists or libraries
     *
     * @param options
     */
    SPService.prototype.getLibs = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var filtered, queryUrl, numbers_1, mapNumbers, data, result, filteredLists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        queryUrl = "".concat(this._webAbsoluteUrl, "/_api/web/lists?$select=Title,id,BaseTemplate");
                        if (options.contentTypeId) {
                            queryUrl += ",ContentTypes/Id&$expand=ContentTypes";
                        }
                        if (options.orderBy) {
                            queryUrl += "&$orderby=".concat(options.orderBy === LibsOrderBy.Id ? 'Id' : 'Title');
                        }
                        if (options.filter) {
                            queryUrl += "&$filter=".concat(encodeURIComponent(options.filter));
                        }
                        else {
                            if (options.baseTemplate) {
                                if (Array.isArray(options.baseTemplate)) {
                                    numbers_1 = options.baseTemplate;
                                    mapNumbers = numbers_1.map(function (i) {
                                        if (i === numbers_1[0]) {
                                            return "BaseTemplate eq ".concat(i);
                                        }
                                        else {
                                            return "or BaseTemplate eq ".concat(i);
                                        }
                                    });
                                    queryUrl += "&$filter=".concat(mapNumbers.join(" "));
                                    filtered = true;
                                }
                                else {
                                    queryUrl += "&$filter=BaseTemplate eq ".concat(options.baseTemplate);
                                    filtered = true;
                                }
                            }
                            if (options.includeHidden === false) {
                                queryUrl += filtered ? ' and Hidden eq false' : '&$filter=Hidden eq false';
                                filtered = true;
                            }
                        }
                        return [4 /*yield*/, this._context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        result = _a.sent();
                        if (options.contentTypeId) {
                            filteredLists = filter(result.value, function (aList) {
                                return find(aList.ContentTypes, function (ct) {
                                    return ct.Id.StringValue.toUpperCase().startsWith(options.contentTypeId.toUpperCase());
                                });
                            });
                            result.value = filteredLists;
                        }
                        return [2 /*return*/, result];
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    SPService.prototype.getListId = function (listName) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        webAbsoluteUrl = this._webAbsoluteUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists/getByTitle(@listName)/Id?@listName='").concat(encodeURIComponent(listName), "'");
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        results = _a.sent();
                        if (results) {
                            return [2 /*return*/, results.value];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get List Items
     */
    SPService.prototype.getListItems = function (filterText, listId, internalColumnName, field, keyInternalColumnName, webUrl, filterString, substringSearch, orderBy, top, cacheInterval) {
        if (substringSearch === void 0) { substringSearch = false; }
        if (cacheInterval === void 0) { cacheInterval = 1; }
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, isPost, processItems, orderByStr, orderByParts, ascStr, filterPart, camlQuery, filterStr, mapKey_1, cachedItems, filteredItems, data, _a, results, error_4;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
                        apiUrl = '';
                        isPost = false;
                        if (field && field.TypeAsString === 'Calculated' && SPHelper.isTextFieldType(field.ResultType)) { // for calculated fields we need to use CAML query
                            orderByStr = '';
                            if (orderBy) {
                                orderByParts = orderBy.split(' ');
                                ascStr = '';
                                if (orderByParts[1] && orderByParts[1].toLowerCase() === 'desc') {
                                    ascStr = "Ascending=\"FALSE\"";
                                }
                                orderByStr = "<OrderBy><FieldRef Name=\"".concat(orderByParts[0], "\" ").concat(ascStr, " /></OrderBy>");
                            }
                            filterPart = "";
                            if (filterText) {
                                filterPart = "<Where>".concat(substringSearch ? '<Contains>' : '<BeginsWith>', "<FieldRef Name=\"").concat(internalColumnName, "\"/><Value Type=\"").concat(field.ResultType, "\">").concat(filterText, "</Value>").concat(substringSearch ? '</Contains>' : '</BeginsWith>', "</Where>");
                            }
                            camlQuery = "<View><Query>".concat(filterPart).concat(orderByStr, "</Query></View>");
                            apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists('").concat(listId, "')/GetItems(query=@v1)?$select=").concat(keyInternalColumnName || 'Id', ",").concat(internalColumnName, "&@v1=").concat(JSON.stringify({ ViewXml: camlQuery }));
                            isPost = true;
                        }
                        else if (SPHelper.isTextFieldType(field.TypeAsString)) {
                            filterStr = substringSearch ? // JJ - 20200613 - find by substring as an option
                                "".concat(filterText ? "substringof('".concat(encodeURIComponent(filterText.replace("'", "''")), "',").concat(internalColumnName, ")") : '').concat(filterString ? (filterText ? ' and ' : '') + filterString : '')
                                : "".concat(filterText ? "startswith(".concat(internalColumnName, ",'").concat(encodeURIComponent(filterText.replace("'", "''")), "')") : '').concat(filterString ? (filterText ? ' and ' : '') + filterString : '');
                            apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists('").concat(listId, "')/items?$select=").concat(keyInternalColumnName || 'Id', ",").concat(internalColumnName, "&$filter=").concat(filterStr, "&$orderby=").concat(orderBy).concat(top ? "&$top=".concat(top) : '');
                        }
                        else { // we need to get FieldValuesAsText and cache them
                            mapKey_1 = "".concat(webAbsoluteUrl, "##").concat(listId, "##").concat(internalColumnName, "##").concat(keyInternalColumnName || 'Id');
                            cachedItems = this._cachedListItems.get(mapKey_1);
                            if (cachedItems && cachedItems.expiration > Date.now()) {
                                filteredItems = this._filterListItemsFieldValuesAsText(cachedItems.items, internalColumnName, filterText, substringSearch);
                                return [2 /*return*/, filteredItems];
                            }
                            apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists('").concat(listId, "')/items?$select=").concat(keyInternalColumnName || 'Id', ",").concat(internalColumnName, ",FieldValuesAsText/").concat(internalColumnName, "&$expand=FieldValuesAsText&$orderby=").concat(orderBy).concat(filterString ? '&$filter=' + filterString : '').concat(top ? "&$top=".concat(top) : '');
                            isPost = false;
                            //eslint-disable-next-line @typescript-eslint/no-explicit-any
                            processItems = function (items) {
                                _this._cachedListItems.set(mapKey_1, {
                                    items: items,
                                    expiration: Date.now() + cacheInterval * 60 * 1000
                                });
                                return _this._filterListItemsFieldValuesAsText(items, internalColumnName, filterText, substringSearch);
                            };
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 8, , 9]);
                        if (!isPost) return [3 /*break*/, 3];
                        return [4 /*yield*/, this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, {})];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        data = _a;
                        if (!data.ok) return [3 /*break*/, 7];
                        return [4 /*yield*/, data.json()];
                    case 6:
                        results = _b.sent();
                        if (results && results.value && results.value.length > 0) {
                            return [2 /*return*/, processItems ? processItems(results.value) : results.value];
                        }
                        _b.label = 7;
                    case 7: return [2 /*return*/, []];
                    case 8:
                        error_4 = _b.sent();
                        return [2 /*return*/, Promise.reject(error_4)];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
  * Gets list items for list item picker
  * @param filterText
  * @param listId
  * @param internalColumnName
  * @param [keyInternalColumnName]
  * @param [webUrl]
  * @param [filterList]
  * @returns list items for list item picker
  */
    SPService.prototype.getListItemsForListItemPicker = function (filterText, listId, internalColumnName, keyInternalColumnName, webUrl, filterList) {
        return __awaiter(this, void 0, void 0, function () {
            var _filter, costumfilter, _top, webAbsoluteUrl, apiUrl, data, results, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _filter = "$filter=startswith(".concat(internalColumnName, ",'").concat(encodeURIComponent(filterText.replace("'", "''")), "') ");
                        costumfilter = filterList
                            ? "and ".concat(filterList)
                            : "";
                        _top = " &$top=2000";
                        // test wild character "*"  if "*" load first 30 items
                        if ((filterText.trim().indexOf("*") === 0 &&
                            filterText.trim().length === 1) ||
                            filterText.trim().length === 0) {
                            _filter = "";
                            costumfilter = filterList ? "$filter=".concat(filterList, "&") : "";
                            _top = "$top=500";
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        webAbsoluteUrl = !webUrl
                            ? this._webAbsoluteUrl
                            : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists('").concat(listId, "')/items?$orderby=").concat(internalColumnName, "&$select=").concat(keyInternalColumnName ||
                            "Id", ",").concat(internalColumnName, "&").concat(_filter).concat(costumfilter).concat(_top);
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 2:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, data.json()];
                    case 3:
                        results = _a.sent();
                        if (results &&
                            results.value &&
                            results.value.length > 0) {
                            return [2 /*return*/, results.value];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, []];
                    case 5:
                        error_5 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_5)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get list item attachments
     *
     * @param listId
     * @param itemId
     * @param webUrl
     */
    SPService.prototype.getListItemAttachments = function (listId, itemId, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, results, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles?@listId=guid'").concat(encodeURIComponent(listId), "'&@itemId=").concat(encodeURIComponent(String(itemId)));
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        results = _a.sent();
                        if (results && results.value) {
                            return [2 /*return*/, results.value];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                    case 4:
                        error_6 = _a.sent();
                        console.dir(error_6);
                        return [2 /*return*/, Promise.reject(error_6)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete attachment
     *
     * @param fileName
     * @param listId
     * @param itemId
     * @param webUrl
     * @returns Updated list item with new ETag
     */
    SPService.prototype.deleteAttachment = function (fileName, listId, itemId, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var spOpts, webAbsoluteUrl, apiUrl, itemApiUrl, itemData, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        spOpts = {
                            headers: { "X-HTTP-Method": 'DELETE', }
                        };
                        webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles/getByFileName(@fileName)/RecycleObject?@listId=guid'").concat(encodeURIComponent(listId), "'&@itemId=").concat(encodeURIComponent(String(itemId)), "&@fileName='").concat(encodeURIComponent(fileName.replace(/'/g, "''")), "'");
                        return [4 /*yield*/, this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spOpts)];
                    case 1:
                        _a.sent();
                        itemApiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/items(@itemId)?@listId=guid'").concat(encodeURIComponent(listId), "'&@itemId=").concat(encodeURIComponent(String(itemId)));
                        return [4 /*yield*/, this._context.spHttpClient.get(itemApiUrl, SPHttpClient.configurations.v1)];
                    case 2:
                        itemData = _a.sent();
                        if (!itemData.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, itemData.json()];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, null];
                    case 5:
                        error_7 = _a.sent();
                        console.dir(error_7);
                        return [2 /*return*/, Promise.reject(error_7)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Add attachment
     *
     * @param listId
     * @param itemId
     * @param fileName
     * @param file
     * @param webUrl
     * @returns Updated list item with new ETag
     */
    SPService.prototype.addAttachment = function (listId, itemId, fileName, file, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var fileExists, spOpts, webAbsoluteUrl, apiUrl, itemApiUrl, itemData, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        // Remove special characters in FileName
                        //Updating the escape characters for filename as per the doucmentations
                        //https://support.microsoft.com/en-us/kb/905231
                        fileName = fileName.replace(/[~#%&*{}\\:<>?/+|]/gi, '');
                        return [4 /*yield*/, this.checkAttachmentExists(listId, itemId, fileName, webUrl)];
                    case 1:
                        fileExists = _a.sent();
                        if (!fileExists) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.deleteAttachment(fileName, listId, itemId, webUrl)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        spOpts = {
                            body: file
                        };
                        webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles/add(FileName=@fileName)?@listId=guid'").concat(encodeURIComponent(listId), "'&@itemId=").concat(encodeURIComponent(String(itemId)), "&@fileName='").concat(encodeURIComponent(fileName.replace(/'/g, "''")), "'");
                        return [4 /*yield*/, this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, spOpts)];
                    case 4:
                        _a.sent();
                        itemApiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/items(@itemId)?@listId=guid'").concat(encodeURIComponent(listId), "'&@itemId=").concat(encodeURIComponent(String(itemId)));
                        return [4 /*yield*/, this._context.spHttpClient.get(itemApiUrl, SPHttpClient.configurations.v1)];
                    case 5:
                        itemData = _a.sent();
                        if (!itemData.ok) return [3 /*break*/, 7];
                        return [4 /*yield*/, itemData.json()];
                    case 6: return [2 /*return*/, _a.sent()];
                    case 7: return [2 /*return*/, null];
                    case 8:
                        error_8 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_8)];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get attachement for list item
     *
     * @param listId
     * @param itemId
     * @param fileName
     * @param webUrl
     */
    SPService.prototype.getAttachment = function (listId, itemId, fileName, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/items(@itemId)/AttachmentFiles/GetByFileBame(@fileName))?@listId=guid'").concat(encodeURIComponent(listId), "'&@itemId=").concat(encodeURIComponent(String(itemId)), "&@fileName='").concat(encodeURIComponent(fileName.replace(/'/g, "''")), "'");
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        file = _a.sent();
                        if (file) {
                            return [2 /*return*/, file];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                }
            });
        });
    };
    /**
     * Check if the attachment exists
     *
     * @param listId
     * @param itemId
     * @param fileName
     * @param webUrl
     */
    SPService.prototype.checkAttachmentExists = function (listId, itemId, fileName, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var listServerRelativeUrl, webAbsoluteUrl, fileServerRelativeUrl, apiUrl, data, results, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.getListServerRelativeUrl(listId, webUrl)];
                    case 1:
                        listServerRelativeUrl = _a.sent();
                        webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
                        fileServerRelativeUrl = "".concat(listServerRelativeUrl, "/Attachments/").concat(itemId, "/").concat(fileName);
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/getfilebyserverrelativeurl(@url)/Exists?@url='").concat(encodeURIComponent(fileServerRelativeUrl.replace(/'/g, "''")), "'");
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 2:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 4];
                        return [4 /*yield*/, data.json()];
                    case 3:
                        results = _a.sent();
                        if (results) {
                            return [2 /*return*/, results.value];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/, false];
                    case 5:
                        error_9 = _a.sent();
                        return [2 /*return*/, Promise.reject(error_9)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the list name
     *
     * @param listId
     * @param webUrl
     */
    SPService.prototype.getListName = function (listId, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/RootFolder/Name?@listId=guid'").concat(encodeURIComponent(listId), "'");
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        results = _a.sent();
                        if (results) {
                            return [2 /*return*/, results.value];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the list server relative url
     *
     * @param listId
     * @param webUrl
     */
    SPService.prototype.getListServerRelativeUrl = function (listId, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, results;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        webAbsoluteUrl = !webUrl ? this._webAbsoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/RootFolder/ServerRelativeUrl?@listId=guid'").concat(encodeURIComponent(listId), "'");
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        results = _a.sent();
                        if (results) {
                            return [2 /*return*/, results.value];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SPService.prototype.getLookupValue = function (listId, listItemID, fieldName, lookupFieldName, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, result, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/items(").concat(listItemID, ")/?@listId=guid'").concat(encodeURIComponent(listId), "'&$select=").concat(fieldName, "/ID,").concat(fieldName, "/").concat(lookupFieldName || 'Title', "&$expand=").concat(fieldName);
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        result = _a.sent();
                        if (result && result[fieldName]) {
                            return [2 /*return*/, [{ key: result[fieldName].ID, name: result[fieldName][lookupFieldName || 'Title'] }]];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                    case 4:
                        error_10 = _a.sent();
                        console.dir(error_10);
                        return [2 /*return*/, Promise.reject(error_10)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SPService.prototype.getLookupValues = function (listId, listItemID, fieldName, lookupFieldName, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, result, lookups_1, isArray, singleItem, value, dateVal, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/items(").concat(listItemID, ")?@listId=guid'").concat(encodeURIComponent(listId), "'&$select=").concat(fieldName, "/ID,").concat(fieldName, "/").concat(lookupFieldName || 'Title', "&$expand=").concat(fieldName);
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        result = _a.sent();
                        if (result && result[fieldName]) {
                            lookups_1 = [];
                            isArray = Array.isArray(result[fieldName]);
                            //multiselect lookups are arrays
                            if (isArray) {
                                result[fieldName].forEach(function (element) {
                                    var value = element[lookupFieldName || 'Title'];
                                    var dateVal = Date.parse(value);
                                    if (!Number.isNaN(dateVal)) {
                                        value = new Date(value).toLocaleDateString();
                                    }
                                    lookups_1.push({ key: element.ID, name: value });
                                });
                            }
                            //single select lookups are objects
                            else {
                                singleItem = result[fieldName];
                                value = singleItem[lookupFieldName || 'Title'];
                                dateVal = Date.parse(value);
                                if (!Number.isNaN(dateVal)) {
                                    value = new Date(value).toLocaleDateString();
                                }
                                lookups_1.push({ key: singleItem.ID, name: value });
                            }
                            return [2 /*return*/, lookups_1];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                    case 4:
                        error_11 = _a.sent();
                        console.dir(error_11);
                        return [2 /*return*/, Promise.reject(error_11)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SPService.prototype.getTaxonomyFieldInternalName = function (listId, fieldId, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, results, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/Fields/getById(guid'").concat(fieldId, "')/InternalName?@listId=guid'").concat(encodeURIComponent(listId), "'");
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        results = _a.sent();
                        if (results) {
                            return [2 /*return*/, results];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                    case 4:
                        error_12 = _a.sent();
                        console.dir(error_12);
                        return [2 /*return*/, Promise.reject(error_12)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SPService.prototype.getUsersUPNFromFieldValue = function (listId, listItemId, fieldName, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, result, emails_1, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/items(").concat(listItemId, ")?@listId=guid'").concat(encodeURIComponent(listId), "'&$select=").concat(fieldName, "/Title,").concat(fieldName, "/Id,").concat(fieldName, "/Name&$expand=").concat(fieldName);
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        result = _a.sent();
                        if (result && result[fieldName]) {
                            emails_1 = [];
                            result[fieldName].forEach(function (element) {
                                var loginNameWithoutClaimsToken = element.Name.split("|").pop();
                                if (!loginNameWithoutClaimsToken.toLowerCase().includes('null')) {
                                    if (!element.Title.toLowerCase().includes('null')) {
                                        emails_1.push(loginNameWithoutClaimsToken + "/" + element.Title);
                                    }
                                }
                            });
                            return [2 /*return*/, emails_1];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                    case 4:
                        error_13 = _a.sent();
                        console.dir(error_13);
                        return [2 /*return*/, Promise.reject(error_13)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SPService.prototype.getUserUPNFromFieldValue = function (listId, listItemId, fieldName, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, result, element, loginNameWithoutClaimsToken, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/items(").concat(listItemId, ")?@listId=guid'").concat(encodeURIComponent(listId), "'&$select=").concat(fieldName, "/Title,").concat(fieldName, "/Id,").concat(fieldName, "/Name&$expand=").concat(fieldName);
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        result = _a.sent();
                        if (result && result[fieldName]) {
                            element = result[fieldName];
                            loginNameWithoutClaimsToken = element.Name.split("|").pop();
                            if (!loginNameWithoutClaimsToken.toLowerCase().includes('null')) {
                                if (!element.Title.toLowerCase().includes('null')) {
                                    return [2 /*return*/, loginNameWithoutClaimsToken + "/" + element.Title];
                                }
                            }
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, []];
                    case 4:
                        error_14 = _a.sent();
                        console.dir(error_14);
                        return [2 /*return*/, Promise.reject(error_14)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SPService.prototype.getSingleManagedMetadataLabel = function (listId, listItemId, fieldName, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiUrl, data, results, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
                        apiUrl = "".concat(webAbsoluteUrl, "/_api/web/lists(@listId)/RenderListDataAsStream?@listId=guid'").concat(encodeURIComponent(listId), "'");
                        return [4 /*yield*/, this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, {
                                body: JSON.stringify({
                                    parameters: {
                                        RenderOptions: 2,
                                        ViewXml: "<View Scope=\"RecursiveAll\">\n                        <ViewFields>\n                          <FieldRef Name=\"".concat(fieldName, "\"/>\n                        </ViewFields>\n                        <Query>\n                          <Where>\n                            <Eq>\n                              <FieldRef Name=\"ID\"/>\n                              <Value Type=\"Number\">").concat(listItemId, "</Value>\n                            </Eq>\n                          </Where>\n                        </Query>\n                        <RowLimit Paged=\"TRUE\">1</RowLimit>\n                      </View>")
                                    }
                                })
                            })];
                    case 1:
                        data = _a.sent();
                        if (!data.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, data.json()];
                    case 2:
                        results = _a.sent();
                        if (results) {
                            return [2 /*return*/, results.Row[0][fieldName]];
                        }
                        _a.label = 3;
                    case 3: return [2 /*return*/, null];
                    case 4:
                        error_15 = _a.sent();
                        console.dir(error_15);
                        return [2 /*return*/, Promise.reject(error_15)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SPService.prototype.uploadImage = function (listId, itemId, fileName, file, listTitle, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, listTitleValue, listApiUrl, listResponse, listJson, apiUrl, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
                        listTitleValue = listTitle;
                        if (!!listTitle) return [3 /*break*/, 3];
                        listApiUrl = urlCombine(webAbsoluteUrl, "/_api/web/lists('".concat(listId, "')"), false);
                        return [4 /*yield*/, this._context.spHttpClient.get(listApiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        listResponse = _a.sent();
                        return [4 /*yield*/, listResponse.json()];
                    case 2:
                        listJson = _a.sent();
                        listTitleValue = listJson.Title;
                        _a.label = 3;
                    case 3:
                        apiUrl = urlCombine(webAbsoluteUrl, "/_api/web/UploadImage(listTitle=@a1,imageName=@a2,listId=@a3,itemId=@a4)?@a1='".concat(listTitleValue, "'&@a2='").concat(fileName, "'&@a3='").concat(listId, "'&@a4=").concat(itemId || 0), false);
                        return [4 /*yield*/, this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, {
                                body: file,
                                headers: {
                                    'content-length': file.byteLength.toString()
                                }
                            })];
                    case 4:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 5:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SPService.prototype.getRegionalWebSettings = function (webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiRequestPath, apiUrl, response, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
                        apiRequestPath = "/_api/web/regionalsettings";
                        apiUrl = urlCombine(webAbsoluteUrl, apiRequestPath, false);
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    /**
     * Get form rendering information for a SharePoint list.
     */
    SPService.prototype.getListFormRenderInfo = function (listId, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiRequestPath, apiUrl, response, result, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
                        apiRequestPath = "/_api/web/lists(guid'".concat(listId, "')/RenderListDataAsStream");
                        apiUrl = urlCombine(webAbsoluteUrl, apiRequestPath, false);
                        return [4 /*yield*/, this._context.spHttpClient.post(apiUrl, SPHttpClient.configurations.v1, {
                                body: JSON.stringify({
                                    "parameters": {
                                        "RenderOptions": 64,
                                        "ViewXml": "<View><ViewFields><FieldRef Name=\"ID\"/></ViewFields></View>",
                                        "AddRequiredFields": true
                                    }
                                })
                            })];
                    case 1:
                        response = _a.sent();
                        if (!response.ok) return [3 /*break*/, 3];
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result];
                    case 3: return [2 /*return*/, null];
                    case 4:
                        error_16 = _a.sent();
                        console.dir(error_16);
                        return [2 /*return*/, Promise.reject(error_16)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get additional form rendering and validation information for a SharePoint list.
     * Captures information not returned by RenderListDataAsStream with RenderOptions = 64
     */
    SPService.prototype.getAdditionalListFormFieldInfo = function (listId, webUrl) {
        return __awaiter(this, void 0, void 0, function () {
            var webAbsoluteUrl, apiRequestPath, apiUrl, response, result, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        webAbsoluteUrl = !webUrl ? this._context.pageContext.web.absoluteUrl : webUrl;
                        apiRequestPath = "/_api/web/lists(guid'".concat(listId, "')/Fields?$filter=TypeAsString eq 'Number' or TypeAsString eq 'Currency' or ValidationFormula ne null");
                        apiUrl = urlCombine(webAbsoluteUrl, apiRequestPath, false);
                        return [4 /*yield*/, this._context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, result.value];
                    case 3:
                        error_17 = _a.sent();
                        console.dir(error_17);
                        return [2 /*return*/, Promise.reject(error_17)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SPService.prototype._filterListItemsFieldValuesAsText = function (items, internalColumnName, filterText, substringSearch) {
        var lowercasedFilterText = filterText.toLowerCase();
        return items.filter(function (i) {
            var fieldValue = i.FieldValuesAsText[internalColumnName];
            if (!fieldValue) {
                return false;
            }
            fieldValue = fieldValue.toLowerCase();
            if (!filterText) {
                return true;
            }
            return substringSearch ? fieldValue.indexOf(lowercasedFilterText) > -1 : fieldValue.startsWith(lowercasedFilterText);
        });
    };
    /**
     * Gets the collection of view for a selected list
     */
    SPService.prototype.getViews = function (listId, orderby, filter) {
        return __awaiter(this, void 0, void 0, function () {
            var queryUrl, response, views;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (listId === undefined || listId === "") {
                            return [2 /*return*/, this.getEmptyViews()];
                        }
                        queryUrl = "".concat(this._webAbsoluteUrl, "/_api/lists(guid'").concat(listId, "')/Views?$select=Title,Id");
                        if (!(orderby !== null)) return [3 /*break*/, 3];
                        queryUrl += '&$orderby=';
                        switch (orderby) {
                            case orderBy.Id:
                                queryUrl += 'Id';
                                break;
                            case orderBy.Title:
                                queryUrl += 'Title';
                                break;
                        }
                        // Adds an OData Filter to the list
                        if (filter) {
                            queryUrl += "&$filter=".concat(encodeURIComponent(filter));
                        }
                        return [4 /*yield*/, this._context.spHttpClient.get(queryUrl, SPHttpClient.configurations.v1)];
                    case 1:
                        response = _a.sent();
                        return [4 /*yield*/, response.json()];
                    case 2:
                        views = (_a.sent());
                        return [2 /*return*/, views];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Returns an empty view for when a list isn't selected
     */
    SPService.prototype.getEmptyViews = function () {
        return new Promise(function (resolve) {
            var listData = {
                value: []
            };
            resolve(listData);
        });
    };
    return SPService;
}());
export default SPService;
//# sourceMappingURL=SPService.js.map