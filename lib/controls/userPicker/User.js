import * as React from 'react';
import { Button } from '@fluentui/react-components';
import { Dismiss16Regular } from '@fluentui/react-icons';
import { UserCard } from './userCard/UserCard';
import { useUserPickerStyles } from './useUserPickerStyles';
export var User = function (props) {
    var userId = props.userId, onRemove = props.onRemove, secondaryTextPropertyName = props.secondaryTextPropertyName;
    var styles = useUserPickerStyles();
    var onClick = React.useCallback(function () {
        if (onRemove)
            onRemove(userId);
    }, [userId]);
    return (React.createElement(React.Fragment, null,
        React.createElement("div", { className: styles.userItem },
            React.createElement(UserCard, { userId: userId, showOverCard: true, secondaryTextPropertyName: secondaryTextPropertyName }),
            React.createElement(Button, { shape: "circular", className: styles.userItemCloseButton, appearance: "transparent", icon: React.createElement(Dismiss16Regular, null), onClick: onClick }))));
};
//# sourceMappingURL=User.js.map