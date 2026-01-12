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
import * as React from "react";
import { TagPicker, } from "@fluentui/react/lib/Pickers";
import { useTeams } from "../../hooks";
import { TEAMS_SVG_LOGO } from "./constants";
import { useTeamPickerStyles } from "./TeamPickerStyles";
import { IconButton } from "@fluentui/react/lib/Button";
import { Text } from "@fluentui/react/lib/Text";
import { Stack } from "@fluentui/react/lib/Stack";
import { Label } from "@fluentui/react/lib/Label";
import pullAllBy from "lodash/pullAllBy";
import find from "lodash/find";
import { ImageIcon } from "@fluentui/react/lib/Icon";
import { Customizer } from "@fluentui/react/lib/Utilities";
import strings from "ControlStrings";
var pickerSuggestionsProps = {
    suggestionsHeaderText: strings.TeamPickerSugestionsHeaderText,
    noResultsFoundText: strings.TeamPickernoResultsFoundText,
};
var initialState = {
    savedSelectedTeams: [],
};
var getTextFromItem = function (item) { return item.name; };
// Reducer to update state
var reducer = function (state, action // eslint-disable-line @typescript-eslint/no-explicit-any
) {
    switch (action.type) {
        case "UPDATE_SELECTEDITEM":
            return __assign(__assign({}, state), { savedSelectedTeams: action.payload });
        default:
            return state;
    }
};
// select Team control
export var TeamPicker = function (props) {
    var _a;
    // initialize reducer
    var _b = React.useReducer(reducer, initialState), state = _b[0], dispatch = _b[1];
    var picker = React.useRef(null);
    var serviceScope = props.appcontext.serviceScope;
    var getMyTeams = useTeams(serviceScope).getMyTeams;
    var onSelectedTeams = props.onSelectedTeams, selectedTeams = props.selectedTeams, itemLimit = props.itemLimit, label = props.label, styles = props.styles, themeVariant = props.themeVariant;
    var _c = useTeamPickerStyles(themeVariant), pickerStylesMulti = _c.pickerStylesMulti, pickerStylesSingle = _c.pickerStylesSingle, renderItemStylesMulti = _c.renderItemStylesMulti, renderItemStylesSingle = _c.renderItemStylesSingle, renderIconButtonRemoveStyles = _c.renderIconButtonRemoveStyles;
    var useFilterSuggestedTeams = React.useCallback(function (filterText, teamsList) { return __awaiter(void 0, void 0, void 0, function () {
        var tags, teams, _i, teams_1, team, checkExists, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    tags = [];
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 3, , 4]);
                    return [4 /*yield*/, getMyTeams(filterText)];
                case 2:
                    teams = _a.sent();
                    if (teams === null || teams === void 0 ? void 0 : teams.length) {
                        for (_i = 0, teams_1 = teams; _i < teams_1.length; _i++) {
                            team = teams_1[_i];
                            checkExists = find(teamsList, { key: team.id });
                            if (checkExists)
                                continue;
                            tags.push({ key: team.id, name: team.displayName });
                        }
                    }
                    return [2 /*return*/, tags];
                case 3:
                    error_1 = _a.sent();
                    console.log(error_1);
                    return [2 /*return*/, tags];
                case 4: return [2 /*return*/];
            }
        });
    }); }, []);
    React.useEffect(function () {
        dispatch({
            type: "UPDATE_SELECTEDITEM",
            payload: selectedTeams,
        });
    }, [props]);
    var _onRenderItem = React.useCallback(function (itemProps) {
        var savedSelectedTeams = state.savedSelectedTeams;
        if (itemProps.item) {
            return (React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { childrenGap: 7 }, styles: itemLimit && itemLimit > 1
                    ? renderItemStylesMulti
                    : renderItemStylesSingle },
                React.createElement(ImageIcon, { imageProps: {
                        src: TEAMS_SVG_LOGO,
                        width: 18,
                        height: 18,
                    } }),
                React.createElement(Text, { variant: "medium" }, itemProps.item.name),
                React.createElement(IconButton, { styles: renderIconButtonRemoveStyles, iconProps: { iconName: "Cancel" }, title: strings.TeamPickerButtonRemoveTitle, onClick: function (ev) {
                        var _newSelectedTeams = pullAllBy(savedSelectedTeams, [
                            itemProps.item,
                        ]);
                        dispatch({
                            type: "UPDATE_SELECTEDITEM",
                            payload: _newSelectedTeams,
                        });
                        onSelectedTeams(_newSelectedTeams);
                    } })));
        }
        else {
            return null;
        }
    }, [
        selectedTeams,
        state.savedSelectedTeams,
        props.themeVariant,
        renderItemStylesSingle,
        renderIconButtonRemoveStyles,
        renderItemStylesMulti,
    ]);
    // reder sugestion Items
    var _onRenderSuggestionsItem = React.useCallback(function (propsTag, itemProps) {
        return (React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { childrenGap: 5, padding: 10 } },
            React.createElement(ImageIcon, { imageProps: {
                    src: TEAMS_SVG_LOGO,
                    width: 18,
                    height: 18,
                } }),
            React.createElement(Text, { variant: "smallPlus" }, propsTag.name)));
    }, [props.themeVariant]);
    // Render  control
    return (React.createElement(Customizer, { settings: { theme: props.themeVariant } },
        React.createElement("div", { style: { width: "100%" } },
            label && React.createElement(Label, null, label),
            React.createElement(TagPicker, { styles: styles !== null && styles !== void 0 ? styles : (itemLimit && itemLimit > 1
                    ? pickerStylesMulti
                    : pickerStylesSingle), selectedItems: state.savedSelectedTeams, onRenderItem: _onRenderItem, onRenderSuggestionsItem: _onRenderSuggestionsItem, onResolveSuggestions: useFilterSuggestedTeams, getTextFromItem: getTextFromItem, pickerSuggestionsProps: pickerSuggestionsProps, onEmptyResolveSuggestions: function (selectTeams) {
                    return useFilterSuggestedTeams("", selectTeams);
                }, itemLimit: (_a = props.itemLimit) !== null && _a !== void 0 ? _a : undefined, onChange: function (items) {
                    dispatch({ type: "UPDATE_SELECTEDITEM", payload: items });
                    props.onSelectedTeams(items);
                }, componentRef: picker }))));
};
//# sourceMappingURL=TeamPicker.js.map