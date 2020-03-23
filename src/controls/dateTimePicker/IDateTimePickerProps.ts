import { DayOfWeek } from 'office-ui-fabric-react/lib/utilities/dateValues/DateValues';
import { TimeConvention, DateConvention } from './DateTimeConventions';
import { IDateTimePickerStrings } from './IDateTimePickerStrings';
import { TimeDisplayControlType } from './TimeDisplayControlType';

/**
 * Public properties of the DateTimePicker custom field
 *
 */
export interface IDateTimePickerProps {

  /**
   * Property field label displayed on top
   */
  label?: string;
  /**
   * Specify if the control needs to be disabled
   */
  disabled?: boolean;
  /**
   * Defines a formatDate function to display the date of the custom Field.
   * By defaut date.toDateString() is used.
   */
  formatDate?: (date: Date) => string;
  /**
   * Defines the date convention to use. The default is date and time.
   */
  dateConvention?: DateConvention;
  /**
   * Defines the time convention to use. The default value is the 24-hour clock convention.
   */
  timeConvention?: TimeConvention;
  /**
   * Specify the first day of the week for your locale.
   */
  firstDayOfWeek?: DayOfWeek;
  /**
   * An UNIQUE key indicates the identity of this control
   */
  key?: string;
  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   *   When it returns string:
   *   - If valid, it returns empty string.
   *   - If invalid, it returns the error message string and the text field will
   *     show a red border and show an error message below the text field.
   *
   *   When it returns Promise<string>:
   *   - The resolved value is display as error message.
   *   - The rejected, the value is thrown away.
   *
   */
  onGetErrorMessage?: (value: Date) => string | Promise<string>;
  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;
  /**
   * Whether the "Go to today" link should be shown or not
   */
  showGoToToday?: boolean;
  /**
   * Whether the month picker is shown beside the day picker or hidden.
   * @defaultvalue true
   */
  isMonthPickerVisible?: boolean;
  /**
   * Show month picker on top of date picker when visible.
   * @defaultvalue false
   */
  showMonthPickerAsOverlay?: boolean;
  /**
   * Whether the calendar should show the week number (weeks 1 to 53) before each week row
   * @defaultvalue false
   */
  showWeekNumbers?: boolean;
  /**
   * Default value of the DatePicker, if any
   */
  value?: Date;
  /**
   * Callback issued when date/time is changed
   */
  onChange?: (date: Date | null | undefined) => void;
  /*
   * Localized strings to use in the DateTimePicker.
   */
  strings?: IDateTimePickerStrings;
  /**
   * Specifies, if seconds dropdown should be shown, defaults to false.
   */
  showSeconds?: boolean;

  /**
   * Specifies what type of control to use when rendering time part.
   */
  timeDisplayControlType?: TimeDisplayControlType;

  /**
   * Specify if labels in front of date and time parts should be rendered. True by default
   */
  showLabels?: boolean;
  
  /**
   * Placeholder text for the DatePicker
   */
  placeholder?: string;
}
