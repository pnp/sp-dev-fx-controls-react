import { IData } from "./IData";
import React from "react";

export interface IMarker {
    markerClassName?: string;
    markerStyle?: React.CSSProperties;
    renderToolTip?: (c: IData) => React.ReactNode;
    tooltipClassName?: string;
    tooltipStyle?: React.CSSProperties;
}
