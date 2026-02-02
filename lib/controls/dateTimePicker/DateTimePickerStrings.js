import * as strings from 'ControlStrings';
/**
 * Defines the labels of the DatePicker control (as months, days, etc.)
 */
var DateTimePickerStrings = /** @class */ (function () {
    function DateTimePickerStrings() {
        /**
         * An array of strings for the full names of months.
         * The array is 0-based, so months[0] should be the full name of January.
         */
        this.months = [
            strings.DatePickerMonthLongJanuary,
            strings.DatePickerMonthLongFebruary,
            strings.DatePickerMonthLongMarch,
            strings.DatePickerMonthLongApril,
            strings.DatePickerMonthLongMay,
            strings.DatePickerMonthLongJune,
            strings.DatePickerMonthLongJuly,
            strings.DatePickerMonthLongAugust,
            strings.DatePickerMonthLongSeptember,
            strings.DatePickerMonthLongOctober,
            strings.DatePickerMonthLongNovember,
            strings.DatePickerMonthLongDecember
        ];
        /**
         * An array of strings for the short names of months.
         * The array is 0-based, so shortMonths[0] should be the short name of January.
         */
        this.shortMonths = [
            strings.DatePickerMonthShortJanuary,
            strings.DatePickerMonthShortFebruary,
            strings.DatePickerMonthShortMarch,
            strings.DatePickerMonthShortApril,
            strings.DatePickerMonthShortMay,
            strings.DatePickerMonthShortJune,
            strings.DatePickerMonthShortJuly,
            strings.DatePickerMonthShortAugust,
            strings.DatePickerMonthShortSeptember,
            strings.DatePickerMonthShortOctober,
            strings.DatePickerMonthShortNovember,
            strings.DatePickerMonthShortDecember
        ];
        /**
         * An array of strings for the full names of days of the week.
         * The array is 0-based, so days[0] should be the full name of Sunday.
         */
        this.days = [
            strings.DatePickerDayLongSunday,
            strings.DatePickerDayLongMonday,
            strings.DatePickerDayLongTuesday,
            strings.DatePickerDayLongWednesday,
            strings.DatePickerDayLongThursday,
            strings.DatePickerDayLongFriday,
            strings.DatePickerDayLongSaturday
        ];
        /**
         * An array of strings for the initials of the days of the week.
         * The array is 0-based, so days[0] should be the initial of Sunday.
         */
        this.shortDays = [
            strings.DatePickerDayShortSunday,
            strings.DatePickerDayShortMonday,
            strings.DatePickerDayShortTuesday,
            strings.DatePickerDayShortWednesday,
            strings.DatePickerDayShortThursday,
            strings.DatePickerDayShortFriday,
            strings.DatePickerDayShortSaturday
        ];
        /**
         * String to render for button to direct the user to today's date.
         */
        this.goToToday = strings.DatePickerGoToToday;
        /**
         * Error message to render for TextField if isRequired validation fails.
         */
        this.isRequiredErrorMessage = strings.DatePickerIsRequiredErrorMessage;
        /**
         * Error message to render for TextField if input date string parsing fails.
         */
        this.invalidInputErrorMessage = strings.DatePickerInvalidInputErrorMessage;
        /**
         * Error message to render for TextField if date boundary (minDate, maxDate) validation fails.
         */
        this.isOutOfBoundsErrorMessage = strings.DatePickerIsOutOfBoundsErrorMessage;
        /**
         * Label for the date selector.
         */
        this.dateLabel = strings.DateTimePickerDate;
        /**
         * Label for the time of day selector.
         */
        this.timeLabel = strings.DateTimePickerTime;
        /**
         * Separator between time of day components (hours, minutes, seconds).
         */
        this.timeSeparator = strings.DateTimePickerTimeSeparator;
        /**
         * error message when text is entered in the date picker
         */
        this.textErrorMessage = strings.DateTimePickerTextErrorMessage;
    }
    return DateTimePickerStrings;
}());
export { DateTimePickerStrings };
//# sourceMappingURL=DateTimePickerStrings.js.map