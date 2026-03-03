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
import { Caption1Strong, makeStyles, shorthands, tokens, } from "@fluentui/react-components";
import { ErrorCircleRegular } from "@fluentui/react-icons";
var useStyles = makeStyles({
    root: __assign(__assign({ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "start" }, shorthands.gap("5px")), { paddingTop: "10px" }),
    iconErrorStyle: {
        width: "18px",
        height: "18px",
        color: tokens.colorStatusWarningForeground1,
    },
    errorTextStyles: {
        color: tokens.colorStatusWarningForeground1,
        paddingLeft: "5px",
    },
});
export var FileError = function (props) {
    var isShow = props.isShow, error = props.error;
    if (!isShow) {
        return null;
    }
    var styles = useStyles();
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.root },
            React.createElement(ErrorCircleRegular, { className: styles.iconErrorStyle }),
            React.createElement(Caption1Strong, { className: styles.errorTextStyles }, error))));
};
//# sourceMappingURL=FileError.js.map