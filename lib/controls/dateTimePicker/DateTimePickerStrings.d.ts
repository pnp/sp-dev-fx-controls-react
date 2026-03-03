import { IDateTimePickerStrings } from '.';
/**
 * Defines the labels of the DatePicker control (as months, days, etc.)
 */
export declare class DateTimePickerStrings implements IDateTimePickerStrings {
    /**
     * An array of strings for the full names of months.
     * The array is 0-based, so months[0] should be the full name of January.
     */
    months: string[];
    /**
     * An array of strings for the short names of months.
     * The array is 0-based, so shortMonths[0] should be the short name of January.
     */
    shortMonths: string[];
    /**
     * An array of strings for the full names of days of the week.
     * The array is 0-based, so days[0] should be the full name of Sunday.
     */
    days: string[];
    /**
     * An array of strings for the initials of the days of the week.
     * The array is 0-based, so days[0] should be the initial of Sunday.
     */
    shortDays: string[];
    /**
     * String to render for button to direct the user to today's date.
     */
    goToToday: string;
    /**
     * Error message to render for TextField if isRequired validation fails.
     */
    isRequiredErrorMessage: string;
    /**
     * Error message to render for TextField if input date string parsing fails.
     */
    invalidInputErrorMessage: string;
    /**
     * Error message to render for TextField if date boundary (minDate, maxDate) validation fails.
     */
    isOutOfBoundsErrorMessage: string;
    /**
     * Label for the date selector.
     */
    dateLabel: string;
    /**
     * Label for the time of day selector.
     */
    timeLabel: string;
    /**
     * Separator between time of day components (hours, minutes, seconds).
     */
    timeSeparator: string;
    /**
     * error message when text is entered in the date picker
     */
    textErrorMessage: string;
}
//# sourceMappingURL=DateTimePickerStrings.d.ts.map