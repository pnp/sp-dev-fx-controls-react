import * as React from "react";
import { IDateTimePickerProps } from "./IDateTimePickerProps";
import { IDateTimePickerState } from "./IDateTimePickerState";
/**
 * Renders the controls for DateTimePicker component
 */
export declare class DateTimePicker extends React.Component<IDateTimePickerProps, IDateTimePickerState> {
    private _latestValidateValue;
    private async;
    private delayedValidate;
    /**
     * Constructor
     */
    constructor(props: IDateTimePickerProps);
    /**
     * Called when the component will unmount
     */
    componentWillUnmount(): void;
    /**
     * Called before the component receives new props, used for matching state with new props.
     */
    UNSAFE_componentWillReceiveProps(nextProps: IDateTimePickerProps): void;
    /**
     * Get the components of a Date object matching the DateConvention settings
     * @param date Date to extract components from
     * @param dateConvention DateConvention to follow when extracting date components
     */
    private static getDateComponents;
    /**
     * Function called when the DatePicker Office UI Fabric component selected date changed
     */
    private onSelectDate;
    /**
     * Function called from the clearDate iconbutton
     */
    private clearDate;
    /**
     * Function called when hours value have been changed
     * @param element Hours dropdown value
     */
    private dropdownHoursChanged;
    /**
     * Function called when minutes value have been changed
     * @param element Minutes dropdown value
     */
    private dropdownMinutesChanged;
    /**
     * Function called when seconds value have been changed
     * @param element Seconds dropdown value
     */
    private dropdownSecondsChanged;
    /**
     * Validates string input on date time field
     */
    private handleTextChange;
    /**
     * Renders the control
     */
    render(): JSX.Element;
    /**
     * Validates the new custom field value
     */
    private validate;
    /**
     * Notifies the parent Web Part of a property value change
     */
    private notifyAfterValidate;
}
//# sourceMappingURL=DateTimePicker.d.ts.map