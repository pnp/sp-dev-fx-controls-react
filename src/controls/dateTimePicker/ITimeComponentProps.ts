import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { TimeConvention } from './DateTimeConventions';
import { TimeDisplayControlType } from './TimeDisplayControlType';

/**
 * Time component properties interface
 */
export interface ITimeComponentProps {
  disabled?: boolean;
  value: number;
  timeDisplayControlType?: TimeDisplayControlType;
  onChange: (value?: string) => void;
}

/**
 * Hours component property interface
 */
export interface IHoursComponentProps extends ITimeComponentProps {
  timeConvention: TimeConvention;
}
