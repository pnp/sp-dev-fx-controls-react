import { IconButton } from '@fluentui/react/lib/Button';
import {
  DocumentCard,
  DocumentCardDetails,
} from '@fluentui/react/lib/DocumentCard';
import { Stack } from '@fluentui/react/lib/Stack';
import * as React from 'react';
import { useCallback } from 'react';
import { useContext } from 'react';
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete';
import {
  EListItemCommentsStateTypes,
  ListItemCommentsStateContext,
} from '../ListItemCommentsStateProvider';
import { CommentItem } from './CommentItem';
import { IComment } from './IComment';
import { RenderSpinner } from './RenderSpinner';
import { useListItemCommentsStyles } from './useListItemCommentsStyles';
import { useBoolean } from '@fluentui/react-hooks';
import { List, Text } from '@fluentui/react';
import { AppContext, ECommentAction } from '../..';

export interface IRenderCommentsProps {}

export const RenderComments: React.FunctionComponent<
  IRenderCommentsProps
> = () => {
  const { highlightedCommentId } = useContext(AppContext);
  const { listItemCommentsState, setlistItemCommentsState } = useContext(
    ListItemCommentsStateContext
  );
  const {
    documentCardStyles,
    documentCardHighlightedStyles,
    itemContainerStyles,
    ButtonsContainerStyles,
  } = useListItemCommentsStyles();
  const { comments, isLoading } = listItemCommentsState;

  const [hideDialog, { toggle: setHideDialog }] = useBoolean(true);

  const _likeComment = useCallback(() => {
    setlistItemCommentsState({
      type: EListItemCommentsStateTypes.SET_COMMENT_ACTION,
      payload: ECommentAction.LIKE,
    });
  }, []);

  const _unLikeComment = useCallback(() => {
    setlistItemCommentsState({
      type: EListItemCommentsStateTypes.SET_COMMENT_ACTION,
      payload: ECommentAction.UNLIKE,
    });
  }, []);

  const onRenderCell = useCallback(
    (comment: IComment, index: number): JSX.Element => {
      return (
        <DocumentCard
          styles={
            highlightedCommentId && comment.id === highlightedCommentId
              ? documentCardHighlightedStyles
              : documentCardStyles
          }
          key={index}
        >
          <Stack
            horizontal
            horizontalAlign="end"
            styles={ButtonsContainerStyles}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Text>{comment.likeCount}</Text>
              <IconButton
                iconProps={{
                  iconName: `${comment.isLikedByUser ? 'LikeSolid' : 'Like'}`,
                }}
                style={{ fontSize: 10 }}
                onClick={() => {
                  setlistItemCommentsState({
                    type: EListItemCommentsStateTypes.SET_SELECTED_COMMENT,
                    payload: comment,
                  });
                  !comment.isLikedByUser ? _likeComment() : _unLikeComment();
                }}
              />
            </div>
            <IconButton
              iconProps={{ iconName: 'Delete' }}
              style={{ fontSize: 10 }}
              onClick={async () => {
                setlistItemCommentsState({
                  type: EListItemCommentsStateTypes.SET_SELECTED_COMMENT,
                  payload: comment,
                });
                setHideDialog();
              }}
            />
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
    },
    [comments]
  );
  return (
    <>
      {isLoading ? (
        <RenderSpinner />
      ) : (
        <List items={comments} onRenderCell={onRenderCell} />
      )}
      <ConfirmDelete
        hideDialog={hideDialog}
        onDismiss={(deleteComment: boolean) => {
          if (deleteComment) {
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
