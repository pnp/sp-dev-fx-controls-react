import * as React from 'react';
import { IconButton, Modal, Persona, PersonaSize, Stack, } from '@fluentui/react';
import { useListItemCommentsStyles } from './useListItemCommentsStyles';
var cancelIcon = { iconName: 'Cancel' };
export var LikedUserList = function (_a) {
    var isDialogOpen = _a.isDialogOpen, setShowDialog = _a.setShowDialog, likedBy = _a.likedBy;
    var _b = useListItemCommentsStyles(), iconButtonStyles = _b.iconButtonStyles, contentStyles = _b.contentStyles;
    var PHOTO_URL = '/_layouts/15/userphoto.aspx?size=M&accountname=';
    return (React.createElement(Modal, { isOpen: isDialogOpen, onDismiss: function () { return setShowDialog(false); }, styles: { main: { width: '480px' } } },
        React.createElement("div", { className: contentStyles.header },
            React.createElement("h2", { className: contentStyles.heading }, "Liked by"),
            React.createElement(IconButton, { styles: iconButtonStyles, iconProps: cancelIcon, ariaLabel: "Close popup modal", onClick: function () { return setShowDialog(false); } })),
        React.createElement(Stack, { tokens: { childrenGap: 12 }, style: {
                height: 'auto',
                maxHeight: '450px',
                overflowY: 'auto',
                padding: '0 1.5rem 1.5rem 1.5rem',
            } }, likedBy.map(function (user, // eslint-disable-line @typescript-eslint/no-explicit-any
        index) { return (React.createElement(React.Fragment, null,
            React.createElement(Persona, { key: index, text: user.name, secondaryText: user.email, size: PersonaSize.size40, imageUrl: "".concat(PHOTO_URL).concat(user.email) }))); }))));
};
//# sourceMappingURL=LikedUserList.js.map