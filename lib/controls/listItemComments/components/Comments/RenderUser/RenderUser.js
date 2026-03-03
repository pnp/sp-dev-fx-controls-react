import { Guid } from "@microsoft/sp-core-library";
import { DocumentCard, DocumentCardDetails } from "@fluentui/react/lib/DocumentCard";
import { Persona } from "@fluentui/react/lib/Persona";
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { useListItemCommentsStyles } from "../useListItemCommentsStyles";
import { PHOTO_URL } from "./../../../common/constants";
export var RenderUser = function (props) {
    var user = props.user;
    var _a = useListItemCommentsStyles(), documentCardUserStyles = _a.documentCardUserStyles, renderUserContainerStyles = _a.renderUserContainerStyles;
    return (React.createElement(React.Fragment, null,
        React.createElement(DocumentCard, { styles: documentCardUserStyles },
            React.createElement(DocumentCardDetails, null,
                React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", styles: renderUserContainerStyles, key: Guid.newGuid().toString() },
                    React.createElement(Persona, { text: user.displayName, secondaryText: user.mail, coinSize: 40, imageUrl: "".concat(PHOTO_URL).concat(user.mail) }))))));
};
//# sourceMappingURL=RenderUser.js.map