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
import SPservice from "../../services/SPService";
import { TagPicker } from '@fluentui/react/lib/Pickers';
import { Label } from "@fluentui/react/lib/Label";
import { getId } from '@fluentui/react/lib/Utilities';
import * as telemetry from '../../common/telemetry';
import isEqual from 'lodash/isEqual';
import { SPHelper } from '../../common/utilities/SPHelper';
import { Guid } from "@microsoft/sp-core-library";
var ListItemPicker = /** @class */ (function (_super) {
    __extends(ListItemPicker, _super);
    function ListItemPicker(props) {
        var _this = _super.call(this, props) || this;
        _this._tagPickerId = getId('tagPicker');
        /**
         * On Selected Item
         */
        _this.onItemChanged = function (selectedItems) {
            _this.setState({
                selectedItems: selectedItems
            });
            _this.props.onSelectedItem(selectedItems);
        };
        /**
         * Filter Change
         */
        _this.onFilterChanged = function (filterText, tagList) { return __awaiter(_this, void 0, void 0, function () {
            var resolvedSugestions, selectedItems, filteredSuggestions, _loop_1, _i, resolvedSugestions_1, suggestion;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.loadListItems(filterText)];
                    case 1:
                        resolvedSugestions = _a.sent();
                        selectedItems = this.state.selectedItems;
                        // Filter out the already retrieved items, so that they cannot be selected again
                        if (selectedItems && selectedItems.length > 0) {
                            filteredSuggestions = [];
                            _loop_1 = function (suggestion) {
                                var exists = selectedItems.filter(function (sItem) { return sItem.key === suggestion.key; });
                                if (!exists || exists.length === 0) {
                                    filteredSuggestions.push(suggestion);
                                }
                            };
                            for (_i = 0, resolvedSugestions_1 = resolvedSugestions; _i < resolvedSugestions_1.length; _i++) {
                                suggestion = resolvedSugestions_1[_i];
                                _loop_1(suggestion);
                            }
                            resolvedSugestions = filteredSuggestions;
                        }
                        if (resolvedSugestions) {
                            this.setState({
                                errorMessage: "",
                                showError: false
                            });
                            return [2 /*return*/, resolvedSugestions];
                        }
                        else {
                            return [2 /*return*/, []];
                        }
                        return [2 /*return*/];
                }
            });
        }); };
        /**
         * Function to load List Items
         */
        _this.loadListItems = function (filterText) { return __awaiter(_this, void 0, void 0, function () {
            var _a, columnInternalName, keyColumnInternalName, webUrl, filter, orderBy, substringSearch, itemsQueryCountLimit, _b, field, safeListId, arrayItems, keyColumn, listItems, _i, listItems_1, item, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = this.props, columnInternalName = _a.columnInternalName, keyColumnInternalName = _a.keyColumnInternalName, webUrl = _a.webUrl, filter = _a.filter, orderBy = _a.orderBy, substringSearch = _a.substringSearch, itemsQueryCountLimit = _a.itemsQueryCountLimit;
                        _b = this.state, field = _b.field, safeListId = _b.safeListId;
                        arrayItems = [];
                        keyColumn = keyColumnInternalName || 'Id';
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this._spservice.getListItems(filterText, safeListId, columnInternalName, field, keyColumn, webUrl, filter, substringSearch, orderBy ? orderBy : '', itemsQueryCountLimit)];
                    case 2:
                        listItems = _c.sent();
                        // Check if the list had items
                        if (listItems.length > 0) {
                            for (_i = 0, listItems_1 = listItems; _i < listItems_1.length; _i++) {
                                item = listItems_1[_i];
                                arrayItems.push({ key: item[keyColumn], name: SPHelper.isTextFieldType(field.TypeAsString === 'Calculated' ? field.ResultType : field.TypeAsString) ? item[columnInternalName] : item.FieldValuesAsText[columnInternalName] });
                            }
                        }
                        return [2 /*return*/, arrayItems];
                    case 3:
                        error_1 = _c.sent();
                        console.log("Error get Items", error_1);
                        this.setState({
                            showError: true,
                            errorMessage: error_1.message,
                            noresultsFoundText: error_1.message
                        });
                        return [2 /*return*/, null];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.loadField = function (props) { return __awaiter(_this, void 0, void 0, function () {
            var field;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.setState({
                            field: undefined
                        });
                        return [4 /*yield*/, this._spservice.getField(this.state.safeListId, props.columnInternalName, props.webUrl)];
                    case 1:
                        field = _a.sent();
                        this.setState({
                            field: field
                        });
                        return [2 /*return*/];
                }
            });
        }); };
        telemetry.track('ListItemPicker', {});
        // States
        _this.state = {
            noresultsFoundText: !_this.props.noResultsFoundText ? strings.genericNoResultsFoundText : _this.props.noResultsFoundText,
            showError: false,
            errorMessage: "",
            suggestionsHeaderText: !_this.props.suggestionsHeaderText ? strings.ListItemPickerSelectValue : _this.props.suggestionsHeaderText,
            selectedItems: props.defaultSelectedItems || [],
            safeListId: props.listId,
        };
        // Get SPService Factory
        _this._spservice = new SPservice(_this.props.context);
        return _this;
    }
    ListItemPicker.prototype.ensureLoadField = function () {
        this.loadField(this.props).then(function () { }).catch(function () { });
    };
    ListItemPicker.prototype.componentDidMount = function () {
        var _this = this;
        // Ensure list ID if a list name is passed in listId parameter
        if (!Guid.tryParse(this.props.listId)) {
            this._spservice.getListId(this.props.listId)
                .then(function (value) {
                _this.setState(__assign(__assign({}, _this.state), { safeListId: value }));
                _this.ensureLoadField();
            })
                .catch(function () { });
        }
        else {
            this.ensureLoadField();
        }
    };
    ListItemPicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var newSelectedItems; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (this.props.listId !== nextProps.listId) {
            newSelectedItems = [];
        }
        if (!isEqual(this.props.defaultSelectedItems, nextProps.defaultSelectedItems)) {
            newSelectedItems = nextProps.defaultSelectedItems;
        }
        this.setState({
            selectedItems: newSelectedItems
        });
        if (this.props.listId !== nextProps.listId
            || this.props.columnInternalName !== nextProps.columnInternalName
            || this.props.webUrl !== nextProps.webUrl) {
            this.ensureLoadField();
        }
    };
    /**
     * Render the field
     */
    ListItemPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, disabled = _a.disabled, itemLimit = _a.itemLimit, placeholder = _a.placeholder;
        var _b = this.state, suggestionsHeaderText = _b.suggestionsHeaderText, noresultsFoundText = _b.noresultsFoundText, errorMessage = _b.errorMessage, selectedItems = _b.selectedItems;
        return (React.createElement("div", null,
            !!this.props.label &&
                React.createElement(Label, { htmlFor: this._tagPickerId }, this.props.label),
            React.createElement("div", { id: this._tagPickerId },
                React.createElement(TagPicker, { onResolveSuggestions: this.onFilterChanged, styles: this.props.styles, onEmptyResolveSuggestions: function (selectLists) {
                        if (_this.props.enableDefaultSuggestions) {
                            return _this.onFilterChanged("", selectLists);
                        }
                    }, 
                    //   getTextFromItem={(item: any) => { return item.name; }}
                    getTextFromItem: this.getTextFromItem, pickerSuggestionsProps: {
                        suggestionsHeaderText: suggestionsHeaderText,
                        noResultsFoundText: noresultsFoundText
                    }, selectedItems: selectedItems, onChange: this.onItemChanged, className: className, itemLimit: itemLimit, disabled: disabled, inputProps: {
                        placeholder: placeholder
                    } })),
            !!errorMessage &&
                (React.createElement(Label, { style: { color: '#FF0000' } },
                    " ",
                    errorMessage,
                    " "))));
    };
    /**
     * Get text from Item
     */
    ListItemPicker.prototype.getTextFromItem = function (item) {
        return item.name;
    };
    return ListItemPicker;
}(React.Component));
export { ListItemPicker };
//# sourceMappingURL=ListItemPicker.js.map