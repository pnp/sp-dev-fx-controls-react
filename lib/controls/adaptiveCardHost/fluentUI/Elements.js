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
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ThemeProvider } from "@fluentui/react-theme-provider";
import { ActionProperty, Choice, Input, TimeProperty } from "adaptivecards/lib/card-elements";
import { InputTextStyle, ValidationEvent } from "adaptivecards/lib/enums";
import { BoolProperty, EnumProperty, NumProperty, property, SerializableObjectCollectionProperty, StringProperty, ValueSetProperty, Versions } from "adaptivecards/lib/serialization";
import { Strings } from "adaptivecards/lib/strings";
import { DefaultButton, IconButton } from "@fluentui/react/lib/Button";
import { Checkbox } from "@fluentui/react/lib/Checkbox";
import { ChoiceGroup } from "@fluentui/react/lib/ChoiceGroup";
import { ComboBox } from "@fluentui/react/lib/ComboBox";
import { DatePicker } from "@fluentui/react/lib/DatePicker";
import { initializeIcons } from "@fluentui/react/lib/Icons";
import { SpinButton } from "@fluentui/react/lib/SpinButton";
import { Stack } from "@fluentui/react/lib/Stack";
import { TextField } from "@fluentui/react/lib/TextField";
import { Toggle } from "@fluentui/react/lib/Toggle";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { getFluentUIThemeFromHostCapability, hostCapabilitiesFluentUIThemeKey } from "./HostCapability";
var internalRender = function (renderReact) {
    var div = document.createElement("div");
    ReactDOM.render(renderReact(), div); // eslint-disable-line @microsoft/spfx/pair-react-dom-render-unmount
    return div;
};
var inlineButtonRootStyle = {
    marginLeft: 8,
};
var FluentUIChoiceSetInput = /** @class */ (function (_super) {
    __extends(FluentUIChoiceSetInput, _super);
    function FluentUIChoiceSetInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isMultiSelect = false;
        _this.wrap = false;
        _this.choices = [];
        _this.selectedValues = [];
        _this.defaultSelectedValues = [];
        _this.updateSelectedValues = function (key, isMultiSelect, selected) {
            if (isMultiSelect) {
                if (selected) {
                    _this.selectedValues.push(key);
                }
                else {
                    _this.removeItemFromArray(_this.selectedValues, key);
                }
            }
            else {
                _this.selectedValues = [];
                _this.selectedValues.push(key);
            }
        };
        _this.removeItemFromArray = function (arr, item) {
            var index = arr.indexOf(item);
            arr.splice(index, 1);
        };
        return _this;
    }
    Object.defineProperty(FluentUIChoiceSetInput.prototype, "isCompact", {
        get: function () {
            return !this.style || this.style === "compact";
        },
        set: function (value) {
            this.style = value ? undefined : "expanded";
        },
        enumerable: false,
        configurable: true
    });
    FluentUIChoiceSetInput.prototype.internalRender = function () {
        var _this = this;
        var theme = getFluentUIThemeFromHostCapability(this.hostConfig);
        if (this.defaultValue) {
            this.defaultSelectedValues = this.defaultValue.split(this.hostConfig.choiceSetInputValueSeparator);
            this.selectedValues = this.defaultSelectedValues;
        }
        var optionsChoiceGroup = (this.choices) ?
            this.choices.map(function (x, index) {
                return {
                    key: x.value, text: x.title,
                    styles: { root: { marginTop: index > 0 ? _this.hostConfig.spacing.default : 0 } }
                };
            })
            : [];
        var options = (this.choices) ?
            this.choices.map(function (x) { return { key: x.value, text: x.title }; })
            : [];
        var control = function () {
            return React.createElement(React.Fragment, null,
                _this.isMultiSelect === false && _this.style === "expanded" &&
                    React.createElement(ThemeProvider, { theme: theme, style: { backgroundColor: "transparent" } },
                        React.createElement(ChoiceGroup, { defaultSelectedKey: _this.defaultValue, options: optionsChoiceGroup, onChange: function (ev, option) {
                                _this.updateSelectedValues(option.key, _this.isMultiSelect, true);
                                _this.valueChanged();
                            }, componentRef: function (input) { _this.refControl = input; } })),
                _this.isMultiSelect === true && _this.style === "expanded" &&
                    React.createElement(Stack, { tokens: { childrenGap: _this.hostConfig.spacing.default } }, _this.choices.map(function (x, index) {
                        var defaultChecked = _this.defaultSelectedValues.indexOf(x.value) > -1;
                        return React.createElement(ThemeProvider, { key: x.value, theme: theme, style: { backgroundColor: "transparent" } },
                            React.createElement(Checkbox, { title: x.title, key: x.value, defaultChecked: defaultChecked, label: x.title, onChange: function (ev, checked) {
                                    _this.updateSelectedValues(x.value, _this.isMultiSelect, checked);
                                    _this.valueChanged();
                                }, componentRef: function (input) {
                                    if (index === 0)
                                        _this.refControl = input;
                                } }));
                    })),
                (_this.style === "compact" || _this.style === "filtered") &&
                    React.createElement(ThemeProvider, { theme: theme, style: { backgroundColor: "transparent" } },
                        React.createElement(ComboBox, { placeholder: _this.placeholder, multiSelect: _this.isMultiSelect, defaultSelectedKey: _this.defaultSelectedValues, allowFreeform: false, autoComplete: (_this.style === "filtered") ? "on" : "off", options: options, onChange: function (ev, option, index, value) {
                                _this.updateSelectedValues(option.key.toString(), _this.isMultiSelect, (_this.isMultiSelect) ? option.selected : true);
                                _this.valueChanged();
                            }, componentRef: function (input) { _this.refControl = input; } })));
        };
        this.element = internalRender(control);
        this.element.style.width = "100%";
        return this.element;
    };
    FluentUIChoiceSetInput.prototype.getJsonTypeName = function () {
        return "Input.ChoiceSet";
    };
    FluentUIChoiceSetInput.prototype.focus = function () {
        if (this.refControl)
            this.refControl.focus();
    };
    FluentUIChoiceSetInput.prototype.internalValidateProperties = function (context) {
        _super.prototype.internalValidateProperties.call(this, context);
        if (this.choices.length === 0) {
            context.addFailure(this, ValidationEvent.CollectionCantBeEmpty, Strings.errors.choiceSetMustHaveAtLeastOneChoice());
        }
        for (var _i = 0, _a = this.choices; _i < _a.length; _i++) {
            var choice = _a[_i];
            if (!choice.title || !choice.value) {
                context.addFailure(this, ValidationEvent.PropertyCantBeNull, Strings.errors.choiceSetChoicesMustHaveTitleAndValue());
            }
        }
    };
    FluentUIChoiceSetInput.prototype.isSet = function () {
        return this.value ? true : false;
    };
    FluentUIChoiceSetInput.prototype.isValid = function () {
        if (!this.value) {
            return !this.isRequired;
        }
        return true;
    };
    Object.defineProperty(FluentUIChoiceSetInput.prototype, "value", {
        get: function () {
            var _this = this;
            if (this.selectedValues) {
                var result_1 = "";
                this.selectedValues.map(function (x) {
                    if (result_1 !== "") {
                        result_1 += _this.hostConfig.choiceSetInputValueSeparator;
                    }
                    result_1 += x;
                });
                return result_1;
            }
            else {
                return undefined;
            }
        },
        enumerable: false,
        configurable: true
    });
    FluentUIChoiceSetInput.valueProperty = new StringProperty(Versions.v1_0, "value");
    FluentUIChoiceSetInput.choicesProperty = new SerializableObjectCollectionProperty(Versions.v1_0, "choices", Choice);
    FluentUIChoiceSetInput.styleProperty = new ValueSetProperty(Versions.v1_0, "style", [
        { value: "compact" },
        { value: "expanded" },
        { value: "filtered", targetVersion: Versions.v1_5 }
    ], "compact");
    FluentUIChoiceSetInput.isMultiSelectProperty = new BoolProperty(Versions.v1_0, "isMultiSelect", false);
    FluentUIChoiceSetInput.placeholderProperty = new StringProperty(Versions.v1_0, "placeholder");
    FluentUIChoiceSetInput.wrapProperty = new BoolProperty(Versions.v1_2, "wrap", false);
    __decorate([
        property(FluentUIChoiceSetInput.valueProperty)
    ], FluentUIChoiceSetInput.prototype, "defaultValue", void 0);
    __decorate([
        property(FluentUIChoiceSetInput.styleProperty)
    ], FluentUIChoiceSetInput.prototype, "style", void 0);
    __decorate([
        property(FluentUIChoiceSetInput.isMultiSelectProperty)
    ], FluentUIChoiceSetInput.prototype, "isMultiSelect", void 0);
    __decorate([
        property(FluentUIChoiceSetInput.placeholderProperty)
    ], FluentUIChoiceSetInput.prototype, "placeholder", void 0);
    __decorate([
        property(FluentUIChoiceSetInput.wrapProperty)
    ], FluentUIChoiceSetInput.prototype, "wrap", void 0);
    __decorate([
        property(FluentUIChoiceSetInput.choicesProperty)
    ], FluentUIChoiceSetInput.prototype, "choices", void 0);
    return FluentUIChoiceSetInput;
}(Input));
export { FluentUIChoiceSetInput };
var FluentUIDateInput = /** @class */ (function (_super) {
    __extends(FluentUIDateInput, _super);
    function FluentUIDateInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FluentUIDateInput.prototype.internalRender = function () {
        var _this = this;
        var theme = getFluentUIThemeFromHostCapability(this.hostConfig);
        var control = function () {
            return React.createElement(ThemeProvider, { theme: theme },
                React.createElement(DatePicker, { id: _this.id, placeholder: _this.placeholder, minDate: _this.convertStringToDate(_this.min), maxDate: _this.convertStringToDate(_this.max), onSelectDate: function (date) {
                        _this._value = date;
                        _this.valueChanged();
                    }, theme: theme, value: _this.defaultValue ? _this.convertStringToDate(_this.defaultValue) : undefined, componentRef: function (input) { _this.refControl = input; } }));
        };
        this.element = internalRender(control);
        this.element.style.width = "100%";
        return this.element;
    };
    FluentUIDateInput.prototype.convertStringToDate = function (value) {
        if (value) {
            try {
                return new Date(value);
            }
            catch (_a) {
                return null;
            }
        }
        else {
            return null;
        }
    };
    FluentUIDateInput.prototype.getJsonTypeName = function () {
        return "Input.Date";
    };
    FluentUIDateInput.prototype.focus = function () {
        if (this.refControl)
            this.refControl.focus();
    };
    FluentUIDateInput.prototype.updateInputControlAriaLabelledBy = function () {
        if (this.element) {
            var joinedLabelIds = this.getAllLabelIds().join(" ");
            if (joinedLabelIds) {
                this.element.setAttribute("aria-labelledby", joinedLabelIds);
            }
            else {
                this.element.removeAttribute("aria-labelledby");
            }
        }
    };
    FluentUIDateInput.prototype.isSet = function () {
        return this.value ? true : false;
    };
    FluentUIDateInput.prototype.isValid = function () {
        if (!this.value) {
            return !this.isRequired;
        }
        var valueAsDate = new Date(this.value);
        var result = true;
        if (this.min) {
            var minDate = new Date(this.min);
            result = result && valueAsDate >= minDate;
        }
        if (this.max) {
            var maxDate = new Date(this.max);
            result = result && valueAsDate <= maxDate;
        }
        return result;
    };
    Object.defineProperty(FluentUIDateInput.prototype, "value", {
        get: function () {
            if (this._value) {
                var offset = this._value.getTimezoneOffset();
                var value = new Date(this._value.getTime() - (offset * 60 * 1000));
                return value.toISOString().split('T')[0];
            }
            else if (this.defaultValue) {
                var date = this.convertStringToDate(this.defaultValue);
                var offset = date.getTimezoneOffset();
                var value = new Date(date.getTime() - (offset * 60 * 1000));
                return value.toISOString().split('T')[0];
            }
            else {
                return undefined;
            }
        },
        enumerable: false,
        configurable: true
    });
    FluentUIDateInput.valueProperty = new StringProperty(Versions.v1_0, "value");
    FluentUIDateInput.placeholderProperty = new StringProperty(Versions.v1_0, "placeholder");
    FluentUIDateInput.minProperty = new StringProperty(Versions.v1_0, "min");
    FluentUIDateInput.maxProperty = new StringProperty(Versions.v1_0, "max");
    __decorate([
        property(FluentUIDateInput.valueProperty)
    ], FluentUIDateInput.prototype, "defaultValue", void 0);
    __decorate([
        property(FluentUIDateInput.minProperty)
    ], FluentUIDateInput.prototype, "min", void 0);
    __decorate([
        property(FluentUIDateInput.maxProperty)
    ], FluentUIDateInput.prototype, "max", void 0);
    __decorate([
        property(FluentUIDateInput.placeholderProperty)
    ], FluentUIDateInput.prototype, "placeholder", void 0);
    return FluentUIDateInput;
}(Input));
export { FluentUIDateInput };
var FluentUINumberInput = /** @class */ (function (_super) {
    __extends(FluentUINumberInput, _super);
    function FluentUINumberInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FluentUINumberInput.prototype.internalRender = function () {
        var _this = this;
        var theme = getFluentUIThemeFromHostCapability(this.hostConfig);
        var control = function () {
            return React.createElement(SpinButton, { id: _this.id, defaultValue: "".concat(_this.defaultValue), placeholder: _this.placeholder, min: _this.min, max: _this.max, onChange: function () { return _this.valueChanged(); }, theme: theme, componentRef: function (input) { _this.refControl = input; } });
        };
        this.element = internalRender(control);
        this.element.style.width = "100%";
        return this.element;
    };
    FluentUINumberInput.prototype.getJsonTypeName = function () {
        return "Input.Number";
    };
    FluentUINumberInput.prototype.focus = function () {
        if (this.refControl)
            this.refControl.focus();
    };
    FluentUINumberInput.prototype.updateInputControlAriaLabelledBy = function () {
        if (this.element) {
            var joinedLabelIds = this.getAllLabelIds().join(" ");
            if (joinedLabelIds) {
                this.element.setAttribute("aria-labelledby", joinedLabelIds);
            }
            else {
                this.element.removeAttribute("aria-labelledby");
            }
        }
    };
    FluentUINumberInput.prototype.isSet = function () {
        return this.value !== undefined && !isNaN(this.value);
    };
    FluentUINumberInput.prototype.isValid = function () {
        if (!this.value) {
            return !this.isRequired;
        }
        var result = true;
        if (this.min !== undefined) {
            result = result && this.value >= this.min;
        }
        if (this.max !== undefined) {
            result = result && this.value <= this.max;
        }
        return result;
    };
    Object.defineProperty(FluentUINumberInput.prototype, "value", {
        get: function () {
            if (this.refControl) {
                return Number(this.refControl.value);
            }
            else {
                return undefined;
            }
        },
        enumerable: false,
        configurable: true
    });
    FluentUINumberInput.valueProperty = new NumProperty(Versions.v1_0, "value");
    FluentUINumberInput.placeholderProperty = new StringProperty(Versions.v1_0, "placeholder");
    FluentUINumberInput.minProperty = new NumProperty(Versions.v1_0, "min");
    FluentUINumberInput.maxProperty = new NumProperty(Versions.v1_0, "max");
    __decorate([
        property(FluentUINumberInput.valueProperty)
    ], FluentUINumberInput.prototype, "defaultValue", void 0);
    __decorate([
        property(FluentUINumberInput.minProperty)
    ], FluentUINumberInput.prototype, "min", void 0);
    __decorate([
        property(FluentUINumberInput.maxProperty)
    ], FluentUINumberInput.prototype, "max", void 0);
    __decorate([
        property(FluentUINumberInput.placeholderProperty)
    ], FluentUINumberInput.prototype, "placeholder", void 0);
    return FluentUINumberInput;
}(Input));
export { FluentUINumberInput };
var FluentUITextInput = /** @class */ (function (_super) {
    __extends(FluentUITextInput, _super);
    function FluentUITextInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.isMultiline = false;
        _this.style = InputTextStyle.Text;
        _this.handleKeyDown = function (e) {
            // Enter pressed
            if (e.key === 'Enter' && _this.inlineAction) {
                _this.inlineAction.execute();
            }
        };
        _this.buildInlineActionButton = function () {
            return internalRender((_this.inlineAction.iconUrl) ?
                _this.inlineIconActionButton :
                _this.buildTextOnlyInlineActionActionButton);
        };
        _this.inlineActionClickHandler = function (e) {
            e.stopPropagation();
            e.preventDefault();
            _this.inlineAction.execute();
        };
        _this.inlineIconActionButton = function () {
            var theme = _this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
            return React.createElement(IconButton, { default: true, text: _this.inlineAction.title, ariaDescription: _this.inlineAction.title, className: _this.hostConfig.makeCssClassName("ac-inlineActionButton", "iconOnly"), theme: theme, styles: {
                    icon: {
                        height: "100%",
                    },
                    root: inlineButtonRootStyle,
                }, iconProps: {
                    imageProps: {
                        height: "100%",
                        src: _this.inlineAction.iconUrl,
                    },
                }, onClick: _this.inlineActionClickHandler });
        };
        _this.buildTextOnlyInlineActionActionButton = function () {
            var theme = _this.hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
            return React.createElement(DefaultButton, { className: _this.hostConfig.makeCssClassName("ac-inlineActionButton", "textOnly"), text: _this.inlineAction.title, ariaDescription: _this.inlineAction.title, onClick: _this.inlineActionClickHandler, styles: {
                    root: inlineButtonRootStyle,
                }, theme: theme });
        };
        return _this;
    }
    FluentUITextInput.prototype.internalRender = function () {
        var _this = this;
        var theme = getFluentUIThemeFromHostCapability(this.hostConfig);
        var control = function () {
            return React.createElement(TextField, { id: _this.id, type: InputTextStyle[_this.style].toLowerCase(), defaultValue: _this.defaultValue, multiline: _this.isMultiline, maxLength: _this.maxLength, placeholder: _this.placeholder, pattern: _this.regex, onChange: function () { return _this.valueChanged(); }, onKeyDown: _this.handleKeyDown, theme: theme, componentRef: function (input) { _this.refControl = input; } });
        };
        this.element = internalRender(control);
        this.element.style.width = "100%";
        return this.element;
    };
    FluentUITextInput.prototype.overrideInternalRender = function () {
        var inputControl = _super.prototype.overrideInternalRender.call(this);
        if (this.inlineAction) {
            this.inputControlContainerElement.appendChild(this.buildInlineActionButton());
        }
        return inputControl;
    };
    FluentUITextInput.prototype.getJsonTypeName = function () {
        return "Input.Text";
    };
    FluentUITextInput.prototype.focus = function () {
        if (this.refControl)
            this.refControl.focus();
    };
    FluentUITextInput.prototype.updateInputControlAriaLabelledBy = function () {
        if (this.element) {
            var joinedLabelIds = this.getAllLabelIds().join(" ");
            if (joinedLabelIds) {
                this.element.setAttribute("aria-labelledby", joinedLabelIds);
            }
            else {
                this.element.removeAttribute("aria-labelledby");
            }
        }
    };
    FluentUITextInput.prototype.getActionById = function (id) {
        var result = _super.prototype.getActionById.call(this, id);
        if (!result && this.inlineAction) {
            result = this.inlineAction.getActionById(id);
        }
        return result;
    };
    FluentUITextInput.prototype.isSet = function () {
        return this.value ? true : false;
    };
    FluentUITextInput.prototype.isValid = function () {
        if (!this.value) {
            return !this.isRequired;
        }
        if (this.regex) {
            return new RegExp(this.regex, "g").test(this.value); // eslint-disable-line @rushstack/security/no-unsafe-regexp
        }
        return true;
    };
    Object.defineProperty(FluentUITextInput.prototype, "value", {
        get: function () {
            var _a;
            if (this.renderedInputControlElement) {
                return (_a = this.refControl) === null || _a === void 0 ? void 0 : _a.value;
            }
            else {
                return undefined;
            }
        },
        enumerable: false,
        configurable: true
    });
    FluentUITextInput.valueProperty = new StringProperty(Versions.v1_0, "value");
    FluentUITextInput.maxLengthProperty = new NumProperty(Versions.v1_0, "maxLength");
    FluentUITextInput.isMultilineProperty = new BoolProperty(Versions.v1_0, "isMultiline", false);
    FluentUITextInput.placeholderProperty = new StringProperty(Versions.v1_0, "placeholder");
    FluentUITextInput.styleProperty = new EnumProperty(Versions.v1_0, "style", InputTextStyle, InputTextStyle.Text);
    FluentUITextInput.inlineActionProperty = new ActionProperty(Versions.v1_0, "inlineAction", ["Action.ShowCard"]);
    FluentUITextInput.regexProperty = new StringProperty(Versions.v1_3, "regex", true);
    __decorate([
        property(FluentUITextInput.valueProperty)
    ], FluentUITextInput.prototype, "defaultValue", void 0);
    __decorate([
        property(FluentUITextInput.maxLengthProperty)
    ], FluentUITextInput.prototype, "maxLength", void 0);
    __decorate([
        property(FluentUITextInput.isMultilineProperty)
    ], FluentUITextInput.prototype, "isMultiline", void 0);
    __decorate([
        property(FluentUITextInput.placeholderProperty)
    ], FluentUITextInput.prototype, "placeholder", void 0);
    __decorate([
        property(FluentUITextInput.styleProperty)
    ], FluentUITextInput.prototype, "style", void 0);
    __decorate([
        property(FluentUITextInput.inlineActionProperty)
    ], FluentUITextInput.prototype, "inlineAction", void 0);
    __decorate([
        property(FluentUITextInput.regexProperty)
    ], FluentUITextInput.prototype, "regex", void 0);
    return FluentUITextInput;
}(Input));
export { FluentUITextInput };
var FluentUITimeInput = /** @class */ (function (_super) {
    __extends(FluentUITimeInput, _super);
    function FluentUITimeInput() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FluentUITimeInput.convertTimeStringToDate = function (timeString) {
        return new Date("1973-09-04T" + timeString + ":00Z");
    };
    FluentUITimeInput.prototype.internalRender = function () {
        var _this = this;
        var theme = getFluentUIThemeFromHostCapability(this.hostConfig);
        var control = function () {
            return React.createElement(TextField, { id: _this.id, type: "time", defaultValue: _this.defaultValue, min: _this.min, max: _this.max, placeholder: _this.placeholder, onChange: function () { return _this.valueChanged(); }, theme: theme, componentRef: function (input) { _this.refControl = input; } });
        };
        this.element = internalRender(control);
        this.element.style.width = "100%";
        return this.element;
    };
    FluentUITimeInput.prototype.getJsonTypeName = function () {
        return "Input.Time";
    };
    FluentUITimeInput.prototype.focus = function () {
        if (this.refControl)
            this.refControl.focus();
    };
    FluentUITimeInput.prototype.updateInputControlAriaLabelledBy = function () {
        if (this.element) {
            var joinedLabelIds = this.getAllLabelIds().join(" ");
            if (joinedLabelIds) {
                this.element.setAttribute("aria-labelledby", joinedLabelIds);
            }
            else {
                this.element.removeAttribute("aria-labelledby");
            }
        }
    };
    FluentUITimeInput.prototype.isSet = function () {
        return this.value ? true : false;
    };
    FluentUITimeInput.prototype.isValid = function () {
        if (!this.value) {
            return !this.isRequired;
        }
        var valueAsDate = FluentUITimeInput.convertTimeStringToDate(this.value);
        var result = true;
        if (this.min) {
            var minDate = FluentUITimeInput.convertTimeStringToDate(this.min);
            result = result && valueAsDate >= minDate;
        }
        if (this.max) {
            var maxDate = FluentUITimeInput.convertTimeStringToDate(this.max);
            result = result && valueAsDate <= maxDate;
        }
        return result;
    };
    Object.defineProperty(FluentUITimeInput.prototype, "value", {
        get: function () {
            var _a;
            if (this.renderedInputControlElement) {
                return (_a = this.refControl) === null || _a === void 0 ? void 0 : _a.value;
            }
            else {
                return undefined;
            }
        },
        enumerable: false,
        configurable: true
    });
    FluentUITimeInput.valueProperty = new TimeProperty(Versions.v1_0, "value");
    FluentUITimeInput.placeholderProperty = new StringProperty(Versions.v1_0, "placeholder");
    FluentUITimeInput.minProperty = new TimeProperty(Versions.v1_0, "min");
    FluentUITimeInput.maxProperty = new TimeProperty(Versions.v1_0, "max");
    __decorate([
        property(FluentUITimeInput.valueProperty)
    ], FluentUITimeInput.prototype, "defaultValue", void 0);
    __decorate([
        property(FluentUITimeInput.minProperty)
    ], FluentUITimeInput.prototype, "min", void 0);
    __decorate([
        property(FluentUITimeInput.maxProperty)
    ], FluentUITimeInput.prototype, "max", void 0);
    __decorate([
        property(FluentUITimeInput.placeholderProperty)
    ], FluentUITimeInput.prototype, "placeholder", void 0);
    return FluentUITimeInput;
}(Input));
export { FluentUITimeInput };
var FluentUIToggleInput = /** @class */ (function (_super) {
    __extends(FluentUIToggleInput, _super);
    function FluentUIToggleInput() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.valueOn = "true";
        _this.valueOff = "false";
        _this.wrap = false;
        return _this;
    }
    FluentUIToggleInput.prototype.internalRender = function () {
        var _this = this;
        var theme = getFluentUIThemeFromHostCapability(this.hostConfig);
        var control = function () {
            return React.createElement(ThemeProvider, { theme: theme, style: { backgroundColor: "transparent" } },
                React.createElement(Toggle, { id: _this.id, inlineLabel: true, onText: _this.title, offText: _this.title, onChange: function (event, checked) {
                        _this._value = checked;
                        _this.valueChanged();
                    }, defaultChecked: _this.defaultValue === _this.valueOn, styles: { root: { marginBottom: 0, marginTop: 0 } }, componentRef: function (input) { _this.refControl = input; } }));
        };
        this.element = internalRender(control);
        this.element.style.width = "100%";
        return this.element;
    };
    Object.defineProperty(FluentUIToggleInput.prototype, "isNullable", {
        get: function () {
            return false;
        },
        enumerable: false,
        configurable: true
    });
    FluentUIToggleInput.prototype.getJsonTypeName = function () {
        return "Input.Toggle";
    };
    FluentUIToggleInput.prototype.focus = function () {
        if (this.refControl)
            this.refControl.focus();
    };
    FluentUIToggleInput.prototype.updateInputControlAriaLabelledBy = function () {
        if (this.element) {
            var joinedLabelIds = this.getAllLabelIds().join(" ");
            if (joinedLabelIds) {
                this.element.setAttribute("aria-labelledby", joinedLabelIds);
            }
            else {
                this.element.removeAttribute("aria-labelledby");
            }
        }
    };
    FluentUIToggleInput.prototype.isSet = function () {
        if (this.isRequired) {
            return this.value === this.valueOn;
        }
        return this.value ? true : false;
    };
    Object.defineProperty(FluentUIToggleInput.prototype, "value", {
        get: function () {
            if (this._value !== null && this._value !== undefined) {
                return this._value ? this.valueOn : this.valueOff;
            }
            else {
                if (this.isRequired) {
                    return undefined;
                }
                else {
                    return this.valueOff;
                }
            }
        },
        enumerable: false,
        configurable: true
    });
    FluentUIToggleInput.valueProperty = new StringProperty(Versions.v1_0, "value");
    FluentUIToggleInput.titleProperty = new StringProperty(Versions.v1_0, "title");
    FluentUIToggleInput.valueOnProperty = new StringProperty(Versions.v1_0, "valueOn", true, undefined, "true", function (_sender) {
        return "true";
    });
    FluentUIToggleInput.valueOffProperty = new StringProperty(Versions.v1_0, "valueOff", true, undefined, "false", function (_sender) {
        return "false";
    });
    FluentUIToggleInput.wrapProperty = new BoolProperty(Versions.v1_2, "wrap", false);
    __decorate([
        property(FluentUIToggleInput.valueProperty)
    ], FluentUIToggleInput.prototype, "defaultValue", void 0);
    __decorate([
        property(FluentUIToggleInput.titleProperty)
    ], FluentUIToggleInput.prototype, "title", void 0);
    __decorate([
        property(FluentUIToggleInput.valueOnProperty)
    ], FluentUIToggleInput.prototype, "valueOn", void 0);
    __decorate([
        property(FluentUIToggleInput.valueOffProperty)
    ], FluentUIToggleInput.prototype, "valueOff", void 0);
    __decorate([
        property(FluentUIToggleInput.wrapProperty)
    ], FluentUIToggleInput.prototype, "wrap", void 0);
    return FluentUIToggleInput;
}(Input));
export { FluentUIToggleInput };
export function registerFluentUIElements(registry) {
    initializeIcons();
    registry.register("Input.Text", FluentUITextInput);
    registry.register("Input.Number", FluentUINumberInput);
    registry.register("Input.Time", FluentUITimeInput);
    registry.register("Input.Date", FluentUIDateInput);
    registry.register("Input.Toggle", FluentUIToggleInput);
    registry.register("Input.ChoiceSet", FluentUIChoiceSetInput);
}
//# sourceMappingURL=Elements.js.map