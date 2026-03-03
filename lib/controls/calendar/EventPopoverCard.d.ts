import * as React from "react";
import { IEvent } from "./models/IEvents";
interface EventPopoverCardProps {
    event: IEvent;
    colors: {
        backgroundColor: string;
        hoverColor: string;
    };
    spanSlots: number;
    rowHeight: number;
    eventIndex: number;
    eventCount: number;
}
export declare const EventPopoverCard: React.FC<EventPopoverCardProps>;
export {};
//# sourceMappingURL=EventPopoverCard.d.ts.map