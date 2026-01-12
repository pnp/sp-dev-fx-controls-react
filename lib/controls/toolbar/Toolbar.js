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
import omit from "lodash/omit";
import { Box, ProviderConsumer as FluentUIThemeConsumer, Toolbar as FluentUIToolbar, teamsTheme, } from "@fluentui/react-northstar";
import { ToolbarFilter } from "./ToolbarFilter";
import { ToolbarFind } from "./ToolbarFind";
import { ToolbarTheme } from "./ToolbarTheme";
import "./toolbar.css";
import { InFlowToolbarItem, toolbarMenuProps } from "./InFlowToolbarItem";
import styles from "./Toolbar.module.scss";
import { flattenedActions, getInFlowToolbarItems, getOverflowToolbarItems } from "./ToolbarActionsUtils";
import { useTelemetry } from "../../common/telemetry";
import { Icon } from "@fluentui/react/lib/Icon";
export var Toolbar = function (props) {
    var actionGroups = props.actionGroups, filters = props.filters, selectedFilterIds = props.selectedFilterIds, filtersSingleSelect = props.filtersSingleSelect, find = props.find;
    var allActions = flattenedActions(actionGroups);
    var _a = React.useState(false), overflowOpen = _a[0], setOverflowOpen = _a[1];
    var _b = React.useState(false), filtersOpen = _b[0], setFiltersOpen = _b[1];
    var _c = React.useState("compact"), layout = _c[0], setLayout = _c[1];
    var _d = React.useState(false), findActive = _d[0], setFindActive = _d[1];
    var layoutQuery = React.useRef(null);
    var onChangeLayout = function () {
        setLayout(layoutQuery.current && layoutQuery.current.matches ? "verbose" : "compact");
    };
    useTelemetry('ReactToolbar');
    React.useLayoutEffect(function () {
        layoutQuery.current = window.matchMedia("(min-width: 640px)");
        layoutQuery.current.addEventListener("change", onChangeLayout);
        onChangeLayout();
        return function () {
            if (layoutQuery.current) {
                layoutQuery.current.removeEventListener("change", onChangeLayout);
            }
        };
    });
    var inFlowToolbarItems = getInFlowToolbarItems(allActions, function (action) { return React.createElement(InFlowToolbarItem, { action: action, layout: layout }); });
    var overflowToolbarItems = getOverflowToolbarItems(allActions, function (action) { return React.createElement(Icon, { iconName: action.iconName }); });
    var displayFindOnly = find && layout === "compact" && findActive;
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            if (!globalTheme || globalTheme.fontFaces.length === 0) {
                globalTheme = teamsTheme;
            }
            return React.createElement(ToolbarTheme, { globalTheme: globalTheme },
                React.createElement(Box, __assign({ className: "extended-toolbar", variables: function (_a) {
                        var colorScheme = _a.colorScheme, theme = _a.theme;
                        return ({
                            backgroundColor: theme === "teamsHighContrastTheme"
                                ? colorScheme.grey.background
                                : colorScheme.grey.background2,
                            elevation: colorScheme.elevations[16],
                        });
                    }, styles: {
                        padding: "0 1.25rem",
                        marginBottom: "1.25rem",
                        display: "flex",
                        justifyContent: "space-between",
                    } }, omit(props, [
                    "actionGroups",
                    "filters",
                    "find",
                    "filtersSingleSelect",
                    "onSelectedFiltersChange",
                    "onFindQueryChange",
                ])),
                    !displayFindOnly && (React.createElement(FluentUIToolbar, { "aria-label": "Extended toolbar", className: "extended-toolbar__near-side " + styles.toolbarButtonStyles, items: inFlowToolbarItems, overflow: true, overflowOpen: overflowOpen, overflowItem: {
                            title: "More",
                            menu: toolbarMenuProps,
                        }, onOverflowOpenChange: function (event, changeProps) {
                            if (changeProps && changeProps.overflowOpen) {
                                setOverflowOpen(changeProps.overflowOpen);
                                if (changeProps.overflowOpen) {
                                    setFiltersOpen(false);
                                }
                            }
                            else {
                                setOverflowOpen(false);
                            }
                        }, getOverflowItems: function (startIndex) {
                            return overflowToolbarItems.slice(startIndex);
                        }, styles: {
                            flex: "1 0 0",
                            overflow: "hidden",
                            maxWidth: "40rem",
                            minWidth: "2rem",
                        } })),
                    React.createElement(Box, { className: "extended-toolbar__far-side", styles: {
                            flex: displayFindOnly ? "1 1 100%" : "0 1 auto",
                            display: "flex",
                            flexFlow: "row nowrap",
                            overflow: "hidden",
                            paddingLeft: displayFindOnly ? "0" : "2.5rem",
                        } },
                        !displayFindOnly && filters && (React.createElement(ToolbarFilter, { layout: layout, filters: filters, selectedFilterIds: selectedFilterIds, singleSelect: !!filtersSingleSelect, open: filtersOpen, onOpenChange: function (_e, changeProps) {
                                if (changeProps.open) {
                                    setFiltersOpen(changeProps.open);
                                    setOverflowOpen(false);
                                }
                                else {
                                    setFiltersOpen(false);
                                    setOverflowOpen(false);
                                }
                            }, onSelectedFiltersChange: props.onSelectedFiltersChange, toolbarMenuProps: toolbarMenuProps })),
                        find && (React.createElement(ToolbarFind, { layout: layout, findActive: findActive, setFindActive: setFindActive, onFindQueryChange: props.onFindQueryChange })))));
        } }));
};
//# sourceMappingURL=Toolbar.js.map