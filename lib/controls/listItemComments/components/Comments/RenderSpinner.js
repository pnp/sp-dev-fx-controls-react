import { Spinner } from "@fluentui/react/lib/Spinner";
import { Guid } from "@microsoft/sp-core-library";
import { DocumentCard, DocumentCardDetails } from "@fluentui/react/lib/DocumentCard";
import { SpinnerSize } from "@fluentui/react/lib/Spinner";
import { Stack } from "@fluentui/react/lib/Stack";
import * as React from "react";
import { useContext } from "react";
import { ListItemCommentsStateContext } from "../ListItemCommentsStateProvider";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";
export var RenderSpinner = function () {
    var documentCardStyles = useListItemCommentsStyles().documentCardStyles;
    var listItemCommentsState = useContext(ListItemCommentsStateContext).listItemCommentsState;
    var isScrolling = listItemCommentsState.isScrolling, isLoading = listItemCommentsState.isLoading;
    if (!isScrolling && !isLoading)
        return null;
    return (React.createElement(DocumentCard, { styles: documentCardStyles, key: "isScrolling" },
        React.createElement(DocumentCardDetails, { key: Guid.newGuid().toString() },
            React.createElement(Stack, { horizontal: true, horizontalAlign: "center", verticalAlign: "center", tokens: { padding: 20 }, key: Guid.newGuid().toString() },
                React.createElement(Spinner, { size: SpinnerSize.medium })))));
};
//# sourceMappingURL=RenderSpinner.js.map