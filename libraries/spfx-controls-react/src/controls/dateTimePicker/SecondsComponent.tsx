import * as strings from 'ControlStrings';
import * as React from 'react';
import { ITimeComponentProps } from './ITimeComponentProps';
import { MaskedTextField } from '@fluentui/react/lib/TextField';
import { TimeHelper } from './TimeHelper';
import { IDropdownOption, Dropdown } from '@fluentui/react/lib/Dropdown';
import { TimeDisplayControlType } from './TimeDisplayControlType';

/**
 * Seconds component, renders the seconds dropdown
 */
export default class SecondsComponent extends React.Component<ITimeComponentProps, {}> {

  private _seconds: IDropdownOption[];

  constructor(props: ITimeComponentProps) {
    super(props);

    this._initSecondsOptions();
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
          options={this._seconds}
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
            const seconds: number = parseInt(val);
            if (isNaN(seconds)) {
              message = strings.DateTimePickerSecondValueInvalid;
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

  private _initSecondsOptions(): void {
    const seconds: IDropdownOption[] = [];
    for (let k = 0; k < 60; k++) {
      let digitSec: string;
      if (k < 10) {
        digitSec = '0' + k;
      } else {
        digitSec = k.toString();
      }
      /*let selected: boolean = false;
      if (k === this.props.value) {
        selected = true;
      }*/
      seconds.push({ key: k, text: digitSec });
    }

    this._seconds = seconds;
  }
}
