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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
/* eslint-disable @typescript-eslint/no-floating-promises */
import * as React from "react";
import { useAtom } from "jotai";
import { pullAllBy } from "lodash";
import { Card, Spinner, } from "@fluentui/react-components";
import { globalState } from "./atoms/globalState";
import { EMessageType } from "./constants/EMessageTypes";
import { useGraphUserAPI } from "./hooks/useGraphUserAPI";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
import { ShowMessage } from "./showMessage/ShowMessage";
import { NoUser } from "./userCard/NoUser";
import { UserCard } from "./userCard/UserCard";
import { useUserPickerStyles } from "./useUserPickerStyles";
export var PopUpMenu = function (props) {
    var searchValue = props.searchValue, isOpen = props.isOpen, onDismiss = props.onDismiss, containerRef = props.containerRef, secondaryTextPropertyName = props.secondaryTextPropertyName;
    var _a = useAtom(globalState), appGlobalState = _a[0], setAppGlobalState = _a[1];
    var context = appGlobalState.context, selectedUsers = appGlobalState.selectedUsers;
    var _b = React.useState([]), renderUsers = _b[0], setRenderUsers = _b[1];
    var getUserByName = useGraphUserAPI(context).getUserByName;
    var styles = useUserPickerStyles();
    var _c = React.useState(true), isLoading = _c[0], setIsLoading = _c[1];
    var _d = React.useState(undefined), error = _d[0], setError = _d[1];
    var _e = React.useState(false), isSearching = _e[0], setIsSearching = _e[1];
    useOnClickOutside(true, containerRef, function () { return onDismiss(false); });
    var onSelected = React.useCallback(function (user) {
        setAppGlobalState(__assign(__assign({}, appGlobalState), { selectedUsers: __spreadArray(__spreadArray([], selectedUsers, true), [user], false) }));
        onDismiss(false);
    }, []);
    var RenderUsers = React.useCallback(function () {
        if (error)
            return React.createElement(ShowMessage, { messageType: EMessageType.ERROR, message: error.message });
        if (!isLoading && !error)
            return React.createElement("div", { className: styles.usersContainer }, renderUsers);
        return React.createElement(React.Fragment, null);
    }, [isLoading, error, renderUsers, styles.usersContainer]);
    React.useEffect(function () {
        if (searchValue.length < 2)
            return;
        if (isSearching)
            return;
        setIsSearching(true);
        setTimeout(function () { return __awaiter(void 0, void 0, void 0, function () {
            var users, usersToRender, removeSelectedUsers, _i, removeSelectedUsers_1, user, error_1;
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, 3, 4]);
                        setIsLoading(true);
                        return [4 /*yield*/, getUserByName(searchValue)];
                    case 1:
                        users = (_a = (_c.sent())) !== null && _a !== void 0 ? _a : [];
                        usersToRender = [];
                        removeSelectedUsers = pullAllBy(users, selectedUsers, "mail");
                        for (_i = 0, removeSelectedUsers_1 = removeSelectedUsers; _i < removeSelectedUsers_1.length; _i++) {
                            user = removeSelectedUsers_1[_i];
                            usersToRender.push(React.createElement(React.Fragment, null,
                                React.createElement(UserCard, { userId: (_b = user.mail) !== null && _b !== void 0 ? _b : "", showOverCard: false, onSelected: onSelected, className: styles.userCardStyles, secondaryTextPropertyName: secondaryTextPropertyName })));
                        }
                        if (usersToRender.length === 0) {
                            usersToRender.push(React.createElement(React.Fragment, null,
                                React.createElement(NoUser, null)));
                        }
                        setRenderUsers(usersToRender);
                        setIsSearching(false);
                        return [3 /*break*/, 4];
                    case 2:
                        error_1 = _c.sent();
                        setError(error_1);
                        console.log(error_1);
                        return [3 /*break*/, 4];
                    case 3:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        }); }, 500);
    }, [searchValue, selectedUsers, getUserByName, onSelected, secondaryTextPropertyName]);
    if (!isOpen)
        return React.createElement(React.Fragment, null);
    return (React.createElement(React.Fragment, null,
        React.createElement(Card, { ref: containerRef, className: styles.popupContainer }, isLoading && !error ? React.createElement(Spinner, { size: "small" }) : React.createElement(RenderUsers, null))));
};
//# sourceMappingURL=PopUpMenu.js.map