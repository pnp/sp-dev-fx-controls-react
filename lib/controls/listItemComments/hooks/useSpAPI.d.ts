import { IlistItemCommentsResults } from "./../models";
import { IAddCommentPayload } from "../models/IAddCommentPayload";
import { IComment } from "../components/Comments/IComment";
interface returnObject {
    getListItemComments: () => Promise<IlistItemCommentsResults>;
    getNextPageOfComments: (nextLink: string) => Promise<IlistItemCommentsResults>;
    addComment: (comment: IAddCommentPayload) => Promise<IComment>;
    deleteComment: (commentId: number) => Promise<void>;
    likeComment: (commentId: number) => Promise<void>;
    unlikeComment: (commentId: number) => Promise<void>;
}
export declare const useSpAPI: () => returnObject;
export {};
//# sourceMappingURL=useSpAPI.d.ts.map