import { ActionPropertyEditor, BooleanPropertyEditor, ChoicePropertyEditor, EnumPropertyEditor, InputPeer, NumberPropertyEditor, PropertySheet, StringPropertyEditor } from "adaptivecards-designer/lib/designer-peers";
import { FluentUIChoiceSetInput, FluentUIDateInput, FluentUINumberInput, FluentUITextInput, FluentUITimeInput, FluentUIToggleInput } from "../../../adaptiveCardHost/fluentUI/Elements";
import { NameValuePairPropertyEditor } from "./Shared";
export declare class TextInputPeer extends InputPeer<FluentUITextInput> {
    static readonly defaultValueProperty: StringPropertyEditor;
    static readonly placeholderProperty: StringPropertyEditor;
    static readonly isMultilineProperty: BooleanPropertyEditor;
    static readonly styleProperty: EnumPropertyEditor;
    static readonly maxLengthProperty: NumberPropertyEditor;
    static readonly inlineActionProperty: ActionPropertyEditor;
    static readonly regexProperty: StringPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    initializeCardElement(): void;
}
export declare class NumberInputPeer extends InputPeer<FluentUINumberInput> {
    static readonly defaultValueProperty: NumberPropertyEditor;
    static readonly placeholderProperty: StringPropertyEditor;
    static readonly minProperty: NumberPropertyEditor;
    static readonly maxProperty: NumberPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    initializeCardElement(): void;
}
export declare class DateInputPeer extends InputPeer<FluentUIDateInput> {
    static readonly defaultValueProperty: StringPropertyEditor;
    static readonly minProperty: StringPropertyEditor;
    static readonly maxProperty: StringPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class TimeInputPeer extends InputPeer<FluentUITimeInput> {
    static readonly defaultValueProperty: StringPropertyEditor;
    static readonly minProperty: StringPropertyEditor;
    static readonly maxProperty: StringPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
}
export declare class ToggleInputPeer extends InputPeer<FluentUIToggleInput> {
    static readonly defaultValueProperty: StringPropertyEditor;
    static readonly titleProperty: StringPropertyEditor;
    static readonly valueOnProperty: StringPropertyEditor;
    static readonly valueOffProperty: StringPropertyEditor;
    static readonly wrapProperty: BooleanPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    initializeCardElement(): void;
}
export declare class ChoiceSetInputPeer extends InputPeer<FluentUIChoiceSetInput> {
    static readonly defaultValueProperty: StringPropertyEditor;
    static readonly placeholderProperty: StringPropertyEditor;
    static readonly isMultiselectProperty: BooleanPropertyEditor;
    static readonly styleProperty: ChoicePropertyEditor;
    static readonly wrapProperty: BooleanPropertyEditor;
    static readonly choicesProperty: NameValuePairPropertyEditor;
    populatePropertySheet(propertySheet: PropertySheet, defaultCategory?: string): void;
    initializeCardElement(): void;
}
//# sourceMappingURL=InputPeers.d.ts.map