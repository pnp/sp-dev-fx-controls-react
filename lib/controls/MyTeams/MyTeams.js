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
import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { FontIcon } from "@fluentui/react/lib/Icon";
import { MessageBarType } from "@fluentui/react/lib/MessageBar";
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Customizer } from "@fluentui/react/lib/Utilities";
import * as React from "react";
import { getMyTeamsStyles } from "./MyTeamsStyles";
import { Providers, SharePointProvider } from "@microsoft/mgt-spfx";
import { Team } from "../MyTeams/components/Team";
import { useTeams } from "./../../hooks";
import { ShowMessage } from "../MyTeams/components/ShowMessage";
import strings from "ControlStrings";
import { myTeamsReducer } from './MyTeamsReducer';
import { EMyTeamsTypes } from './EMyTeamsTypes';
var initialState = {
    myTeams: [],
    message: undefined,
    hasError: false,
    isLoading: true,
};
export var MyTeams = function (props) {
    var _a = getMyTeamsStyles(props.themeVariant), stackStyles = _a.stackStyles, stackTokens = _a.stackTokens, styleClasses = _a.styleClasses, titleStyles = _a.titleStyles;
    var title = props.title, webPartContext = props.webPartContext, onSelectedChannel = props.onSelectedChannel, themeVariant = props.themeVariant, enablePersonCardInteraction = props.enablePersonCardInteraction;
    var _b = React.useReducer(myTeamsReducer, initialState), state = _b[0], dispatch = _b[1];
    Providers.globalProvider = React.useMemo(function () {
        if (!Providers.globalProvider) {
            return new SharePointProvider(webPartContext);
        }
        return;
    }, [props.webPartContext]);
    var getMyTeams = useTeams(webPartContext.serviceScope).getMyTeams;
    React.useEffect(function () {
        (function () { return __awaiter(void 0, void 0, void 0, function () {
            var _teams, _a, messageError;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        dispatch({
                            type: EMyTeamsTypes.SET_HAS_ERROR,
                            payload: false
                        });
                        dispatch({
                            type: EMyTeamsTypes.SET_IS_LOADING,
                            payload: true
                        });
                        return [4 /*yield*/, getMyTeams()];
                    case 1:
                        _teams = _b.sent();
                        dispatch({
                            type: EMyTeamsTypes.SET_IS_LOADING,
                            payload: false
                        });
                        dispatch({
                            type: EMyTeamsTypes.SET_MESSAGE,
                            payload: undefined
                        });
                        dispatch({
                            type: EMyTeamsTypes.SET_MYTEAMS,
                            payload: _teams
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        _a = _b.sent();
                        messageError = {
                            isShow: true,
                            message: strings.MyTeamsMessageError,
                            messageBarType: MessageBarType.error,
                        };
                        dispatch({
                            type: EMyTeamsTypes.SET_IS_LOADING,
                            payload: false
                        });
                        dispatch({
                            type: EMyTeamsTypes.SET_MESSAGE,
                            payload: messageError
                        });
                        dispatch({
                            type: EMyTeamsTypes.SET_HAS_ERROR,
                            payload: true
                        });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })().then(function () { }).catch(function () { });
    }, []);
    var hasError = state.hasError, isLoading = state.isLoading, message = state.message, myTeams = state.myTeams;
    return (React.createElement(React.Fragment, null,
        React.createElement(Customizer, { settings: { theme: themeVariant } },
            React.createElement(Stack, { styles: stackStyles, tokens: stackTokens },
                React.createElement(Text, { variant: "xLargePlus", styles: titleStyles }, title),
                hasError ? (React.createElement(ShowMessage, __assign({}, message))) : (React.createElement("div", { className: styleClasses.teamsContainer }, !(myTeams === null || myTeams === void 0 ? void 0 : myTeams.length) && !isLoading ? (React.createElement(Stack, { horizontal: true, horizontalAlign: "center", verticalAlign: "center", tokens: { childrenGap: 20 }, styles: { root: { margin: 20 } } },
                    React.createElement(FontIcon, { iconName: "TeamsLogo", style: { fontSize: 28, width: 28, height: 28 } }),
                    React.createElement(Text, { variant: "mediumPlus" }, strings.MyTeamsNoTeamsMessage))) : isLoading ? (React.createElement(Spinner, { size: SpinnerSize.medium, label: strings.MyTeamsLoadingMessage, labelPosition: "bottom" })) : (myTeams.map(function (team) {
                    return (React.createElement(Team, { key: team.id, team: team, serviceScope: webPartContext.serviceScope, themeVariant: themeVariant, onSelectedChannel: onSelectedChannel, enablePersonCardInteraction: enablePersonCardInteraction }));
                }))))))));
};
//# sourceMappingURL=MyTeams.js.map