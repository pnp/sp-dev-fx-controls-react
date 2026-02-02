var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as React from "react";
import { Caption1, makeStyles, ProgressBar, shorthands, } from "@fluentui/react-components";
var useStyles = makeStyles({
    root: __assign(__assign({ paddingTop: "15px", display: "flex" }, shorthands.gap("5px")), { alignItems: "center" }),
});
export var FileProgress = function (props) {
    var percentageCompleted = props.percentageCompleted, isShow = props.isShow;
    var percentage = percentageCompleted * 100;
    var styles = useStyles();
    if (!isShow) {
        return null;
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.root },
            React.createElement(ProgressBar, { thickness: "medium", max: 100, value: percentage }),
            React.createElement(Caption1, null,
                " ",
                percentage.toFixed(0),
                "%"))));
};
//# sourceMappingURL=FileProgress.js.map