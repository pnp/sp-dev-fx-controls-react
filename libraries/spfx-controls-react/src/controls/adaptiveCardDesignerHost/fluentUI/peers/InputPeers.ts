import * as Adaptive from "adaptivecards";
import { ActionPeer, ActionPropertyEditor, BooleanPropertyEditor, CardElementPeer, ChoicePropertyEditor, EnumPropertyEditor, InputPeer, NumberPropertyEditor, PropertySheet, PropertySheetCategory, StringPropertyEditor } from "adaptivecards-designer/lib/designer-peers";
import { FluentUIChoiceSetInput, FluentUIDateInput, FluentUINumberInput, FluentUITextInput, FluentUITimeInput, FluentUIToggleInput } from "../../../adaptiveCardHost/fluentUI/Elements";
import { NameValuePairPropertyEditor } from "./Shared";

export class TextInputPeer extends InputPeer<FluentUITextInput> {
    public static readonly defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    public static readonly placeholderProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "placeholder", "Placeholder");
    public static readonly isMultilineProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "isMultiline", "Multi-line", true);
    public static readonly styleProperty = new EnumPropertyEditor(Adaptive.Versions.v1_0, "style", "Style", Adaptive.InputTextStyle);
    public static readonly maxLengthProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "maxLength", "Maximum length");
    public static readonly inlineActionProperty = new ActionPropertyEditor(Adaptive.Versions.v1_2, "inlineAction", "Action type", [Adaptive.ShowCardAction.JsonTypeName], true);
    public static readonly regexProperty = new StringPropertyEditor(Adaptive.Versions.v1_3, "regex", "Pattern");


    public populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory): void {
        super.populatePropertySheet(propertySheet, defaultCategory);

        propertySheet.add(
            defaultCategory,
            TextInputPeer.placeholderProperty,
            TextInputPeer.isMultilineProperty);

        if (!this.cardElement.isMultiline) {
            propertySheet.add(
                PropertySheetCategory.DefaultCategory,
                TextInputPeer.styleProperty);
        }
        else {
            propertySheet.add(
                PropertySheetCategory.LayoutCategory,
                CardElementPeer.heightProperty);
        }

        propertySheet.add(
            PropertySheetCategory.InlineAction,
            TextInputPeer.inlineActionProperty);

        if (this.cardElement.inlineAction) {
            propertySheet.addActionProperties(
                Adaptive.Versions.v1_2,
                this,
                this.cardElement.inlineAction,
                PropertySheetCategory.InlineAction,
                [ActionPeer.styleProperty, ActionPeer.modeProperty]);
        }

        propertySheet.add(
            defaultCategory,
            TextInputPeer.maxLengthProperty,
            TextInputPeer.defaultValueProperty);

        propertySheet.add(
            PropertySheetCategory.Validation,
            TextInputPeer.regexProperty);
    }

    public initializeCardElement(): void {
        super.initializeCardElement();

        this.cardElement.placeholder = "Placeholder text";
    }
}

export class NumberInputPeer extends InputPeer<FluentUINumberInput> {
    public static readonly defaultValueProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    public static readonly placeholderProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "placeholder", "Placeholder");
    public static readonly minProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "min", "Minimum value");
    public static readonly maxProperty = new NumberPropertyEditor(Adaptive.Versions.v1_0, "max", "Maximum value");

    public populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory): void {
        super.populatePropertySheet(propertySheet, defaultCategory);

        propertySheet.add(
            defaultCategory,
            NumberInputPeer.placeholderProperty,
            NumberInputPeer.defaultValueProperty,
            NumberInputPeer.minProperty,
            NumberInputPeer.maxProperty);
    }

    public initializeCardElement(): void {
        super.initializeCardElement();

        this.cardElement.placeholder = "Placeholder text";
        this.cardElement.defaultValue = 0;
    }
}

export class DateInputPeer extends InputPeer<FluentUIDateInput> {
    public static readonly defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    public static readonly minProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "min", "Minimum value");
    public static readonly maxProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "max", "Maximum value");

    public populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory): void {
        super.populatePropertySheet(propertySheet, defaultCategory);

        propertySheet.add(
            defaultCategory,
            DateInputPeer.defaultValueProperty,
            DateInputPeer.minProperty,
            DateInputPeer.maxProperty);
    }
}

export class TimeInputPeer extends InputPeer<FluentUITimeInput> {
    public static readonly defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    public static readonly minProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "min", "Minimum value");
    public static readonly maxProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "max", "Maximum value");

    public populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory): void {
        super.populatePropertySheet(propertySheet, defaultCategory);

        propertySheet.add(
            defaultCategory,
            TimeInputPeer.defaultValueProperty,
            TimeInputPeer.minProperty,
            TimeInputPeer.maxProperty);
    }
}

export class ToggleInputPeer extends InputPeer<FluentUIToggleInput> {
    public static readonly defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    public static readonly titleProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "title", "Title", true);
    public static readonly valueOnProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "valueOn", "Value when on");
    public static readonly valueOffProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "valueOff", "Value when off");
    public static readonly wrapProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_2, "wrap", "Wrap");

    public populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory): void {
        super.populatePropertySheet(propertySheet, defaultCategory);

        propertySheet.add(
            defaultCategory,
            ToggleInputPeer.titleProperty,
            ToggleInputPeer.valueOnProperty,
            ToggleInputPeer.valueOffProperty,
            ToggleInputPeer.defaultValueProperty);

        propertySheet.add(
            PropertySheetCategory.LayoutCategory,
            ToggleInputPeer.wrapProperty);
    }

    public initializeCardElement(): void {
        this.cardElement.title = "New Input.Toggle";
    }
}

export class ChoiceSetInputPeer extends InputPeer<FluentUIChoiceSetInput> {
    public static readonly defaultValueProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "defaultValue", "Default value");
    public static readonly placeholderProperty = new StringPropertyEditor(Adaptive.Versions.v1_0, "placeholder", "Placeholder");
    public static readonly isMultiselectProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_0, "isMultiSelect", "Allow multi selection");
    public static readonly styleProperty = new ChoicePropertyEditor(
        Adaptive.Versions.v1_0,
        "style",
        "Style",
        [
            { targetVersion: Adaptive.Versions.v1_0, name: "Compact", value: "compact" },
            { targetVersion: Adaptive.Versions.v1_0, name: "Expanded", value: "expanded" },
            { targetVersion: Adaptive.Versions.v1_5, name: "Filtered", value: "filtered" }
        ],
        true);
    public static readonly wrapProperty = new BooleanPropertyEditor(Adaptive.Versions.v1_2, "wrap", "Wrap");
    public static readonly choicesProperty = new NameValuePairPropertyEditor(
        Adaptive.Versions.v1_0,
        "choices",
        "title",
        "value",
        (name: string, value: string) => { return new Adaptive.Choice(name, value); },
        "Title",
        "Value",
        "Add a new choice",
        "This ChoiceSet is empty");

    public populatePropertySheet(propertySheet: PropertySheet, defaultCategory: string = PropertySheetCategory.DefaultCategory): void {
        super.populatePropertySheet(propertySheet, defaultCategory);

        propertySheet.add(
            defaultCategory,
            ChoiceSetInputPeer.placeholderProperty,
            ChoiceSetInputPeer.isMultiselectProperty,
            ChoiceSetInputPeer.styleProperty,
            ChoiceSetInputPeer.defaultValueProperty);

        propertySheet.add(
            PropertySheetCategory.LayoutCategory,
            ToggleInputPeer.wrapProperty);

        propertySheet.add(
            "Choices",
            ChoiceSetInputPeer.choicesProperty);
    }

    public initializeCardElement(): void {
        this.cardElement.placeholder = "Placeholder text";

        this.cardElement.choices.push(
            new Adaptive.Choice("Choice 1", "Choice 1"),
            new Adaptive.Choice("Choice 2", "Choice 2")
        );
    }
}
