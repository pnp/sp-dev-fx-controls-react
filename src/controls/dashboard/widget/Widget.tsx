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
}): JSX.Element => {
    const cardStyle = {
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
            break
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
