import { Box, Card, Flex, Menu, tabListBehavior } from "@fluentui/react-northstar";
import * as React from "react";
var EmptyState = function (_a) {
    var borderColor = _a.borderColor;
    return (React.createElement(Box, { styles: {
            height: "100%",
            border: "1px dashed ".concat(borderColor),
        } }));
};
export var WidgetBody = function (_a) {
    var widget = _a.widget, siteVariables = _a.siteVariables;
    var _b = React.useState(0), activeTabId = _b[0], setActiveTabId = _b[1];
    return (React.createElement(Card.Body, { style: {
            marginBottom: "0.75rem",
            height: "100%",
            overflow: "hidden",
        }, fitted: true }, widget.body ? (React.createElement(React.Fragment, null,
        widget.body.length > 1 && (React.createElement(Menu, { style: {
                border: "none",
                background: "none",
                marginBottom: "1.25rem",
            }, items: Array.from(widget.body, function (_a) {
                var id = _a.id, title = _a.title;
                return Object.assign({ key: id, content: title });
            }), activeIndex: activeTabId, onItemClick: function (_a, props) {
                var currentTarget = _a.currentTarget;
                return setActiveTabId(props && props.index ? props.index : 0);
            }, accessibility: tabListBehavior, underlined: true, primary: true })),
        widget.body.map(function (_a, i) {
            var id = _a.id, content = _a.content;
            return (React.createElement(Flex, { key: id, styles: {
                    height: "100%",
                    display: activeTabId === i ? "flex" : "none",
                }, column: true }, content));
        }))) : (React.createElement(EmptyState, { borderColor: siteVariables.colors.grey["300"] }))));
};
//# sourceMappingURL=WidgetBody.js.map