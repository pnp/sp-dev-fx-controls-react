import * as React from 'react';
import { ECalendarViews } from './models/ECalendarViews';
export interface ISelectCalendarViewProps {
    onSelected: (view: ECalendarViews) => void;
    value?: ECalendarViews;
}
export declare const SelectCalendarView: React.FunctionComponent<ISelectCalendarViewProps>;
//# sourceMappingURL=SelectCalendarView.d.ts.map