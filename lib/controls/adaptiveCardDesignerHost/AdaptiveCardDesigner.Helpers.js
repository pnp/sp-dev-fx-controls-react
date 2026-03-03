/* This file contains reusable functions useful for managing designer functionality */
import { Guid } from '@microsoft/sp-core-library';
import { SnippetPaletteItem, ToolbarButton, ToolbarChoicePicker } from "adaptivecards-designer";
// Given the instance of a "CardDesigner", it allows you to hide an element of the toolbar given its id.
export var hideToolbarElement = function (cardDesigner, elementId) {
    cardDesigner.toolbar.getElementById(elementId).isVisible = false;
};
// Given the instance of a "CardDesigner", it allows you to add an element in the toolbar.
export var addToolbarButton = function (cardDesigner, caption, iconClass, positionElementId, isAfter, hideElementId, onClick) {
    var id = "__".concat(Guid.newGuid().toString(), "_ToolbarButton");
    var newToolbarButton = new ToolbarButton(id, caption, iconClass, onClick);
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
export var addToolboxSnippet = function (cardDesigner, category, name, payload) {
    var newSnippet = new SnippetPaletteItem(category, name);
    newSnippet.snippet = payload;
    if (!cardDesigner.customPaletteItems)
        cardDesigner.customPaletteItems = [];
    cardDesigner.customPaletteItems.push(newSnippet);
};
// Given the instance of a "CarDesigner", it allows to add a "Choice Picker" to the toolbar
export var addToolbarChoicePicker = function (cardDesigner, afterElementId, separator, label, choices, onChanged) {
    var id = "__".concat(Guid.newGuid().toString(), "_ChoicePicker");
    var breakpointsChoicePicker = new ToolbarChoicePicker(id);
    breakpointsChoicePicker.label = label;
    breakpointsChoicePicker.choices = choices;
    breakpointsChoicePicker.onChanged = onChanged;
    breakpointsChoicePicker.separator = separator;
    cardDesigner.toolbar.insertElementAfter(breakpointsChoicePicker, afterElementId);
    return id;
};
// Convert nulls to empty strings, used for binding with Adaptive Card Template
export var convertNullToEmptyString = function (object) {
    for (var key in object) {
        if (Object.prototype.hasOwnProperty.call(object, key)) {
            if (null === object[key] || undefined === object[key])
                object[key] = '';
            if (typeof object[key] === 'object')
                convertNullToEmptyString(object[key]);
        }
    }
};
//# sourceMappingURL=AdaptiveCardDesigner.Helpers.js.map