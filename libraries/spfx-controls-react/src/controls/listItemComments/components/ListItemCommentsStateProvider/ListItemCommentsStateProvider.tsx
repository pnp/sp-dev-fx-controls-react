import React, { createContext, useReducer } from "react";
import { ListItemCommentsStateReducer } from "./ListItemCommentsStateReducer";
import { IListItemCommentsState } from "./IListItemCommentsState";
import { IListItemCommentsStateContext } from "./IListItemCommentsStateContext";
import { IPageInfo } from "../../models/IPageInfo";
import { IAddCommentPayload } from "../../models/IAddCommentPayload";
import { IComment } from "../Comments/IComment";
// Reducer
// Initial State (Store )
const initialState: IListItemCommentsState = {
  errorInfo: undefined,
  comments: [],
  isLoading: false,
  isScrolling: false,
  pageInfo: {} as IPageInfo,
  commentAction: undefined,
  commentToAdd: {} as IAddCommentPayload,
  selectedComment: {} as IComment,
};

const stateInit: IListItemCommentsStateContext = {
  listItemCommentsState: initialState,
  setlistItemCommentsState: () => { return; },
};

//  (store)
export const ListItemCommentsStateContext = createContext<IListItemCommentsStateContext>(stateInit);
export const ListItemCommentsStateProvider = (props: { children: React.ReactNode }): JSX.Element => {
  const [listItemCommentsState, setlistItemCommentsState] = useReducer(ListItemCommentsStateReducer, initialState);

  return (
    <ListItemCommentsStateContext.Provider value={{ listItemCommentsState, setlistItemCommentsState }}>
      {props.children}
    </ListItemCommentsStateContext.Provider>
  );
};
