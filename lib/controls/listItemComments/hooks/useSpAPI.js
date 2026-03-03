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
import { AppContext } from "../common";
import { useContext, useCallback } from "react";
import { SPHttpClient } from "@microsoft/sp-http";
import { PageContext } from "@microsoft/sp-page-context";
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
export var useSpAPI = function () {
    var _a = useContext(AppContext), serviceScope = _a.serviceScope, webUrl = _a.webUrl, listId = _a.listId, itemId = _a.itemId, numberCommentsPerPage = _a.numberCommentsPerPage;
    var _webUrl = '';
    serviceScope.whenFinished(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            _webUrl = serviceScope.consume(PageContext.serviceKey).web.absoluteUrl;
            return [2 /*return*/];
        });
    }); });
    //https://contoso.sharepoint.com/sites/ThePerspective/_api/web/lists(@a1)/GetItemById(@a2)/Comments(@a3)?@a1=%27%7BE738C4B3%2D6CFF%2D493A%2DA8DA%2DDBBF4732E3BF%7D%27&@a2=%2729%27&@a3=%273%27
    var deleteComment = useCallback(function (commentId) { return __awaiter(void 0, void 0, void 0, function () {
        var spHttpClient, _endPointUrl, spOpts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
                    if (!spHttpClient)
                        return [2 /*return*/];
                    _endPointUrl = "".concat(webUrl !== null && webUrl !== void 0 ? webUrl : _webUrl, "/_api/web/lists(@a1)/GetItemById(@a2)/Comments(@a3)?@a1='").concat(listId, "'&@a2='").concat(itemId, "'&@a3='").concat(commentId, "'");
                    spOpts = {
                        method: 'DELETE',
                    };
                    return [4 /*yield*/, spHttpClient.fetch("".concat(_endPointUrl), SPHttpClient.configurations.v1, spOpts)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [serviceScope]);
    var addComment = useCallback(function (comment) { return __awaiter(void 0, void 0, void 0, function () {
        var spHttpClient, _endPointUrl, spOpts, _listResults, _commentResults;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
                    if (!spHttpClient)
                        return [2 /*return*/];
                    _endPointUrl = "".concat(webUrl !== null && webUrl !== void 0 ? webUrl : _webUrl, "/_api/web/lists(@a1)/GetItemById(@a2)/Comments()?@a1='").concat(listId, "'&@a2='").concat(itemId, "'");
                    spOpts = {
                        body: JSON.stringify({
                            text: GeneralHelper.encodeText(comment.text),
                            mentions: comment.mentions
                        }),
                    };
                    return [4 /*yield*/, spHttpClient.post("".concat(_endPointUrl), SPHttpClient.configurations.v1, spOpts)];
                case 1:
                    _listResults = _a.sent();
                    return [4 /*yield*/, _listResults.json()];
                case 2:
                    _commentResults = (_a.sent());
                    return [2 /*return*/, _commentResults];
            }
        });
    }); }, [serviceScope]);
    var likeComment = useCallback(function (commentId) { return __awaiter(void 0, void 0, void 0, function () {
        var spHttpClient, _endPointUrl, spOpts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
                    if (!spHttpClient)
                        return [2 /*return*/];
                    _endPointUrl = "".concat(webUrl !== null && webUrl !== void 0 ? webUrl : _webUrl, "/_api/web/lists(@a1)/GetItemById(@a2)/Comments(@a3)/like?@a1='").concat(listId, "'&@a2='").concat(itemId, "'&@a3='").concat(commentId, "'");
                    spOpts = {
                        headers: {
                            Accept: 'application/json;odata=nometadata',
                        },
                    };
                    return [4 /*yield*/, spHttpClient.post("".concat(_endPointUrl), SPHttpClient.configurations.v1, spOpts)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [serviceScope, webUrl, _webUrl, listId, itemId]);
    var unlikeComment = useCallback(function (commentId) { return __awaiter(void 0, void 0, void 0, function () {
        var spHttpClient, _endPointUrl, spOpts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
                    if (!spHttpClient)
                        return [2 /*return*/];
                    _endPointUrl = "".concat(webUrl !== null && webUrl !== void 0 ? webUrl : _webUrl, "/_api/web/lists(@a1)/GetItemById(@a2)/Comments(@a3)/unlike?@a1='").concat(listId, "'&@a2='").concat(itemId, "'&@a3='").concat(commentId, "'");
                    spOpts = {
                        headers: {
                            Accept: 'application/json;odata=nometadata',
                        },
                    };
                    return [4 /*yield*/, spHttpClient.post("".concat(_endPointUrl), SPHttpClient.configurations.v1, spOpts)];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); }, [serviceScope, webUrl, _webUrl, listId, itemId]);
    var getListItemComments = useCallback(function () { return __awaiter(void 0, void 0, void 0, function () {
        var spHttpClient, _endPointUrl, _listResults, _commentsResults, _returnComments;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
                    if (!spHttpClient)
                        return [2 /*return*/];
                    _endPointUrl = "".concat(webUrl !== null && webUrl !== void 0 ? webUrl : _webUrl, "/_api/web/lists(@a1)/GetItemById(@a2)/GetComments()?@a1='").concat(listId, "'&@a2='").concat(itemId, "'&$top=").concat(numberCommentsPerPage !== null && numberCommentsPerPage !== void 0 ? numberCommentsPerPage : 10, "&$expand=likedBy");
                    return [4 /*yield*/, spHttpClient.get("".concat(_endPointUrl), SPHttpClient.configurations.v1)];
                case 1:
                    _listResults = _b.sent();
                    return [4 /*yield*/, _listResults.json()];
                case 2:
                    _commentsResults = (_b.sent());
                    _returnComments = {
                        comments: _commentsResults.value,
                        hasMore: _commentsResults['@odata.nextLink'] ? true : false,
                        nextLink: (_a = _commentsResults['@odata.nextLink']) !== null && _a !== void 0 ? _a : undefined,
                    };
                    return [2 /*return*/, _returnComments];
            }
        });
    }); }, [serviceScope]);
    var getNextPageOfComments = useCallback(function (nextLink) { return __awaiter(void 0, void 0, void 0, function () {
        var spHttpClient, _endPointUrl, _listResults, _commentsResults, _returnComments;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    spHttpClient = serviceScope.consume(SPHttpClient.serviceKey);
                    if (!spHttpClient || !nextLink)
                        return [2 /*return*/];
                    _endPointUrl = nextLink;
                    return [4 /*yield*/, spHttpClient.get("".concat(_endPointUrl), SPHttpClient.configurations.v1)];
                case 1:
                    _listResults = _b.sent();
                    return [4 /*yield*/, _listResults.json()];
                case 2:
                    _commentsResults = (_b.sent());
                    _returnComments = {
                        comments: _commentsResults.value,
                        hasMore: _commentsResults['@odata.nextLink'] ? true : false,
                        nextLink: (_a = _commentsResults['@odata.nextLink']) !== null && _a !== void 0 ? _a : undefined,
                    };
                    return [2 /*return*/, _returnComments];
            }
        });
    }); }, [serviceScope]);
    return {
        getListItemComments: getListItemComments,
        getNextPageOfComments: getNextPageOfComments,
        addComment: addComment,
        deleteComment: deleteComment,
        likeComment: likeComment,
        unlikeComment: unlikeComment,
    };
};
//# sourceMappingURL=useSpAPI.js.map