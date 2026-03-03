/**
 * Possible action's states
 */
export var ProgressActionState;
(function (ProgressActionState) {
    /**
     * Not started yet
     */
    ProgressActionState[ProgressActionState["notStarted"] = 0] = "notStarted";
    /**
     * Currently in progress
     */
    ProgressActionState[ProgressActionState["inProgress"] = 1] = "inProgress";
    /**
     * Finished with no errors
     */
    ProgressActionState[ProgressActionState["finished"] = 2] = "finished";
    /**
     * Errored
     */
    ProgressActionState[ProgressActionState["errored"] = 3] = "errored";
})(ProgressActionState || (ProgressActionState = {}));
//# sourceMappingURL=IProgress.js.map