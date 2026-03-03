export var getTermActionChange = function (tac, termAction) {
    if (tac && tac.length > 0) {
        var changes = tac.filter(function (change) { return change.actionId === termAction.id; });
        if (changes && changes.length > 0) {
            return {
                actionDisabled: typeof changes[0].disabled !== "undefined" ? changes[0].disabled : undefined,
                actionHidden: typeof changes[0].hidden !== "undefined" ? changes[0].disabled : undefined
            };
        }
    }
    return {
        actionDisabled: undefined,
        actionHidden: undefined
    };
};
//# sourceMappingURL=getTermActionChange.js.map