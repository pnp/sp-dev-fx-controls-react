import * as React from "react";
import { IEvent } from "./models/IEvents";
export interface IRenderEventToDayOfMonthProps {
    events: IEvent[];
    date: Date;
    onCardHoverChange?: (isHovered: boolean, eventTitle: string) => void;
    columnHeight: number;
}
export declare const RenderEventToDayOfMonth: React.FunctionComponent<IRenderEventToDayOfMonthProps>;
//# sourceMappingURL=RenderEventToDayOfMonth.d.ts.map