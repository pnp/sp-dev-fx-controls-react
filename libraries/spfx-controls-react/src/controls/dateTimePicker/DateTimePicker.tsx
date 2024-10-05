import * as React from "react";
import { isEqual } from '@microsoft/sp-lodash-subset';
import { TimeConvention, DateConvention } from "./DateTimeConventions";
import { Calendar } from "@fluentui/react/lib/Calendar";
import { DatePicker } from "@fluentui/react/lib/DatePicker";
import { Label } from "@fluentui/react/lib/Label";
import { IconButton } from "@fluentui/react/lib/Button";
import ErrorMessage from "../errorMessage/ErrorMessage";
import styles from "./DateTimePicker.module.scss";
import HoursComponent from "./HoursComponent";
import MinutesComponent from "./MinutesComponent";
import SecondsComponent from "./SecondsComponent";
import * as telemetry from "../../common/telemetry";
import { Async, css } from '@fluentui/react/lib/Utilities';
import { IDateTimePickerProps } from "./IDateTimePickerProps";
import { IDateTimePickerState } from "./IDateTimePickerState";
import { DateTimePickerStrings } from "./DateTimePickerStrings";
import { TimeHelper } from "./TimeHelper";
import { TimeDisplayControlType } from "./TimeDisplayControlType";

interface IDateComponents {
  day: Date;
  hours: number;
  minutes: number;
  seconds: number;
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
    telemetry.track('ReactDateTimePicker', {
      dateConvention: props.dateConvention ? DateConvention[props.dateConvention] : '',
      formatDate: !!props.formatDate,
      timeConvention: props.timeConvention ? TimeConvention[props.timeConvention] : '',
      disabled: props.disabled
    });

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
    this.delayedValidate = this.async.debounce(this.validate, props.deferredValidationTime);
  }

  /**
   * Called when the component will unmount
   */
  public componentWillUnmount(): void {
    this.async.dispose();
  }

  /**
   * Called before the component receives new props, used for matching state with new props.
   */
  public UNSAFE_componentWillReceiveProps(nextProps: IDateTimePickerProps): void {
    if (!isEqual(nextProps.value, this.props.value)) {
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
    const day: Date | null = TimeHelper.cloneDate(date);
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
  private onSelectDate = (date: Date): void => {

    if (!TimeHelper.isValidDate(date)) {
      return;
    }

    // Get hours, minutes and seconds from state or default to zero
    const { hours = 0, minutes = 0, seconds = 0 } = this.state;
    const day = TimeHelper.cloneDate(date);
    day.setHours(hours);
    day.setMinutes(minutes);
    day.setSeconds(seconds);
    this.setState({ day }, () => this.delayedValidate(this.state.day));
  }

  /**
   * Function called from the clearDate iconbutton
   */
  private clearDate(): void {
    this.setState({
      day: null
    });

    if (this.props.onChange) {
      this.props.onChange(null);
    }
  }

  /**
   * Function called when hours value have been changed
   * @param element Hours dropdown value
   */
  private dropdownHoursChanged = (value?: string): void => {
    this.setState(({ day }) => {
      const hoursSplit = value.split(" ");
      const hoursValue = hoursSplit[0].length > 2 ? hoursSplit[0].substring(0, 2) : hoursSplit[0];
      let hours: number = parseInt(hoursValue);
      if (isNaN(hours)) {
        return;
      }

      if (this.props.timeConvention !== TimeConvention.Hours24) {
        if (hoursSplit[1] && hoursSplit[1].toLowerCase().indexOf("pm") !== -1) {
          hours += 12;
          if (hours === 24) {
            //this is noon - set to 12 not 0
            //hours = 0;
            hours = 12;
          }
        }
        else if (hours === 12) {
          //am - if hours === 12, set hours to 0 here
          hours = 0;
        }
      }

      if (hours > 23) {
        return;
      }

      const state: Partial<IDateTimePickerState> = { hours };
      const date: Date = TimeHelper.cloneDate(day);
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
  private dropdownMinutesChanged = (value?: string): void => {
    this.setState(({ day }) => {
      const minutes: number = parseInt(value.length > 2 ? value.substring(0, 2) : value);
      const state: Partial<IDateTimePickerState> = { minutes };
      const date: Date = TimeHelper.cloneDate(day);
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
  private dropdownSecondsChanged = (value?: string): void => {
    this.setState(({ day }) => {
      const seconds: number = parseInt(value.length > 2 ? value.substring(0, 2) : value);
      const state: Partial<IDateTimePickerState> = { seconds };
      const date: Date = TimeHelper.cloneDate(day);
      if (date) {
        date.setSeconds(seconds);
        state.day = date;
      }
      return state;
    }, () => this.delayedValidate(this.state.day));
  }

  /**
   * Validates string input on date time field
   */
  private handleTextChange = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: string, locString: string): void => {
    if (!TimeHelper.isValidDate(newValue)) {
      this.setState({
        errorMessage: locString,
      });
      return;
    }
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
      firstWeekOfYear,
      isMonthPickerVisible = true,
      showGoToToday,
      allowTextInput = true,
      showMonthPickerAsOverlay = false,
      showWeekNumbers = false,
      showSeconds = false,
      formatDate,
      parseDateFromString,
      value = this.state.day,
      strings: dateStrings = new DateTimePickerStrings(), // Defines the DatePicker control labels
      timeDisplayControlType,
      placeholder,
      showLabels,
      initialPickerDate,
      minDate,
      maxDate,
      minutesIncrementStep,
      showClearDate = false,
      showClearDateIcon = 'RemoveEvent',
      restrictedDates = []
    } = this.props;

    const { textErrorMessage } = dateStrings;
    const hours: number = value !== null ? value.getHours() : this.state.hours;
    const minutes: number = value !== null ? value.getMinutes() : this.state.minutes;
    const seconds: number = value !== null ? value.getSeconds() : this.state.seconds;

    const CalendarView = (): JSX.Element => {
      return (
        <Calendar
          value={initialPickerDate}
          strings={dateStrings}
          isMonthPickerVisible={isMonthPickerVisible}
          onSelectDate={this.onSelectDate}
          firstDayOfWeek={firstDayOfWeek}
          firstWeekOfYear={firstWeekOfYear}
          showGoToToday={showGoToToday}
          showMonthPickerAsOverlay={showMonthPickerAsOverlay}
          showWeekNumbers={showWeekNumbers}
          minDate={minDate}
          maxDate={maxDate}
          restrictedDates={restrictedDates}
        />
      );
    };

    // Check if the time element needs to be rendered
    let timeElm: JSX.Element = <div className="hidden" />;

    if (dateConvention === DateConvention.DateTime) {
      timeElm = (
        <div className={css(styles.row, styles.timeRow)}>
          {showLabels !== false && <div className={styles.labelCell}><Label className={styles.fieldLabel}>{dateStrings.timeLabel}</Label></div>}

          <div className={styles.time}>
            <div className={styles.picker}>
              <HoursComponent disabled={disabled}
                timeConvention={timeConvention}
                value={hours}
                onChange={this.dropdownHoursChanged}
                timeDisplayControlType={timeDisplayControlType || TimeDisplayControlType.Text} />
            </div>

            <div className={styles.separator}>
              <Label>{dateStrings.timeSeparator}</Label>
            </div>

            <div className={styles.picker}>
              <MinutesComponent disabled={disabled}
                value={minutes}
                minutesIncrementStep={minutesIncrementStep}
                onChange={this.dropdownMinutesChanged}
                timeDisplayControlType={timeDisplayControlType || TimeDisplayControlType.Text} />
            </div>

            {
              showSeconds && (
                <div className={styles.separator}>
                  <Label>{dateStrings.timeSeparator}</Label>
                </div>
              )
            }

            {
              showSeconds && (
                <div className={styles.picker}>
                  <SecondsComponent disabled={disabled}
                    value={seconds}
                    onChange={this.dropdownSecondsChanged}
                    timeDisplayControlType={timeDisplayControlType || TimeDisplayControlType.Text} />
                </div>
              )
            }
          </div>
        </div>);
    }

    // Renders content
    return (
      <div className={styles.dateTimePicker}>
        {
          label && <Label>{label}</Label>
        }

        <div className={styles.container}>
          <div className={styles.row}>
            {
              showLabels !== false && (
                <div className={styles.labelCell}>
                  <Label className={styles.fieldLabel}>{dateStrings.dateLabel}</Label>
                </div>
              )
            }

            <div className={styles.picker}>
              <DatePicker
                formatDate={formatDate}
                parseDateFromString={parseDateFromString}
                disabled={disabled}
                value={value}
                strings={dateStrings}
                isMonthPickerVisible={isMonthPickerVisible}
                onSelectDate={this.onSelectDate}
                allowTextInput={allowTextInput}
                firstDayOfWeek={firstDayOfWeek}
                firstWeekOfYear={firstWeekOfYear}
                showGoToToday={showGoToToday}
                showMonthPickerAsOverlay={showMonthPickerAsOverlay}
                showWeekNumbers={showWeekNumbers}
                placeholder={placeholder}
                initialPickerDate={initialPickerDate}
                minDate={minDate}
                maxDate={maxDate}
                calendarAs={restrictedDates.length ? CalendarView : undefined}
                textField={{
                  onChange: (e, newValue) => this.handleTextChange(e, newValue, textErrorMessage)
                }}
              />
            </div>
            {showClearDate === true && this.state.day !== null && <IconButton iconProps={{ iconName: showClearDateIcon }} onClick={() => this.clearDate()} />}

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
  private validate = (dateVal: Date): void => {
    if (typeof this.props.onGetErrorMessage === 'undefined' || this.props.onGetErrorMessage === null) {
      this.notifyAfterValidate(this.props.value, dateVal);
      return;
    }

    const timestamp = dateVal.getTime();

    if (this._latestValidateValue === timestamp) {
      return;
    }

    this._latestValidateValue = timestamp;

    const result: string | Promise<string> = this.props.onGetErrorMessage(dateVal);
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
        })
        .catch(() => { /* no-op; */ });
      }
    } else {
      this.notifyAfterValidate(this.props.value, dateVal);
    }
  }

  /**
   * Notifies the parent Web Part of a property value change
   */
  private notifyAfterValidate = (oldValue: Date, newValue: Date): void => {
    if (typeof this.props.onChange !== 'undefined' && this.props.onChange !== null && newValue !== null) {
      this.props.onChange(newValue);
    }
  }
}
