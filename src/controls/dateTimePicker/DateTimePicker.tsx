import * as React from "react";
import { isEqual } from '@microsoft/sp-lodash-subset';
import { TimeConvention, DateConvention } from "./DateTimeConventions";
import { DatePicker } from "office-ui-fabric-react/lib/DatePicker";
import { Label } from "office-ui-fabric-react/lib/Label";
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import * as strings from "ControlStrings";
import { IDateTimePickerProps } from "./IDateTimePickerProps";
import { IDateTimePickerState } from "./IDateTimePickerState";
import { IDateTimePickerStrings } from './IDateTimePickerStrings';
import ErrorMessage from "../errorMessage/ErrorMessage";
import styles from "./DateTimePicker.module.scss";
import HoursComponent from "./HoursComponent";
import MinutesComponent from "./MinutesComponent";
import SecondsComponent from "./SecondsComponent";
import * as telemetry from "../../common/telemetry";
import { Async, css } from 'office-ui-fabric-react/lib/Utilities';

interface IDateComponents {
  day: Date;
  hours: number;
  minutes: number;
  seconds: number;
}

/**
 * Defines the labels of the DatePicker control (as months, days, etc.)
 */
class DateTimePickerStrings implements IDateTimePickerStrings {
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
  /**
   * Used as AM designator when 12-hour clock is used.
   */
  public amDesignator: string = strings.AMDesignator;
  /**
   * Used as PM designator when 12-hour clock is used.
   */
  public pmDesignator: string = strings.PMDesignator;
}

/**
 * Renders the controls for DateTimePicker component
 */
export class DateTimePicker extends React.Component<IDateTimePickerProps, IDateTimePickerState> {
  private _latestValidateValue: number = NaN;
  private async: Async;
  private delayedValidate: (value: Date) => void;

  /**
   * Constructor
   */
  constructor(props: IDateTimePickerProps) {
    super(props);
    telemetry.track('DateTimePicker', {
      dateConvention: props.dateConvention ? DateConvention[props.dateConvention] : '',
      formatDate: !!props.formatDate,
      timeConvention: props.timeConvention
        ? TimeConvention[props.timeConvention]
        : '',
      disabled: props.disabled
    });

    // Bind the current object to the external called onSelectDate method
    this._onSelectDate = this._onSelectDate.bind(this);
    this._dropdownHoursChanged = this._dropdownHoursChanged.bind(this);
    this._dropdownMinutesChanged = this._dropdownMinutesChanged.bind(this);
    this._dropdownSecondsChanged = this._dropdownSecondsChanged.bind(this);

    // Get the current date/time values
    const { value = null } = this.props;
    const { day, hours, minutes, seconds } = DateTimePicker.getDateComponents(value, props.dateConvention);

    // Set the current state
    this.state = {
      day,
      hours,
      minutes,
      seconds,
      errorMessage: ''
    };

    this.async = new Async(this);
    this.validate = this.validate.bind(this);
    this.notifyAfterValidate = this.notifyAfterValidate.bind(this);
    this.delayedValidate = this.async.debounce(this.validate, props.deferredValidationTime);
  }

  /**
   * Called when the component will unmount
   */
  public componentWillUnmount() {
    this.async.dispose();
  }

  /**
   * Called before the component receives new props, used for matching state with new props.
   */
  public componentWillReceiveProps(nextProps: IDateTimePickerProps): void {
    if (nextProps.value != null && !isEqual(nextProps.value, this.props.value)) {
      const { day, hours, minutes, seconds } = DateTimePicker.getDateComponents(nextProps.value, this.props.dateConvention);
      this.setState({ day, hours, minutes, seconds });
    }
  }

  /**
   * Get the components of a Date object matching the DateConvention settings
   * @param date Date to extract components from
   * @param dateConvention DateConvention to follow when extracting date components
   */
  private static getDateComponents(date: Date, dateConvention: DateConvention): IDateComponents {
    const day: Date | null = DateTimePicker.cloneDate(date);
    const hours: number = dateConvention !== DateConvention.Date && day !== null ? day.getHours() : 0;
    const minutes: number = dateConvention !== DateConvention.Date && day !== null ? day.getMinutes() : 0;
    const seconds: number = dateConvention !== DateConvention.Date && day !== null ? day.getSeconds() : 0;
    if (day !== null) {
      day.setHours(hours);
      day.setMinutes(minutes);
      day.setSeconds(seconds);
    }
    return { day, hours, minutes, seconds };
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
    this.setState({ day }, () => this.delayedValidate(this.state.day));
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
    }, () => this.delayedValidate(this.state.day));
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
    }, () => this.delayedValidate(this.state.day));
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
    }, () => this.delayedValidate(this.state.day));
  }

  /**
   * Renders the control
   */
  public render(): JSX.Element {
    // use date value from props if it exists, otherwise use internal state
    // if no dateConvention is set, default is DateConvention.DateTime
    const {
      label,
      disabled,
      timeConvention,
      dateConvention = DateConvention.DateTime,
      firstDayOfWeek,
      isMonthPickerVisible = true,
      showGoToToday,
      showMonthPickerAsOverlay = false,
      showWeekNumbers = false,
      showSeconds = false,
      value = this.state.day,
      strings: dateStrings = new DateTimePickerStrings() // Defines the DatePicker control labels
    } = this.props;

    const hours: number = value != null ? value.getHours() : this.state.hours;
    const minutes: number = value != null ? value.getMinutes() : this.state.minutes;
    const seconds: number = value != null ? value.getSeconds() : this.state.seconds;

    // Check if the time element needs to be rendered
    let timeElm: JSX.Element = <div className="hidden" />;

    if (dateConvention === DateConvention.DateTime) {
      timeElm = (
        <div className={css(styles.row, styles.timeRow)}>
          <div className={styles.labelCell}><Label className={styles.fieldLabel}>{strings.DateTimePickerTime}</Label></div>
          <div className={styles.time}>
            <div className={styles.picker}>
              <HoursComponent
                disabled={disabled}
                timeConvention={timeConvention}
                value={hours}
                onChange={this._dropdownHoursChanged}
                amDesignator={dateStrings.amDesignator}
                pmDesignator={dateStrings.pmDesignator}
              />
            </div>
            <div className={styles.separator}>
              <Label>{dateStrings.timeSeparator}</Label>
            </div>
            <div className={styles.picker}>
              <MinutesComponent
                disabled={disabled}
                value={minutes}
                onChange={this._dropdownMinutesChanged} />
            </div>
            {showSeconds &&
              <div className={styles.separator}>
                <Label>{dateStrings.timeSeparator}</Label>
              </div>
            }
            {showSeconds &&
              <div className={styles.picker}>
                <SecondsComponent
                  disabled={disabled}
                  value={seconds}
                  onChange={this._dropdownSecondsChanged}
                />
              </div>
            }
          </div>
        </div>);
    }

    // Renders content
    return (
      <div className={styles.dateTimePicker}>
        {label && <Label>{label}</Label>}
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.labelCell}>
              <Label className={styles.fieldLabel}>{strings.DateTimePickerDate}</Label>
            </div>
            <div className={styles.picker}>
              <DatePicker
                disabled={disabled}
                value={value}
                strings={dateStrings}
                isMonthPickerVisible={true}
                onSelectDate={this._onSelectDate}
                allowTextInput={false}
                firstDayOfWeek={firstDayOfWeek}
                showGoToToday={showGoToToday}
                showMonthPickerAsOverlay={showMonthPickerAsOverlay}
                showWeekNumbers={showWeekNumbers}
              />
            </div>
          </div>
          {timeElm}
        </div>
        <ErrorMessage errorMessage={this.state.errorMessage} />
      </div>
    );
  }

  /**
   * Validates the new custom field value
   */
  private validate(dateVal: Date): void {
    if (typeof this.props.onGetErrorMessage === 'undefined' || this.props.onGetErrorMessage === null) {
      this.notifyAfterValidate(this.props.value, dateVal);
      return;
    }

    const timestamp = dateVal.getTime();

    if (this._latestValidateValue === timestamp) {
      return;
    }

    this._latestValidateValue = timestamp;

    const result: string | PromiseLike<string> = this.props.onGetErrorMessage(dateVal);
    if (typeof result !== 'undefined') {
      if (typeof result === 'string') {
        if (result === '') {
          this.notifyAfterValidate(this.props.value, dateVal);
        }

        this.setState({
          errorMessage: result
        });
      } else {
        result.then((errorMessage: string) => {
          if (typeof errorMessage === 'undefined' || errorMessage === '') {
            this.notifyAfterValidate(this.props.value, dateVal);
          }

          this.setState({
            errorMessage: errorMessage
          });
        });
      }
    }
    else {
      this.notifyAfterValidate(this.props.value, dateVal);
    }
  }

  /**
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate(oldValue: Date, newValue: Date) {
    if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null && newValue !== null) {
      this.props.onChange(newValue);
    }
  }
}
