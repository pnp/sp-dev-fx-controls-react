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
import { Guid } from '@microsoft/sp-core-library';
import { sp } from '@pnp/sp';
import { useId } from '@uifabric/react-hooks';
import * as strings from 'ControlStrings';
import { DefaultButton, IconButton, PrimaryButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { Stack } from '@fluentui/react/lib/Stack';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';
import * as React from 'react';
import { useMemo } from 'react';
import { SPTaxonomyService } from '../../services/SPTaxonomyService';
import styles from './ModernTaxonomyPicker.module.scss';
import { ModernTermPicker } from './modernTermPicker/ModernTermPicker';
import { TaxonomyPanelContents } from './taxonomyPanelContents';
import { TermItem } from './termItem/TermItem';
import { TermItemSuggestion } from './termItem/TermItemSuggestion';
export function ModernTaxonomyPicker(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p;
    var taxonomyService = useMemo(function () { return new SPTaxonomyService(props.context); }, [props.context]);
    var _q = React.useState(false), panelIsOpen = _q[0], setPanelIsOpen = _q[1];
    var initialLoadComplete = React.useRef(false);
    var _r = React.useState([]), selectedOptions = _r[0], setSelectedOptions = _r[1];
    var _s = React.useState([]), selectedPanelOptions = _s[0], setSelectedPanelOptions = _s[1];
    var _t = React.useState(), currentTermStoreInfo = _t[0], setCurrentTermStoreInfo = _t[1];
    var _u = React.useState(), currentTermSetInfo = _u[0], setCurrentTermSetInfo = _u[1];
    var _v = React.useState(), currentAnchorTermInfo = _v[0], setCurrentAnchorTermInfo = _v[1];
    var _w = React.useState(""), currentLanguageTag = _w[0], setCurrentLanguageTag = _w[1];
    React.useEffect(function () {
        sp.setup({ pageContext: props.context.pageContext });
        taxonomyService.getTermStoreInfo()
            .then(function (termStoreInfo) {
            setCurrentTermStoreInfo(termStoreInfo);
            var languageTag = props.context.pageContext.cultureInfo.currentUICultureName !== '' && termStoreInfo.languageTags.includes(props.context.pageContext.cultureInfo.currentUICultureName) ?
                props.context.pageContext.cultureInfo.currentUICultureName :
                termStoreInfo.defaultLanguageTag;
            setCurrentLanguageTag(languageTag);
            setSelectedOptions(Array.isArray(props.initialValues) ?
                props.initialValues.map(function (term) { return __assign(__assign({}, term), { languageTag: languageTag, termStoreInfo: termStoreInfo }); }) :
                []);
            initialLoadComplete.current = true;
        })
            .catch(function () {
            // no-op;
        });
        taxonomyService.getTermSetInfo(Guid.parse(props.termSetId))
            .then(function (termSetInfo) {
            setCurrentTermSetInfo(termSetInfo);
        })
            .catch(function () {
            // no-op;
        });
        if (props.anchorTermId && props.anchorTermId !== Guid.empty.toString()) {
            taxonomyService.getTermById(Guid.parse(props.termSetId), props.anchorTermId ? Guid.parse(props.anchorTermId) : Guid.empty)
                .then(function (anchorTermInfo) {
                setCurrentAnchorTermInfo(anchorTermInfo);
            })
                .catch(function () {
                // no-op;
            });
        }
    }, []);
    React.useEffect(function () {
        if (props.onChange && initialLoadComplete.current) {
            props.onChange(selectedOptions);
        }
    }, [selectedOptions]);
    function onOpenPanel() {
        if (props.disabled === true) {
            return;
        }
        setSelectedPanelOptions(selectedOptions);
        setPanelIsOpen(true);
    }
    function onClosePanel() {
        setSelectedPanelOptions([]);
        setPanelIsOpen(false);
    }
    function onApply() {
        if (props.isPathRendered) {
            addParentInformationToTerms(__spreadArray([], selectedPanelOptions, true))
                .then(function (selectedTermsWithPath) {
                setSelectedOptions(selectedTermsWithPath);
            })
                .catch(function () {
                // no-op;
            });
        }
        else {
            setSelectedOptions(__spreadArray([], selectedPanelOptions, true));
        }
        onClosePanel();
    }
    function getParentTree(term) {
        return __awaiter(this, void 0, void 0, function () {
            var currentParent, fullTerm, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        currentParent = term.parent;
                        if (!!currentParent) return [3 /*break*/, 2];
                        return [4 /*yield*/, taxonomyService.getTermById(Guid.parse(props.termSetId), Guid.parse(term.id))];
                    case 1:
                        fullTerm = _b.sent();
                        currentParent = fullTerm.parent;
                        _b.label = 2;
                    case 2:
                        if (!!currentParent) return [3 /*break*/, 3];
                        return [2 /*return*/, undefined];
                    case 3:
                        _a = currentParent;
                        return [4 /*yield*/, getParentTree(currentParent)];
                    case 4:
                        _a.parent = _b.sent();
                        return [2 /*return*/, currentParent];
                }
            });
        });
    }
    function addParentInformationToTerms(terms) {
        return __awaiter(this, void 0, void 0, function () {
            var _i, terms_1, term, termParent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, terms_1 = terms;
                        _a.label = 1;
                    case 1:
                        if (!(_i < terms_1.length)) return [3 /*break*/, 4];
                        term = terms_1[_i];
                        return [4 /*yield*/, getParentTree(term)];
                    case 2:
                        termParent = _a.sent();
                        term.parent = termParent;
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, terms];
                }
            });
        });
    }
    function onResolveSuggestions(filter, selectedItems) {
        return __awaiter(this, void 0, void 0, function () {
            var filteredTerms, filteredTermsWithoutSelectedItems, filteredTermsAndAvailable;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (filter === '') {
                            return [2 /*return*/, []];
                        }
                        return [4 /*yield*/, taxonomyService.searchTerm(Guid.parse(props.termSetId), filter, currentLanguageTag, props.anchorTermId ? Guid.parse(props.anchorTermId) : Guid.empty, props.allowSelectingChildren)];
                    case 1:
                        filteredTerms = _a.sent();
                        filteredTermsWithoutSelectedItems = filteredTerms.filter(function (term) {
                            if (!selectedItems || selectedItems.length === 0) {
                                return true;
                            }
                            return selectedItems.every(function (item) { return item.id !== term.id; });
                        });
                        filteredTermsAndAvailable = filteredTermsWithoutSelectedItems
                            .filter(function (term) {
                            return term.isAvailableForTagging
                                .filter(function (t) { return t.setId === props.termSetId; })[0].isAvailable;
                        });
                        return [2 /*return*/, filteredTermsAndAvailable];
                }
            });
        });
    }
    function onLoadParentLabel(termId) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var termInfo, labelsWithMatchingLanguageTag, termSetNames;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, taxonomyService.getTermById(Guid.parse(props.termSetId), termId)];
                    case 1:
                        termInfo = _b.sent();
                        if (termInfo.parent) {
                            labelsWithMatchingLanguageTag = termInfo.parent.labels.filter(function (termLabel) { return (termLabel.languageTag === currentLanguageTag); });
                            if (labelsWithMatchingLanguageTag.length === 0) {
                                labelsWithMatchingLanguageTag = termInfo.parent.labels.filter(function (termLabel) { return (termLabel.languageTag === currentTermStoreInfo.defaultLanguageTag); });
                            }
                            return [2 /*return*/, (_a = labelsWithMatchingLanguageTag[0]) === null || _a === void 0 ? void 0 : _a.name];
                        }
                        else {
                            termSetNames = currentTermSetInfo.localizedNames.filter(function (name) { return name.languageTag === currentLanguageTag; });
                            if (termSetNames.length === 0) {
                                termSetNames = currentTermSetInfo.localizedNames.filter(function (name) { return name.languageTag === currentTermStoreInfo.defaultLanguageTag; });
                            }
                            return [2 /*return*/, termSetNames[0].name];
                        }
                        return [2 /*return*/];
                }
            });
        });
    }
    function onRenderSuggestionsItem(term, itemProps) {
        return (React.createElement(TermItemSuggestion, __assign({ onLoadParentLabel: onLoadParentLabel, term: term, termStoreInfo: currentTermStoreInfo, languageTag: currentLanguageTag }, itemProps)));
    }
    function getLabelsForCurrentLanguage(item) {
        var labels = item.labels.filter(function (name) { return name.languageTag === currentLanguageTag && name.isDefault; });
        if (labels.length === 0) {
            labels = item.labels.filter(function (name) { return name.languageTag === currentTermStoreInfo.defaultLanguageTag && name.isDefault; });
        }
        return labels;
    }
    function onRenderItem(itemProps) {
        var labels = getLabelsForCurrentLanguage(itemProps.item);
        var fullParentPrefixes = [labels[0].name];
        if (props.isPathRendered) {
            var currentTermProps = itemProps.item;
            while (currentTermProps.parent !== undefined) {
                var currentParentLabels = getLabelsForCurrentLanguage(currentTermProps.parent);
                fullParentPrefixes.push(currentParentLabels[0].name);
                currentTermProps = currentTermProps.parent;
            }
            fullParentPrefixes = fullParentPrefixes.reverse();
        }
        return labels.length > 0 ? (React.createElement(TermItem, __assign({ languageTag: currentLanguageTag, termStoreInfo: currentTermStoreInfo, name: fullParentPrefixes.join(":") }, itemProps), fullParentPrefixes.join(":"))) : null;
    }
    function onTermPickerChange(itms) {
        if (itms && props.isPathRendered) {
            addParentInformationToTerms(itms)
                .then(function (itmsWithPath) {
                setSelectedOptions(itmsWithPath || []);
                setSelectedPanelOptions(itmsWithPath || []);
            })
                .catch(function () {
                //no-op;
            });
        }
        else {
            setSelectedOptions(itms || []);
            setSelectedPanelOptions(itms || []);
        }
    }
    function getTextFromItem(termInfo) {
        var _a;
        var labelsWithMatchingLanguageTag = termInfo.labels.filter(function (termLabel) { return (termLabel.languageTag === currentLanguageTag); });
        if (labelsWithMatchingLanguageTag.length === 0) {
            labelsWithMatchingLanguageTag = termInfo.labels.filter(function (termLabel) { return (termLabel.languageTag === currentTermStoreInfo.defaultLanguageTag); });
        }
        return (_a = labelsWithMatchingLanguageTag[0]) === null || _a === void 0 ? void 0 : _a.name;
    }
    var calloutProps = { gapSpace: 0 };
    var tooltipId = useId('tooltip');
    var hostStyles = { root: { display: 'inline-block' } };
    var addTermButtonStyles = { rootHovered: { backgroundColor: 'inherit' }, rootPressed: { backgroundColor: 'inherit' } };
    var termPickerStyles = { input: { minheight: 34 }, text: { minheight: 34 } };
    return (React.createElement("div", { className: styles.modernTaxonomyPicker },
        props.label && React.createElement(Label, { required: props.required }, props.label),
        React.createElement("div", { className: styles.termField },
            React.createElement("div", { className: styles.termFieldInput },
                React.createElement(ModernTermPicker, __assign({}, props.termPickerProps, { removeButtonAriaLabel: strings.ModernTaxonomyPickerRemoveButtonText, onResolveSuggestions: (_b = (_a = props.termPickerProps) === null || _a === void 0 ? void 0 : _a.onResolveSuggestions) !== null && _b !== void 0 ? _b : onResolveSuggestions, itemLimit: props.allowMultipleSelections ? undefined : 1, selectedItems: selectedOptions, disabled: props.disabled, styles: (_d = (_c = props.termPickerProps) === null || _c === void 0 ? void 0 : _c.styles) !== null && _d !== void 0 ? _d : termPickerStyles, onChange: onTermPickerChange, getTextFromItem: getTextFromItem, pickerSuggestionsProps: (_f = (_e = props.termPickerProps) === null || _e === void 0 ? void 0 : _e.pickerSuggestionsProps) !== null && _f !== void 0 ? _f : { noResultsFoundText: strings.ModernTaxonomyPickerNoResultsFound }, inputProps: (_h = (_g = props.termPickerProps) === null || _g === void 0 ? void 0 : _g.inputProps) !== null && _h !== void 0 ? _h : {
                        'aria-label': props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder,
                        placeholder: props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder
                    }, onRenderSuggestionsItem: (_j = props.onRenderSuggestionsItem) !== null && _j !== void 0 ? _j : onRenderSuggestionsItem, onRenderItem: (_k = props.onRenderItem) !== null && _k !== void 0 ? _k : onRenderItem, themeVariant: props.themeVariant }))),
            React.createElement("div", { className: styles.termFieldButton },
                React.createElement(TooltipHost, { content: strings.ModernTaxonomyPickerAddTagButtonTooltip, id: tooltipId, calloutProps: calloutProps, styles: hostStyles },
                    React.createElement(IconButton, { disabled: props.disabled, styles: addTermButtonStyles, iconProps: { iconName: 'Tag' }, onClick: onOpenPanel, "aria-describedby": tooltipId })))),
        React.createElement(Panel, { isOpen: panelIsOpen, hasCloseButton: true, closeButtonAriaLabel: strings.ModernTaxonomyPickerPanelCloseButtonText, onDismiss: onClosePanel, isLightDismiss: props.isLightDismiss, isBlocking: props.isBlocking, type: props.customPanelWidth ? PanelType.custom : PanelType.medium, customWidth: props.customPanelWidth ? "".concat(props.customPanelWidth, "px") : undefined, headerText: props.panelTitle, onRenderFooterContent: function () {
                var horizontalGapStackTokens = {
                    childrenGap: 10,
                };
                return (React.createElement(Stack, { horizontal: true, disableShrink: true, tokens: horizontalGapStackTokens },
                    React.createElement(PrimaryButton, { text: strings.ModernTaxonomyPickerApplyButtonText, value: 'Apply', onClick: onApply }),
                    React.createElement(DefaultButton, { text: strings.ModernTaxonomyPickerCancelButtonText, value: 'Cancel', onClick: onClosePanel })));
            } }, props.termSetId && (React.createElement("div", { key: props.termSetId },
            React.createElement(TaxonomyPanelContents, { allowMultipleSelections: props.allowMultipleSelections, onResolveSuggestions: (_m = (_l = props.termPickerProps) === null || _l === void 0 ? void 0 : _l.onResolveSuggestions) !== null && _m !== void 0 ? _m : onResolveSuggestions, onLoadMoreData: taxonomyService.getTerms, anchorTermInfo: currentAnchorTermInfo, termSetInfo: currentTermSetInfo, termStoreInfo: currentTermStoreInfo, pageSize: 50, selectedPanelOptions: selectedPanelOptions, setSelectedPanelOptions: setSelectedPanelOptions, placeHolder: props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder, onRenderSuggestionsItem: (_o = props.onRenderSuggestionsItem) !== null && _o !== void 0 ? _o : onRenderSuggestionsItem, onRenderItem: (_p = props.onRenderItem) !== null && _p !== void 0 ? _p : onRenderItem, getTextFromItem: getTextFromItem, languageTag: currentLanguageTag, themeVariant: props.themeVariant, termPickerProps: props.termPickerProps, onRenderActionButton: props.onRenderActionButton, allowSelectingChildren: props.allowSelectingChildren }))))));
}
//# sourceMappingURL=ModernTaxonomyPicker.js.map