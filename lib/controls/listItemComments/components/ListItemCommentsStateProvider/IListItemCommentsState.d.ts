import { IErrorInfo } from "../ErrorInfo/IErrorInfo";
import { IComment } from "../Comments/IComment";
import { IPageInfo } from "../../models";
import { ECommentAction } from "../../common/ECommentAction";
import { IAddCommentPayload } from "../../models/IAddCommentPayload";
export interface IListItemCommentsState {
    errorInfo: IErrorInfo | undefined;
    comments: IComment[];
    isLoading: boolean;
    isScrolling: boolean;
    pageInfo: IPageInfo;
    commentAction: ECommentAction;
    commentToAdd: IAddCommentPayload;
    selectedComment: IComment;
}
//# sourceMappingURL=IListItemCommentsState.d.ts.map