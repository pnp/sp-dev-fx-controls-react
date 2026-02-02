import { getNeutralVariant, getSoftVariant, getStrongVariant, } from '@fluentui/scheme-utilities';
import { getColorFromString, isDark, createTheme, getTheme, BaseSlots, ThemeGenerator, themeRulesStandardCreator, } from '@fluentui/react';
import { VariantType } from './VariantThemeProviderProps';
export var generateThemeVariant = function (theme, themeType) {
    var currentTheme;
    switch (themeType) {
        case VariantType.None:
            currentTheme = theme;
            break;
        case VariantType.Neutral:
            currentTheme = getNeutralVariant(theme);
            break;
        case VariantType.Soft:
            currentTheme = getSoftVariant(theme);
            break;
        case VariantType.Strong:
            currentTheme = getStrongVariant(theme);
            break;
        default:
            currentTheme = theme;
            break;
    }
    return currentTheme;
};
export var getDefaultTheme = function () {
    var _a;
    var currentTheme;
    var themeColorsFromWindow = (_a = window === null || window === void 0 ? void 0 : window.__themeState__) === null || _a === void 0 ? void 0 : _a.theme; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (themeColorsFromWindow) {
        currentTheme = createTheme({
            palette: themeColorsFromWindow,
        });
    }
    else
        currentTheme = getTheme();
    return currentTheme;
};
export var generateThemeFromColors = function (primaryColor, textColor, backgroundColor) {
    var themeRules = themeRulesStandardCreator();
    var colors = {
        primaryColor: getColorFromString(primaryColor),
        textColor: getColorFromString(textColor),
        backgroundColor: getColorFromString(backgroundColor),
    };
    var currentIsDark = isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color);
    ThemeGenerator.insureSlots(themeRules, currentIsDark);
    ThemeGenerator.setSlot(themeRules[BaseSlots[BaseSlots.primaryColor]], colors.primaryColor, currentIsDark, true, true);
    ThemeGenerator.setSlot(themeRules[BaseSlots[BaseSlots.foregroundColor]], colors.textColor, currentIsDark, true, true);
    ThemeGenerator.setSlot(themeRules[BaseSlots[BaseSlots.backgroundColor]], colors.backgroundColor, currentIsDark, true, true);
    var themeAsJson = ThemeGenerator.getThemeAsJson(themeRules);
    var generatedTheme = createTheme({
        palette: themeAsJson,
        isInverted: currentIsDark,
    });
    return generatedTheme;
};
//# sourceMappingURL=VariantThemeProviderHelpers.js.map