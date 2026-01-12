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
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-for-in-array */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { SPHttpClient } from '@microsoft/sp-http';
import { useGraphAPI } from './useGrapAPI';
export var useSpAPI = function (context) {
    var getDriveItemDownloadUrl = useGraphAPI(context).getDriveItemDownloadUrl;
    var getFileFromBlob = React.useCallback(function (blob, fileName) {
        var file = new File([blob], fileName, { type: blob.type });
        return file;
    }, []);
    var getADAcesstoken = React.useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var token1, token, getSiteLists, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, context.aadTokenProviderFactory.getTokenProvider()];
                case 1:
                    token1 = _a.sent();
                    return [4 /*yield*/, token1.getToken('https://microsoft.sharepoint.com')];
                case 2:
                    token = _a.sent();
                    return [4 /*yield*/, fetch('https://ysz3l-my.sharepoint.com/personal/jmendes_spteckint_onmicrosoft_com/_api/web/lists', {
                            method: 'GET',
                            headers: {
                                'Authorization': "Bearer ".concat(token)
                            }
                        })];
                case 3:
                    getSiteLists = _a.sent();
                    return [4 /*yield*/, getSiteLists.json()];
                case 4:
                    data = _a.sent();
                    console.log(data);
                    return [2 /*return*/];
            }
        });
    }); }, []);
    var downloadBingContent = function (absoluteFileUrl, fileName) { return __awaiter(void 0, void 0, void 0, function () {
        var fileDownloadResult, blob, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, context.httpClient.get(absoluteFileUrl, SPHttpClient.configurations.v1, {
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
                    return [2 /*return*/, getFileFromBlob(blob, fileName)];
                case 3:
                    err_1 = _a.sent();
                    console.error("[DownloadBingContent] Err='".concat(err_1.message, "'"));
                    return [2 /*return*/, null];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var downLoadSpOrOneDriveContent = function (driveId, itemId, fileName) { return __awaiter(void 0, void 0, void 0, function () {
        var fileDownloadUrl, fileDownloadResult, blob, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, getDriveItemDownloadUrl(driveId, itemId)];
                case 1:
                    fileDownloadUrl = _a.sent();
                    return [4 /*yield*/, context.httpClient.get(fileDownloadUrl, SPHttpClient.configurations.v1, {
                            method: "GET",
                            mode: "cors"
                        })];
                case 2:
                    fileDownloadResult = _a.sent();
                    if (!fileDownloadResult || !fileDownloadResult.ok) {
                        throw new Error("Something went wrong when downloading the file. Status='".concat(fileDownloadResult.status, "'"));
                    }
                    return [4 /*yield*/, fileDownloadResult.blob()];
                case 3:
                    blob = _a.sent();
                    return [2 /*return*/, getFileFromBlob(blob, fileName)];
                case 4:
                    err_2 = _a.sent();
                    console.error("[DownloadBingContent] Err='".concat(err_2.message, "'"));
                    return [2 /*return*/, null];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    return {
        getADAcesstoken: getADAcesstoken,
        downloadBingContent: downloadBingContent,
        downLoadSpOrOneDriveContent: downLoadSpOrOneDriveContent
    };
};
//# sourceMappingURL=useSpAPI.js.map