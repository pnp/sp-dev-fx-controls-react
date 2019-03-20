import * as React from 'react';
import { ITimeComponentProps } from './ITimeComponentProps';
import {
  Dropdown,
  IDropdownOption
} from 'office-ui-fabric-react/lib/components/Dropdown';

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
    return (
      <Dropdown
        key={this.props.value}
        disabled={this.props.disabled}
        label=""
        options={this._seconds}
        onChanged={this.props.onChange}
      />
    );
  }

  private _initSecondsOptions() {
    const seconds: IDropdownOption[] = [];
    for (let k = 0; k < 60; k++) {
      let digitSec: string;
      if (k < 10) {
        digitSec = `0${k}`;
      } else {
        digitSec = k.toString();
      }
      let selected: boolean = false;
      if (k === this.props.value) {
        selected = true;
      }
      seconds.push({ key: k, text: digitSec, isSelected: selected });
    }
    this._seconds = seconds;
  }
}
