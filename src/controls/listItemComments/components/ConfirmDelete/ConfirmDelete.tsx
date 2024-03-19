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
import { IDialogContentStyles } from "@fluentui/react/lib/Dialog";
import strings from "ControlStrings";
export interface IConfirmDeleteProps {
  hideDialog: boolean;
  onDismiss: (deleteComment: boolean) => void;
}

export const ConfirmDelete: React.FunctionComponent<IConfirmDeleteProps> = (
  props: React.PropsWithChildren<IConfirmDeleteProps>
) => {
  const { listItemCommentsState } = useContext(ListItemCommentsStateContext);
  const { documentCardDeleteStyles, itemContainerStyles } = useListItemCommentsStyles();
  const { hideDialog, onDismiss } = props;
  const { selectedComment } = listItemCommentsState;
  const stylesSubText: Partial<IDialogContentStyles> = {
    subText: { fontWeight: 600 },
  };

  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: strings.ListItemCommentsDialogDeleteTitle,
    styles: stylesSubText,
    subText: strings.ListItemCommentDIalogDeleteSubText,
  };
  return (
    <>
      <Dialog
        hidden={hideDialog}
        onDismiss={() => onDismiss(false)}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        {" "}
        <DocumentCard styles={documentCardDeleteStyles}>
          <DocumentCardDetails styles={{ root: { paddingTop: 15 } }}>
            <Stack
              horizontal
              horizontalAlign="start"
              verticalAlign="center"
              tokens={{ childrenGap: 12 }}
              styles={itemContainerStyles}
            >
              <CommentItem comment={selectedComment} />
            </Stack>
          </DocumentCardDetails>
        </DocumentCard>
        <DialogFooter>
          <PrimaryButton onClick={() => onDismiss(true)} text="OK" />
          <DefaultButton onClick={() => onDismiss(false)} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </>
  );
};
