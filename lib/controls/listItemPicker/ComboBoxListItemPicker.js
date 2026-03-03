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
import * as strings from 'ControlStrings';
import * as React from "react";
import { Label } from "@fluentui/react/lib/Label";
import * as telemetry from '../../common/telemetry';
import { ComboBox } from "@fluentui/react/lib/ComboBox";
import { ListItemRepository } from '../../common/dal/ListItemRepository';
import styles from './ComboBoxListItemPicker.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { cloneDeep, isEqual } from 'lodash';
import { Guid } from '@microsoft/sp-core-library';
var ComboBoxListItemPicker = /** @class */ (function (_super) {
    __extends(ComboBoxListItemPicker, _super);
    function ComboBoxListItemPicker(props) {
        var _this = _super.call(this, props) || this;
        _this._options = null; // eslint-disable-line @typescript-eslint/no-explicit-any
        /**
         * On Selected Item
         */
        _this.onChanged = function (option, index, value, submitPendingValueEvent) {
            var _a, _b;
            var selectedItems = cloneDeep(_this.state.selectedItems); // eslint-disable-line @typescript-eslint/no-explicit-any
            if (_this.props.multiSelect) {
                if (option && option.selected) {
                    selectedItems.push((_a = {},
                        _a[_this.props.keyColumnInternalName || "Id"] = option.key,
                        _a[_this.props.columnInternalName] = option.text,
                        _a.selected = option.selected,
                        _a));
                }
                else {
                    selectedItems = selectedItems.filter(function (o) { return o[_this.props.keyColumnInternalName || "Id"] !== option.key; });
                }
            }
            else {
                selectedItems.push((_b = {},
                    _b[_this.props.keyColumnInternalName || "Id"] = option.key,
                    _b[_this.props.columnInternalName] = option.text,
                    _b));
                selectedItems = selectedItems.filter(function (o) { return o[_this.props.keyColumnInternalName || "Id"] === option.key; });
            }
            _this.setState({
                selectedItems: selectedItems,
            });
            _this.props.onSelectedItem(selectedItems);
        };
        telemetry.track('ComboBoxListItemPicker', {});
        // States
        _this.state = {
            noresultsFoundText: !_this.props.noResultsFoundText ? strings.genericNoResultsFoundText : _this.props.noResultsFoundText,
            showError: false,
            errorMessage: "",
            suggestionsHeaderText: !_this.props.suggestionsHeaderText ? strings.ListItemPickerSelectValue : _this.props.suggestionsHeaderText,
            selectedItems: _this.props.defaultSelectedItems || [],
            safeListId: _this.props.listId,
        };
        // Get SPService Factory
        _this._listItemRepo = new ListItemRepository(_this.props.webUrl, _this.props.spHttpClient);
        return _this;
    }
    ComboBoxListItemPicker.prototype.componentDidMount = function () {
        var _this = this;
        if (!Guid.tryParse(this.props.listId)) {
            this._listItemRepo.getListId(this.props.listId)
                .then(function (value) {
                _this.setState(__assign(__assign({}, _this.state), { safeListId: value }));
                _this.loadOptions(_this.props).then(function () { }).catch(function () { });
            })
                .catch(function () { });
        }
        else {
            this.loadOptions(this.props).then(function () { }).catch(function () { });
        }
    };
    ComboBoxListItemPicker.prototype.loadOptions = function (props, isInitialLoad) {
        return __awaiter(this, void 0, void 0, function () {
            var filter, listId, keyColumnInternalName, columnInternalName, webUrl, itemLimit, onInitialized, orderBy, safeListId, query, keyColumnName, listItems, selectedItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filter = props.filter, listId = props.listId, keyColumnInternalName = props.keyColumnInternalName, columnInternalName = props.columnInternalName, webUrl = props.webUrl, itemLimit = props.itemLimit, onInitialized = props.onInitialized, orderBy = props.orderBy;
                        safeListId = this.state.safeListId;
                        query = filter || "";
                        keyColumnName = keyColumnInternalName || "Id";
                        if (!(!this._options || listId !== this.props.listId || filter !== this.props.filter)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this._listItemRepo.getListItemsByFilterClause(query, safeListId, columnInternalName, keyColumnInternalName, webUrl, itemLimit || 100, orderBy)];
                    case 1:
                        listItems = _a.sent();
                        this._options = listItems.map(function (option) {
                            return {
                                key: option[keyColumnName],
                                text: option[columnInternalName || "Id"]
                            };
                        });
                        _a.label = 2;
                    case 2:
                        selectedItems = this._getSelectedItems(props);
                        this.setState({
                            availableOptions: this._options,
                            selectedItems: selectedItems,
                        });
                        if (onInitialized && isInitialLoad !== false) {
                            onInitialized();
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ComboBoxListItemPicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        return __awaiter(this, void 0, void 0, function () {
            var selectedItems;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(nextProps.listId !== this.props.listId)) return [3 /*break*/, 2];
                        this.setState({
                            selectedItems: [],
                        });
                        return [4 /*yield*/, this.loadOptions(nextProps, false)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!(nextProps.filter !== this.props.filter)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.loadOptions(nextProps, false)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!isEqual(nextProps.defaultSelectedItems, this.props.defaultSelectedItems)) {
                            selectedItems = this._getSelectedItems(nextProps);
                            this.setState({
                                selectedItems: selectedItems,
                            });
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ComboBoxListItemPicker.prototype._getSelectedItems = function (props) {
        var _this = this;
        var selectedItems = []; // eslint-disable-line @typescript-eslint/no-explicit-any
        var keyColumnName = props.keyColumnInternalName || "Id";
        if (props.defaultSelectedItems) {
            //if passed only ids
            if (!isNaN(props.defaultSelectedItems[0])) {
                selectedItems = this._options.filter(function (opt) { return props.defaultSelectedItems.indexOf(opt.key) >= 0; });
            }
            else {
                selectedItems = this._options.filter(function (opt) { return props.defaultSelectedItems.map(function (selected) { return selected[keyColumnName]; }).indexOf(opt.key) >= 0; });
            }
        }
        if ((selectedItems === null || selectedItems === void 0 ? void 0 : selectedItems.length) > 0) {
            selectedItems = selectedItems.map(function (item) {
                var _a;
                return _a = {},
                    _a[_this.props.keyColumnInternalName || "Id"] = item.key,
                    _a[_this.props.columnInternalName] = item.text,
                    _a;
            });
        }
        return selectedItems;
    };
    /*public componentDidUpdate(prevProps: IComboBoxListItemPickerProps, prevState: IComboBoxListItemPickerState): void {
      if (this.props.listId !== prevProps.listId) {
  
      }
    }*/
    /**
     * Render the field
     */
    ComboBoxListItemPicker.prototype.render = function () {
        var _this = this;
        var _a;
        var _b = this.props, className = _b.className, disabled = _b.disabled;
        var selectedKeys = ((_a = this.state.selectedItems) === null || _a === void 0 ? void 0 : _a.map(function (item) { return item[_this.props.keyColumnInternalName || "Id"]; })) || [];
        return (React.createElement("div", { className: styles.comboBoxListItemPickerWrapper },
            React.createElement(ComboBox, { label: this.props.label, styles: this.props.styles, options: this.state.availableOptions, autoComplete: this.props.autoComplete, comboBoxOptionStyles: this.props.comboBoxOptionStyles, allowFreeform: this.props.allowFreeform, onMenuDismissed: this.props.onMenuDismiss, onMenuOpen: this.props.onMenuOpen, text: this.props.text, onChange: function (e, value) { return _this.onChanged(value); }, multiSelect: this.props.multiSelect, selectedKey: selectedKeys, className: className, disabled: disabled }),
            !this.state.errorMessage && !this.state.availableOptions && (React.createElement(Spinner, { className: styles.loading, size: SpinnerSize.small })),
            !!this.state.errorMessage &&
                (React.createElement(Label, { style: { color: '#FF0000' } },
                    " ",
                    this.state.errorMessage,
                    " "))));
    };
    return ComboBoxListItemPicker;
}(React.Component));
export { ComboBoxListItemPicker };
//# sourceMappingURL=ComboBoxListItemPicker.js.map