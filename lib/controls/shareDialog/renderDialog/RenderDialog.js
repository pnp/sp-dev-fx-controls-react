/* eslint-disable @typescript-eslint/explicit-function-return-type */
import * as React from 'react';
import { css } from '@emotion/css';
import { Dialog, DialogActions, DialogBody, DialogContent, DialogSurface, DialogTitle, } from '@fluentui/react-components';
var DEFAULT_MIN_WIDTH = 200;
var DEFAULT_MIN_HEIGHT = 200;
var useStyles = function (props) {
    var styles = {
        dialog: css({
            width: "100%",
            height: "100%",
            overflow: "hidden",
            maxHeight: "600px",
            padding: 0,
        }),
        dialogBody: css({
            height: "calc(100% - 200px)",
        }),
    };
    return { styles: styles };
};
export var RenderDialog = function (props) {
    var isOpen = props.isOpen, dialogTitle = props.dialogTitle, dialogActions = props.dialogActions, children = props.children, maxWidth = props.maxWidth, className = props.className, minHeight = props.minHeight, minWidth = props.minWidth, maxHeight = props.maxHeight;
    var styles = useStyles(props).styles;
    if (!isOpen)
        return React.createElement(React.Fragment, null);
    return (React.createElement(Dialog, { open: isOpen, modalType: "modal" },
        React.createElement(DialogSurface, { className: css(styles.dialog, className), style: {
                maxWidth: maxWidth,
                minWidth: minWidth !== null && minWidth !== void 0 ? minWidth : DEFAULT_MIN_WIDTH,
                minHeight: minHeight !== null && minHeight !== void 0 ? minHeight : DEFAULT_MIN_HEIGHT,
                height: "fit-content",
                maxHeight: maxHeight !== null && maxHeight !== void 0 ? maxHeight : "",
            } },
            React.createElement(DialogTitle, null, dialogTitle),
            React.createElement(DialogBody, { className: styles.dialogBody },
                React.createElement(DialogContent, null, children)),
            React.createElement(DialogActions, { fluid: true, position: "end" }, dialogActions))));
};
//# sourceMappingURL=RenderDialog.js.map