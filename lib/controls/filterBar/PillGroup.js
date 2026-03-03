import React from "react";
import styles from "./FilterBar.module.scss";
import { Pill } from "./Pill";
export var PillGroup = function (props) {
    var onClick = function (label, value) {
        if (props.onRemoveFilter) {
            props.onRemoveFilter(label, value);
        }
    };
    return (React.createElement("div", { className: styles.pillGroup, role: "group", "aria-label": props.item.label },
        React.createElement("div", { className: styles.label },
            props.item.label,
            ":"),
        props.item.values.map(function (v, index) { return React.createElement(Pill, { key: index, field: props.item.label, value: v, onClick: onClick }); })));
};
//# sourceMappingURL=PillGroup.js.map