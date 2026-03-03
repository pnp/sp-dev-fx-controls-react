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
/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { useCache } from './useLocalStorage';
import { useUtils } from './useUtils';
export var useGraphUserAPI = function (context) {
    var _a = useCache("local"), getCacheValue = _a.getCacheValue, setCacheValue = _a.setCacheValue;
    var _b = useUtils(), b64toBlob = _b.b64toBlob, blobToBase64 = _b.blobToBase64;
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
    var getUserByName = React.useCallback(function (searchName) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!graphClient || !searchName)
                        return [2 /*return*/, undefined];
                    _c.label = 1;
                case 1:
                    _c.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, graphClient];
                case 2: return [4 /*yield*/, ((_a = (_c.sent())) === null || _a === void 0 ? void 0 : _a.api("/users?$filter=startswith(displayName,'".concat(searchName, "') and accountEnabled eq true and userType eq 'Member'")).select("displayName,mail,jobTitle,department,officeLocation,preferredLanguage,accountEnabled,assignedLicenses,assignedPlans,usageLocation,userPrincipalName").get())];
                case 3:
                    response = _c.sent();
                    if (response) {
                        return [2 /*return*/, (_b = response === null || response === void 0 ? void 0 : response.value) !== null && _b !== void 0 ? _b : undefined];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_1 = _c.sent();
                    console.log("[getUserByName] error:", error_1);
                    throw new Error("Something went wrong when fetching user");
                case 5: return [2 /*return*/, undefined];
            }
        });
    }); }, [graphClient]);
    var getUserById = React.useCallback(function (user) { return __awaiter(void 0, void 0, void 0, function () {
        var userInfo, blobPhoto, usersResults, batchRequests, batchResults, responses, _i, responses_1, response, _a, binToBlob, _b, error_2;
        var _c, _d;
        return __generator(this, function (_e) {
            switch (_e.label) {
                case 0:
                    // Create a Batch Request
                    // 2 rquests
                    // id=1 = user Info
                    // id=2 = user Photo
                    if (!graphClient)
                        return [2 /*return*/, undefined];
                    batchRequests = [
                        {
                            id: "1",
                            url: "/users/".concat(user, "?$select=country,id, displayName,mail,jobTitle,department,officeLocation,preferredLanguage,accountEnabled,assignedLicenses,assignedPlans,usageLocation,userPrincipalName"),
                            method: "GET",
                            headers: {
                                ConsistencyLevel: "eventual",
                            },
                        },
                        {
                            id: "2",
                            url: "/users/".concat(user, "/photo/$value"),
                            headers: { "content-type": "img/jpg" },
                            method: "GET",
                        },
                    ];
                    _e.label = 1;
                case 1:
                    _e.trys.push([1, 15, , 16]);
                    return [4 /*yield*/, getCacheValue("".concat(user))];
                case 2:
                    userInfo = _e.sent();
                    if (userInfo) {
                        return [2 /*return*/, userInfo];
                    }
                    return [4 /*yield*/, graphClient];
                case 3: return [4 /*yield*/, ((_c = (_e.sent())) === null || _c === void 0 ? void 0 : _c.api("/$batch").version("v1.0").post({ requests: batchRequests }))];
                case 4:
                    batchResults = _e.sent();
                    responses = batchResults === null || batchResults === void 0 ? void 0 : batchResults.responses;
                    _i = 0, responses_1 = responses;
                    _e.label = 5;
                case 5:
                    if (!(_i < responses_1.length)) return [3 /*break*/, 14];
                    response = responses_1[_i];
                    _a = response.id;
                    switch (_a) {
                        case "1": return [3 /*break*/, 6];
                        case "2": return [3 /*break*/, 7];
                    }
                    return [3 /*break*/, 12];
                case 6:
                    usersResults = response.body;
                    return [3 /*break*/, 13];
                case 7:
                    if (!(response === null || response === void 0 ? void 0 : response.body)) return [3 /*break*/, 9];
                    return [4 /*yield*/, b64toBlob(response === null || response === void 0 ? void 0 : response.body, "img/jpg")];
                case 8:
                    _b = _e.sent();
                    return [3 /*break*/, 10];
                case 9:
                    _b = undefined;
                    _e.label = 10;
                case 10:
                    binToBlob = _b;
                    return [4 /*yield*/, blobToBase64(binToBlob)];
                case 11:
                    blobPhoto = (_d = (_e.sent())) !== null && _d !== void 0 ? _d : undefined;
                    return [3 /*break*/, 13];
                case 12: return [3 /*break*/, 13];
                case 13:
                    _i++;
                    return [3 /*break*/, 5];
                case 14:
                    // save userinfo in cache
                    userInfo = __assign(__assign({}, usersResults), { userPhoto: blobPhoto, presence: undefined });
                    // return Userinfo with photo
                    setCacheValue("".concat(user), userInfo);
                    return [2 /*return*/, userInfo];
                case 15:
                    error_2 = _e.sent();
                    // execute batch
                    console.log("[getUserById] error:", error_2);
                    return [3 /*break*/, 16];
                case 16: return [2 /*return*/];
            }
        });
    }); }, [graphClient, getCacheValue]);
    var getUserPresence = React.useCallback(function (userObjectId) { return __awaiter(void 0, void 0, void 0, function () {
        var response, error_3;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    if (!graphClient || !userObjectId)
                        return [2 /*return*/];
                    _b.label = 1;
                case 1:
                    _b.trys.push([1, 4, , 5]);
                    return [4 /*yield*/, graphClient];
                case 2: return [4 /*yield*/, ((_a = (_b.sent())) === null || _a === void 0 ? void 0 : _a.api("/users/".concat(userObjectId, "/presence")).get())];
                case 3:
                    response = _b.sent();
                    if (response) {
                        return [2 /*return*/, response !== null && response !== void 0 ? response : undefined];
                    }
                    return [3 /*break*/, 5];
                case 4:
                    error_3 = _b.sent();
                    console.log("[getUserPresence] error:", error_3);
                    throw new Error("Something went wrong when getting user presence");
                case 5: return [2 /*return*/, undefined];
            }
        });
    }); }, [graphClient]);
    return { getUserById: getUserById, getUserByName: getUserByName, getUserPresence: getUserPresence };
};
//# sourceMappingURL=useGraphUserAPI.js.map