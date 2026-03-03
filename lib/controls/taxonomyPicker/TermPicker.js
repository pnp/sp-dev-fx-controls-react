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
import { BasePicker } from '@fluentui/react/lib/Pickers';
import SPTermStorePickerService from './../../services/SPTermStorePickerService';
import styles from './TaxonomyPicker.module.scss';
import * as strings from 'ControlStrings';
import { Icon } from '@fluentui/react/lib/Icon';
var TermBasePicker = /** @class */ (function (_super) {
    __extends(TermBasePicker, _super);
    function TermBasePicker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return TermBasePicker;
}(BasePicker));
export { TermBasePicker };
var TermPicker = /** @class */ (function (_super) {
    __extends(TermPicker, _super);
    /**
     * Constructor method
     */
    function TermPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.allTerms = null;
        _this.onRenderItem = _this.onRenderItem.bind(_this);
        _this.onRenderSuggestionsItem = _this.onRenderSuggestionsItem.bind(_this);
        _this.onFilterChanged = _this.onFilterChanged.bind(_this);
        _this.onGetTextFromItem = _this.onGetTextFromItem.bind(_this);
        _this.state = {
            terms: _this.props.value
        };
        _this.termsService = new SPTermStorePickerService(_this.props.termPickerHostProps, _this.props.context);
        return _this;
    }
    /**
     * componentWillReceiveProps method
     */
    TermPicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        // check to see if props is different to avoid re-rendering
        var newKeys = nextProps.value.map(function (a) { return a.key; });
        var currentKeys = this.state.terms.map(function (a) { return a.key; });
        if (newKeys.sort().join(',') !== currentKeys.sort().join(',')) {
            this.setState({ terms: nextProps.value });
        }
    };
    /**
     * Renders the item in the picker
     */
    TermPicker.prototype.onRenderItem = function (term) {
        return (React.createElement("div", { className: styles.pickedTermRoot, key: term.index, "data-selection-index": term.index, "data-is-focusable": !term.disabled && true },
            React.createElement("span", { className: styles.pickedTermText }, term.item.name),
            !term.disabled && (React.createElement("span", { className: styles.pickedTermCloseIcon, onClick: term.onRemoveItem },
                React.createElement(Icon, { iconName: "Cancel" })))));
    };
    /**
     * Renders the suggestions in the picker
     */
    TermPicker.prototype.onRenderSuggestionsItem = function (term) {
        var termParent = term.termSetName;
        var termTitle = "".concat(term.name, " [").concat(term.termSetName, "]");
        if (term.path.indexOf(";") !== -1) {
            var splitPath = term.path.split(";");
            termParent = splitPath[splitPath.length - 2];
            splitPath.pop();
            termTitle = "".concat(term.name, " [").concat(term.termSetName, ":").concat(splitPath.join(':'), "]");
        }
        return (React.createElement("div", { className: styles.termSuggestion, title: termTitle },
            React.createElement("div", null, term.name),
            React.createElement("div", { className: styles.termSuggestionSubTitle },
                " ",
                strings.TaxonomyPickerInLabel,
                " ",
                termParent ? termParent : strings.TaxonomyPickerTermSetLabel)));
    };
    /**
     * When Filter Changes a new search for suggestions
     */
    TermPicker.prototype.onFilterChanged = function (filterText, tagList) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, termPickerHostProps, isTermSetSelectable, terms, termSet, filteredTerms, _b, disabledTermIds_1, disableChildrenOfDisabledParents, _loop_1, this_1, _i, terms_1, term;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(filterText !== "")) return [3 /*break*/, 8];
                        _a = this.props, termPickerHostProps = _a.termPickerHostProps, isTermSetSelectable = _a.isTermSetSelectable;
                        return [4 /*yield*/, this.termsService.searchTermsByName(filterText)];
                    case 1:
                        terms = _c.sent();
                        if (!(isTermSetSelectable && !termPickerHostProps.anchorId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.termsService.getTermSet()];
                    case 2:
                        termSet = _c.sent();
                        // Check if termset was retrieved and if it contains the filter value
                        if (termSet && termSet.Name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) {
                            // Add the termset to the suggestion list
                            terms.push({
                                key: this.termsService.cleanGuid(termSet.Id),
                                name: termSet.Name,
                                path: "",
                                termSet: this.termsService.cleanGuid(termSet.Id)
                            });
                        }
                        _c.label = 3;
                    case 3:
                        filteredTerms = [];
                        _b = this.props, disabledTermIds_1 = _b.disabledTermIds, disableChildrenOfDisabledParents = _b.disableChildrenOfDisabledParents;
                        _loop_1 = function (term) {
                            var canBePicked, disabledParents, findTerm;
                            return __generator(this, function (_d) {
                                switch (_d.label) {
                                    case 0:
                                        canBePicked = true;
                                        if (!(disabledTermIds_1 && disabledTermIds_1.length > 0)) return [3 /*break*/, 4];
                                        if (!(disabledTermIds_1.indexOf(term.key) !== -1)) return [3 /*break*/, 1];
                                        canBePicked = false;
                                        return [3 /*break*/, 4];
                                    case 1:
                                        if (!disableChildrenOfDisabledParents) return [3 /*break*/, 4];
                                        if (!!this_1.allTerms) return [3 /*break*/, 3];
                                        return [4 /*yield*/, this_1.termsService.getAllTerms(this_1.props.termPickerHostProps.termsetNameOrID, this_1.props.termPickerHostProps.hideDeprecatedTags, this_1.props.termPickerHostProps.hideTagsNotAvailableForTagging)];
                                    case 2:
                                        this_1.allTerms = _d.sent();
                                        _d.label = 3;
                                    case 3:
                                        // Check if there are terms retrieved
                                        if (this_1.allTerms.Terms && this_1.allTerms.Terms.length > 0) {
                                            disabledParents = this_1.allTerms.Terms.filter(function (t) { return disabledTermIds_1.indexOf(t.Id) !== -1; });
                                            // Check if disabled parents were found
                                            if (disabledParents && disabledParents.length > 0) {
                                                findTerm = disabledParents.filter(function (pt) { return term.path.indexOf(pt.PathOfTerm) !== -1; });
                                                if (findTerm && findTerm.length > 0) {
                                                    canBePicked = false;
                                                }
                                            }
                                        }
                                        _d.label = 4;
                                    case 4:
                                        if (canBePicked) {
                                            // Only retrieve the terms which are not yet tagged
                                            if (tagList.filter(function (tag) { return tag.key === term.key; }).length === 0) {
                                                filteredTerms.push(term);
                                            }
                                        }
                                        return [2 /*return*/];
                                }
                            });
                        };
                        this_1 = this;
                        _i = 0, terms_1 = terms;
                        _c.label = 4;
                    case 4:
                        if (!(_i < terms_1.length)) return [3 /*break*/, 7];
                        term = terms_1[_i];
                        return [5 /*yield**/, _loop_1(term)];
                    case 5:
                        _c.sent();
                        _c.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 4];
                    case 7: return [2 /*return*/, filteredTerms];
                    case 8: return [2 /*return*/, Promise.resolve([])];
                }
            });
        });
    };
    /**
     * gets the text from an item
     */
    TermPicker.prototype.onGetTextFromItem = function (item) {
        return item.name;
    };
    /**
     * Render method
     */
    TermPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, disabled = _a.disabled, value = _a.value, onChanged = _a.onChanged, onInputChange = _a.onInputChange, onBlur = _a.onBlur, onNewTerm = _a.onNewTerm, allowMultipleSelections = _a.allowMultipleSelections, placeholder = _a.placeholder;
        var terms = this.state.terms;
        var clearDisplayValue = function () {
            var _a;
            var picker = _this.state.elRef;
            var autoFill = (_a = picker === null || picker === void 0 ? void 0 : picker['input']) === null || _a === void 0 ? void 0 : _a.current; // eslint-disable-line dot-notation
            if (autoFill) {
                autoFill['_value'] = ''; // eslint-disable-line dot-notation
                autoFill.setState({ inputValue: '' });
            }
            else {
                throw new Error("TermPicker.TermBasePicker.render.clearDisplayValue no autoFill to reset displayValue");
            }
        };
        var inputProps = { placeholder: placeholder };
        if (onNewTerm) {
            inputProps.onKeyDown = function (e) {
                var _a;
                if (e && e.key === 'Enter' && (!(e.ctrlKey || e.altKey || e.shiftKey)) && ((_a = e.target) === null || _a === void 0 ? void 0 : _a['value'])) { // eslint-disable-line dot-notation
                    onNewTerm(e.target['value']); // eslint-disable-line dot-notation
                    clearDisplayValue();
                }
            };
        }
        return (React.createElement("div", null,
            React.createElement(TermBasePicker, { ref: function (elRef) {
                    if (!_this.state.elRef) {
                        _this.setState({ elRef: elRef });
                    }
                }, disabled: disabled, onResolveSuggestions: this.onFilterChanged, onRenderSuggestionsItem: this.onRenderSuggestionsItem, getTextFromItem: this.onGetTextFromItem, onRenderItem: this.onRenderItem, defaultSelectedItems: value, selectedItems: terms, onChange: onChanged, onInputChange: onInputChange, onBlur: onBlur, itemLimit: !allowMultipleSelections ? 1 : undefined, className: styles.termBasePicker, inputProps: inputProps })));
    };
    return TermPicker;
}(React.Component));
export default TermPicker;
//# sourceMappingURL=TermPicker.js.map