import { Card, Flex, Text } from "@fluentui/react-northstar";
import * as React from "react";
import { DashboardCallout } from "../DashboardCallout";
export var WidgetTitle = function (_a) {
    var widget = _a.widget, globalTheme = _a.globalTheme, allowHidingWidget = _a.allowHidingWidget, onWidgetHiding = _a.onWidgetHiding;
    var _b = React.useState(false), calloutOpen = _b[0], setCalloutOpen = _b[1];
    return (React.createElement(Card.Header, null,
        React.createElement(Flex, { gap: "gap.small", space: "between", style: { minHeight: "2rem" } },
            React.createElement(Flex, { gap: "gap.small", column: true },
                React.createElement(Text, { content: widget.title, style: { margin: 0 }, weight: "bold" }),
                widget.desc && React.createElement(Text, { content: widget.desc, size: "small" })),
            React.createElement(DashboardCallout, { open: calloutOpen, globalTheme: globalTheme, onOpenChange: function (_a, props) {
                    var currentTarget = _a.currentTarget;
                    if (props && props.open) {
                        setCalloutOpen(props.open);
                    }
                    else {
                        setCalloutOpen(false);
                    }
                }, menuProps: {
                    offset: [0, 0],
                    position: "below",
                }, actionHandlers: {
                    hideHideButton: !allowHidingWidget,
                    onHide: function () {
                        onWidgetHiding(widget);
                    }
                }, widgetActionGroup: widget.widgetActionGroup }))));
};
//# sourceMappingURL=WidgetTitle.js.map