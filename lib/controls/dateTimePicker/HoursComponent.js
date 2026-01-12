var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import * as strings from 'ControlStrings';
import * as React from 'react';
import { TimeConvention } from './DateTimeConventions';
import { MaskedTextField } from '@fluentui/react/lib/TextField';
import { TimeHelper } from './TimeHelper';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { TimeDisplayControlType } from './TimeDisplayControlType';
/**
 * Hours component, this renders the hours dropdown
 */
var HoursComponent = /** @class */ (function (_super) {
    __extends(HoursComponent, _super);
    function HoursComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._initHoursOptions();
        return _this;
    }
    HoursComponent.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, timeConvention = _a.timeConvention, value = _a.value, timeDisplayControlType = _a.timeDisplayControlType, onChange = _a.onChange;
        var renderDropdown = timeDisplayControlType === TimeDisplayControlType.Dropdown;
        if (renderDropdown) {
            return (React.createElement(Dropdown, { disabled: disabled, label: '', options: this._hours, selectedKey: value, onChanged: function (option) {
                    onChange(option.text);
                }, dropdownWidth: 110 }));
        }
        else {
            return (React.createElement(MaskedTextField, { disabled: disabled, label: "", value: value ? TimeHelper.hoursValue(value, timeConvention) : "".concat(timeConvention === TimeConvention.Hours24 ? "00" : "12 AM"), mask: timeConvention === TimeConvention.Hours24 ? "29" : "19 AM", maskFormat: {
                    '1': /[0-1]/,
                    '2': /[0-2]/,
                    '9': /[0-9]/,
                    'A': /[AaPp]/,
                    'M': /[Mm]/
                }, onChange: function (e, val) {
                    if (onChange) {
                        onChange(val);
                    }
                }, onGetErrorMessage: function (val) {
                    var message = "";
                    var hours = parseInt(val);
                    if (isNaN(hours)) {
                        message = strings.DateTimePickerHourValueInvalid;
                    }
                    if (!message && timeConvention === TimeConvention.Hours24) {
                        message = hours > 23 ? strings.DateTimePickerHourValueInvalid : "";
                    }
                    else {
                        message = hours > 12 ? strings.DateTimePickerHourValueInvalid : "";
                    }
                    /*if (!message) {
                      onChange(val);
                    }*/
                    return message;
                } }));
        }
    };
    HoursComponent.prototype._initHoursOptions = function () {
        var amDesignator = 'AM';
        var pmDesignator = 'PM';
        var hours = [];
        for (var i = 0; i < 24; i++) {
            var digit = void 0;
            if (this.props.timeConvention === TimeConvention.Hours24) {
                // 24 hours time convention
                if (i < 10) {
                    digit = '0' + i;
                }
                else {
                    digit = i.toString();
                }
            }
            else {
                // 12 hours time convention
                if (i === 0) {
                    digit = "12 ".concat(amDesignator);
                }
                else if (i < 12) {
                    digit = "".concat(i, " ").concat(amDesignator);
                }
                else {
                    if (i === 12) {
                        digit = "12 ".concat(pmDesignator);
                    }
                    else {
                        digit = "".concat((i % 12), " ").concat(pmDesignator);
                    }
                }
            }
            /*let selected: boolean = false;
            if (i === value) {
              selected = true;
            }*/
            hours.push({ key: i, text: digit });
        }
        this._hours = hours;
    };
    return HoursComponent;
}(React.Component));
export default HoursComponent;
//# sourceMappingURL=HoursComponent.js.map