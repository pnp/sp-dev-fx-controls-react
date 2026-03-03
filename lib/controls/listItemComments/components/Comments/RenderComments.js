var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { IconButton } from '@fluentui/react/lib/Button';
import { DocumentCard, DocumentCardDetails, } from '@fluentui/react/lib/DocumentCard';
import { Stack } from '@fluentui/react/lib/Stack';
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useContext } from 'react';
import { ConfirmDelete } from '../ConfirmDelete/ConfirmDelete';
import { EListItemCommentsStateTypes, ListItemCommentsStateContext, } from '../ListItemCommentsStateProvider';
import { CommentItem } from './CommentItem';
import { RenderSpinner } from './RenderSpinner';
import { useListItemCommentsStyles } from './useListItemCommentsStyles';
import { useBoolean } from '@fluentui/react-hooks';
import { Link, List, Text } from '@fluentui/react';
import { AppContext, ECommentAction } from '../..';
import { LikedUserList } from './LikedUserList';
export var RenderComments = function () {
    var highlightedCommentId = useContext(AppContext).highlightedCommentId;
    var _a = useContext(ListItemCommentsStateContext), listItemCommentsState = _a.listItemCommentsState, setlistItemCommentsState = _a.setlistItemCommentsState;
    var _b = useListItemCommentsStyles(), documentCardStyles = _b.documentCardStyles, documentCardHighlightedStyles = _b.documentCardHighlightedStyles, itemContainerStyles = _b.itemContainerStyles, buttonsContainerStyles = _b.buttonsContainerStyles;
    var comments = listItemCommentsState.comments, isLoading = listItemCommentsState.isLoading;
    var _c = useBoolean(true), hideDialog = _c[0], setHideDialog = _c[1].toggle;
    var _d = useState(false), showDialog = _d[0], setShowDialog = _d[1];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    var _e = useState([]), selectedLikedBy = _e[0], setSelectedLikedBy = _e[1];
    var _likeComment = useCallback(function () {
        setlistItemCommentsState({
            type: EListItemCommentsStateTypes.SET_COMMENT_ACTION,
            payload: ECommentAction.LIKE,
        });
    }, []);
    var _unLikeComment = useCallback(function () {
        setlistItemCommentsState({
            type: EListItemCommentsStateTypes.SET_COMMENT_ACTION,
            payload: ECommentAction.UNLIKE,
        });
    }, []);
    var onRenderCell = useCallback(function (comment, index) {
        return (React.createElement(DocumentCard, { styles: highlightedCommentId && comment.id === highlightedCommentId
                ? documentCardHighlightedStyles
                : documentCardStyles, key: index },
            React.createElement(Stack, { horizontal: true, horizontalAlign: "end", styles: buttonsContainerStyles },
                React.createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                    comment.likeCount > 0 ? (React.createElement(Link, { onClick: function () {
                            setSelectedLikedBy(comment.likedBy);
                            setShowDialog(true);
                        } }, comment.likeCount)) : (React.createElement(Text, null, comment.likeCount)),
                    React.createElement(IconButton, { iconProps: {
                            iconName: "".concat(comment.isLikedByUser ? 'LikeSolid' : 'Like'),
                        }, style: { fontSize: 10 }, onClick: function () {
                            setlistItemCommentsState({
                                type: EListItemCommentsStateTypes.SET_SELECTED_COMMENT,
                                payload: comment,
                            });
                            if (!comment.isLikedByUser) {
                                _likeComment();
                            }
                            else {
                                _unLikeComment();
                            }
                        } })),
                React.createElement(IconButton, { iconProps: { iconName: 'Delete' }, style: { fontSize: 10 }, onClick: function () { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            setlistItemCommentsState({
                                type: EListItemCommentsStateTypes.SET_SELECTED_COMMENT,
                                payload: comment,
                            });
                            setHideDialog();
                            return [2 /*return*/];
                        });
                    }); } })),
            React.createElement(DocumentCardDetails, { styles: { root: { paddingTop: 15 } } },
                React.createElement(Stack, { horizontal: true, horizontalAlign: "start", verticalAlign: "center", tokens: { childrenGap: 12 }, styles: itemContainerStyles },
                    React.createElement(CommentItem, { comment: comment })))));
    }, [comments]);
    return (React.createElement(React.Fragment, null,
        isLoading ? (React.createElement(RenderSpinner, null)) : (React.createElement(List, { items: comments, onRenderCell: onRenderCell })),
        React.createElement(ConfirmDelete, { hideDialog: hideDialog, onDismiss: function (deleteComment) {
                if (deleteComment) {
                    setlistItemCommentsState({
                        type: EListItemCommentsStateTypes.SET_COMMENT_ACTION,
                        payload: ECommentAction.DELETE,
                    });
                }
                setHideDialog();
            } }),
        React.createElement(LikedUserList, { isDialogOpen: showDialog, setShowDialog: setShowDialog, likedBy: selectedLikedBy })));
};
//# sourceMappingURL=RenderComments.js.map