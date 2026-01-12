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
import * as Adaptive from "adaptivecards";
import { ActionPeer, ActionPropertyEditor, BooleanPropertyEditor, CardElementPeer, ChoicePropertyEditor, EnumPropertyEditor, InputPeer, NumberPropertyEditor, PropertySheetCategory, StringPropertyEditor } from "adaptivecards-designer/lib/designer-peers";
import { NameValuePairPropertyEditor } from "./Shared";
var TextInputPeer = /** @class */ (function (_super) {
    __extends(TextInputPeer, _super);
    function TextInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TextInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, TextInputPeer.placeholderProperty, TextInputPeer.isMultilineProperty);
        if (!this.cardElement.isMultiline) {
            propertySheet.add(PropertySheetCategory.DefaultCategory, TextInputPeer.styleProperty);
        }
        else {
            propertySheet.add(PropertySheetCategory.LayoutCategory, CardElementPeer.heightProperty);
        }
        propertySheet.add(PropertySheetCategory.InlineAction, TextInputPeer.inlineActionProperty);
        if (this.cardElement.inlineAction) {
            propertySheet.addActionProperties(Adaptive.Versions.v1_2, this, this.cardElement.inlineAction, PropertySheetCategory.InlineAction, [ActionPeer.styleProperty, ActionPeer.modeProperty]);
        }
        propertySheet.add(defaultCategory, TextInputPeer.maxLengthProperty, TextInputPeer.defaultValueProperty);
        propertySheet.add(PropertySheetCategory.Validation, TextInputPeer.regexProperty);
    };
    TextInputPeer.prototype.initializeCardElement = function () {
        _super.prototype.initializeCardElement.call(this);
        this.cardElement.placeholder = "Placeholder text";
    };
    TextInputPeer.defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    TextInputPeer.placeholderProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "placeholder", "Placeholder");
    TextInputPeer.isMultilineProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "isMultiline", "Multi-line", true);
    TextInputPeer.styleProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "style", "Style", Adaptive.InputTextStyle);
    TextInputPeer.maxLengthProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "maxLength", "Maximum length");
    TextInputPeer.inlineActionProperty = new ActionPropertyEditor(Adaptive.Versions.v1_2, "inlineAction", "Action type", [Adaptive.ShowCardAction.JsonTypeName], true);
    TextInputPeer.regexProperty = new StringPropertyEditor(Adaptive.Versions.v1_3, "regex", "Pattern");
    return TextInputPeer;
}(InputPeer));
export { TextInputPeer };
var NumberInputPeer = /** @class */ (function (_super) {
    __extends(NumberInputPeer, _super);
    function NumberInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NumberInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, NumberInputPeer.placeholderProperty, NumberInputPeer.defaultValueProperty, NumberInputPeer.minProperty, NumberInputPeer.maxProperty);
    };
    NumberInputPeer.prototype.initializeCardElement = function () {
        _super.prototype.initializeCardElement.call(this);
        this.cardElement.placeholder = "Placeholder text";
        this.cardElement.defaultValue = 0;
    };
    NumberInputPeer.defaultValueProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    NumberInputPeer.placeholderProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "placeholder", "Placeholder");
    NumberInputPeer.minProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "min", "Minimum value");
    NumberInputPeer.maxProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "max", "Maximum value");
    return NumberInputPeer;
}(InputPeer));
export { NumberInputPeer };
var DateInputPeer = /** @class */ (function (_super) {
    __extends(DateInputPeer, _super);
    function DateInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DateInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, DateInputPeer.defaultValueProperty, DateInputPeer.minProperty, DateInputPeer.maxProperty);
    };
    DateInputPeer.defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    DateInputPeer.minProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "min", "Minimum value");
    DateInputPeer.maxProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "max", "Maximum value");
    return DateInputPeer;
}(InputPeer));
export { DateInputPeer };
var TimeInputPeer = /** @class */ (function (_super) {
    __extends(TimeInputPeer, _super);
    function TimeInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TimeInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, TimeInputPeer.defaultValueProperty, TimeInputPeer.minProperty, TimeInputPeer.maxProperty);
    };
    TimeInputPeer.defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    TimeInputPeer.minProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "min", "Minimum value");
    TimeInputPeer.maxProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "max", "Maximum value");
    return TimeInputPeer;
}(InputPeer));
export { TimeInputPeer };
var ToggleInputPeer = /** @class */ (function (_super) {
    __extends(ToggleInputPeer, _super);
    function ToggleInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToggleInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, ToggleInputPeer.titleProperty, ToggleInputPeer.valueOnProperty, ToggleInputPeer.valueOffProperty, ToggleInputPeer.defaultValueProperty);
        propertySheet.add(PropertySheetCategory.LayoutCategory, ToggleInputPeer.wrapProperty);
    };
    ToggleInputPeer.prototype.initializeCardElement = function () {
        this.cardElement.title = "New Input.Toggle";
    };
    ToggleInputPeer.defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    ToggleInputPeer.titleProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "title", "Title", true);
    ToggleInputPeer.valueOnProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "valueOn", "Value when on");
    ToggleInputPeer.valueOffProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "valueOff", "Value when off");
    ToggleInputPeer.wrapProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_2, "wrap", "Wrap");
    return ToggleInputPeer;
}(InputPeer));
export { ToggleInputPeer };
var ChoiceSetInputPeer = /** @class */ (function (_super) {
    __extends(ChoiceSetInputPeer, _super);
    function ChoiceSetInputPeer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ChoiceSetInputPeer.prototype.populatePropertySheet = function (propertySheet, defaultCategory) {
        if (defaultCategory === void 0) { defaultCategory = PropertySheetCategory.DefaultCategory; }
        _super.prototype.populatePropertySheet.call(this, propertySheet, defaultCategory);
        propertySheet.add(defaultCategory, ChoiceSetInputPeer.placeholderProperty, ChoiceSetInputPeer.isMultiselectProperty, ChoiceSetInputPeer.styleProperty, ChoiceSetInputPeer.defaultValueProperty);
        propertySheet.add(PropertySheetCategory.LayoutCategory, ToggleInputPeer.wrapProperty);
        propertySheet.add("Choices", ChoiceSetInputPeer.choicesProperty);
    };
    ChoiceSetInputPeer.prototype.initializeCardElement = function () {
        this.cardElement.placeholder = "Placeholder text";
        this.cardElement.choices.push(new Adaptive.Choice("Choice 1", "Choice 1"), new Adaptive.Choice("Choice 2", "Choice 2"));
    };
    ChoiceSetInputPeer.defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    ChoiceSetInputPeer.placeholderProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "placeholder", "Placeholder");
    ChoiceSetInputPeer.isMultiselectProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "isMultiSelect", "Allow multi selection");
    ChoiceSetInputPeer.styleProperty = new ChoicePropertyEditor(Adaptive.Versions.v1_0, "style", "Style", [
        { targetVersion: Adaptive.Versions.v1_0, name: "Compact", value: "compact" },
        { targetVersion: Adaptive.Versions.v1_0, name: "Expanded", value: "expanded" },
        { targetVersion: Adaptive.Versions.v1_5, name: "Filtered", value: "filtered" }
    ], true);
    ChoiceSetInputPeer.wrapProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_2, "wrap", "Wrap");
    ChoiceSetInputPeer.choicesProperty = new NameValuePairPropertyEditor(Adaptive.Versions.v1_0, "choices", "title", "value", function (name, value) { return new Adaptive.Choice(name, value); }, "Title", "Value", "Add a new choice", "This ChoiceSet is empty");
    return ChoiceSetInputPeer;
}(InputPeer));
export { ChoiceSetInputPeer };
//# sourceMappingURL=InputPeers.js.map