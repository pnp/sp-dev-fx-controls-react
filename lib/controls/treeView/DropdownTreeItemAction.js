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
import { IconButton } from '@fluentui/react/lib/Button';
import * as React from 'react';
import styles from './TreeView.module.scss';
/**
 * Renders the controls for Dropdown TreeItem action component
 */
var DropdownTreeItemAction = /** @class */ (function (_super) {
    __extends(DropdownTreeItemAction, _super);
    function DropdownTreeItemAction() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        /**
         * Prepates contextual menu items for dropdown.
         */
        _this.prepareContextualMenuProps = function (treeItem, treeItemActions) {
            var items = [];
            var useTargetWidth = true;
            var _loop_1 = function (treeItemAction) {
                if (!treeItemAction.hidden) {
                    var treeItemActionMenuItem = {
                        key: treeItem.key.toString(),
                        onClick: function () {
                            _this.onActionExecute(treeItemAction)
                                .then(function () {
                                // no-op;
                            })
                                .catch(function () {
                                // no-op;
                            });
                        }
                    };
                    treeItemActionMenuItem.text = treeItemAction.title;
                    treeItemActionMenuItem.name = treeItemAction.title;
                    treeItemActionMenuItem.iconProps = treeItemAction.iconProps;
                    useTargetWidth = treeItemActionMenuItem.iconProps ? false : true;
                    items.push(treeItemActionMenuItem);
                }
            };
            for (var _i = 0, treeItemActions_1 = treeItemActions; _i < treeItemActions_1.length; _i++) {
                var treeItemAction = treeItemActions_1[_i];
                _loop_1(treeItemAction);
            }
            var contextualMenuProps = {
                items: items,
                useTargetWidth: useTargetWidth
            };
            return contextualMenuProps;
        };
        /**
         * Handler to execute selected action.
         */
        _this.onActionExecute = function (treeItemAction) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, treeItemAction.actionCallback(this.props.treeItem)];
                    case 1:
                        _a.sent();
                        this.props.treeItemActionCallback();
                        return [2 /*return*/];
                }
            });
        }); };
        return _this;
    }
    /**
     * componentWillMount lifecycle hook
     */
    DropdownTreeItemAction.prototype.UNSAFE_componentWillMount = function () {
        this.checkForImmediateInvocations();
    };
    /**
     * Check if there are action to immediatly invoke
     */
    DropdownTreeItemAction.prototype.checkForImmediateInvocations = function () {
        var treeItemActions = this.props.treeItemActions;
        for (var _i = 0, treeItemActions_2 = treeItemActions; _i < treeItemActions_2.length; _i++) {
            var action = treeItemActions_2[_i];
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
    DropdownTreeItemAction.prototype.render = function () {
        var _a = this.props, treeItem = _a.treeItem, treeItemActions = _a.treeItemActions;
        var contextualMenuProps = this.prepareContextualMenuProps(treeItem, treeItemActions);
        return (React.createElement("div", null,
            React.createElement(IconButton, { menuProps: contextualMenuProps, menuIconProps: { iconName: 'MoreVertical' }, className: styles.actionMore, title: "More", ariaLabel: "More", theme: this.props.theme })));
    };
    return DropdownTreeItemAction;
}(React.Component));
export { DropdownTreeItemAction };
//# sourceMappingURL=DropdownTreeItemAction.js.map