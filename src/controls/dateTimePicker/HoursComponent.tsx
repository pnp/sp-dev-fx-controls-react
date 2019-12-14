import * as strings from 'ControlStrings';
import * as React from 'react';
import { IHoursComponentProps } from './ITimeComponentProps';
import { TimeConvention } from './DateTimeConventions';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { TimeHelper } from './TimeHelper';
import { IDropdownOption, Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { TimeDisplayControlType } from './TimeDisplayControlType';

/**
 * Hours component, this renders the hours dropdown
 */
export default class HoursComponent extends React.Component<IHoursComponentProps, {}> {

  private _hours: IDropdownOption[];

  constructor(props: IHoursComponentProps) {
    super(props);

    this._initHoursOptions();
  }

  public render(): JSX.Element {
    const {
      disabled,
      timeConvention,
      value,
      timeDisplayControlType,
      onChange
    } = this.props;
    const renderDropdown = timeDisplayControlType === TimeDisplayControlType.Dropdown;
    if (renderDropdown) {
      return (
        <Dropdown
          disabled={this.props.disabled}
          label=''
          options={this._hours}
          onChanged={option => {
            onChange(option.text);
          }}
          dropdownWidth={110} />);
    }
    else {
      return (
        <MaskedTextField disabled={disabled}
          label=""
          value={value ? TimeHelper.hoursValue(value, timeConvention) : `${timeConvention === TimeConvention.Hours24 ? "00" : "12 AM"}`}
          mask={timeConvention === TimeConvention.Hours24 ? "29" : "19 AM"}
          maskFormat={{
            '1': /[0-1]/,
            '2': /[0-2]/,
            '9': /[0-9]/,
            'A': /[AaPp]/,
            'M': /[Mm]/
          }}
          onGetErrorMessage={(val) => {
            let message = "";
            const hours: number = parseInt(val);
            if (isNaN(hours)) {
              message = strings.DateTimePickerHourValueInvalid;
            }

            if (!message && timeConvention === TimeConvention.Hours24) {
              message = hours > 23 ? strings.DateTimePickerHourValueInvalid : "";
            } else {
              message = hours > 12 ? strings.DateTimePickerHourValueInvalid : "";
            }

            if (!message) {
              onChange(val);
            }

            return message;
          }} />
      );
    }
  }

  private _initHoursOptions() {
    const amDesignator = 'AM';
    const pmDesignator = 'PM';

    const {
      value,
      timeConvention
    } = this.props;
    /*if (strings.AMDesignator) {
      amDesignator = ` ${strings.AMDesignator}`;
    }
    if (strings.PMDesignator) {
      pmDesignator = ` ${strings.PMDesignator}`;
    }*/

    let hours: IDropdownOption[] = [];
    for (let i = 0; i < 24; i++) {
      let digit: string;
      if (this.props.timeConvention === TimeConvention.Hours24) {
        // 24 hours time convention
        if (i < 10) {
          digit = '0' + i;
        } else {
          digit = i.toString();
        }
      } else {
        // 12 hours time convention
        if (i === 0) {
          digit = `12 ${amDesignator}`;
        } else if (i < 12) {
          digit = `${i} ${amDesignator}`;
        } else {
          if (i === 12) {
            digit = `12 ${pmDesignator}`;
          } else {
            digit = `${(i % 12)} ${pmDesignator}`;
          }
        }
      }

      let selected: boolean = false;
      if (i === value) {
        selected = true;
      }

      hours.push({ key: i, text: digit, isSelected: selected });
    }

    this._hours = hours;
  }
}
