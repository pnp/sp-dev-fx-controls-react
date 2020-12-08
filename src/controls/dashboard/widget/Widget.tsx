import * as React from "react";
import {
    Card
} from "@fluentui/react-northstar";
import { IWidget, WidgetSize } from "./IWidget";

export const Widget = ({
    children,
    widget,
}: {
    children: React.ReactNode;
    widget: IWidget;
}) => {
    const cardStyle = {
        gridColumnEnd: "auto",
        gridRowEnd: "auto",
        "@media (max-width: 842px)": {
            gridColumnEnd: "span 3",
        },
    };
    if (widget.size === WidgetSize.Double) {
        cardStyle.gridColumnEnd = "span 2";
    }
    if (widget.size === WidgetSize.Box) {
        cardStyle.gridColumnEnd = "span 2";
        cardStyle.gridRowEnd = "span 2";
    }
    if (widget.size === WidgetSize.Triple) {
        cardStyle.gridColumnEnd = "span 3";
    }
    if(widget.controlOptions && widget.controlOptions.isHidden){
        return null;
    }
    return (
        <Card styles={cardStyle} fluid>
            {children}
        </Card>
    );
};
