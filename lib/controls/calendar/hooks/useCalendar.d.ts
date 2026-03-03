import { IEvent } from '../models/IEvents';
export interface TimeSlot {
    time: string;
    events: IEvent[];
}
export interface DayEvents {
    date: string;
    fullDayEvents: IEvent[];
    timeSlots: TimeSlot[];
}
export interface IUseCalendar {
    getMonthCalendar: (events: IEvent[], year: number, month: number) => Record<string, IEvent[]>;
    getWeekEvents: (events: IEvent[], startDate: string) => DayEvents[];
}
export declare const useCalendar: (timezone: string) => IUseCalendar;
export default useCalendar;
//# sourceMappingURL=useCalendar.d.ts.map