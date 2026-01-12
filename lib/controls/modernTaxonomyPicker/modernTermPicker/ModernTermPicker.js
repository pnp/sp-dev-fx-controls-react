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
import React from 'react';
import { TermItem } from '../termItem/TermItem';
import { TermItemSuggestion } from '../termItem/TermItemSuggestion';
import { initializeComponentRef, styled } from '@fluentui/react/lib/Utilities';
import { BasePicker } from '@fluentui/react/lib/Pickers';
import { getStyles } from '@fluentui/react/lib/components/pickers/BasePicker.styles';
var ModernTermPickerBase = /** @class */ (function (_super) {
    __extends(ModernTermPickerBase, _super);
    function ModernTermPickerBase(props) {
        var _this = _super.call(this, props) || this;
        initializeComponentRef(_this);
        return _this;
    }
    ModernTermPickerBase.defaultProps = {
        onRenderItem: function (props) {
            var labels = props.item.labels.filter(function (name) { return name.languageTag === props.languageTag && name.isDefault; });
            if (labels.length === 0) {
                labels = props.item.labels.filter(function (name) { var _a; return name.languageTag === ((_a = props.termStoreInfo) === null || _a === void 0 ? void 0 : _a.defaultLanguageTag) && name.isDefault; });
            }
            return labels.length > 0 ? (React.createElement(TermItem, __assign({}, props), labels[0].name)) : null;
        },
        onRenderSuggestionsItem: function (props, itemProps) {
            return React.createElement(TermItemSuggestion, __assign({ term: props }, itemProps));
        },
    };
    return ModernTermPickerBase;
}(BasePicker));
export { ModernTermPickerBase };
export var ModernTermPicker = styled(ModernTermPickerBase, getStyles, undefined, {
    scope: 'ModernTermPicker',
});
//# sourceMappingURL=ModernTermPicker.js.map