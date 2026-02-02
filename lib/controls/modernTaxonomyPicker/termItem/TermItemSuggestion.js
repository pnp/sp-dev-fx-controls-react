import React, { useEffect } from 'react';
import styles from './TermItemSuggestions.module.scss';
import * as strings from 'ControlStrings';
import { Guid } from '@microsoft/sp-core-library';
export function TermItemSuggestion(props) {
    var _a, _b;
    var _c = React.useState(""), parentLabel = _c[0], setParentLabel = _c[1];
    useEffect(function () {
        if (props.onLoadParentLabel) {
            props.onLoadParentLabel(Guid.parse(props.term.id.toString()))
                .then(function (localParentInfo) {
                setParentLabel(localParentInfo);
            })
                .catch(function () {
                // no-op;
            });
        }
    }, []);
    var labels;
    if (props.languageTag && props.termStoreInfo) {
        labels = props.term.labels.filter(function (name) { return name.languageTag === props.languageTag && name.isDefault; });
        if (labels.length === 0) {
            labels = props.term.labels.filter(function (name) { return name.languageTag === props.termStoreInfo.defaultLanguageTag && name.isDefault; });
        }
    }
    else {
        labels = props.term.labels.filter(function (name) { return name.isDefault; });
    }
    return (React.createElement("div", { className: styles.termSuggestionContainer, title: (_a = labels[0]) === null || _a === void 0 ? void 0 : _a.name }, (_b = labels[0]) === null || _b === void 0 ? void 0 :
        _b.name,
        parentLabel !== "" && React.createElement("div", null,
            React.createElement("span", { className: styles.termSuggestionPath }, "".concat(strings.ModernTaxonomyPickerSuggestionInLabel, " ").concat(parentLabel)))));
}
//# sourceMappingURL=TermItemSuggestion.js.map