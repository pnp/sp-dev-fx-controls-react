import * as React from "react";
import { useContext } from "react";
import { ListItemCommentsStateContext } from "../ListItemCommentsStateProvider";
import { Dialog, DialogType, DialogFooter } from "@fluentui/react/lib/Dialog";
import { PrimaryButton, DefaultButton } from "@fluentui/react/lib/Button";
import { ChoiceGroup, IChoiceGroupOption } from "@fluentui/react/lib/ChoiceGroup";
import { useBoolean } from "@fluentui/react-hooks";
import { IComment } from "../Comments/IComment";
import { CommentItem } from "../Comments/CommentItem";
import { DocumentCard } from "office-ui-fabric-react/lib/components/DocumentCard";
import { DocumentCardDetails } from "@fluentui/react/lib/DocumentCard";
import { Stack } from "@fluentui/react/lib/Stack";
import { useListItemCommentsStyles } from "../Comments/useListItemCommentsStyles";
import { IDialogContentProps, IDialogContentStyles } from "office-ui-fabric-react";
export interface IConfirmDeleteProps {

  hideDialog: boolean;
  onDismiss: (deleteComment: boolean) => void;
}

export const ConfirmDelete: React.FunctionComponent<IConfirmDeleteProps> = (
  props: React.PropsWithChildren<IConfirmDeleteProps>
) => {
  const { listItemCommentsState, setlistItemCommentsState } = useContext(ListItemCommentsStateContext);
  const { documentCardDeleteStyles, itemContainerStyles } = useListItemCommentsStyles();
  const {  hideDialog, onDismiss } = props;
const { selectedComment } = listItemCommentsState;
const stylesSubText: Partial<IDialogContentStyles> ={
  subText: { fontWeight: 600}
}

  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dialogContentProps  = {
    type: DialogType.largeHeader,
    title: "Confirm Delete Comment",
    styles: stylesSubText,
    subText: "Are you sure you want delete this Comment ?",
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
