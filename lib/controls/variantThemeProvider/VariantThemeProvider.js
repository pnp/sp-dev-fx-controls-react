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
import * as React from 'react';
import { useCallback } from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { generateThemeFromColors, generateThemeVariant, getDefaultTheme, } from './VariantThemeProviderHelpers';
import { VariantType, } from './VariantThemeProviderProps';
export var VariantThemeProvider = function (props) {
    var themeToApply = useCallback(function () {
        var workingVariantType = props.variantType
            ? props.variantType
            : VariantType.None;
        var workingTheme;
        if (props.themeColors) {
            workingTheme = generateThemeFromColors(props.themeColors.primaryColor, props.themeColors.textColor, props.themeColors.backgroundColor);
        }
        else {
            if (props.theme) {
                workingTheme = props.theme;
            }
            else {
                workingTheme = getDefaultTheme();
            }
        }
        var themeVariantToApply = props.variantType === VariantType.None
            ? workingTheme
            : generateThemeVariant(workingTheme, workingVariantType);
        return themeVariantToApply;
    }, [props.theme, props.themeColors, props.variantType]);
    return (React.createElement(ThemeProvider, __assign({}, props, { theme: themeToApply() }), props.children));
};
//# sourceMappingURL=VariantThemeProvider.js.map