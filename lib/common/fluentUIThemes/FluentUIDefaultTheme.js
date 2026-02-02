import { createTheme, getTheme } from "@fluentui/react/lib/Styling";
export var fluentUIDefaultTheme = function () {
    var currentTheme;
    var themeColorsFromWindow = window.__themeState__.theme;
    if (themeColorsFromWindow) {
        currentTheme = createTheme({
            palette: themeColorsFromWindow
        });
    }
    else
        currentTheme = getTheme();
    return currentTheme;
};
//# sourceMappingURL=FluentUIDefaultTheme.js.map