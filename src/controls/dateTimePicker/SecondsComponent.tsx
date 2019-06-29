import * as React from 'react';
import { ITimeComponentProps } from './ITimeComponentProps';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { TimeHelper } from './TimeHelper';

/**
 * Seconds component, renders the seconds dropdown
 */
export default class SecondsComponent extends React.Component<ITimeComponentProps, {}> {

  public render(): JSX.Element {
    return (
      <MaskedTextField disabled={this.props.disabled}
                       label=""
                       value={this.props.value ? TimeHelper.suffixZero(this.props.value.toString()) : "00"}
                       onGetErrorMessage={(value) => {
                        this.props.onChange(value);
                        return "";
                       }}
                       mask="59"
                       maskFormat={{
                         '5': /[0-5]/,
                         '9': /[0-9]/
                       }} />
    );
  }
}
