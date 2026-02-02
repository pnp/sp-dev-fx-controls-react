import * as React from 'react';
import { ECalendarViews } from './models/ECalendarViews';
interface ToolbarProps {
    selectedView: ECalendarViews;
    onSelectedView: (view: ECalendarViews) => void;
    currentDate: Date;
    setCurrentDate: (date: Date) => void;
    onWeekChange: (date: Date) => void;
    onMonthChange: (date: Date) => void;
    onDayChange: (date: Date) => void;
}
export declare const Toolbar: React.FC<ToolbarProps>;
export default Toolbar;
//# sourceMappingURL=Toolbar.d.ts.map