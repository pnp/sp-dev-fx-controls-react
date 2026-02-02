import * as React from "react";
import { Provider as FluentUIThemeProvider, mergeThemes, } from "@fluentui/react-northstar";
var getLocalTheme = function () {
    return {
        componentVariables: {
            Card: function (_a) {
                var colorScheme = _a.colorScheme, borderRadius = _a.borderRadius, borderWidth = _a.borderWidth, shadowLevel1 = _a.shadowLevel1, theme = _a.theme;
                return {
                    backgroundColor: colorScheme.grey.background,
                    backgroundColorHover: colorScheme.grey.background,
                    boxShadow: shadowLevel1,
                    boxShadowHover: shadowLevel1,
                    borderRadius: borderRadius,
                    borderSize: borderWidth,
                    borderColor: theme === "teamsHighContrastTheme"
                        ? colorScheme.grey.backgroundFocus
                        : "transparent",
                    borderColorHover: theme === "teamsHighContrastTheme"
                        ? colorScheme.grey.backgroundFocus
                        : "transparent",
                };
            },
            Menu: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    color: colorScheme.default.foreground2,
                });
            },
        },
        componentStyles: {
            Menu: {
                root: {
                    marginLeft: "-0.25rem",
                    marginRight: "-0.25rem",
                },
            },
        },
    };
};
export var DashboardTheme = function (_a) {
    var globalTheme = _a.globalTheme, children = _a.children;
    var theme = mergeThemes(globalTheme, getLocalTheme());
    return (React.createElement(FluentUIThemeProvider, { theme: theme, style: {
            minHeight: "100vh",
            backgroundColor: theme.siteVariables.theme === "teamsHighContrastTheme"
                ? theme.siteVariables.colorScheme.grey.background
                : theme.siteVariables.colorScheme.grey.background2,
        } }, children));
};
//# sourceMappingURL=DashboardTheme.js.map