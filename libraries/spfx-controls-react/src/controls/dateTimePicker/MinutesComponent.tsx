import * as strings from 'ControlStrings';
import * as React from 'react';
import { ITimeComponentProps } from './ITimeComponentProps';
import { MaskedTextField } from '@fluentui/react/lib/TextField';
import { TimeHelper } from './TimeHelper';
import { IDropdownOption, Dropdown } from '@fluentui/react/lib/Dropdown';
import { TimeDisplayControlType } from './TimeDisplayControlType';

/**
 * Minutes component, renders the minutes dropdown
 */
export default class MinutesComponent extends React.Component<ITimeComponentProps, {}> {

  private _minutes: IDropdownOption[];

  constructor(props: ITimeComponentProps) {
    super(props);

    this._initMinutesOptions(props.minutesIncrementStep || 1);
  }

  public render(): JSX.Element {

    const {
      disabled,
      value,
      onChange,
      timeDisplayControlType
    } = this.props;

    const renderDropdown = timeDisplayControlType === TimeDisplayControlType.Dropdown;

    if (renderDropdown) {
      return (
        <Dropdown
          disabled={disabled}
          label=''
          options={this._minutes}
          selectedKey={value}
          onChanged={option => {
            onChange(option.text);
          }} />
      );
    }
    else {
      return (
        <MaskedTextField disabled={disabled}
          label=""
          value={value ? TimeHelper.suffixZero(value.toString()) : "00"}
          onGetErrorMessage={(val) => {
            let message = "";
            const minutes: number = parseInt(val);
            if (isNaN(minutes)) {
              message = strings.DateTimePickerMinuteValueInvalid;
            }

            if (!message) {
              onChange(val);
            }

            return message;
          }}
          mask="59"
          maskFormat={{
            '5': /[0-5]/,
            '9': /[0-9]/
          }} />
      );
    }
  }

  private _initMinutesOptions(step: number): void {

    const minutes: IDropdownOption[] = [];
    for (let j = 0; j < 60; j += step) {
      let digitMin: string;
      if (j < 10) {
        digitMin = '0' + j;
      } else {
        digitMin = j.toString();
      }
      /*let selected: boolean = false;
      if (j === this.props.value) {
        selected = true;
      }*/
      minutes.push({ key: j, text: digitMin });
    }

    this._minutes = minutes;
  }
}
