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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import styles from './TaxonomyPanelContents.module.scss';
import { Label, Selection, } from '@fluentui/react';
import * as strings from 'ControlStrings';
import { useForceUpdate } from '@uifabric/react-hooks';
import { ModernTermPicker } from '../modernTermPicker/ModernTermPicker';
import { TaxonomyTree } from '../taxonomyTree/TaxonomyTree';
export function TaxonomyPanelContents(props) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
    var _m = React.useState(((_a = props.selectedPanelOptions) === null || _a === void 0 ? void 0 : _a.length) > 0 ? __spreadArray([], props.selectedPanelOptions, true) : []), terms = _m[0], setTerms = _m[1];
    var forceUpdate = useForceUpdate();
    var selection = React.useMemo(function () {
        var s = new Selection({
            onSelectionChanged: function () {
                props.setSelectedPanelOptions(function (prevOptions) { return __spreadArray([], selection.getSelection(), true); });
                forceUpdate();
            }, getKey: function (term) { return term.id; } // eslint-disable-line @typescript-eslint/no-explicit-any
        });
        s.setItems(terms);
        for (var _i = 0, _a = props.selectedPanelOptions; _i < _a.length; _i++) {
            var selectedOption = _a[_i];
            if (s.canSelectItem) {
                s.setKeySelected(selectedOption.id.toString(), true, true);
            }
        }
        return s;
    }, [terms]);
    var onPickerChange = function (items) {
        var itemsToAdd = items.filter(function (item) { return terms.every(function (term) { return term.id !== item.id; }); });
        setTerms(function (prevTerms) { return __spreadArray(__spreadArray([], prevTerms, true), itemsToAdd, true); });
        selection.setItems(__spreadArray(__spreadArray([], selection.getItems(), true), itemsToAdd, true), true);
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var item = items_1[_i];
            if (selection.canSelectItem(item)) {
                selection.setKeySelected(item.id.toString(), true, false);
            }
        }
    };
    var termPickerStyles = { root: { paddingTop: 4, paddingBottom: 4, paddingRight: 4, minheight: 34 }, input: { minheight: 34 }, text: { minheight: 34, borderStyle: 'none', borderWidth: '0px' } };
    return (React.createElement("div", { className: styles.taxonomyPanelContents },
        React.createElement("div", { className: styles.taxonomyTreeSelector },
            React.createElement("div", null,
                React.createElement(ModernTermPicker, __assign({}, props.termPickerProps, { removeButtonAriaLabel: strings.ModernTaxonomyPickerRemoveButtonText, onResolveSuggestions: (_c = (_b = props.termPickerProps) === null || _b === void 0 ? void 0 : _b.onResolveSuggestions) !== null && _c !== void 0 ? _c : props.onResolveSuggestions, itemLimit: props.allowMultipleSelections ? undefined : 1, selectedItems: props.selectedPanelOptions, styles: (_e = (_d = props.termPickerProps) === null || _d === void 0 ? void 0 : _d.styles) !== null && _e !== void 0 ? _e : termPickerStyles, onChange: onPickerChange, getTextFromItem: props.getTextFromItem, pickerSuggestionsProps: (_g = (_f = props.termPickerProps) === null || _f === void 0 ? void 0 : _f.pickerSuggestionsProps) !== null && _g !== void 0 ? _g : { noResultsFoundText: strings.ModernTaxonomyPickerNoResultsFound }, inputProps: (_j = (_h = props.termPickerProps) === null || _h === void 0 ? void 0 : _h.inputProps) !== null && _j !== void 0 ? _j : {
                        'aria-label': props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder,
                        placeholder: props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder
                    }, onRenderSuggestionsItem: (_l = (_k = props.termPickerProps) === null || _k === void 0 ? void 0 : _k.onRenderSuggestionsItem) !== null && _l !== void 0 ? _l : props.onRenderSuggestionsItem, onRenderItem: props.onRenderItem, themeVariant: props.themeVariant })))),
        React.createElement(Label, { className: styles.taxonomyTreeLabel }, props.allowMultipleSelections ? strings.ModernTaxonomyPickerTreeTitleMulti : strings.ModernTaxonomyPickerTreeTitleSingle),
        React.createElement(TaxonomyTree, { anchorTermInfo: props.anchorTermInfo, languageTag: props.languageTag, onLoadMoreData: props.onLoadMoreData, pageSize: props.pageSize, selection: selection, setTerms: setTerms, termSetInfo: props.termSetInfo, termStoreInfo: props.termStoreInfo, terms: terms, allowMultipleSelections: props.allowMultipleSelections, onRenderActionButton: props.onRenderActionButton, hideDeprecatedTerms: true, showIcons: false, allowSelectingChildren: props.allowSelectingChildren })));
}
//# sourceMappingURL=TaxonomyPanelContents.js.map