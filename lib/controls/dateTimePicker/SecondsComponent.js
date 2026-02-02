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
 * Seconds component, renders the seconds dropdown
 */
var SecondsComponent = /** @class */ (function (_super) {
    __extends(SecondsComponent, _super);
    function SecondsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this._initSecondsOptions();
        return _this;
    }
    SecondsComponent.prototype.render = function () {
        var _a = this.props, disabled = _a.disabled, value = _a.value, onChange = _a.onChange, timeDisplayControlType = _a.timeDisplayControlType;
        var renderDropdown = timeDisplayControlType === TimeDisplayControlType.Dropdown;
        if (renderDropdown) {
            return (React.createElement(Dropdown, { disabled: disabled, label: '', options: this._seconds, selectedKey: value, onChanged: function (option) {
                    onChange(option.text);
                } }));
        }
        else {
            return (React.createElement(MaskedTextField, { disabled: disabled, label: "", value: value ? TimeHelper.suffixZero(value.toString()) : "00", onGetErrorMessage: function (val) {
                    var message = "";
                    var seconds = parseInt(val);
                    if (isNaN(seconds)) {
                        message = strings.DateTimePickerSecondValueInvalid;
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
    SecondsComponent.prototype._initSecondsOptions = function () {
        var seconds = [];
        for (var k = 0; k < 60; k++) {
            var digitSec = void 0;
            if (k < 10) {
                digitSec = '0' + k;
            }
            else {
                digitSec = k.toString();
            }
            /*let selected: boolean = false;
            if (k === this.props.value) {
              selected = true;
            }*/
            seconds.push({ key: k, text: digitSec });
        }
        this._seconds = seconds;
    };
    return SecondsComponent;
}(React.Component));
export default SecondsComponent;
//# sourceMappingURL=SecondsComponent.js.map