import * as React from 'react';
import { IEvent } from './models/IEvents';
export interface IDayViewProps {
    events: IEvent[];
    currentDay: Date;
    height?: string | number;
}
export declare const DayView: React.FC<IDayViewProps>;
export default DayView;
//# sourceMappingURL=DayView.d.ts.map