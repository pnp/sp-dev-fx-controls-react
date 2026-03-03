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
import { FluentProvider, Title3, makeStyles, shorthands, } from "@fluentui/react-components";
import { UserPicker } from "../../../controls/userPicker";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
var useStyles = makeStyles({
    root: __assign(__assign({ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }, shorthands.gap("10px")), { marginLeft: "50%", marginRight: "50%", height: "fit-content", width: "fit-content" }),
    image: {
        width: "20px",
        height: "20px",
    },
    title: {
        marginBottom: "30px",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});
export var TestUserPickerControl = function (props) {
    var themeVariant = props.themeVariant, context = props.context;
    var styles = useStyles();
    var setTheme = React.useCallback(function () {
        return createV9Theme(themeVariant);
    }, [themeVariant]);
    var onSelectedUsers = function (users) {
        console.log('selected users', users);
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(FluentProvider, { theme: setTheme() },
            React.createElement("div", { className: styles.title },
                React.createElement(Title3, null, "Test Control - userPicker")),
            React.createElement(UserPicker, { context: context, onSelectedUsers: onSelectedUsers }))));
};
//# sourceMappingURL=TestUserPickerControl.js.map