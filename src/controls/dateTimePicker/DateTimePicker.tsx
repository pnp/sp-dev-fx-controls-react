import * as React from 'react';
import { IDateTimePickerProps, IDateTimePickerState, DateConvention, TimeConvention } from './IDateTimePicker';
import { DatePicker, IDatePickerStrings } from 'office-ui-fabric-react/lib/DatePicker';
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import styles from './DateTimePicker.module.scss';
import { Label } from 'office-ui-fabric-react/lib/Label';
import HoursComponent from './HoursComponent';
import MinutesComponent from './MinutesComponent';
import SecondsComponent from './SecondsComponent';
import ErrorMessage from '../errorMessage/ErrorMessage';
import * as strings from 'ControlStrings';
import { css, Async } from 'office-ui-fabric-react/lib/Utilities';

/**
 * Defines the labels of the DatePicker control (as months, days, etc.)
 */
class DatePickerStrings implements IDatePickerStrings {
    /**
     * An array of strings for the full names of months.
     * The array is 0-based, so months[0] should be the full name of January.
     */
    public months: string[] = [
        strings.DatePickerMonthLongJanuary, strings.DatePickerMonthLongFebruary,
        strings.DatePickerMonthLongMarch, strings.DatePickerMonthLongApril,
        strings.DatePickerMonthLongMay, strings.DatePickerMonthLongJune, strings.DatePickerMonthLongJuly,
        strings.DatePickerMonthLongAugust, strings.DatePickerMonthLongSeptember, strings.DatePickerMonthLongOctober,
        strings.DatePickerMonthLongNovember, strings.DatePickerMonthLongDecember
    ];
    /**
     * An array of strings for the short names of months.
     * The array is 0-based, so shortMonths[0] should be the short name of January.
     */
    public shortMonths: string[] = [
        strings.DatePickerMonthShortJanuary, strings.DatePickerMonthShortFebruary,
        strings.DatePickerMonthShortMarch, strings.DatePickerMonthShortApril,
        strings.DatePickerMonthShortMay, strings.DatePickerMonthShortJune, strings.DatePickerMonthShortJuly,
        strings.DatePickerMonthShortAugust, strings.DatePickerMonthShortSeptember, strings.DatePickerMonthShortOctober,
        strings.DatePickerMonthShortNovember, strings.DatePickerMonthShortDecember
    ];
    /**
     * An array of strings for the full names of days of the week.
     * The array is 0-based, so days[0] should be the full name of Sunday.
     */
    public days: string[] = [
        strings.DatePickerDayLongSunday, strings.DatePickerDayLongMonday, strings.DatePickerDayLongTuesday,
        strings.DatePickerDayLongWednesday, strings.DatePickerDayLongThursday, strings.DatePickerDayLongFriday,
        strings.DatePickerDayLongSaturday
    ];
    /**
     * An array of strings for the initials of the days of the week.
     * The array is 0-based, so days[0] should be the initial of Sunday.
     */
    public shortDays: string[] = [
        strings.DatePickerDayShortSunday, strings.DatePickerDayShortMonday, strings.DatePickerDayShortTuesday,
        strings.DatePickerDayShortWednesday, strings.DatePickerDayShortThursday, strings.DatePickerDayShortFriday,
        strings.DatePickerDayShortSaturday
    ];
    /**
     * String to render for button to direct the user to today's date.
     */
    public goToToday: string = strings.DatePickerGoToToday;
    /**
     * Error message to render for TextField if isRequired validation fails.
     */
    public isRequiredErrorMessage: string = '';
    /**
     * Error message to render for TextField if input date string parsing fails.
     */
    public invalidInputErrorMessage: string = '';
}

export type DateTimePickerDefaultProps = {
    showSeconds: boolean
};

/**
 * Renders the controls for PropertyFieldDateTimePicker component
 */
export class DateTimePicker extends React.Component<IDateTimePickerProps, IDateTimePickerState> {
    public static defaultProps: DateTimePickerDefaultProps = {
        showSeconds: true
    };

    private _latestValidateValue: string;
    private async: Async;
    private delayedValidate: (value: Date) => void;

    private _crntDate: Date;
    private _crntHours: number;
    private _crntMinutes: number;
    private _crntSeconds: number;

    /**
     * Constructor
     */
    constructor(props: IDateTimePickerProps) {
        super(props);

        // Bind the current object to the external called onSelectDate method
        this._onSelectDate = this._onSelectDate.bind(this);
        this._dropdownHoursChanged = this._dropdownHoursChanged.bind(this);
        this._dropdownMinutesChanged = this._dropdownMinutesChanged.bind(this);
        this._dropdownSecondsChanged = this._dropdownSecondsChanged.bind(this);

        // Initiate the current date values
        this._crntDate = props.initialDate;

        // Intiate the time values (only when date and time convention is active)
        this._crntHours = props.dateConvention === DateConvention.DateTime && props.initialDate ? props.initialDate.getHours() : 0;
        this._crntMinutes = props.dateConvention === DateConvention.DateTime && props.initialDate ? props.initialDate.getMinutes() : 0;
        this._crntSeconds = props.dateConvention === DateConvention.DateTime && props.initialDate ? props.initialDate.getSeconds() : 0;

        // Set the current state
        this.state = {
            day: this._crntDate,
            hours: this._crntHours,
            minutes: this._crntMinutes,
            seconds: this._crntSeconds,
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
     * Renders the control
     */
    public render(): JSX.Element {
        // Defines the DatePicker control labels
        const dateStrings: IDatePickerStrings = this.props.datePickerStrings || new DatePickerStrings();

        const {
            disabled,
            timeConvention,
            showSeconds,
            firstDayOfWeek,
            dateConvention,
            label,
            formatDate,
            maxDate,
            minDate
        } = this.props;

        const {
            hours,
            minutes,
            seconds,
            day,
            errorMessage
        } = this.state;

        // Check if the time element needs to be rendered
        let timeElm: JSX.Element = <tr />;
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
                                onChange={this._dropdownHoursChanged} />
                        </div>
                        <div className={styles.seperator}>
                            <Label>:</Label>
                        </div>
                        <div className={styles.picker}>
                            <MinutesComponent
                                disabled={disabled}
                                value={minutes}
                                onChange={this._dropdownMinutesChanged} />
                        </div>
                        {showSeconds && <div className={styles.seperator}><Label>:</Label></div>}
                        {showSeconds && <div className={styles.picker}><SecondsComponent
                            disabled={disabled}
                            value={seconds}
                            onChange={this._dropdownSecondsChanged} /></div>}
                    </div>
                </div>);
        }

        // Renders content
        return (
            <div className={styles.DateTimePicker}>
                {label && <Label>{label}</Label>}
                <div className={styles.container}>
                    <div className={styles.row}>
                        <div className={styles.labelCell}>
                            <Label className={styles.fieldLabel}>{strings.DateTimePickerDate}</Label>
                        </div>
                        <div className={styles.picker}>
                            <DatePicker
                                formatDate={formatDate}
                                disabled={disabled}
                                value={day}
                                strings={dateStrings}
                                isMonthPickerVisible={true}
                                onSelectDate={this._onSelectDate}
                                allowTextInput={false}
                                firstDayOfWeek={firstDayOfWeek}
                                maxDate={maxDate}
                                minDate={minDate} />
                        </div>
                    </div>
                    {timeElm}
                </div>
                <ErrorMessage errorMessage={errorMessage} />
            </div>
        );
    }

    /**
     * Function called when the DatePicker Office UI Fabric component selected date changed
     */
    private _onSelectDate(date: Date): void {
        if (date === null) {
            return;
        }
        this._crntDate = date;
        this._saveDate();
    }

    /**
     * Function called when hours value have been changed
     * @param element Hours dropdown value
     */
    private _dropdownHoursChanged(element?: IDropdownOption): void {
        this._crntHours = parseInt(element.key.toString());
        this._saveDate();
    }

    /**
     * Function called when minutes value have been changed
     * @param element Minutes dropdown value
     */
    private _dropdownMinutesChanged(element?: IDropdownOption): void {
        this._crntMinutes = parseInt(element.key.toString());
        this._saveDate();
    }

    /**
     * Function called when seconds value have been changed
     * @param element Seconds dropdown value
     */
    private _dropdownSecondsChanged(element?: IDropdownOption): void {
        this._crntSeconds = parseInt(element.key.toString());
        this._saveDate();
    }

    /**
     * Save the new date
     */
    private _saveDate(): void {
        // Check if the current date object exists
        if (this._crntDate === null) {
            return;
        }

        // Set the current date state for the component
        this.setState({
            day: this._crntDate,
            hours: this._crntHours,
            minutes: this._crntMinutes,
            seconds: this._crntSeconds
        });

        // Create the final date object
        const finalDate = new Date(this._crntDate.toISOString());
        finalDate.setHours(this._crntHours);
        finalDate.setMinutes(this._crntMinutes);
        finalDate.setSeconds(this._crntSeconds);

        if (finalDate !== null) {
            this.delayedValidate(finalDate);
        }
    }

    /**
     * Validates the new custom field value
     */
    private validate(dateVal: Date): void {
        if (typeof this.props.onGetErrorMessage === 'undefined' || this.props.onGetErrorMessage === null) {
            this.notifyAfterValidate(this.props.initialDate, dateVal);
            return;
        }

        const dateStr = dateVal.toISOString();

        if (this._latestValidateValue === dateStr) {
            return;
        }
        this._latestValidateValue = dateStr;

        const result: string | PromiseLike<string> = this.props.onGetErrorMessage(dateVal);
        if (typeof result !== 'undefined') {
            if (typeof result === 'string') {
                if (result === '') {
                    this.notifyAfterValidate(this.props.initialDate, dateVal);
                }

                this.setState({
                    errorMessage: result
                });
            } else {
                result.then((errorMessage: string) => {
                    if (typeof errorMessage === 'undefined' || errorMessage === '') {
                        this.notifyAfterValidate(this.props.initialDate, dateVal);
                    }

                    this.setState({
                        errorMessage: errorMessage
                    });
                });
            }
        }
        else {
            this.notifyAfterValidate(this.props.initialDate, dateVal);
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