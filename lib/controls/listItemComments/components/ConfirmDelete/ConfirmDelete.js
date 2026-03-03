import * as React from "react";
import { useContext } from "react";
import { ListItemCommentsStateContext } from "../ListItemCommentsStateProvider";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { CommentItem } from "../Comments/CommentItem";
import { DocumentCard } from "@fluentui/react/lib/DocumentCard";
import { DocumentCardDetails } from "@fluentui/react/lib/DocumentCard";
import { Stack } from "@fluentui/react/lib/Stack";
import { useListItemCommentsStyles } from "../Comments/useListItemCommentsStyles";
import strings from "ControlStrings";
export var ConfirmDelete = function (props) {
    var listItemCommentsState = useContext(ListItemCommentsStateContext).listItemCommentsState;
    var _a = useListItemCommentsStyles(), documentCardDeleteStyles = _a.documentCardDeleteStyles, itemContainerStyles = _a.itemContainerStyles;
    var hideDialog = props.hideDialog, onDismiss = props.onDismiss;
    var selectedComment = listItemCommentsState.selectedComment;
    var stylesSubText = {
        subText: { fontWeight: 600 },
    };
    var modelProps = {
        isBlocking: false,
        styles: { main: { maxWidth: 450 } },
    };
    var dialogContentProps = {
        type: DialogType.largeHeader,
        title: strings.ListItemCommentsDialogDeleteTitle,
        styles: stylesSubText,
        subText: strings.ListItemCommentDIalogDeleteSubText,
    };
    return (React.createElement(React.Fragment, null,
        React.createElement(Dialog, { hidden: hideDialog, onDismiss: function () { return onDismiss(false); }, dialogContentProps: dialogContentProps, modalProps: modelProps },
            " ",
            React.createElement(DocumentCard, { styles: documentCardDeleteStyles },
                React.createElement(DocumentCardDetails, { styles: { root: { paddingTop: 15 } } },
                    React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { childrenGap: 12 }, styles: itemContainerStyles },
                        React.createElement(CommentItem, { comment: selectedComment })))),
            React.createElement(DialogFooter, null,
                React.createElement(PrimaryButton, { onClick: function () { return onDismiss(true); }, text: "OK" }),
                React.createElement(DefaultButton, { onClick: function () { return onDismiss(false); }, text: "Cancel" })))));
};
//# sourceMappingURL=ConfirmDelete.js.map