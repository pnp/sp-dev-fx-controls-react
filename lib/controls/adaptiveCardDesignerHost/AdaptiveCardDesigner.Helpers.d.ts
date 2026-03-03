import { CardDesigner, IChoicePickerItem, ToolbarButton, ToolbarChoicePicker } from "adaptivecards-designer";
export declare const hideToolbarElement: (cardDesigner: CardDesigner, elementId: string) => void;
export declare const addToolbarButton: (cardDesigner: CardDesigner, caption: string, iconClass: string, positionElementId: string, isAfter: true, hideElementId?: string, onClick?: (sender: ToolbarButton) => void) => string;
export declare const addToolboxSnippet: (cardDesigner: CardDesigner, category: string, name: string, payload: object) => void;
export declare const addToolbarChoicePicker: (cardDesigner: CardDesigner, afterElementId: string, separator: boolean, label: string, choices: IChoicePickerItem[], onChanged: (sender: ToolbarChoicePicker) => void) => string;
export declare const convertNullToEmptyString: (object: any) => void;
//# sourceMappingURL=AdaptiveCardDesigner.Helpers.d.ts.map