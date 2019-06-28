import * as strings from 'ControlStrings';
import * as React from 'react';
import { IHoursComponentProps } from './ITimeComponentProps';
import { TimeConvention } from './DateTimeConventions';
import { MaskedTextField } from 'office-ui-fabric-react/lib/TextField';
import { TimeHelper } from './TimeHelper';

/**
 * Hours component, this renders the hours dropdown
 */
export default class HoursComponent extends React.Component<IHoursComponentProps, {}> {

  public render(): JSX.Element {
    return (
      <MaskedTextField disabled={this.props.disabled}
                       label=""
                       value={this.props.value ? TimeHelper.hoursValue(this.props.value, this.props.timeConvention) : `${this.props.timeConvention === TimeConvention.Hours24 ? "00" : "12 AM"}`}
                       mask={this.props.timeConvention === TimeConvention.Hours24 ? "29" : "19 AM"}
                       maskFormat={{
                         '1': /[0-1]/,
                         '2': /[0-2]/,
                         '9': /[0-9]/,
                         'A': /[AaPp]/,
                         'M': /[Mm]/
                       }}
                       onGetErrorMessage={(value) => {
                         let message = "";
                         const hours: number = parseInt(value);
                         if (isNaN(hours)) {
                           message = strings.DateTimePickerHourValueInvalid;
                         }

                         if (!message && this.props.timeConvention === TimeConvention.Hours24) {
                           message = hours > 23 ? strings.DateTimePickerHourValueInvalid : "";
                         } else {
                           message = hours > 12 ? strings.DateTimePickerHourValueInvalid : "";
                         }

                         if (!message) {
                          this.props.onChange(value);
                         }

                         return message;
                       }} />
    );
  }
}
