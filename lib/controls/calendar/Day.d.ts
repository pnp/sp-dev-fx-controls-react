import * as React from 'react';
import { IEvent } from './models/IEvents';
export interface IDayProps {
    day: number;
    date: Date;
    currentMonth: boolean;
    events: IEvent[];
    columnHeight: number;
    onDayClick?: (date: Date) => void;
}
export declare const Day: React.FunctionComponent<IDayProps>;
//# sourceMappingURL=Day.d.ts.map