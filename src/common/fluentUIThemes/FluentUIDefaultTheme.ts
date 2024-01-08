import { Theme } from "@fluentui/theme";
import { createTheme, getTheme, IPalette, ITheme } from "@fluentui/react/lib/Styling";

export const fluentUIDefaultTheme = (): ITheme => {
    let currentTheme: Theme;
    const themeColorsFromWindow: Partial<IPalette> = window.__themeState__.theme;
    if (themeColorsFromWindow) {
        currentTheme = createTheme({
            palette: themeColorsFromWindow
        });
    }
    else
        currentTheme = getTheme();

    return currentTheme;
};
