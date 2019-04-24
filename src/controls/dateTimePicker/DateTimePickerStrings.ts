import * as strings from 'ControlStrings';
import { IDateTimePickerStrings } from '.';

/**
 * Defines the labels of the DatePicker control (as months, days, etc.)
 */
export class DateTimePickerStrings implements IDateTimePickerStrings {
  /**
   * An array of strings for the full names of months.
   * The array is 0-based, so months[0] should be the full name of January.
   */
  public months: string[] = [
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
  public shortMonths: string[] = [
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
  public days: string[] = [
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
  public shortDays: string[] = [
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
  public goToToday: string = strings.DatePickerGoToToday;
  /**
   * Error message to render for TextField if isRequired validation fails.
   */
  public isRequiredErrorMessage: string = strings.DatePickerIsRequiredErrorMessage;
  /**
   * Error message to render for TextField if input date string parsing fails.
   */
  public invalidInputErrorMessage: string = strings.DatePickerInvalidInputErrorMessage;
  /**
   * Error message to render for TextField if date boundary (minDate, maxDate) validation fails.
   */
  public isOutOfBoundsErrorMessage: string = strings.DatePickerIsOutOfBoundsErrorMessage;
  /**
   * Label for the date selector.
   */
  public dateLabel: string = strings.DateTimePickerDate;
  /**
   * Label for the time of day selector.
   */
  public timeLabel: string = strings.DateTimePickerTime;
  /**
   * Separator between time of day components (hours, minutes, seconds).
   */
  public timeSeparator: string = strings.DateTimePickerTimeSeparator;
}
