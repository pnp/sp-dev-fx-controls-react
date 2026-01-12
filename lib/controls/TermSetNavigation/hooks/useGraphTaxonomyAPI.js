/* eslint-disable @typescript-eslint/explicit-function-return-type */
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
import { TERM_CHILDREN_KEY, TERMSETS_CHILDREN_KEY, TERMSETS_LIST_KEY, } from '../constants/constants';
import { useUtils } from '../utils/useUtils';
import { useSessionStorage } from './useSessionStorage';
export var useGraphTaxonomyAPI = function (context) {
    var _a = useSessionStorage(), getSessionStorageItem = _a[0], setSessionStorageItem = _a[1];
    var getCacheKey = useUtils().getCacheKey;
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
    var getTermSetChildren = React.useCallback(function (siteId, termSetId, refreshCache) { return __awaiter(void 0, void 0, void 0, function () {
        var cacheKey, cachedTermSet, response, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!graphClient && !siteId && !termSetId)
                        return [2 /*return*/, undefined];
                    cacheKey = getCacheKey(TERMSETS_CHILDREN_KEY, termSetId);
                    cachedTermSet = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    if (!refreshCache) {
                        cachedTermSet = getSessionStorageItem(cacheKey);
                        if (cachedTermSet) {
                            return [2 /*return*/, cachedTermSet];
                        }
                    }
                    return [4 /*yield*/, graphClient];
                case 2: return [4 /*yield*/, ((_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.api("/sites/".concat(siteId, "/termStore/sets/").concat(termSetId, "/Children")).select("id,createdDateTime,labels,lastModifiedDateTime,properties").get())];
                case 3:
                    response = _c.sent();
                    setSessionStorageItem(cacheKey, response === null || response === void 0 ? void 0 : response.value);
                    return [2 /*return*/, (_b = response === null || response === void 0 ? void 0 : response.value) !== null && _b !== void 0 ? _b : undefined];
                case 4:
                    error_1 = _c.sent();
                    console.log("[getTermSetTerms] error:", error_1);
                    throw error_1;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient]);
    var getTermChildren = React.useCallback(function (siteId, termSetId, termId, refreshCache) { return __awaiter(void 0, void 0, void 0, function () {
        var cacheKey, cachedTerm, response, error_2;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!graphClient && !siteId && !termSetId && termId)
                        return [2 /*return*/, undefined];
                    cacheKey = getCacheKey(TERM_CHILDREN_KEY, termId);
                    cachedTerm = [];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    if (!refreshCache) {
                        cachedTerm = getSessionStorageItem(cacheKey);
                        if (cachedTerm) {
                            return [2 /*return*/, cachedTerm];
                        }
                    }
                    return [4 /*yield*/, graphClient];
                case 2: return [4 /*yield*/, ((_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.api("/sites/".concat(siteId, "/termStore/sets/").concat(termSetId, "/terms/").concat(termId, "/children")).select("id,createdDateTime,labels,lastModifiedDateTime,properties").get())];
                case 3:
                    response = _c.sent();
                    setSessionStorageItem(cacheKey, response === null || response === void 0 ? void 0 : response.value);
                    return [2 /*return*/, (_b = response === null || response === void 0 ? void 0 : response.value) !== null && _b !== void 0 ? _b : undefined];
                case 4:
                    error_2 = _c.sent();
                    console.log("[getTermChildren] error:", error_2);
                    throw error_2;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient, getCacheKey, getSessionStorageItem, setSessionStorageItem]);
    var getTermSets = React.useCallback(function (siteId, query, refreshCache) { return __awaiter(void 0, void 0, void 0, function () {
        var instanceId, cacheKey, cachedTermSets, response, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!graphClient && !siteId)
                        return [2 /*return*/, []];
                    instanceId = context.instanceId;
                    cacheKey = getCacheKey(TERMSETS_LIST_KEY, instanceId);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    if (!refreshCache) {
                        cachedTermSets = [];
                        cachedTermSets = getSessionStorageItem(cacheKey);
                        if (cachedTermSets) {
                            return [2 /*return*/, cachedTermSets];
                        }
                    }
                    return [4 /*yield*/, graphClient];
                case 2: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.api("/sites/".concat(siteId, "/termStore/sets")).filter(query !== null && query !== void 0 ? query : "").select("id,description,localizedNames,properties,createdDateTime").get())];
                case 3:
                    response = _b.sent();
                    setSessionStorageItem(cacheKey, response.value);
                    return [2 /*return*/, response ? response.value : []];
                case 4:
                    error_3 = _b.sent();
                    console.log("[getTermSets] error:", error_3);
                    throw error_3;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient, getSessionStorageItem, setSessionStorageItem, getCacheKey, context]);
    var getTermSet = React.useCallback(function (siteId, termSetId) { return __awaiter(void 0, void 0, void 0, function () {
        var instanceId, cachedTermSets, cacheKey, termset, response, error_4;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!graphClient && !siteId)
                        throw new Error("[getTermSet] error: Missing required parameters");
                    instanceId = context.instanceId;
                    cachedTermSets = [];
                    cacheKey = getCacheKey(TERMSETS_LIST_KEY, instanceId);
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    cachedTermSets = getSessionStorageItem(cacheKey);
                    if (cachedTermSets) {
                        termset = cachedTermSets.find(function (termset) { return termset.id === termSetId; });
                        return [2 /*return*/, termset];
                    }
                    return [4 /*yield*/, graphClient];
                case 2: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.api("/sites/".concat(siteId, "/termStore/sets/").concat(termSetId)).select("id,description,localizedNames,properties,createdDateTime").get())];
                case 3:
                    response = _b.sent();
                    return [2 /*return*/, response !== null && response !== void 0 ? response : undefined];
                case 4:
                    error_4 = _b.sent();
                    console.log("[getTermSet] error:", error_4);
                    throw error_4;
                case 5: return [2 /*return*/];
            }
        });
    }); }, [graphClient, getSessionStorageItem, setSessionStorageItem, getCacheKey, context]);
    return {
        getTermSetChildren: getTermSetChildren,
        getTermChildren: getTermChildren,
        getTermSets: getTermSets,
        getTermSet: getTermSet,
    };
};
//# sourceMappingURL=useGraphTaxonomyAPI.js.map