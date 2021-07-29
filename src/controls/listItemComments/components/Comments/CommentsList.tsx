import * as React from "react";
import { useContext, useEffect, useRef } from "react";
import { Stack } from "@fluentui/react/lib/Stack";
import { useSpAPI } from "../../hooks";
import { EListItemCommentsStateTypes, ListItemCommentsStateContext } from "../ListItemCommentsStateProvider";
import { useListItemCommentsStyles } from "./useListItemCommentsStyles";
import { IlistItemCommentsResults, IPageInfo } from "../../models";
import { getScrollPosition } from "../../utils/utils";
import { IErrorInfo } from "../ErrorInfo/IErrorInfo";
import { RenderComments } from "./RenderComments";
import { RenderError } from "./RenderError";
import { RenderScrollingInfo } from "./RenderScrollingInfo";
import { Text } from "@fluentui/react/lib/Text";
import { SPPermission } from "@microsoft/sp-page-context";

import { AddComment } from "../AddComment/AddComment";
import { SecurityTrimmedControl } from "../../../securityTrimmedControl";
import { AppContext } from "../../common";
export const CommentsList: React.FunctionComponent = () => {
  const { listItemCommentsState, setlistItemCommentsState } = useContext(ListItemCommentsStateContext);
  const { webUrl, listId } = useContext(AppContext);
  const { configurationListClasses } = useListItemCommentsStyles();
  const { getListItemComments, getNextPageOfComments } = useSpAPI();
  const { comments, isScrolling, pageInfo } = listItemCommentsState;
  const { hasMore, nextLink } = pageInfo;
  const scrollPanelRef = useRef<HTMLDivElement>();

  const { errorInfo } = listItemCommentsState;

  useEffect(() => {
    (async () => {
      try {
        const _commentsResults: IlistItemCommentsResults = await getListItemComments();
        setlistItemCommentsState({
          type: EListItemCommentsStateTypes.SET_LIST_ITEM_COMMENTS,
          payload: _commentsResults.comments,
        });
        setlistItemCommentsState({
          type: EListItemCommentsStateTypes.SET_DATA_PAGE_INFO,
          payload: { hasMore: _commentsResults.hasMore, nextLink: _commentsResults.nextLink } as IPageInfo,
        });
      } catch (error) {
        const _errorInfo: IErrorInfo = { showError: true, error: error.message };
        setlistItemCommentsState({
          type: EListItemCommentsStateTypes.SET_ERROR_INFO,
          payload: _errorInfo,
        });
      }
    })();
  }, []);

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
  }, [hasMore, nextLink, comments, isScrolling, scrollPanelRef.current]);

  return (
    <>
      <Stack tokens={{ childrenGap: 10, maxWidth: 335 }}>
        <RenderError errorInfo={errorInfo} />
        <AddComment />
        <Text variant="small" block style={{ fontWeight: 600 }}>
          Comments
        </Text>
        <div className={configurationListClasses.titlesContainer} onScroll={handleScroll} ref={scrollPanelRef}>
          <Stack>
            <RenderComments />
          </Stack>
        </div>
      </Stack>
      <RenderScrollingInfo />
    </>
  );
};
