export interface IUseCalendarStyles {
    styles: ICalendarStyles;
    applyEventHouverColorClass: (backgroundColor: string, houverColor: string) => string;
}
export interface ICalendarStyles {
    calendarWrapper: string;
    header: string;
    dayHeader: string;
    day: string;
    otherMonthDay: string;
    cardDay: string;
    cardDayOnHover: string;
    currentDay: string;
    currentDayLabel: string;
    eventCard: string;
    eventContainer: string;
    eventCardWeekView: string;
    popoverContent: string;
}
export declare const useCalendarStyles: () => IUseCalendarStyles;
//# sourceMappingURL=useCalendarStyles.d.ts.map