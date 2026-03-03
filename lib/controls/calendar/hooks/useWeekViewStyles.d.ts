interface WeekViewStyles {
    container: string;
    header: string;
    weekGrid: string;
    blankHeader: string;
    timeColumn: string;
    timeCell: string;
    fullDayRow: string;
    fullDayLabel: string;
    fullDayCell: string;
    fullDayEvent: string;
    dayHeaderCell: string;
    todayHeaderCell: string;
    eventCard: string;
    event: string;
    dayCell: string;
    currentTimeIndicator: string;
    currentHalfHourCell: string;
    eventTitle: string;
    popoverContent: string;
}
interface UseWeekViewStyles {
    styles: WeekViewStyles;
    applyEventHouverColorClass: (backgroundColor: string, hoverColor: string) => string;
    appyDynamicStyles: (eventIndex: number, eventCount: number, rowHeight: number, spanSlots: number) => string;
}
export declare const useWeekViewStyles: () => UseWeekViewStyles;
export {};
//# sourceMappingURL=useWeekViewStyles.d.ts.map