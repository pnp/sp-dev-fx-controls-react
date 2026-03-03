import * as React from 'react';
import { IEvent } from './models/IEvents';
interface IEventRendererProps {
    event: IEvent;
    eventCount: number;
    spanSlots: number;
    rowHeight: number;
    eventIndex: number;
    view: 'day' | 'week';
}
export declare const EventRenderer: React.FC<IEventRendererProps>;
export {};
//# sourceMappingURL=EventRender.d.ts.map