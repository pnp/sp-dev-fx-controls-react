import { getNeutralVariant, getSoftVariant, getStrongVariant } from "@fluentui/scheme-utilities/lib/variants";
import { getColorFromString, isDark } from "@fluentui/react/lib/Color";
import { createTheme, getTheme, IPartialTheme, ITheme } from "@fluentui/react/lib/Styling";
import { BaseSlots, ThemeGenerator, themeRulesStandardCreator } from "@fluentui/react/lib/ThemeGenerator";
import { VariantType } from "./VariantThemeProviderProps";

export const generateThemeVariant = (theme: IPartialTheme | ITheme, themeType: VariantType): IPartialTheme | ITheme => {
    let currentTheme: IPartialTheme | ITheme;

    switch (themeType) {
        case VariantType.None: currentTheme = theme;
            break;
        case VariantType.Neutral: currentTheme = getNeutralVariant(theme);
            break;
        case VariantType.Soft: currentTheme = getSoftVariant(theme);
            break;
        case VariantType.Strong: currentTheme = getStrongVariant(theme);
            break;
        default: currentTheme = theme;
            break;
    }

    return currentTheme;
};

export const getDefaultTheme = (): ITheme => {
    let currentTheme;
    const themeColorsFromWindow: any = (window as any)?.__themeState__?.theme; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (themeColorsFromWindow) {
        currentTheme = createTheme({
            palette: themeColorsFromWindow
        });
    }
    else
        currentTheme = getTheme();

    return currentTheme;
};

export const generateThemeFromColors = (primaryColor: string, textColor: string, backgroundColor: string): ITheme => {
    const themeRules = themeRulesStandardCreator();
    const colors = {
        primaryColor: getColorFromString(primaryColor),
        textColor: getColorFromString(textColor),
        backgroundColor: getColorFromString(backgroundColor),
    };
    const currentIsDark = isDark(themeRules[BaseSlots[BaseSlots.backgroundColor]].color);

    ThemeGenerator.insureSlots(themeRules, currentIsDark);
    ThemeGenerator.setSlot(
        themeRules[BaseSlots[BaseSlots.primaryColor]],
        colors.primaryColor,
        currentIsDark,
        true,
        true
    );
    ThemeGenerator.setSlot(
        themeRules[BaseSlots[BaseSlots.foregroundColor]],
        colors.textColor,
        currentIsDark,
        true,
        true
    );
    ThemeGenerator.setSlot(
        themeRules[BaseSlots[BaseSlots.backgroundColor]],
        colors.backgroundColor,
        currentIsDark,
        true,
        true
    );

    const themeAsJson: { [key: string]: string; } = ThemeGenerator.getThemeAsJson(themeRules);
    const generatedTheme = createTheme({
        palette: themeAsJson,
        isInverted: currentIsDark,
    });

    return generatedTheme;
};
