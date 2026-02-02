import React, { createContext, useReducer } from "react";
import { ListItemCommentsStateReducer } from "./ListItemCommentsStateReducer";
// Reducer
// Initial State (Store )
var initialState = {
    errorInfo: undefined,
    comments: [],
    isLoading: false,
    isScrolling: false,
    pageInfo: {},
    commentAction: undefined,
    commentToAdd: {},
    selectedComment: {},
};
var stateInit = {
    listItemCommentsState: initialState,
    setlistItemCommentsState: function () { return; },
};
//  (store)
export var ListItemCommentsStateContext = createContext(stateInit);
export var ListItemCommentsStateProvider = function (props) {
    var _a = useReducer(ListItemCommentsStateReducer, initialState), listItemCommentsState = _a[0], setlistItemCommentsState = _a[1];
    return (React.createElement(ListItemCommentsStateContext.Provider, { value: { listItemCommentsState: listItemCommentsState, setlistItemCommentsState: setlistItemCommentsState } }, props.children));
};
//# sourceMappingURL=ListItemCommentsStateProvider.js.map