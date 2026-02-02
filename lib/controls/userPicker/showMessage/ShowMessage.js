import * as React from 'react';
import { Body1, Body1Strong, tokens, } from '@fluentui/react-components';
import { CheckmarkCircle32Regular, Info32Regular, } from '@fluentui/react-icons';
import { Icon } from '@iconify/react';
import { EMessageType } from '../constants/EMessageTypes';
import { useShowMessageStyles } from './useShowMessageStyles';
export var ShowMessage = function (props) {
    var messageType = props.messageType, children = props.children, message = props.message;
    var styles = useShowMessageStyles();
    var _a = React.useState(null), renderMessageIcon = _a[0], setRenderMessageIcon = _a[1];
    var RenderError = React.useCallback(function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.errorContainer },
                React.createElement("div", { className: styles.errorIcon },
                    React.createElement(Icon, { icon: "fluent:error-circle-12-regular", width: "32", height: "32", color: tokens.colorStatusDangerForeground1 })),
                React.createElement(Body1, null, message))));
    }, [message]);
    React.useEffect(function () {
        switch (messageType) {
            case EMessageType.SUCCESS:
                setRenderMessageIcon(React.createElement(CheckmarkCircle32Regular, { primaryFill: tokens.colorStatusSuccessForeground1 }));
                break;
            case EMessageType.INFO:
                setRenderMessageIcon(React.createElement(Info32Regular, { primaryFill: tokens.colorStatusWarningForeground1 }));
                break;
            default:
                break;
        }
    }, [messageType]);
    if (messageType === EMessageType.ERROR) {
        return React.createElement(RenderError, null);
    }
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.root },
            renderMessageIcon,
            React.createElement(Body1Strong, null, message),
            children)));
};
//# sourceMappingURL=ShowMessage.js.map