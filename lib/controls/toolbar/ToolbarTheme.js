import * as React from "react";
import { Provider as FluentUIThemeProvider, mergeThemes, } from "@fluentui/react-northstar";
import { teamsNextVariableAssignments, themes } from "../../common/utilities/ThemeUtility";
var getLocalTheme = function (themeKey) {
    var buttonRootVariables = function (_a) {
        var colorScheme = _a.colorScheme, theme = _a.theme;
        var color = colorScheme.black.foreground;
        switch (theme) {
            case "teamsDarkTheme":
                color = colorScheme.grey.foreground;
                break;
            case "teamsHighContrastTheme":
                color = colorScheme.grey.foregroundHover;
                break;
        }
        return {
            color: color,
        };
    };
    var menuContentStyles = function (_a) {
        var theme = _a.theme;
        var _b = theme.siteVariables, siteThemeKey = _b.theme, colorScheme = _b.colorScheme;
        return {
            borderWidth: siteThemeKey === "teamsHighContrastTheme" ? "1px" : 0,
            boxShadow: colorScheme.elevations[8],
        };
    };
    return {
        componentVariables: {
            Button: buttonRootVariables,
            Input: function (_a) {
                var colors = _a.colors, colorScheme = _a.colorScheme, theme = _a.theme;
                return ({
                    backgroundColor: theme === "teamsDarkTheme"
                        ? colors.grey[750]
                        : colorScheme.black.background,
                });
            },
            ToolbarItem: buttonRootVariables,
            TreeItem: function (_a) {
                var colorScheme = _a.colorScheme, theme = _a.theme;
                return ({
                    color: theme === "teamsHighContrastTheme"
                        ? colorScheme.grey.backgroundFocus
                        : colorScheme.grey.background2,
                });
            },
            TreeTitle: function (_a) {
                var colorScheme = _a.colorScheme;
                return ({
                    color: colorScheme.grey.foreground,
                    // todo: set the hover color as well
                });
            },
        },
        componentStyles: {
            ButtonContent: {
                root: function (_a) {
                    var variables = _a.variables;
                    return ({
                        fontWeight: 400,
                    });
                },
            },
            Input: {
                input: {
                    width: "100%",
                },
            },
            PopupContent: {
                content: function (cvo) {
                    return Object.assign(menuContentStyles(cvo), { padding: 0 });
                },
            },
            ToolbarMenu: { root: menuContentStyles },
            TreeItem: {
                root: {
                    paddingLeft: 0,
                    position: "relative",
                    "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        right: ".25rem",
                        bottom: 0,
                        left: ".25rem",
                        background: "transparent",
                        borderRadius: "2px",
                    },
                    "&:hover::before": {
                        background: "currentColor",
                    },
                },
            },
        },
    };
};
export var ToolbarTheme = function (_a) {
    var globalTheme = _a.globalTheme, children = _a.children;
    var mainTheme = (globalTheme.siteVariables && globalTheme.siteVariables.theme)
        ? globalTheme
        : themes.teamsTheme;
    return (React.createElement(FluentUIThemeProvider, { theme: mergeThemes(mainTheme, mergeThemes(teamsNextVariableAssignments, getLocalTheme(globalTheme.siteVariables.theme))), styles: { background: "transparent" } }, children));
};
//# sourceMappingURL=ToolbarTheme.js.map