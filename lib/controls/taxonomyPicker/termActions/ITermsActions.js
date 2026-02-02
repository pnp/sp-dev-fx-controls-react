/**
 * Specifies the display mode of the term actions.
 */
export var TermActionsDisplayMode;
(function (TermActionsDisplayMode) {
    TermActionsDisplayMode[TermActionsDisplayMode["buttons"] = 1] = "buttons";
    TermActionsDisplayMode[TermActionsDisplayMode["dropdown"] = 2] = "dropdown";
})(TermActionsDisplayMode || (TermActionsDisplayMode = {}));
/**
 * Specifies the style which is applied to display actions.
 */
export var TermActionsDisplayStyle;
(function (TermActionsDisplayStyle) {
    TermActionsDisplayStyle[TermActionsDisplayStyle["text"] = 1] = "text";
    TermActionsDisplayStyle[TermActionsDisplayStyle["icon"] = 2] = "icon";
    TermActionsDisplayStyle[TermActionsDisplayStyle["textAndIcon"] = 3] = "textAndIcon";
})(TermActionsDisplayStyle || (TermActionsDisplayStyle = {}));
/**
 * Specifies the action that should be applied after executing the action callback.
 */
export var UpdateType;
(function (UpdateType) {
    /**
     * Allows you to update the label of the term
     */
    UpdateType[UpdateType["updateTermLabel"] = 1] = "updateTermLabel";
    /**
     * Allows you to update part of the taxonomy tree
     */
    UpdateType[UpdateType["updateTermsTree"] = 2] = "updateTermsTree";
    /**
     * Allows you to hide the term
     */
    UpdateType[UpdateType["hideTerm"] = 3] = "hideTerm";
    /**
     * Allows you to disable the term
     */
    UpdateType[UpdateType["disableTerm"] = 4] = "disableTerm";
    /**
     * Allows you to select the term
     */
    UpdateType[UpdateType["selectTerm"] = 5] = "selectTerm";
})(UpdateType || (UpdateType = {}));
//# sourceMappingURL=ITermsActions.js.map