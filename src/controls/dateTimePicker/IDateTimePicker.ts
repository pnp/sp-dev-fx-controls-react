import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { DayOfWeek } from 'office-ui-fabric-react/lib/utilities/dateValues/DateValues';
import { IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';

/**
  * Time convention
  */
export enum TimeConvention {

    /**
     * The 12-hour clock is a time convention in which the 24 hours of the day are
     * divided into two periods: a.m. and p.m.
     */
    Hours12 = 1,
    /**
     * The 24-hour clock is the convention of time keeping in which the day runs from midnight to
     * midnight and is divided into 24 hours, indicated by the hours passed since midnight, from 0 to 23
     */
    Hours24
}

/**
  * Time convention
  */
export enum DateConvention {

    DateTime = 1,
    Date
}

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
     * Initial date of the control
     */
    initialDate?: Date;
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
     * Specifies the first day of the week for your locale.
     */
    firstDayOfWeek?: DayOfWeek;

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
     * On value change handler.
     */
    onChange: (newValue?: Date) => void;

    /**
     * Localized strings to use in the DatePicker.
     */
    datePickerStrings?: IDatePickerStrings;

    /**
     * Specifies, if seconds dropdown should be shown.
     */
    showSeconds?: boolean;

    /**
     * The maximum allowable date.
     */
    maxDate?: Date;
    /**
     * The minimum allowable date.
     */
    minDate?: Date;
}

/**
 * PropertyFieldDateTimePickerHost state interface
 */
export interface IDateTimePickerState {

    day?: Date;
    hours?: number;
    minutes?: number;
    seconds?: number;
    errorMessage?: string;
}


/**
 * Time component properties interface
 */
export interface ITimeComponentProps {

    disabled?: boolean;
    value: number;
    onChange: (value?: IDropdownOption) => void;
}

/**
 * Hours component property interface
 */
export interface IHoursComponentProps extends ITimeComponentProps {

    timeConvention: TimeConvention;
}