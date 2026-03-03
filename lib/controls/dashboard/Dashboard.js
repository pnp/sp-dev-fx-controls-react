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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from "react";
import { ProviderConsumer as FluentUIThemeConsumer, Box, teamsTheme, } from "@fluentui/react-northstar";
import { Widget, WidgetTitle, WidgetBody, WidgetFooter, } from "./widget/DashboardWidget";
import { DashboardTheme } from "./DashboardTheme";
import { Toolbar } from "../toolbar";
import styles from "./Dashboard.module.scss";
import { useTelemetry } from "../../common/telemetry";
export function Dashboard(_a) {
    var widgets = _a.widgets, allowHidingWidget = _a.allowHidingWidget, onWidgetHiding = _a.onWidgetHiding, toolbarProps = _a.toolbarProps, WidgetWrapperComponent = _a.WidgetContentWrapper;
    var _b = React.useState(widgets), stateWidgets = _b[0], setWidgets = _b[1];
    var widgetRenderer = WidgetWrapperComponent
        ? renderWidgetWithWrappedContent
        : renderWidget;
    useTelemetry("ReactDashboard", {});
    React.useEffect(function () {
        setWidgets(widgets);
    }, [widgets]);
    return (React.createElement(FluentUIThemeConsumer, { render: function (globalTheme) {
            if (!globalTheme || globalTheme.fontFaces.length === 0) {
                globalTheme = teamsTheme;
            }
            return (React.createElement(DashboardTheme, { globalTheme: globalTheme },
                toolbarProps && React.createElement(Toolbar, __assign({}, toolbarProps)),
                React.createElement(Box, { className: styles.dashboardBox }, stateWidgets && stateWidgets.map(widgetRenderer(globalTheme)))));
        } }));
    function renderWidgetWithWrappedContent(globalTheme // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
        return function (widget, key) {
            return (React.createElement(WidgetWrapperComponent, null, renderWidget(globalTheme)(widget, key)));
        };
    }
    function renderWidget(globalTheme // eslint-disable-line @typescript-eslint/no-explicit-any
    ) {
        return function (widget, key) { return (React.createElement(Widget, { key: key, widget: widget },
            React.createElement(WidgetTitle, { widget: widget, allowHidingWidget: allowHidingWidget, onWidgetHiding: function (hidingWidget) {
                    if (onWidgetHiding) {
                        onWidgetHiding(hidingWidget);
                    }
                    if (!hidingWidget.controlOptions) {
                        hidingWidget.controlOptions = {};
                    }
                    hidingWidget.controlOptions.isHidden = true;
                    setWidgets(__spreadArray([], widgets, true));
                }, globalTheme: globalTheme }),
            React.createElement(WidgetBody, { widget: widget, siteVariables: globalTheme.siteVariables }),
            widget.link && React.createElement(WidgetFooter, { widget: widget }))); };
    }
}
//# sourceMappingURL=Dashboard.js.map