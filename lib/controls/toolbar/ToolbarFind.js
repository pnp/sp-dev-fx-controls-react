import * as React from "react";
import { Button, Input, Tooltip, tooltipAsLabelBehavior, } from "@fluentui/react-northstar";
import { SearchIcon } from "@fluentui/react-icons-northstar";
import styles from "./Toolbar.module.scss";
export var ToolbarFind = function (props) {
    switch (props.layout) {
        case "verbose":
            return (React.createElement(Input, { clearable: true, placeholder: "Find", "aria-label": "Find", className: "extended-toolbar__far-side__input", icon: React.createElement(SearchIcon, { outline: true }), styles: {
                    flexShrink: 1,
                    width: "13.125rem",
                }, onChange: function (e, inputProps) {
                    if (props.onFindQueryChange && inputProps)
                        props.onFindQueryChange(inputProps.value);
                } }));
        default:
        case "compact":
            return props.findActive ? (React.createElement(React.Fragment, null,
                React.createElement(Input, { autoFocus: true, clearable: true, placeholder: "Find", "aria-label": "Find", className: "extended-toolbar__far-side__input", icon: React.createElement(SearchIcon, { outline: true }), styles: {
                        flexShrink: 1,
                        flexGrow: 1,
                        width: "13.125rem",
                    }, onChange: function (e, inputProps) {
                        if (props.onFindQueryChange && inputProps)
                            props.onFindQueryChange(inputProps.value);
                    } }),
                React.createElement(Button, { text: true, title: "Cancel", content: "Cancel", className: "extended-toolbar__find-cancel " + styles.toolbarButtonStyles, styles: {
                        marginLeft: "1px",
                        marginRight: "1px"
                    }, onClick: function (_e) {
                        if (props.onFindQueryChange) {
                            props.onFindQueryChange("");
                        }
                        props.setFindActive(false);
                    } }))) : (React.createElement(Tooltip, { trigger: React.createElement(Button, { text: true, title: "Find", content: "", className: "extended-toolbar__find-invoker " + styles.toolbarButtonStyles, icon: React.createElement(SearchIcon, { outline: true }), styles: {
                        marginRight: ".5rem",
                        flex: "0 0 auto",
                    }, onClick: function (_e) { return props.setFindActive(true); } }), content: "Find", accessibility: tooltipAsLabelBehavior }));
    }
};
//# sourceMappingURL=ToolbarFind.js.map