import { IErrorInfo } from "../ErrorInfo/IErrorInfo";
import { IComment } from "../Comments/IComment";

import { EListItemCommentsStateTypes } from "./EListItemCommentsStateTypes";
import { IListItemCommentsState } from "./IListItemCommentsState";
import { IPageInfo } from "../../models/IPageInfo";
import { ECommentAction } from "../../common/ECommentAction";

// Reducer
export const ListItemCommentsStateReducer = (
  state: IListItemCommentsState,
  action: { type: EListItemCommentsStateTypes; payload: unknown }
): IListItemCommentsState => {
  switch (action.type) {
    case EListItemCommentsStateTypes.SET_ERROR_INFO:
      return { ...state, errorInfo: action.payload as IErrorInfo };
    case EListItemCommentsStateTypes.SET_LIST_ITEM_COMMENTS:
      return { ...state, comments: action.payload as IComment[] };
    case EListItemCommentsStateTypes.SET_IS_LOADING:
      return { ...state, isLoading: action.payload as boolean };
    case EListItemCommentsStateTypes.SET_IS_SCROLLING:
      return { ...state, isScrolling: action.payload as boolean };
    case EListItemCommentsStateTypes.SET_DATA_PAGE_INFO:
      return { ...state, pageInfo: action.payload as IPageInfo };
    case EListItemCommentsStateTypes.SET_COMMENT_ACTION:
      return { ...state, commentAction: action.payload as ECommentAction };
    default:
      return state;
  }
};
