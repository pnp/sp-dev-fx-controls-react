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
import { DefaultButton } from '@fluentui/react/lib/Button';
import { TermActionsDisplayStyle } from './ITermsActions';
import { getTermActionChange } from './getTermActionChange';
var DropdownTermAction = /** @class */ (function (_super) {
    __extends(DropdownTermAction, _super);
    function DropdownTermAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Prepates contextual menu items for dropdown.
         */
        _this.prepareContextualMenuProps = function (term, termActions) {
            var items = [];
            var displayStyle = _this.props.displayStyle;
            var useTargetWidth = true;
            // Get term action changes
            var termActionChanges = _this.props.termActionChanges;
            var tac = termActionChanges[term.Id];
            var _loop_1 = function (termAction) {
                var _a = getTermActionChange(tac, termAction), actionDisabled = _a.actionDisabled, actionHidden = _a.actionHidden;
                if ((!termAction.hidden && !actionHidden) || !actionHidden) {
                    var termActionMenuItem = {
                        key: term.Id.toString(),
                        onClick: function () {
                            _this.onActionExecute(termAction)
                                .then(function () {
                                // no-op;
                            })
                                .catch(function () {
                                // no-op;
                            });
                        },
                        disabled: actionDisabled
                    };
                    if (displayStyle && (displayStyle === TermActionsDisplayStyle.text || displayStyle === TermActionsDisplayStyle.textAndIcon)) {
                        termActionMenuItem.text = termAction.title;
                        termActionMenuItem.name = termAction.title;
                        useTargetWidth = false;
                    }
                    if (displayStyle && (displayStyle === TermActionsDisplayStyle.icon || displayStyle === TermActionsDisplayStyle.textAndIcon)) {
                        termActionMenuItem.iconProps = { iconName: termAction.iconName };
                    }
                    items.push(termActionMenuItem);
                }
            };
            for (var _i = 0, termActions_1 = termActions; _i < termActions_1.length; _i++) {
                var termAction = termActions_1[_i];
                _loop_1(termAction);
            }
            var contextualMenuProps = {
                items: items,
                useTargetWidth: useTargetWidth
            };
            return contextualMenuProps;
        };
        /**
         * Prepare term action button style.
         */
        _this.getTermActionActionButtonStyle = function () {
            var result = {
                backgroundColor: "transparent",
                width: "14px",
                display: "inline-flex",
                padding: "0px"
            };
            return result;
        };
        /**
         * Handler to execute selected action.
         */
        _this.onActionExecute = function (termAction) { return __awaiter(_this, void 0, void 0, function () {
            var updateAction;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, termAction.actionCallback(this.props.spTermService, this.props.term)];
                    case 1:
                        updateAction = _a.sent();
                        this.props.termActionCallback(updateAction);
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    /**
     * componentWillMount lifecycle hook
     */
    DropdownTermAction.prototype.UNSAFE_componentWillMount = function () {
        this.checkForImmediateInvocations();
    };
    /**
     * Check if there are action to immediatly invoke
     */
    DropdownTermAction.prototype.checkForImmediateInvocations = function () {
        var termActions = this.props.termActions;
        for (var _i = 0, termActions_2 = termActions; _i < termActions_2.length; _i++) {
            var action = termActions_2[_i];
            if (action.invokeActionOnRender) {
                this.onActionExecute(action)
                    .then(function () {
                    // no-op;
                })
                    .catch(function () {
                    // no-op;
                });
            }
        }
    };
    /**
     * Default React render method
     */
    DropdownTermAction.prototype.render = function () {
        var _a = this.props, term = _a.term, termActions = _a.termActions;
        var termActionButtonStyle = this.getTermActionActionButtonStyle();
        var contextualMenuProps = this.prepareContextualMenuProps(term, termActions);
        return (React.createElement("div", { style: { display: 'flex', alignItems: 'stretch', height: '32px' } },
            React.createElement(DefaultButton, { style: termActionButtonStyle, menuProps: contextualMenuProps })));
    };
    return DropdownTermAction;
}(React.Component));
export { DropdownTermAction };
//# sourceMappingURL=DropdownTermAction.js.map