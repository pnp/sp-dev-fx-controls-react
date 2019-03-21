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
        disabled={this.props.disabled}
        label=""
        options={this._seconds}
        selectedKey={this.props.value}
        onChanged={this.props.onChange}
      />
    );
  }

  private _initSecondsOptions() {
    const seconds: IDropdownOption[] = [];
    for (let k = 0; k < 60; k++) {
      const digitSec: string = k < 10 ? `0${k}` : k.toString();
      seconds.push({ key: k, text: digitSec });
    }
    this._seconds = seconds;
  }
}
