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
import { MaskedTextField } from '@fluentui/react/lib/TextField';
import { TimeHelper } from './TimeHelper';
import { Dropdown } from '@fluentui/react/lib/Dropdown';
import { TimeDisplayControlType } from './TimeDisplayControlType';
/**
 * Minutes component, renders the minutes dropdown
 */
var MinutesComponent = /** @class */ (function (_super) {
    __extends(MinutesComponent, _super);
    function MinutesComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._initMinutesOptions(props.minutesIncrementStep || 1);
        return _this;
    }
    MinutesComponent.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, value = _a.value, onChange = _a.onChange, timeDisplayControlType = _a.timeDisplayControlType;
        var renderDropdown = timeDisplayControlType === TimeDisplayControlType.Dropdown;
        if (renderDropdown) {
            return (React.createElement(Dropdown, { disabled: disabled, label: '', options: this._minutes, selectedKey: value, onChanged: function (option) {
                    onChange(option.text);
                } }));
        }
        else {
            return (React.createElement(MaskedTextField, { disabled: disabled, label: "", value: value ? TimeHelper.suffixZero(value.toString()) : "00", onGetErrorMessage: function (val) {
                    var message = "";
                    var minutes = parseInt(val);
                    if (isNaN(minutes)) {
                        message = strings.DateTimePickerMinuteValueInvalid;
                    }
                    if (!message) {
                        onChange(val);
                    }
                    return message;
                }, mask: "59", maskFormat: {
                    '5': /[0-5]/,
                    '9': /[0-9]/
                } }));
        }
    };
    MinutesComponent.prototype._initMinutesOptions = function (step) {
        var minutes = [];
        for (var j = 0; j < 60; j += step) {
            var digitMin = void 0;
            if (j < 10) {
                digitMin = '0' + j;
            }
            else {
                digitMin = j.toString();
            }
            /*let selected: boolean = false;
            if (j === this.props.value) {
              selected = true;
            }*/
            minutes.push({ key: j, text: digitMin });
        }
        this._minutes = minutes;
    };
    return MinutesComponent;
}(React.Component));
export default MinutesComponent;
//# sourceMappingURL=MinutesComponent.js.map