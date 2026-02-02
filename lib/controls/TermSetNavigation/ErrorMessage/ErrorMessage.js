import * as React from 'react';
import { MessageBar, MessageBarType, } from '@fluentui/react/lib/MessageBar';
import { Stack } from '@fluentui/react/lib/Stack';
import { useErrorMessageStyles } from './useErrorMessageStyles';
export var ErrorMessage = function (props) {
    var showError = props.showError, errorMessage = props.errorMessage, children = props.children;
    var messageErrorContainerStyles = useErrorMessageStyles().messageErrorContainerStyles;
    if (!showError)
        return null;
    return (React.createElement(React.Fragment, null,
        React.createElement(Stack, { verticalAlign: "center", tokens: { childrenGap: 10 }, styles: messageErrorContainerStyles },
            React.createElement(MessageBar, { messageBarType: MessageBarType.error, isMultiline: true },
                errorMessage,
                children))));
};
//# sourceMappingURL=ErrorMessage.js.map