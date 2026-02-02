import * as React from "react";
import { Card } from "@fluentui/react-northstar";
import { WidgetSize } from "./IWidget";
export var Widget = function (_a) {
    var children = _a.children, widget = _a.widget;
    var cardStyle = {
        gridColumnEnd: "auto",
        gridRowEnd: "auto",
        "@media (max-width: 842px)": {
            gridColumnEnd: "span 4",
        },
    };
    switch (widget.size) {
        case WidgetSize.Double:
            cardStyle.gridColumnEnd = "span 2";
            break;
        case WidgetSize.Box:
            cardStyle.gridColumnEnd = "span 2";
            cardStyle.gridRowEnd = "span 2";
            break;
        case WidgetSize.Triple:
            cardStyle.gridColumnEnd = "span 3";
            break;
        case WidgetSize.Quadruple:
            cardStyle.gridColumnEnd = "span 4";
            break;
    }
    // Support vertical extension via rowSpan
    if (widget.rowSpan && widget.rowSpan > 1) {
        cardStyle.gridRowEnd = "span ".concat(widget.rowSpan);
    }
    if (widget.controlOptions && widget.controlOptions.isHidden) {
        return null;
    }
    return (React.createElement(Card, { styles: cardStyle, fluid: true }, children));
};
//# sourceMappingURL=Widget.js.map