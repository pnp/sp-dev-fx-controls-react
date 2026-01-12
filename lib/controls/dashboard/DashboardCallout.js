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
import * as React from "react";
import { Popup, Button, MoreIcon, Menu, mergeThemes, Provider as FluentUIThemeProvider, EyeSlashIcon, } from "@fluentui/react-northstar";
var getLocalTheme = function () {
    return {
        componentVariables: {
            PopupContent: function (_a) {
                var colorScheme = _a.colorScheme, borderRadius = _a.borderRadius, borderWidth = _a.borderWidth, shadowLevel1 = _a.shadowLevel1, shadowLevel4 = _a.shadowLevel4, theme = _a.theme;
                return {
                    backgroundColor: colorScheme.grey.background,
                    backgroundColorHover: colorScheme.grey.background,
                    boxShadow: "".concat(shadowLevel1, ", ").concat(shadowLevel4),
                    borderRadius: borderRadius,
                    borderSize: borderWidth,
                    borderColor: theme === "teamsHighContrastTheme"
                        ? colorScheme.grey.background2
                        : "transparent",
                    borderColorHover: theme === "teamsHighContrastTheme"
                        ? colorScheme.grey.background2
                        : "transparent",
                };
            },
        },
        componentStyles: {
            Menu: {
                root: {
                    width: "100%",
                    marginRight: "0",
                    marginLeft: "0",
                    border: "none",
                    padding: "0 0.25rem",
                },
            },
            MenuDivider: {
                root: { margin: "0.25rem 0" },
            },
            PopupContent: {
                content: {
                    width: "12.5rem",
                    padding: "0",
                    boxShadow: " 0px 1.2px 3.6px rgba(0, 0, 0, 0.11), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)",
                },
            },
        },
    };
};
export var DashboardCallout = function (_a) {
    var open = _a.open, onOpenChange = _a.onOpenChange, menuProps = _a.menuProps, globalTheme = _a.globalTheme, widgetActionGroup = _a.widgetActionGroup, actionHandlers = _a.actionHandlers;
    var theme = mergeThemes(globalTheme, getLocalTheme());
    var getMenuItems = function () {
        var result = []; // eslint-disable-line @typescript-eslint/no-explicit-any
        if (widgetActionGroup) {
            result.push.apply(result, widgetActionGroup.map(function (widgetAction) {
                return __assign(__assign({}, widgetAction), { key: widgetAction.id, content: widgetAction.title });
            }));
        }
        if (actionHandlers && !actionHandlers.hideHideButton) {
            if (result.length > 0) {
                result.push({ kind: "divider" });
            }
            result.push({
                id: "hide_widget",
                content: "Hide widget",
                onClick: actionHandlers.onHide,
                icon: React.createElement(EyeSlashIcon, null),
            });
        }
        return result;
    };
    var items = getMenuItems();
    if (items.length === 0) {
        return null;
    }
    return (React.createElement(FluentUIThemeProvider, { theme: theme },
        React.createElement(Popup, __assign({}, menuProps, { open: open, onOpenChange: onOpenChange, trigger: React.createElement(Button, { text: true, iconOnly: true, "aria-label": "More actions", icon: React.createElement(MoreIcon, null), styles: {
                    margin: "0 -0.35rem",
                } }), content: {
                styles: { width: "12.5rem" },
                content: (React.createElement(Menu, { items: items, vertical: true })),
            }, trapFocus: {
                firstFocusableSelector: ".extended-toolbar__filters-menu__tree [data-is-focusable=true]",
            } }))));
};
//# sourceMappingURL=DashboardCallout.js.map