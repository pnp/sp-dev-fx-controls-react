import { TimeConvention } from './DateTimeConventions';
import { MinutesIncrement } from './IDateTimePickerProps';
import { TimeDisplayControlType } from './TimeDisplayControlType';
/**
 * Time component properties interface
 */
export interface ITimeComponentProps {
    disabled?: boolean;
    value: number;
    timeDisplayControlType?: TimeDisplayControlType;
    minutesIncrementStep?: MinutesIncrement;
    onChange: (value?: string) => void;
}
/**
 * Hours component property interface
 */
export interface IHoursComponentProps extends ITimeComponentProps {
    timeConvention: TimeConvention;
}
//# sourceMappingURL=ITimeComponentProps.d.ts.map