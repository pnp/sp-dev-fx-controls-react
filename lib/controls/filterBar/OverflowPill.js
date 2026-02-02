import React from "react";
import { Callout } from "@fluentui/react/lib/Callout";
import { useBoolean, useId } from "@fluentui/react-hooks";
import styles from "./FilterBar.module.scss";
import { PillGroup } from "./PillGroup";
import * as strings from "ControlStrings";
export var OverflowPill = function (props) {
    var _a = useBoolean(false), overlayVisible = _a[0], toggleOverlayVisible = _a[1].toggle;
    var divId = useId('callout-div');
    var onClick = function (event) {
        toggleOverlayVisible();
    };
    var pillClick = function (label, value) {
        if (props.onClick) {
            props.onClick(label, value);
        }
    };
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { id: divId, className: "".concat(styles.pill, " pillOverflow"), "data-is-focusable": true, "aria-label": strings.FilterOverflowAriaLabel, onClick: onClick, tabIndex: -1 },
            "+",
            props.items.length),
        overlayVisible && (React.createElement(Callout, { onDismiss: toggleOverlayVisible, target: "#".concat(divId), isBeakVisible: false },
            React.createElement("div", { className: styles.overflow }, props.items.map(function (i, index) { return React.createElement(PillGroup, { item: i, key: index, onRemoveFilter: pillClick }); }))))));
};
//# sourceMappingURL=OverflowPill.js.map