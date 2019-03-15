import * as React from "react";
import { isEqual } from '@microsoft/sp-lodash-subset';
import { TimeConvention, DateConvention } from "./DateTimeConventions";
import { DatePicker, IDatePickerStrings } from "office-ui-fabric-react/lib/DatePicker";
import { Label } from "office-ui-fabric-react/lib/Label";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import * as strings from "ControlStrings";
import { IDateTimePickerProps } from "./IDateTimePickerProps";
import { IDateTimePickerState } from "./IDateTimePickerState";
import FieldErrorMessage from "../errorMessage/FieldErrorMessage";
import styles from "./DateTimePicker.module.scss";
import HoursComponent from "./HoursComponent";
import MinutesComponent from "./MinutesComponent";
import SecondsComponent from "./SecondsComponent";
import * as telemetry from "../../common/telemetry";

/**
 * Defines the labels of the DatePicker control (as months, days, etc.)
 */
class DatePickerStrings implements IDatePickerStrings {
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
  public goToToday: string = strings.DatepickerGoToToday;
  /**
   * Error message to render for TextField if isRequired validation fails.
   */
  public isRequiredErrorMessage: string = "";
  /**
   * Error message to render for TextField if input date string parsing fails.
   */
  public invalidInputErrorMessage: string = "";
}

/**
 * Renders the controls for DateTimePicker component
 */
export class DateTimePicker extends React.Component<IDateTimePickerProps, IDateTimePickerState> {
  /**
   * Constructor
   */
  constructor(props: IDateTimePickerProps) {
    super(props);
    const dateConvention: DateConvention =
      typeof this.props.dateConvention !== "undefined" ? this.props.dateConvention : DateConvention.DateTime;
    telemetry.track("DateTimePicker", {
      dateConvention: dateConvention ? DateConvention[dateConvention] : "",
      formatDate: !!props.formatDate,
      timeConvention: props.timeConvention
        ? TimeConvention[props.timeConvention]
        : "",
      disabled: props.disabled
    });

    // Bind the current object to the external called onSelectDate method
    this._onSelectDate = this._onSelectDate.bind(this);
    this._dropdownHoursChanged = this._dropdownHoursChanged.bind(this);
    this._dropdownMinutesChanged = this._dropdownMinutesChanged.bind(this);
    this._dropdownSecondsChanged = this._dropdownSecondsChanged.bind(this);

    // Set the current date/time values
    const { value = null } = this.props;
    const day: Date | null = DateTimePicker.cloneDate(value);
    const hours = dateConvention === DateConvention.DateTime && day !== null ? day.getHours() : 0;
    const minutes = dateConvention === DateConvention.DateTime && day !== null ? day.getMinutes() : 0;
    const seconds = dateConvention === DateConvention.DateTime && day !== null ? day.getSeconds() : 0;

    // Set the current state
    this.state = {
      day,
      hours,
      minutes,
      seconds,
      errorMessage: ""
    };
  }

  /**
   * Function called when the DatePicker Office UI Fabric component selected date changed
   */
  private _onSelectDate(date: Date): void {
    if (!DateTimePicker.isValidDate(date)) {
      return;
    }
    // Get hours, minutes and seconds from state or default to zero
    const { hours = 0, minutes = 0, seconds = 0 } = this.state;
    const day = DateTimePicker.cloneDate(date);
    day.setHours(hours);
    day.setMinutes(minutes);
    day.setSeconds(seconds);
    this.setState({ day });
  }

  /**
   * Function called to check if the supplied value represents a valid date
   * @param value Value to check if it represents a valid Date object
   */
  private static isValidDate(value: any): value is Date {
    return Object.prototype.toString.call(value) === '[object Date]' && !isNaN(value.getTime());
  }

  private static cloneDate(date: Date): Date {
    return DateTimePicker.isValidDate(date) ? new Date(date.getTime()) : null;
  }

  /**
   * Function called when hours value have been changed
   * @param element Hours dropdown value
   */
  private _dropdownHoursChanged(element?: IDropdownOption): void {
    this.setState(({ day }) => {
      const hours: number = parseInt(element.key.toString());
      const state: Partial<IDateTimePickerState> = { hours };
      const date: Date = DateTimePicker.cloneDate(day);
      if (date) {
        date.setHours(hours);
        state.day = date;
      }
      return state;
    });
  }

  /**
   * Function called when minutes value have been changed
   * @param element Minutes dropdown value
   */
  private _dropdownMinutesChanged(element?: IDropdownOption): void {
    this.setState(({ day }) => {
      const minutes: number = parseInt(element.key.toString());
      const state: Partial<IDateTimePickerState> = { minutes };
      const date: Date = DateTimePicker.cloneDate(day);
      if (date) {
        date.setMinutes(minutes);
        state.day = date;
      }
      return state;
    });
  }

  /**
   * Function called when seconds value have been changed
   * @param element Seconds dropdown value
   */
  private _dropdownSecondsChanged(element?: IDropdownOption): void {
    this.setState(({ day }) => {
      const seconds: number = parseInt(element.key.toString());
      const state: Partial<IDateTimePickerState> = { seconds };
      const date: Date = DateTimePicker.cloneDate(day);
      if (date) {
        date.setSeconds(seconds);
        state.day = date;
      }
      return state;
    });
  }

  /**
   * Called when the component did updated, used for calling onChange handler if present
   */
  public componentDidUpdate(prevProps, prevState) {
    if (typeof this.props.onChange === 'function' && !isEqual(this.state.day, prevState.day)) {
      this.props.onChange(DateTimePicker.cloneDate(this.state.day));
    }
  }

  /**
   * Renders the control
   */
  public render(): JSX.Element {
    // use date value from props if it exists, otherwise use internal state
    // if no dateConvention is set, default is DateConvention.DateTime
    const {
      dateConvention = DateConvention.DateTime,
      isMonthPickerVisible = true,
      showGoToToday,
      showMonthPickerAsOverlay = false,
      showWeekNumbers = false,
      value = this.state.day
    } = this.props;

    const hours: number = value != null ? value.getHours() : this.state.hours;
    const minutes: number = value != null ? value.getMinutes() : this.state.minutes;
    const seconds: number = value != null ? value.getSeconds() : this.state.seconds;

    // Defines the DatePicker control labels
    const dateStrings: DatePickerStrings = new DatePickerStrings();

    // Check if the time element needs to be rendered
    let timeElm: JSX.Element = <tr />;

    if (dateConvention === DateConvention.DateTime) {
      timeElm = (
        <tr>
          <td className={styles.labelCell}>
            <Label className={styles.fieldLabel}>
              {strings.DateTimePickerTime}
            </Label>
          </td>
          <td>
            <table cellPadding="0" cellSpacing="0">
              <tbody>
                <tr>
                  <td>
                    <HoursComponent
                      disabled={this.props.disabled}
                      timeConvention={this.props.timeConvention}
                      value={hours}
                      onChange={this._dropdownHoursChanged}
                    />
                  </td>
                  <td className={styles.seperator}>
                    <Label>:</Label>
                  </td>
                  <td>
                    <MinutesComponent
                      disabled={this.props.disabled}
                      value={minutes}
                      onChange={this._dropdownMinutesChanged}
                    />
                  </td>
                  <td className={styles.seperator}>
                    <Label>:</Label>
                  </td>
                  <td>
                    <SecondsComponent
                      disabled={this.props.disabled}
                      value={seconds}
                      onChange={this._dropdownSecondsChanged}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      );
    }

    // Renders content
    return (
      <div className={styles.dateTimePicker}>
        {this.props.label && <Label>{this.props.label}</Label>}
        <table cellPadding="0" cellSpacing="0">
          <tbody>
            <tr>
              <td className={styles.labelCell}>
                <Label className={styles.fieldLabel}>
                  {strings.DateTimePickerDate}
                </Label>
              </td>
              <td>
                <DatePicker
                  disabled={this.props.disabled}
                  value={value}
                  strings={dateStrings}
                  isMonthPickerVisible={isMonthPickerVisible}
                  onSelectDate={this._onSelectDate}
                  allowTextInput={false}
                  firstDayOfWeek={this.props.firstDayOfWeek}
                  showGoToToday={showGoToToday}
                  showMonthPickerAsOverlay={showMonthPickerAsOverlay}
                  showWeekNumbers={showWeekNumbers}
                />
              </td>
            </tr>

            {timeElm}
          </tbody>
        </table>

        <FieldErrorMessage errorMessage={this.state.errorMessage} />
      </div>
    );
  }
}
