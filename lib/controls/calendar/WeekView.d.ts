import * as React from 'react';
import { IEvent } from './models/IEvents';
export interface IWeekViewProps {
    events: IEvent[];
    currentDay: Date;
    height?: string | number;
}
export declare const WeekView: React.FC<IWeekViewProps>;
export default WeekView;
//# sourceMappingURL=WeekView.d.ts.map