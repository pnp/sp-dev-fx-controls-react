import { Guid } from "@microsoft/sp-core-library";
import { DocumentCard, DocumentCardDetails } from "@fluentui/react/lib/DocumentCard";
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { ErrorInfo } from "../ErrorInfo";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";
export var RenderError = function (props) {
    var _a = props.errorInfo || {}, showError = _a.showError, error = _a.error;
    var documentCardStyles = useListItemCommentsStyles().documentCardStyles;
    if (!showError)
        return null;
    return (React.createElement(DocumentCard, { styles: documentCardStyles, key: "errorInfo" },
        React.createElement(DocumentCardDetails, { key: Guid.newGuid().toString() },
            React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { padding: 5 }, key: Guid.newGuid().toString() },
                React.createElement(ErrorInfo, { showError: showError, error: error })))));
};
//# sourceMappingURL=RenderError.js.map