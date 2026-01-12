var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { TermActionsDisplayMode, TermActionsDisplayStyle } from './ITermsActions';
import { DropdownTermAction } from './DropdownTermAction';
import ButtonTermAction from './ButtonTermAction';
var TermActionsControl = /** @class */ (function (_super) {
    __extends(TermActionsControl, _super);
    function TermActionsControl(props) {
        var _this = _super.call(this, props) || this;
        /**
         * Sets the visibility of a certain action
         * @param isHidden
         */
        _this.setActionStateForTerm = function (actionId, termId, type, value) {
            _this.setState(function (prevState) {
                var _a;
                var termActionChanges = prevState.termActionChanges;
                if (!termActionChanges[termId]) {
                    termActionChanges[termId] = [];
                }
                var actionChanges = termActionChanges[termId].filter(function (action) { return action.actionId === actionId; });
                if (actionChanges.length === 0) {
                    termActionChanges[termId].push((_a = {
                            actionId: actionId
                        },
                        _a[type] = value,
                        _a));
                }
                else {
                    actionChanges[0][type] = value;
                }
                return {
                    termActionChanges: termActionChanges
                };
            });
        };
        var termActions = _this.props.termActions;
        var displayMode = termActions.termActionsDisplayMode ? termActions.termActionsDisplayMode : TermActionsDisplayMode.buttons;
        var displayStyle = termActions.termActionsDisplayStyle ? termActions.termActionsDisplayStyle : TermActionsDisplayStyle.text;
        _this.state = {
            availableActions: [],
            displayMode: displayMode,
            displayStyle: displayStyle,
            termActionChanges: {}
        };
        return _this;
    }
    /**
     * componentWillMount lifecycle hook
     */
    TermActionsControl.prototype.UNSAFE_componentWillMount = function () {
        this.getAvailableActions()
            .then(function () {
            // no-op;
        })
            .catch(function () {
            // no-op;
        });
    };
    /**
     * Get the available term actions
     */
    TermActionsControl.prototype.getAvailableActions = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, term, termActions, availableActions, _i, _b, action, available;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, term = _a.term, termActions = _a.termActions;
                        availableActions = [];
                        if (!termActions.actions) return [3 /*break*/, 4];
                        _i = 0, _b = termActions.actions;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _b.length)) return [3 /*break*/, 4];
                        action = _b[_i];
                        return [4 /*yield*/, action.applyToTerm(term, this.props.termActionCallback, this.setActionStateForTerm)];
                    case 2:
                        available = _c.sent();
                        if (available) {
                            availableActions.push(action);
                        }
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4:
                        this.setState({
                            availableActions: availableActions
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Default React render method
     */
    TermActionsControl.prototype.render = function () {
        var term = this.props.term;
        var _a = this.state, displayStyle = _a.displayStyle, displayMode = _a.displayMode, availableActions = _a.availableActions, termActionChanges = _a.termActionChanges;
        if (!availableActions || availableActions.length <= 0 || !term) {
            return null;
        }
        return (React.createElement("div", null, displayMode === TermActionsDisplayMode.dropdown ?
            React.createElement(DropdownTermAction, { key: "DdAction-".concat(term.Id), termActions: availableActions, term: term, displayStyle: displayStyle, termActionCallback: this.props.termActionCallback, spTermService: this.props.spTermService, termActionChanges: termActionChanges })
            :
                React.createElement(ButtonTermAction, { key: "BtnAction-".concat(term.Id), termActions: availableActions, term: term, displayStyle: displayStyle, termActionCallback: this.props.termActionCallback, spTermService: this.props.spTermService, termActionChanges: termActionChanges })));
    };
    return TermActionsControl;
}(React.Component));
export default TermActionsControl;
//# sourceMappingURL=TermActionsControl.js.map