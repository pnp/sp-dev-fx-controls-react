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
import * as React from 'react';
import { PrimaryButton, DefaultButton, IconButton, } from '@fluentui/react/lib/Button';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Label } from '@fluentui/react/lib/Label';
import TermPicker from './TermPicker';
import SPTermStorePickerService from './../../services/SPTermStorePickerService';
import * as strings from 'ControlStrings';
import styles from './TaxonomyPicker.module.scss';
import { sortBy, cloneDeep, isEqual } from '@microsoft/sp-lodash-subset';
import uniqBy from 'lodash/uniqBy';
import TermParent from './TermParent';
import FieldErrorMessage from '../errorMessage/ErrorMessage';
import { initializeIcons } from '@uifabric/icons';
import * as telemetry from '../../common/telemetry';
import { EmptyGuid } from '../../common/Constants';
/**
 * Image URLs / Base64
 */
export var COLLAPSED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAIJJREFUOE/NkjEKwCAMRdu7ewZXJ/EqHkJwE9TBCwR+a6FLUQsRwYBTeD8/35wADnZVmPvY4OOYO3UNbK1FKeUWH+fRtK21hjEG3vuhQBdOKUEpBedcV6ALExFijJBSIufcFBjCVSCEACEEqpNvBmsmT+3MTnvqn/+O4+1vdtv7274APmNjtuXVz6sAAAAASUVORK5CYII='; // /_layouts/15/images/MDNCollapsed.png
export var EXPANDED_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAFtJREFUOE9j/P//PwPZAKSZXEy2RrCLybV1CGjetWvX/46ODqBLUQOXoJ9BGtXU1MCYJM0wjZGRkaRpRtZIkmZ0jSRpBgUOzJ8wmqwAw5eICIb2qGYSkyfNAgwAasU+UQcFvD8AAAAASUVORK5CYII='; // /_layouts/15/images/MDNExpanded.png
export var GROUP_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC9SURBVDhPY2CgNXh1qEkdiJ8D8X90TNBuJM0V6IpBhoHFgIxebKYTIwYzAMNpxGhGdsFwNoBgNEFjAWsYgOSKiorMgPgbEP/Hgj8AxXpB0Yg1gQAldYuLix8/efLkzn8s4O7du9eAan7iM+DV/v37z546der/jx8/sJkBdhVOA5qbm08ePnwYrOjQoUOkGwDU+AFowLmjR4/idwGukAYaYAkMgxfPnj27h816kDg4DPABoAI/IP6DIxZA4l0AOd9H3QXl5+cAAAAASUVORK5CYII='; // /_layouts/15/Images/EMMGroup.png
export var TERMSET_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACaSURBVDhPrZLRCcAgDERdpZMIjuQA7uWH4CqdxMY0EQtNjKWB0A/77sxF55SKMTalk8a61lqCFqsLiwKac84ZRUUBi7MoYHVmAfjfjzE6vJqZQfie0AcwBQVW8ATi7AR7zGGGNSE6Q2cyLSPIjRswjO7qKhcPDN2hK46w05wZMcEUIG+HrzzcrRsQBIJ5hS8C9fGAPmRwu/9RFxW6L8CM4Ry8AAAAAElFTkSuQmCC'; // /_layouts/15/Images/EMMTermSet.png
export var TERM_IMG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACzSURBVDhPY2AYNKCoqIgTiOcD8X8S8F6wB4Aa1IH4akNDw+mPHz++/E8EuHTp0jmQRSDNCcXFxa/XrVt3gAh9KEpgBvx/9OjRLVI1g9TDDYBp3rlz5//Kysr/IJoYgGEASPPatWsbQDQxAMOAbdu2gZ0FookBcAOePHlyhxgN6GqQY+Hdhg0bDpJqCNgAaDrQAnJuNDY2nvr06dMbYgw6e/bsabgBUEN4yEiJ2wdNViLfIQC3sTh2vtJcswAAAABJRU5ErkJggg==';
initializeIcons();
/**
 * Renders the controls for PropertyFieldTermPicker component
 */
var TaxonomyPicker = /** @class */ (function (_super) {
    __extends(TaxonomyPicker, _super);
    /**
     * Constructor method
     */
    function TaxonomyPicker(props) {
        var _this = _super.call(this, props) || this;
        _this.previousValues = [];
        _this.invalidTerm = null;
        _this.cancel = true;
        _this.onNewTerm = function (newLabel) {
            _this.props.onNewTerm({
                key: EmptyGuid,
                name: newLabel,
                path: newLabel,
                termSet: _this.termsService.cleanGuid(_this.props.termsetNameOrID),
            });
        };
        /**
         * TermSet selection handler
         * @param termSet
         * @param isChecked
         */
        _this.termSetSelectedChange = function (termSet, isChecked) {
            var ts = __assign({}, termSet);
            // Clean /Guid.../ from the ID
            ts.Id = _this.termsService.cleanGuid(ts.Id);
            // Create a term for the termset
            var term = {
                Name: ts.Name,
                Id: ts.Id,
                TermSet: ts,
                PathOfTerm: '',
                _ObjectType_: ts._ObjectType_,
                _ObjectIdentity_: ts._ObjectIdentity_,
                Description: ts.Description,
                IsDeprecated: null,
                IsAvailableForTagging: null,
                IsRoot: null,
            };
            // Trigger the normal change event
            _this.termsChanged(term, isChecked);
        };
        _this.validate = function (value) { return __awaiter(_this, void 0, void 0, function () {
            var changedInvalidNodeIds, internalErrorMessage, result, resolvedResult, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        //
                        // checking if there are any invalid nodes left after initial validation
                        //
                        if (this.state.invalidNodeIds) {
                            changedInvalidNodeIds = this.state.invalidNodeIds.filter(function (id) {
                                return !!value.filter(function (term) { return term.key === id; }).length;
                            });
                            internalErrorMessage = changedInvalidNodeIds.length
                                ? this.state.internalErrorMessage
                                : '';
                            this.setState({
                                invalidNodeIds: changedInvalidNodeIds,
                                internalErrorMessage: internalErrorMessage,
                            });
                        }
                        if (this.props.errorMessage || !this.props.onGetErrorMessage) {
                            // ignoring all onGetErrorMessage logic
                            this.validated(value);
                            return [2 /*return*/];
                        }
                        result = this.props.onGetErrorMessage(value || []);
                        if (!result) {
                            this.validated(value);
                            return [2 /*return*/];
                        }
                        if (!(typeof result === 'string')) return [3 /*break*/, 1];
                        if (!result) {
                            this.validated(value);
                            this.setState({
                                errorMessage: undefined,
                            });
                        }
                        else {
                            this.setState({
                                errorMessage: result,
                            });
                        }
                        return [3 /*break*/, 4];
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, result];
                    case 2:
                        resolvedResult = _b.sent();
                        if (!resolvedResult) {
                            this.validated(value);
                            this.setState({
                                errorMessage: undefined,
                            });
                        }
                        else {
                            this.setState({
                                errorMessage: resolvedResult,
                            });
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        _a = _b.sent();
                        this.validated(value);
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        _this.validated = function (value) {
            _this.props.onChange(value);
        };
        telemetry.track('ReactTaxonomyPicker');
        _this.state = {
            activeNodes: _this.props.initialValues || [],
            termSetAndTerms: null,
            loaded: false,
            openPanel: false,
            errorMessage: props.errorMessage,
        };
        _this.onOpenPanel = _this.onOpenPanel.bind(_this);
        _this.onClosePanel = _this.onClosePanel.bind(_this);
        _this.onSave = _this.onSave.bind(_this);
        _this.termsChanged = _this.termsChanged.bind(_this);
        _this.termsFromPickerChanged = _this.termsFromPickerChanged.bind(_this);
        _this.onInputChange = _this.onInputChange.bind(_this);
        _this.onBlur = _this.onBlur.bind(_this);
        _this.termsService = new SPTermStorePickerService(_this.props, _this.props.context);
        return _this;
    }
    /**
     * componentDidMount lifecycle hook
     */
    TaxonomyPicker.prototype.componentDidMount = function () {
        this.validateTerms()
            .then(function () {
            // no-op;
        })
            .catch(function () {
            // no-op;
        });
    };
    /**
     * componentWillMount lifecycle hook
     */
    TaxonomyPicker.prototype.UNSAFE_componentWillMount = function () {
        this.setState({
            activeNodes: this.props.initialValues || [],
        });
    };
    TaxonomyPicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        var newState;
        // Check if the initial values objects are not equal, if that is the case, data can be refreshed
        if (!isEqual(this.props.initialValues, nextProps.initialValues)) {
            newState = {
                activeNodes: nextProps.initialValues || [],
            };
        }
        if (nextProps.errorMessage !== this.props.errorMessage) {
            if (!newState) {
                newState = {};
            }
            newState.errorMessage = nextProps.errorMessage;
        }
        if (newState) {
            this.setState(newState);
        }
    };
    /**
     * it checks, if all entries still exist in term store. if allowMultipleSelections is true. it have to validate all values
     */
    TaxonomyPicker.prototype.validateTerms = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, hideDeprecatedTags, hideTagsNotAvailableForTagging, initialValues, validateOnLoad, termsetNameOrID, useSessionStorage, isValidateOnLoad, notFoundTerms, notFoundTermIds, termSet, allTerms, _loop_1, i, len;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.props, hideDeprecatedTags = _a.hideDeprecatedTags, hideTagsNotAvailableForTagging = _a.hideTagsNotAvailableForTagging, initialValues = _a.initialValues, validateOnLoad = _a.validateOnLoad, termsetNameOrID = _a.termsetNameOrID, useSessionStorage = _a.useSessionStorage;
                        isValidateOnLoad = validateOnLoad && initialValues && initialValues.length >= 1;
                        if (!isValidateOnLoad) return [3 /*break*/, 2];
                        notFoundTerms = [];
                        notFoundTermIds = [];
                        return [4 /*yield*/, this.termsService.getAllTerms(termsetNameOrID, hideDeprecatedTags, hideTagsNotAvailableForTagging, useSessionStorage)];
                    case 1:
                        termSet = _b.sent();
                        allTerms = termSet.Terms;
                        _loop_1 = function (i, len) {
                            var pickerTerm = initialValues[i];
                            if (!allTerms.filter(function (t) { return t.Id === pickerTerm.key; }).length) {
                                notFoundTerms.push(pickerTerm.name);
                                notFoundTermIds.push(pickerTerm.key);
                            }
                        };
                        for (i = 0, len = initialValues.length; i < len; i++) {
                            _loop_1(i, len);
                        }
                        if (notFoundTerms.length) {
                            this.setState({
                                internalErrorMessage: strings.TaxonomyPickerTermsNotFound.replace('{0}', notFoundTerms.join(', ')),
                                invalidNodeIds: notFoundTermIds,
                            });
                        }
                        _b.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Loads the list from SharePoint current web site
     */
    TaxonomyPicker.prototype.loadTermStores = function () {
        var _this = this;
        if (this.props.termActions && this.props.termActions.initialize) {
            this.props.termActions
                .initialize(this.termsService)
                .then(function () {
                // no-op;
            })
                .catch(function () {
                // no-op;
            });
        }
        this.termsService
            .getAllTerms(this.props.termsetNameOrID, this.props.hideDeprecatedTags, this.props.hideTagsNotAvailableForTagging, this.props.useSessionStorage)
            .then(function (response) {
            // Check if a response was retrieved
            var termSetAndTerms = response ? response : null;
            _this.setState({
                termSetAndTerms: termSetAndTerms,
                loaded: true,
            });
        })
            .catch(function () {
            // no-op;
        });
    };
    /**
     * Force update of the taxonomy tree - required by term action in case the term has been added, deleted or moved.
     */
    TaxonomyPicker.prototype.updateTaxonomyTree = function () {
        return __awaiter(this, void 0, void 0, function () {
            var termSetAndTerms;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.termsService.getAllTerms(this.props.termsetNameOrID, this.props.hideDeprecatedTags, this.props.hideTagsNotAvailableForTagging, this.props.useSessionStorage)];
                    case 1:
                        termSetAndTerms = _a.sent();
                        this.setState({
                            termSetAndTerms: termSetAndTerms,
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Open the right Panel
     */
    TaxonomyPicker.prototype.onOpenPanel = function () {
        if (this.props.disabled === true) {
            return;
        }
        // Store the current code value
        this.previousValues = cloneDeep(this.state.activeNodes);
        this.cancel = true;
        this.loadTermStores();
        this.setState({
            openPanel: true,
            loaded: false,
        });
    };
    /**
     * Close the panel
     */
    TaxonomyPicker.prototype.onClosePanel = function () {
        var _this = this;
        this.setState(function () {
            var newState = {
                openPanel: false,
                loaded: false,
            };
            // Check if the property has to be reset
            if (_this.cancel) {
                newState.activeNodes = _this.previousValues;
            }
            return newState;
        });
    };
    /**
     * On save click action
     */
    TaxonomyPicker.prototype.onSave = function () {
        this.cancel = false;
        this.onClosePanel();
        this.validate(this.state.activeNodes)
            .then(function () {
            // no-op;
        })
            .catch(function () {
            // no-op;
        });
    };
    /**
     * Clicks on a node
     * @param node
     */
    TaxonomyPicker.prototype.termsChanged = function (term, checked) {
        var activeNodes = this.state.activeNodes.slice();
        if (typeof term === 'undefined' || term === null) {
            return;
        }
        var _a = this.props, allowMultipleSelections = _a.allowMultipleSelections, selectChildrenIfParentSelected = _a.selectChildrenIfParentSelected;
        var termSetAndTerms = this.state.termSetAndTerms;
        // Term item to add to the active nodes array
        var termItem = {
            name: term.Name,
            key: term.Id,
            path: term.PathOfTerm,
            termSet: term.TermSet.Id,
        };
        //
        // checking if we need to process child terms
        //
        var children = [];
        if (allowMultipleSelections && selectChildrenIfParentSelected) {
            if (term.Id === term.TermSet.Id) {
                // term set selected
                children = termSetAndTerms.Terms || [];
            }
            else {
                children = termSetAndTerms.Terms
                    ? termSetAndTerms.Terms.filter(function (t) {
                        return t.PathOfTerm.indexOf("".concat(term.PathOfTerm, ";")) !== -1;
                    })
                    : [];
            }
        }
        // Check if the term is checked or unchecked
        if (checked) {
            // Check if it is allowed to select multiple terms
            if (allowMultipleSelections) {
                // Add the checked term
                activeNodes.push(termItem);
            }
            else {
                // Only store the current selected item
                activeNodes = [termItem];
            }
            if (children.length) {
                activeNodes.push.apply(activeNodes, children.map(function (c) {
                    return {
                        name: c.Name,
                        key: c.Id,
                        path: c.PathOfTerm,
                        termSet: c.TermSet.Id,
                    };
                }));
            }
            // Filter out the duplicate terms
            activeNodes = uniqBy(activeNodes, 'key');
        }
        else {
            // Remove the term from the list of active nodes
            activeNodes = activeNodes.filter(function (item) { return item.key !== term.Id; });
            if (children.length) {
                var childIds_1 = children.map(function (c) { return c.Id; });
                activeNodes = activeNodes.filter(function (item) { return childIds_1.indexOf(item.key) === -1; });
            }
        }
        // Sort all active nodes
        activeNodes = sortBy(activeNodes, 'path');
        if (this.props.onPanelSelectionChange) {
            this.props.onPanelSelectionChange(this.state.activeNodes.slice(), activeNodes);
        }
        // Update the current state
        this.setState({
            activeNodes: activeNodes,
        });
    };
    /**
     * Fires When Items Changed in TermPicker
     * @param node
     */
    TaxonomyPicker.prototype.termsFromPickerChanged = function (terms) {
        this.setState({
            activeNodes: terms,
        });
        this.validate(terms)
            .then(function () {
            // no-op;
        })
            .catch(function () {
            // no-op;
        });
    };
    /**
     * Shows an error message for any invalid input inside taxonomy picker control
     */
    TaxonomyPicker.prototype.validateInputText = function () {
        // Show error message, if any unresolved value exists inside taxonomy picker control
        if (!!this.invalidTerm) {
            // An unresolved value exists
            this.setState({
                errorMessage: strings.TaxonomyPickerInvalidTerms.replace('{0}', this.invalidTerm),
            });
        }
        else {
            // There are no unresolved values
            this.setState({
                errorMessage: null,
            });
        }
    };
    /**
     * Triggers when input of taxonomy picker control changes
     */
    TaxonomyPicker.prototype.onInputChange = function (input) {
        if (!input) {
            var validateInput = this.props.validateInput;
            if (!!validateInput) {
                // Perform validation of input text, only if taxonomy picker is configured with validateInput={true} property.
                this.invalidTerm = null;
                this.validateInputText();
            }
        }
        return input;
    };
    TaxonomyPicker.prototype.validateOnGetErrorMessage = function (targetValue) {
        return __awaiter(this, void 0, void 0, function () {
            var errorMessage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.props.onGetErrorMessage([
                            {
                                key: EmptyGuid,
                                name: targetValue,
                                path: targetValue,
                                termSet: this.termsService.cleanGuid(this.props.termsetNameOrID),
                            },
                        ])];
                    case 1:
                        errorMessage = _a.sent();
                        if (!!errorMessage) {
                            this.setState({
                                errorMessage: errorMessage,
                            });
                        }
                        else {
                            this.setState({
                                errorMessage: null,
                            });
                        }
                        return [2 /*return*/, !errorMessage];
                }
            });
        });
    };
    /**
     * Triggers when taxonomy picker control loses focus
     */
    TaxonomyPicker.prototype.onBlur = function (event) {
        return __awaiter(this, void 0, void 0, function () {
            var validateInput, target, targetValue;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        validateInput = this.props.validateInput;
                        if (!!!validateInput) return [3 /*break*/, 3];
                        target = event.target;
                        targetValue = !!target ? target.value : null;
                        if (!(!!this.props.onGetErrorMessage && !!targetValue)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.validateOnGetErrorMessage(targetValue)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 3];
                    case 2:
                        if (!!targetValue) {
                            this.invalidTerm = targetValue;
                        }
                        else {
                            this.invalidTerm = null;
                        }
                        this.validateInputText();
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Gets the given node position in the active nodes collection
     * @param node
     */
    TaxonomyPicker.prototype.getSelectedNodePosition = function (node) {
        for (var i = 0; i < this.state.activeNodes.length; i++) {
            if (node.key === this.state.activeNodes[i].key) {
                return i;
            }
        }
        return -1;
    };
    /**
     * Renders the SPListpicker controls with Office UI  Fabric
     */
    TaxonomyPicker.prototype.render = function () {
        var _this = this;
        var _a = this.props, label = _a.label, context = _a.context, disabled = _a.disabled, isTermSetSelectable = _a.isTermSetSelectable, allowMultipleSelections = _a.allowMultipleSelections, disabledTermIds = _a.disabledTermIds, disableChildrenOfDisabledParents = _a.disableChildrenOfDisabledParents, placeholder = _a.placeholder, panelTitle = _a.panelTitle, anchorId = _a.anchorId, termActions = _a.termActions, required = _a.required;
        var _b = this.state, activeNodes = _b.activeNodes, errorMessage = _b.errorMessage, internalErrorMessage = _b.internalErrorMessage, openPanel = _b.openPanel, loaded = _b.loaded, termSetAndTerms = _b.termSetAndTerms;
        return (React.createElement("div", null,
            label && React.createElement(Label, { required: required }, label),
            React.createElement("div", { className: styles.termField },
                React.createElement("div", { className: styles.termFieldInput },
                    React.createElement(TermPicker, { context: context, termPickerHostProps: this.props, disabled: disabled, value: activeNodes, isTermSetSelectable: isTermSetSelectable, onChanged: this.termsFromPickerChanged, onInputChange: this.onInputChange, onBlur: this.onBlur, onNewTerm: this.props.onNewTerm ? this.onNewTerm : undefined, allowMultipleSelections: allowMultipleSelections, disabledTermIds: disabledTermIds, disableChildrenOfDisabledParents: disableChildrenOfDisabledParents, placeholder: placeholder })),
                React.createElement("div", { className: styles.termFieldButton },
                    React.createElement(IconButton, { disabled: disabled, iconProps: { iconName: 'Tag' }, onClick: this.onOpenPanel }))),
            React.createElement(FieldErrorMessage, { errorMessage: errorMessage || internalErrorMessage }),
            React.createElement(Panel, { isOpen: openPanel, hasCloseButton: true, onDismiss: this.onClosePanel, isLightDismiss: true, type: PanelType.medium, headerText: panelTitle, onRenderFooterContent: function () {
                    return (React.createElement("div", { className: styles.actions },
                        React.createElement(PrimaryButton, { iconProps: { iconName: 'Save' }, text: strings.SaveButtonLabel, value: "Save", onClick: _this.onSave }),
                        React.createElement(DefaultButton, { iconProps: { iconName: 'Cancel' }, text: strings.CancelButtonLabel, value: "Cancel", onClick: _this.onClosePanel })));
                } },
                /* Show spinner in the panel while retrieving terms */
                loaded === false ? React.createElement(Spinner, { size: SpinnerSize.medium }) : '',
                loaded === true && termSetAndTerms && (React.createElement("div", { key: termSetAndTerms.Id },
                    React.createElement("h3", null, termSetAndTerms.Name),
                    React.createElement(TermParent, { anchorId: anchorId, autoExpand: null, termset: termSetAndTerms, isTermSetSelectable: isTermSetSelectable, termSetSelectedChange: this.termSetSelectedChange, activeNodes: activeNodes, disabledTermIds: disabledTermIds, disableChildrenOfDisabledParents: disableChildrenOfDisabledParents, changedCallback: this.termsChanged, multiSelection: allowMultipleSelections, spTermService: this.termsService, updateTaxonomyTree: this.updateTaxonomyTree, termActions: termActions }))))));
    };
    return TaxonomyPicker;
}(React.Component));
export { TaxonomyPicker };
//# sourceMappingURL=TaxonomyPicker.js.map