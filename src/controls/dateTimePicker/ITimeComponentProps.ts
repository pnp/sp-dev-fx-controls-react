import { IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';
import { TimeConvention } from './DateTimeConventions';

/**
 * Time component properties interface
 */
export interface ITimeComponentProps {
  disabled?: boolean;
  value: number;
  onChange: (value?: string) => void;
}

/**
 * Hours component property interface
 */
export interface IHoursComponentProps extends ITimeComponentProps {
  timeConvention: TimeConvention;
}
