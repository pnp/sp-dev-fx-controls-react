import { IconButton } from "office-ui-fabric-react/lib/Button";
import { DocumentCard, DocumentCardDetails } from "office-ui-fabric-react/lib/DocumentCard";
import { Stack } from "office-ui-fabric-react/lib/Stack";
import * as React from "react";
import { useCallback } from "react";
import { useContext } from "react";
import { ListItemCommentsStateContext } from "../ListItemCommentsStateProvider";
import { CommentItem } from "./CommentItem";
import { IComment } from "./IComment";
import { RenderNoComments } from "./RenderNoComments";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";

export interface IRenderCommentsProps {}

export const RenderComments: React.FunctionComponent<IRenderCommentsProps> = (
) => {
  const { listItemCommentsState } = useContext(ListItemCommentsStateContext);
  const { documentCardStyles, itemContainerStyles, deleteButtonContainerStyles } = useListItemCommentsStyles();
  const { comments } = listItemCommentsState;

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
                    /*   const newListActivities = pullAllBy(listActivities, [listActivity]);
              setRenderComments(
                listActivities.length ? await _RenderComments() : await _renderNoComments()
              );
              setGlobalState({
                type: EGlobalStateTypes.SET_LIST_ACTIVITY,
                payload: newListActivities,
              });
              setGlobalState({
                type: EGlobalStateTypes.SET_NUMBER_OF_Comments,
                payload: newListActivities.length,
              }); */
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

  return <>{renderComments()}</>;
};
