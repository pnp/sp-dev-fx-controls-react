/* This file contains reusable functions useful for managing designer functionality */

import { Guid } from '@microsoft/sp-core-library';
import { CardDesigner, IChoicePickerItem, SnippetPaletteItem, ToolbarButton, ToolbarChoicePicker } from "adaptivecards-designer";

// Given the instance of a "CardDesigner", it allows you to hide an element of the toolbar given its id.
export const hideToolbarElement = (cardDesigner: CardDesigner, elementId: string) => {
    cardDesigner.toolbar.getElementById(elementId).isVisible = false;
};

// Given the instance of a "CardDesigner", it allows you to add an element in the toolbar.
export const addToolbarButton = (cardDesigner: CardDesigner, caption: string, iconClass: string, positionElementId: string, isAfter: true, hideElementId?: string, onClick?: (sender: ToolbarButton) => void): string => {
    let id = `__${Guid.newGuid().toString()}_ToolbarButton`;
    let newToolbarButton = new ToolbarButton(
        id,
        caption,
        iconClass,
        onClick);
    newToolbarButton.separator = true;

    if (isAfter)
        cardDesigner.toolbar.insertElementAfter(newToolbarButton, positionElementId);
    else
        cardDesigner.toolbar.insertElementBefore(newToolbarButton, positionElementId);

    if (hideElementId)
        hideToolbarElement(cardDesigner, hideElementId);

    return id;
};

// Given the instance of a "CarDesigner", it allows you to add a snippets to the toolbox.
export const addToolboxSnippet = (cardDesigner: CardDesigner, category: string, name: string, payload: object) => {
    let newSnippet = new SnippetPaletteItem(category, name);
    newSnippet.snippet = payload;

    if (!cardDesigner.customPaletteItems)
        cardDesigner.customPaletteItems = [];

    cardDesigner.customPaletteItems.push(newSnippet);
};

// Given the instance of a "CarDesigner", it allows to add a "Choice Picker" to the toolbar
export const addToolbarChoicePicker = (cardDesigner: CardDesigner,
    afterElementId: string,
    separator: boolean,
    label: string,
    choices: IChoicePickerItem[],
    onChanged: (sender: ToolbarChoicePicker) => void) => {
    let id = `__${Guid.newGuid().toString()}_ChoicePicker`;
    let breakpointsChoicePicker = new ToolbarChoicePicker(id);
    breakpointsChoicePicker.label = label;
    breakpointsChoicePicker.choices = choices;
    breakpointsChoicePicker.onChanged = onChanged;
    breakpointsChoicePicker.separator = separator;
    cardDesigner.toolbar.insertElementAfter(breakpointsChoicePicker, afterElementId);
    return id;
};

// Convert nulls to empty strings, used for binding with Adaptive Card Template
export const convertNullToEmptyString = (object: any) => {
    for (var key in object) {
        if (null === object[key] || undefined === object[key]) object[key] = '';
        if (typeof object[key] === 'object') convertNullToEmptyString(object[key]);
    }
};
