import { Guid } from "@microsoft/sp-core-library";
import { DocumentCard, DocumentCardDetails } from "@fluentui/react/lib/DocumentCard";
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { Text } from "@fluentui/react/lib/Text";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";
import strings from "ControlStrings";
export var RenderNoComments = function () {
    var documentCardStyles = useListItemCommentsStyles().documentCardStyles;
    return (React.createElement(React.Fragment, null,
        React.createElement(DocumentCard, { styles: documentCardStyles, key: "noData" },
            React.createElement(DocumentCardDetails, { key: Guid.newGuid().toString() },
                React.createElement(Stack, { horizontal: true, horizontalAlign: "center", verticalAlign: "center", tokens: { padding: 20 }, key: Guid.newGuid().toString() },
                    React.createElement(Text, { variant: "smallPlus" }, strings.ListItemCommentsNoCommentsLabel))))));
};
//# sourceMappingURL=RenderNoComments.js.map