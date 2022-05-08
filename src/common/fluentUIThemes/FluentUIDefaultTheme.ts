import { createTheme, getTheme, ITheme } from "office-ui-fabric-react/lib/Styling";

export const fluentUIDefaultTheme = (): ITheme => {
    let currentTheme;
    const themeColorsFromWindow: any = (window as any).__themeState__.theme;
    if (themeColorsFromWindow) {
        currentTheme = createTheme({
            palette: themeColorsFromWindow
        });
    }
    else
        currentTheme = getTheme();

    return currentTheme;
};