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
import { Icon } from "@fluentui/react";
import styles from "./FilterBar.module.scss";
import * as strings from "ControlStrings";
import React from "react";
export var Pill = function (props) {
    var onClick = function (event) {
        if (props.onClick) {
            props.onClick(props.field, props.value);
        }
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var buttonProps = {
        title: props.clearAll ? strings.ClearAllFiltersTitle : strings.ClearFilterTitle,
        className: "".concat(styles.pill, " ").concat(props.clearAll ? "".concat(styles.pill, " ").concat(styles.clearAll) : ""),
        "data-automationid": props.clearAll ? "clearfiltersPill" : "filterPill",
        "data-field": props.field
    };
    if (props.clearAll) {
        buttonProps.tabIndex = 0;
    }
    else {
        buttonProps["data-is-focusable"] = true;
        buttonProps["data-value"] = props.value;
        buttonProps["aria-disabled"] = false;
    }
    return (React.createElement("button", __assign({}, buttonProps, { onClick: onClick }),
        React.createElement("span", { className: styles.pillText }, props.clearAll ? strings.ClearAllFiltersText : props.value),
        React.createElement(Icon, { iconName: "Cancel", role: "presentation", className: "".concat(styles.icon), "data-icon-name": "Cancel" })));
};
//# sourceMappingURL=Pill.js.map