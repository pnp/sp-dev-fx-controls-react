import * as React from "react";
import { useContext, useEffect, useRef } from "react";
import { Stack } from "@fluentui/react/lib/Stack";
import { useSpAPI } from "../../hooks";
import { EListItemCommentsStateTypes, ListItemCommentsStateContext } from "../ListItemCommentsStateProvider";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";
import { IlistItemCommentsResults, IPageInfo } from "../../models";
import { getScrollPosition } from "../../utils/utils";
import { IErrorInfo } from "../ErrorInfo/IErrorInfo";
import { RenderError } from "./RenderError";
import { RenderSpinner } from "./RenderSpinner";
import { Text } from "@fluentui/react/lib/Text";
import { AddComment } from "../AddComment/AddComment";
import { ECommentAction } from "../../common/ECommentAction";
import { IAddCommentPayload } from "../../models/IAddCommentPayload";
import { useCallback } from "react";
import strings from "ControlStrings";
import { RenderComments } from "./RenderComments";

export const CommentsList: React.FunctionComponent = () => {
  const { listItemCommentsState, setlistItemCommentsState } = useContext(ListItemCommentsStateContext);
  const { configurationListClasses } = useListItemCommentsStyles();
  const { getListItemComments, getNextPageOfComments, addComment, deleteComment } = useSpAPI();
  const { comments, isScrolling, pageInfo, commentAction, commentToAdd, selectedComment } = listItemCommentsState;
  const { hasMore, nextLink } = pageInfo;
  const scrollPanelRef = useRef<HTMLDivElement>();
  const { errorInfo } = listItemCommentsState;

  const _loadComments = useCallback(async () => {
    try {
      setlistItemCommentsState({
        type: EListItemCommentsStateTypes.SET_IS_LOADING,
        payload: true,
      });
      const _commentsResults: IlistItemCommentsResults = await getListItemComments();
      setlistItemCommentsState({
        type: EListItemCommentsStateTypes.SET_LIST_ITEM_COMMENTS,
        payload: _commentsResults.comments,
      });
      setlistItemCommentsState({
        type: EListItemCommentsStateTypes.SET_DATA_PAGE_INFO,
        payload: { hasMore: _commentsResults.hasMore, nextLink: _commentsResults.nextLink } as IPageInfo,
      });
      setlistItemCommentsState({ type: EListItemCommentsStateTypes.SET_COMMENT_ACTION, payload: undefined });
      setlistItemCommentsState({
        type: EListItemCommentsStateTypes.SET_IS_LOADING,
        payload: false,
      });
    } catch (error) {
      const _errorInfo: IErrorInfo = { showError: true, error: error.message };
      setlistItemCommentsState({
        type: EListItemCommentsStateTypes.SET_ERROR_INFO,
        payload: _errorInfo,
      });
    }
  }, [setlistItemCommentsState]);

  const _onAddComment = useCallback(
    async (commentText: IAddCommentPayload) => {
      try {
        const _errorInfo: IErrorInfo = { showError: false, error: undefined };
        setlistItemCommentsState({
          type: EListItemCommentsStateTypes.SET_ERROR_INFO,
          payload: _errorInfo,
        });
        await addComment(commentText);
        await _loadComments();
      } catch (error) {
        const _errorInfo: IErrorInfo = { showError: true, error: error };
        setlistItemCommentsState({
          type: EListItemCommentsStateTypes.SET_ERROR_INFO,
          payload: _errorInfo,
        });
      }
    },
    [setlistItemCommentsState, addComment, _loadComments]
  );

  const _onADeleteComment = useCallback(
    async (commentId: number) => {
      if (!commentId) return;
      try {
        const _errorInfo: IErrorInfo = { showError: false, error: undefined };
        setlistItemCommentsState({
          type: EListItemCommentsStateTypes.SET_ERROR_INFO,
          payload: _errorInfo,
        });

        await deleteComment(commentId);
        await _loadComments();
      } catch (error) {
        const _errorInfo: IErrorInfo = { showError: true, error: error };
        setlistItemCommentsState({
          type: EListItemCommentsStateTypes.SET_ERROR_INFO,
          payload: _errorInfo,
        });
      }
    },
    [setlistItemCommentsState, _loadComments]
  );

  useEffect(() => {
    switch (commentAction) {
      case ECommentAction.ADD:
        (async () => {
          // Add new comment
          await _onAddComment(commentToAdd);
        })().then(() => { /* no-op; */}).catch(() => { /* no-op; */ });
        break;
      case ECommentAction.DELETE:
        (async () => {
          // delete comment
          const commentId = Number(selectedComment.id);
          await _onADeleteComment(commentId);
        })().then(() => { /* no-op; */}).catch(() => { /* no-op; */ });
        break;
      default:
        break;
    }
  }, [commentAction, selectedComment, commentToAdd, _onAddComment, _onADeleteComment]);

  useEffect(() => {
    (async () => {
      await _loadComments();
    })().then(() => { /* no-op; */}).catch(() => { /* no-op; */ });
  }, [_loadComments]);

  const handleScroll = React.useCallback(async () => {
    const _scrollPosition = getScrollPosition(scrollPanelRef.current);
    if (isScrolling) return;
    if (hasMore && _scrollPosition > 90) {
      setlistItemCommentsState({
        type: EListItemCommentsStateTypes.SET_IS_SCROLLING,
        payload: true,
      });
      const _commentsResults: IlistItemCommentsResults = await getNextPageOfComments(nextLink);
      setlistItemCommentsState({
        type: EListItemCommentsStateTypes.SET_LIST_ITEM_COMMENTS,
        payload: [...comments, ..._commentsResults.comments],
      });
      setlistItemCommentsState({
        type: EListItemCommentsStateTypes.SET_DATA_PAGE_INFO,
        payload: { hasMore: _commentsResults.hasMore, nextLink: _commentsResults.nextLink } as IPageInfo,
      });
      setlistItemCommentsState({
        type: EListItemCommentsStateTypes.SET_IS_SCROLLING,
        payload: false,
      });
    }
  }, [hasMore, nextLink, isScrolling, setlistItemCommentsState]);

  return (
    <>
      <Stack tokens={{ childrenGap: 10, maxWidth: 335 }}>
        <RenderError errorInfo={errorInfo} />
        <AddComment />
        <Text variant="small" block style={{ fontWeight: 600 }}>
          {strings.ListItemCommentsLabel}
        </Text>
        <div className={configurationListClasses.titlesContainer} onScroll={handleScroll} ref={scrollPanelRef}>
          <Stack>
            <RenderComments />
          </Stack>
        </div>
      </Stack>
      {<RenderSpinner />}
    </>
  );
};
