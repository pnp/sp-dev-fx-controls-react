import { IconButton } from "office-ui-fabric-react/lib/Button";
import { DocumentCard, DocumentCardDetails } from "office-ui-fabric-react/lib/DocumentCard";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import * as React from "react";
import { useCallback, useState } from "react";
import { useContext } from "react";
import { ConfirmDelete } from "../ConfirmDelete/ConfirmDelete";
import { EListItemCommentsStateTypes, ListItemCommentsStateContext } from "../ListItemCommentsStateProvider";
import { CommentItem } from "./CommentItem";
import { IComment } from "./IComment";
import { RenderNoComments } from "./RenderNoComments";
import { RenderSpinner } from "./RenderSpinner";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";
import { useBoolean } from "@fluentui/react-hooks";
import { ECommentAction } from "../../common/ECommentAction";
export interface IRenderCommentsProps {}

export const RenderComments: React.FunctionComponent<IRenderCommentsProps> = () => {
  const { listItemCommentsState, setlistItemCommentsState } = useContext(ListItemCommentsStateContext);
  const { documentCardStyles, itemContainerStyles, deleteButtonContainerStyles } = useListItemCommentsStyles();
  const { comments, isLoading, selectedComment } = listItemCommentsState;

  const [hideDialog, { toggle: setHideDialog }] = useBoolean(true);

  const renderComments = useCallback((): JSX.Element[] => {
    const _renderComments: JSX.Element[] = [];
    comments.length
      ? comments.map((comment: IComment, i) => {
          _renderComments.push(
            <DocumentCard styles={documentCardStyles} key={i}>
              <Stack horizontal horizontalAlign="end" styles={deleteButtonContainerStyles}>
                <IconButton
                  iconProps={{ iconName: "Delete" }}
                  style={{ fontSize: 10 }}
                  onClick={async () => {
                    setlistItemCommentsState({
                      type: EListItemCommentsStateTypes.SET_SELECTED_COMMENT,
                      payload: comment,
                    });
                    setHideDialog();
                  }}
                ></IconButton>
              </Stack>
              <DocumentCardDetails styles={{ root: { paddingTop: 15 } }}>
                <Stack
                  horizontal
                  horizontalAlign="start"
                  verticalAlign="center"
                  tokens={{ childrenGap: 12 }}
                  styles={itemContainerStyles}
                >
                  <CommentItem comment={comment} />
                </Stack>
              </DocumentCardDetails>
            </DocumentCard>
          );
        })
      : _renderComments.push(<RenderNoComments />);

    return _renderComments;
  }, [comments]);

  return (
    <>
      {isLoading ? <RenderSpinner /> : renderComments()}
      <ConfirmDelete
        hideDialog={hideDialog}
        onDismiss={(deleteComment: boolean) => {
          if (deleteComment){
            setlistItemCommentsState({
              type: EListItemCommentsStateTypes.SET_COMMENT_ACTION,
              payload: ECommentAction.DELETE,
            });
          }
          setHideDialog();
        }}
      />
    </>
  );
};
