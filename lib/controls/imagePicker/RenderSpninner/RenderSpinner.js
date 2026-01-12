import * as React from 'react';
import { makeStyles, mergeClasses, Spinner, } from '@fluentui/react-components';
var useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
    },
    spinner: {
        width: "100px",
        height: "100px",
    },
});
export var RenderSpinner = function (props) {
    var size = props.size, label = props.label, labelPosition = props.labelPosition, style = props.style, className = props.className;
    var styles = useStyles();
    return (React.createElement("div", { className: styles.root },
        React.createElement(Spinner, { style: style, className: mergeClasses(styles.spinner, className), size: size, label: label, labelPosition: labelPosition })));
};
//# sourceMappingURL=RenderSpinner.js.map