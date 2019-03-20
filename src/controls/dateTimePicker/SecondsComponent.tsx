import * as React from "react";
import { ITimeComponentProps } from "./ITimeComponentProps";
import {
  Dropdown,
  IDropdownOption
} from "office-ui-fabric-react/lib/components/Dropdown";

/**
 * Seconds component, renders the seconds dropdown
 */
export default class SecondsComponent extends React.Component<
  ITimeComponentProps,
  {}
  > {
  public render(): JSX.Element {
    let seconds: IDropdownOption[] = [];
    for (let k = 0; k < 60; k++) {
      let digitSec: string;
      if (k < 10) {
        digitSec = "0" + k;
      } else {
        digitSec = k.toString();
      }
      let selected: boolean = false;
      if (k === this.props.value) {
        selected = true;
      }
      seconds.push({ key: k, text: digitSec, isSelected: selected });
    }

    return (
      <Dropdown
        key={this.props.value}
        disabled={this.props.disabled}
        label=""
        options={seconds}
        onChanged={this.props.onChange}
      />
    );
  }
}
