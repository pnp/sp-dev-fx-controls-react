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
import { ActionButton, Checkbox, ChoiceGroup, ComboBox, CompoundButton, DatePicker, DefaultButton, IconButton, Link, PrimaryButton, SelectableOptionMenuItemType, SpinButton, Stack, TextField, Toggle, } from "@fluentui/react";
import * as React from "react";
import { ThemeContext, useTheme } from "../../../EnhancedThemeProvider";
import { Placeholder } from "../../../Placeholder";
export var ControlsTestEnhancedThemeProviderFunctionComponent = function () {
    var theme = useTheme();
    return (React.createElement(Stack, { tokens: { childrenGap: 10 } },
        React.createElement("h1", null, "Title H1"),
        React.createElement("h2", null, "Title H2"),
        React.createElement("h3", null, "Title H3"),
        React.createElement("p", null, "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed mollis malesuada elit, in accumsan erat vehicula nec. Donec molestie eu quam vel pulvinar. Proin eu est a felis hendrerit sodales. Quisque non consequat sapien. Donec at neque libero. In vel ante nec ex sagittis consectetur. Ut euismod nunc sed ullamcorper tincidunt. Morbi justo dolor, rutrum vehicula urna quis, tempor pulvinar ligula. Sed quis gravida mi. In fermentum augue rhoncus odio lacinia pharetra. Aliquam elementum mollis nibh, rutrum iaculis tortor."),
        React.createElement(Placeholder, { iconName: "Edit", iconText: "Configure your web part", description: "Please configure the web part.", buttonLabel: "Configure", onConfigure: function () {
                alert("onConfigure");
            } }),
        React.createElement(Link, { theme: theme, href: "#" }, "Fluent Link"),
        React.createElement(ActionButton, { theme: theme }, "Action Button"),
        React.createElement(PrimaryButton, { theme: theme }, "PrimaryButton"),
        React.createElement(DefaultButton, { theme: theme }, "DefaultButton"),
        React.createElement(CompoundButton, { theme: theme, secondaryText: "This is the secondary text." }, "CompoundButton"),
        React.createElement(IconButton, { iconProps: { iconName: "Emoji2" }, title: "Emoji", ariaLabel: "Emoji", disabled: false, checked: false }),
        React.createElement(IconButton, { iconProps: { iconName: "Emoji2" }, title: "Emoji", ariaLabel: "Emoji", disabled: true, checked: false }),
        React.createElement(IconButton, { iconProps: { iconName: "Emoji2" }, title: "Emoji", ariaLabel: "Emoji", disabled: true, checked: true }),
        React.createElement(IconButton, { iconProps: { iconName: "Emoji2" }, title: "Emoji", ariaLabel: "Emoji", disabled: false, checked: true })));
};
var ControlsTestEnhancedThemeProvider = /** @class */ (function (_super) {
    __extends(ControlsTestEnhancedThemeProvider, _super);
    function ControlsTestEnhancedThemeProvider() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ControlsTestEnhancedThemeProvider.prototype.render = function () {
        return (React.createElement(ThemeContext.Consumer, null, function (theme) { return (React.createElement(Stack, { tokens: { childrenGap: 10 } },
            React.createElement(ChoiceGroup, { defaultSelectedKey: "B", options: [
                    { key: "A", text: "Option A" },
                    { key: "B", text: "Option B" },
                    { key: "C", text: "Option C", disabled: true },
                    { key: "D", text: "Option D" },
                ], label: "Pick one", required: true }),
            React.createElement(Checkbox, { label: "Unchecked checkbox (uncontrolled)" }),
            React.createElement(Checkbox, { label: "Checked checkbox (uncontrolled)", defaultChecked: true }),
            React.createElement(Checkbox, { label: "Disabled checkbox", disabled: true }),
            React.createElement(Checkbox, { label: "Disabled checked checkbox", disabled: true, defaultChecked: true }),
            React.createElement(ComboBox, { theme: theme, defaultSelectedKey: "C", label: "Basic single-select ComboBox", options: [
                    {
                        key: "Header1",
                        text: "First heading",
                        itemType: SelectableOptionMenuItemType.Header,
                    },
                    { key: "A", text: "Option A" },
                    { key: "B", text: "Option B" },
                    { key: "C", text: "Option C" },
                    { key: "D", text: "Option D" },
                    {
                        key: "divider",
                        text: "-",
                        itemType: SelectableOptionMenuItemType.Divider,
                    },
                    {
                        key: "Header2",
                        text: "Second heading",
                        itemType: SelectableOptionMenuItemType.Header,
                    },
                    { key: "E", text: "Option E" },
                    { key: "F", text: "Option F", disabled: true },
                    { key: "G", text: "Option G" },
                    { key: "H", text: "Option H" },
                    { key: "I", text: "Option I" },
                    { key: "J", text: "Option J" },
                ] }),
            React.createElement(DatePicker, { theme: theme }),
            React.createElement(SpinButton, { label: "Basic SpinButton", defaultValue: "0", min: 0, max: 100, step: 1, incrementButtonAriaLabel: "Increase value by 1", decrementButtonAriaLabel: "Decrease value by 1" }),
            React.createElement(TextField, { theme: theme, label: "Standard" }),
            React.createElement(Toggle, { label: "Enabled and checked", defaultChecked: true, onText: "On", offText: "Off" }),
            React.createElement(Toggle, { label: "Enabled and unchecked", onText: "On", offText: "Off" }),
            React.createElement(Toggle, { label: "Disabled and checked", defaultChecked: true, disabled: true, onText: "On", offText: "Off" }),
            React.createElement(Toggle, { label: "Disabled and unchecked", disabled: true, onText: "On", offText: "Off" }),
            React.createElement(Toggle, { label: "With inline label", inlineLabel: true, onText: "On", offText: "Off" }),
            React.createElement(Toggle, { label: "Disabled with inline label", inlineLabel: true, disabled: true, onText: "On", offText: "Off" }),
            React.createElement(Toggle, { label: "With inline label and without onText and offText", inlineLabel: true }),
            React.createElement(Toggle, { label: "Disabled with inline label and without onText and offText", inlineLabel: true, disabled: true }))); }));
    };
    return ControlsTestEnhancedThemeProvider;
}(React.Component));
export { ControlsTestEnhancedThemeProvider };
//# sourceMappingURL=ControlsTestEnhancedThemeProvider.js.map