import { Card, Text, Flex } from "@fluentui/react-northstar";
import * as React from "react";
import * as strings from 'ControlStrings';
export var WidgetFooter = function (_a) {
    var _b, _c, _d;
    var widget = _a.widget;
    return (React.createElement(Card.Footer, { fitted: true },
        React.createElement(Flex, { space: "between", vAlign: "center" },
            React.createElement(Text, { as: "a", href: widget.link.href, target: (_b = widget.link.target) !== null && _b !== void 0 ? _b : "_blank", content: (_c = widget.link.title) !== null && _c !== void 0 ? _c : strings.ViewMore, size: "small", color: (_d = widget.link.color) !== null && _d !== void 0 ? _d : "default", style: { textDecoration: "none" } }))));
};
//# sourceMappingURL=WidgetFooter.js.map