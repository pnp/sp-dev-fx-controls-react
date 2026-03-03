var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
import { DateTimePickerStrings } from "./DateTimePickerStrings";
import { TimeHelper } from "./TimeHelper";
import { TimeDisplayControlType } from "./TimeDisplayControlType";
/**
 * Renders the controls for DateTimePicker component
 */
var DateTimePicker = /** @class */ (function (_super) {
    __extends(DateTimePicker, _super);
    /**
     * Constructor
     */
    function DateTimePicker(props) {
        var _this = _super.call(this, props) || this;
        _this._latestValidateValue = NaN;
        /**
         * Function called when the DatePicker Office UI Fabric component selected date changed
         */
        _this.onSelectDate = function (date) {
            if (!TimeHelper.isValidDate(date)) {
                return;
            }
            // Get hours, minutes and seconds from state or default to zero
            var _a = _this.state, _b = _a.hours, hours = _b === void 0 ? 0 : _b, _c = _a.minutes, minutes = _c === void 0 ? 0 : _c, _d = _a.seconds, seconds = _d === void 0 ? 0 : _d;
            var day = TimeHelper.cloneDate(date);
            day.setHours(hours);
            day.setMinutes(minutes);
            day.setSeconds(seconds);
            _this.setState({ day: day }, function () { return _this.delayedValidate(_this.state.day); });
        };
        /**
         * Function called when hours value have been changed
         * @param element Hours dropdown value
         */
        _this.dropdownHoursChanged = function (value) {
            _this.setState(function (_a) {
                var day = _a.day;
                var hoursSplit = value.split(" ");
                var hoursValue = hoursSplit[0].length > 2 ? hoursSplit[0].substring(0, 2) : hoursSplit[0];
                var hours = parseInt(hoursValue);
                if (isNaN(hours)) {
                    return;
                }
                if (_this.props.timeConvention !== TimeConvention.Hours24) {
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
                var state = { hours: hours };
                var date = TimeHelper.cloneDate(day);
                if (date) {
                    date.setHours(hours);
                    state.day = date;
                }
                return state;
            }, function () { return _this.delayedValidate(_this.state.day); });
        };
        /**
         * Function called when minutes value have been changed
         * @param element Minutes dropdown value
         */
        _this.dropdownMinutesChanged = function (value) {
            _this.setState(function (_a) {
                var day = _a.day;
                var minutes = parseInt(value.length > 2 ? value.substring(0, 2) : value);
                var state = { minutes: minutes };
                var date = TimeHelper.cloneDate(day);
                if (date) {
                    date.setMinutes(minutes);
                    state.day = date;
                }
                return state;
            }, function () { return _this.delayedValidate(_this.state.day); });
        };
        /**
         * Function called when seconds value have been changed
         * @param element Seconds dropdown value
         */
        _this.dropdownSecondsChanged = function (value) {
            _this.setState(function (_a) {
                var day = _a.day;
                var seconds = parseInt(value.length > 2 ? value.substring(0, 2) : value);
                var state = { seconds: seconds };
                var date = TimeHelper.cloneDate(day);
                if (date) {
                    date.setSeconds(seconds);
                    state.day = date;
                }
                return state;
            }, function () { return _this.delayedValidate(_this.state.day); });
        };
        /**
         * Validates string input on date time field
         */
        _this.handleTextChange = function (e, newValue, locString) {
            if (!TimeHelper.isValidDate(newValue)) {
                _this.setState({
                    errorMessage: locString,
                });
                return;
            }
        };
        /**
         * Validates the new custom field value
         */
        _this.validate = function (dateVal) {
            if (typeof _this.props.onGetErrorMessage === 'undefined' || _this.props.onGetErrorMessage === null) {
                _this.notifyAfterValidate(_this.props.value, dateVal);
                return;
            }
            var timestamp = dateVal.getTime();
            if (_this._latestValidateValue === timestamp) {
                return;
            }
            _this._latestValidateValue = timestamp;
            var result = _this.props.onGetErrorMessage(dateVal);
            if (typeof result !== 'undefined') {
                if (typeof result === 'string') {
                    if (result === '') {
                        _this.notifyAfterValidate(_this.props.value, dateVal);
                    }
                    _this.setState({
                        errorMessage: result
                    });
                }
                else {
                    result.then(function (errorMessage) {
                        if (typeof errorMessage === 'undefined' || errorMessage === '') {
                            _this.notifyAfterValidate(_this.props.value, dateVal);
                        }
                        _this.setState({
                            errorMessage: errorMessage
                        });
                    })
                        .catch(function () { });
                }
            }
            else {
                _this.notifyAfterValidate(_this.props.value, dateVal);
            }
        };
        /**
         * Notifies the parent Web Part of a property value change
         */
        _this.notifyAfterValidate = function (oldValue, newValue) {
            if (typeof _this.props.onChange !== 'undefined' && _this.props.onChange !== null && newValue !== null) {
                _this.props.onChange(newValue);
            }
        };
        telemetry.track('ReactDateTimePicker', {
            dateConvention: props.dateConvention ? DateConvention[props.dateConvention] : '',
            formatDate: !!props.formatDate,
            timeConvention: props.timeConvention ? TimeConvention[props.timeConvention] : '',
            disabled: props.disabled
        });
        // Get the current date/time values
        var _a = _this.props.value, value = _a === void 0 ? null : _a;
        var _b = DateTimePicker.getDateComponents(value, props.dateConvention), day = _b.day, hours = _b.hours, minutes = _b.minutes, seconds = _b.seconds;
        // Set the current state
        _this.state = {
            day: day,
            hours: hours,
            minutes: minutes,
            seconds: seconds,
            errorMessage: ''
        };
        _this.async = new Async(_this);
        _this.delayedValidate = _this.async.debounce(_this.validate, props.deferredValidationTime);
        return _this;
    }
    /**
     * Called when the component will unmount
     */
    DateTimePicker.prototype.componentWillUnmount = function () {
        this.async.dispose();
    };
    /**
     * Called before the component receives new props, used for matching state with new props.
     */
    DateTimePicker.prototype.UNSAFE_componentWillReceiveProps = function (nextProps) {
        if (!isEqual(nextProps.value, this.props.value)) {
            var _a = DateTimePicker.getDateComponents(nextProps.value, this.props.dateConvention), day = _a.day, hours = _a.hours, minutes = _a.minutes, seconds = _a.seconds;
            this.setState({ day: day, hours: hours, minutes: minutes, seconds: seconds });
        }
    };
    /**
     * Get the components of a Date object matching the DateConvention settings
     * @param date Date to extract components from
     * @param dateConvention DateConvention to follow when extracting date components
     */
    DateTimePicker.getDateComponents = function (date, dateConvention) {
        var day = TimeHelper.cloneDate(date);
        var hours = dateConvention !== DateConvention.Date && day !== null ? day.getHours() : 0;
        var minutes = dateConvention !== DateConvention.Date && day !== null ? day.getMinutes() : 0;
        var seconds = dateConvention !== DateConvention.Date && day !== null ? day.getSeconds() : 0;
        if (day !== null) {
            day.setHours(hours);
            day.setMinutes(minutes);
            day.setSeconds(seconds);
        }
        return { day: day, hours: hours, minutes: minutes, seconds: seconds };
    };
    /**
     * Function called from the clearDate iconbutton
     */
    DateTimePicker.prototype.clearDate = function () {
        this.setState({
            day: null
        });
        if (this.props.onChange) {
            this.props.onChange(null);
        }
    };
    /**
     * Renders the control
     */
    DateTimePicker.prototype.render = function () {
        var _this = this;
        // use date value from props if it exists, otherwise use internal state
        // if no dateConvention is set, default is DateConvention.DateTime
        var _a = this.props, label = _a.label, disabled = _a.disabled, timeConvention = _a.timeConvention, _b = _a.dateConvention, dateConvention = _b === void 0 ? DateConvention.DateTime : _b, firstDayOfWeek = _a.firstDayOfWeek, firstWeekOfYear = _a.firstWeekOfYear, _c = _a.isMonthPickerVisible, isMonthPickerVisible = _c === void 0 ? true : _c, showGoToToday = _a.showGoToToday, _d = _a.allowTextInput, allowTextInput = _d === void 0 ? true : _d, _e = _a.showMonthPickerAsOverlay, showMonthPickerAsOverlay = _e === void 0 ? false : _e, _f = _a.showWeekNumbers, showWeekNumbers = _f === void 0 ? false : _f, _g = _a.showSeconds, showSeconds = _g === void 0 ? false : _g, formatDate = _a.formatDate, parseDateFromString = _a.parseDateFromString, _h = _a.value, value = _h === void 0 ? this.state.day : _h, _j = _a.strings, dateStrings = _j === void 0 ? new DateTimePickerStrings() : _j, // Defines the DatePicker control labels
        timeDisplayControlType = _a.timeDisplayControlType, placeholder = _a.placeholder, showLabels = _a.showLabels, initialPickerDate = _a.initialPickerDate, minDate = _a.minDate, maxDate = _a.maxDate, minutesIncrementStep = _a.minutesIncrementStep, _k = _a.showClearDate, showClearDate = _k === void 0 ? false : _k, _l = _a.showClearDateIcon, showClearDateIcon = _l === void 0 ? 'RemoveEvent' : _l, _m = _a.restrictedDates, restrictedDates = _m === void 0 ? [] : _m;
        var textErrorMessage = dateStrings.textErrorMessage;
        var hours = value !== null ? value.getHours() : this.state.hours;
        var minutes = value !== null ? value.getMinutes() : this.state.minutes;
        var seconds = value !== null ? value.getSeconds() : this.state.seconds;
        var CalendarView = function () {
            return (React.createElement(Calendar, { value: initialPickerDate, strings: dateStrings, isMonthPickerVisible: isMonthPickerVisible, onSelectDate: _this.onSelectDate, firstDayOfWeek: firstDayOfWeek, firstWeekOfYear: firstWeekOfYear, showGoToToday: showGoToToday, showMonthPickerAsOverlay: showMonthPickerAsOverlay, showWeekNumbers: showWeekNumbers, minDate: minDate, maxDate: maxDate, restrictedDates: restrictedDates }));
        };
        // Check if the time element needs to be rendered
        var timeElm = React.createElement("div", { className: "hidden" });
        if (dateConvention === DateConvention.DateTime) {
            timeElm = (React.createElement("div", { className: css(styles.row, styles.timeRow) },
                showLabels !== false && React.createElement("div", { className: styles.labelCell },
                    React.createElement(Label, { className: styles.fieldLabel }, dateStrings.timeLabel)),
                React.createElement("div", { className: styles.time },
                    React.createElement("div", { className: styles.picker },
                        React.createElement(HoursComponent, { disabled: disabled, timeConvention: timeConvention, value: hours, onChange: this.dropdownHoursChanged, timeDisplayControlType: timeDisplayControlType || TimeDisplayControlType.Text })),
                    React.createElement("div", { className: styles.separator },
                        React.createElement(Label, null, dateStrings.timeSeparator)),
                    React.createElement("div", { className: styles.picker },
                        React.createElement(MinutesComponent, { disabled: disabled, value: minutes, minutesIncrementStep: minutesIncrementStep, onChange: this.dropdownMinutesChanged, timeDisplayControlType: timeDisplayControlType || TimeDisplayControlType.Text })),
                    showSeconds && (React.createElement("div", { className: styles.separator },
                        React.createElement(Label, null, dateStrings.timeSeparator))),
                    showSeconds && (React.createElement("div", { className: styles.picker },
                        React.createElement(SecondsComponent, { disabled: disabled, value: seconds, onChange: this.dropdownSecondsChanged, timeDisplayControlType: timeDisplayControlType || TimeDisplayControlType.Text }))))));
        }
        // Renders content
        return (React.createElement("div", { className: styles.dateTimePicker },
            label && React.createElement(Label, null, label),
            React.createElement("div", { className: styles.container },
                React.createElement("div", { className: styles.row },
                    showLabels !== false && (React.createElement("div", { className: styles.labelCell },
                        React.createElement(Label, { className: styles.fieldLabel }, dateStrings.dateLabel))),
                    React.createElement("div", { className: styles.picker },
                        React.createElement(DatePicker, { formatDate: formatDate, parseDateFromString: parseDateFromString, disabled: disabled, value: value, strings: dateStrings, isMonthPickerVisible: isMonthPickerVisible, onSelectDate: this.onSelectDate, allowTextInput: allowTextInput, firstDayOfWeek: firstDayOfWeek, firstWeekOfYear: firstWeekOfYear, showGoToToday: showGoToToday, showMonthPickerAsOverlay: showMonthPickerAsOverlay, showWeekNumbers: showWeekNumbers, placeholder: placeholder, initialPickerDate: initialPickerDate, minDate: minDate, maxDate: maxDate, calendarAs: restrictedDates.length ? CalendarView : undefined, textField: {
                                onChange: function (e, newValue) { return _this.handleTextChange(e, newValue, textErrorMessage); }
                            } })),
                    showClearDate === true && this.state.day !== null && React.createElement(IconButton, { iconProps: { iconName: showClearDateIcon }, onClick: function () { return _this.clearDate(); } })),
                timeElm),
            React.createElement(ErrorMessage, { errorMessage: this.state.errorMessage })));
    };
    return DateTimePicker;
}(React.Component));
export { DateTimePicker };
//# sourceMappingURL=DateTimePicker.js.map