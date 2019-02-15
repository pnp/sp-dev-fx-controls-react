import * as React from 'react';
import { ITimeComponentProps } from './IDateTimePicker';
import { Dropdown, IDropdownOption } from 'office-ui-fabric-react/lib/components/Dropdown';

/**
 * Minutes component, renders the minutes dropdown
 */
export default class MinutesComponent extends React.Component<ITimeComponentProps, {}> {

  private _minutes: IDropdownOption[];

  constructor(props: ITimeComponentProps) {
    super(props);

    this._initMinutesOptions();
  }

  public render(): JSX.Element {

    return (
      <Dropdown
        disabled={this.props.disabled}
        label=''
        options={this._minutes}
        onChanged={this.props.onChange} />
    );
  }

  private _initMinutesOptions() {
    let minutes: IDropdownOption[] = [];
    for (let j = 0; j < 60; j++) {
      let digitMin: string;
      if (j < 10) {
        digitMin = '0' + j;
      } else {
        digitMin = j.toString();
      }
      let selected: boolean = false;
      if (j === this.props.value) {
        selected = true;
      }
      minutes.push({ key: j, text: digitMin, isSelected: selected });
    }

    this._minutes = minutes;
  }
}
