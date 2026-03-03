import * as React from "react";
import { ListItemCommentsStateProvider } from "./components/ListItemCommentsStateProvider";
import { AppContext } from "./common";
import { CommentsList } from "./components/Comments/CommentsList";
import { Stack } from "@fluentui/react/lib/Stack";
import { Text } from "@fluentui/react/lib/Text";
var theme = window.__themeState__.theme;
export var ListItemComments = function (props) {
    var webUrl = props.webUrl, listId = props.listId, itemId = props.itemId, serviceScope = props.serviceScope, numberCommentsPerPage = props.numberCommentsPerPage, label = props.label, highlightedCommentId = props.highlightedCommentId;
    if (!listId && !itemId && !serviceScope)
        return;
    return (React.createElement(React.Fragment, null,
        React.createElement(ListItemCommentsStateProvider, null,
            React.createElement(AppContext.Provider, { value: {
                    webUrl: webUrl,
                    listId: listId,
                    itemId: itemId,
                    theme: theme,
                    serviceScope: serviceScope,
                    label: label,
                    highlightedCommentId: highlightedCommentId,
                    numberCommentsPerPage: numberCommentsPerPage,
                } },
                React.createElement(Stack, null,
                    React.createElement(Text, { variant: "medium", style: { fontWeight: 600 } }, label),
                    React.createElement(CommentsList, null))))));
};
//# sourceMappingURL=ListItemComments.js.map