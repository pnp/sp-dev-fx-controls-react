export interface IComment {
    __metadata: Metadata;
    likedBy: LikedBy;
    replies: Replies;
    author: Author;
    createdDate: string;
    id: string;
    isLikedByUser: boolean;
    isReply: boolean;
    itemId: number;
    likeCount: number;
    listId: string;
    mentions: Mention[];
    parentId: string;
    replyCount: number;
    text: string;
}
export interface Mentions {
    __metadata: string;
    results: Mention[];
}
export interface Mention {
    email: string;
    id: number;
    loginName: string;
    name: string;
}
export interface Author {
    __metadata: string;
    email: string;
    expiration?: string;
    id: number;
    isActive: boolean;
    isExternal: boolean;
    jobTitle?: string;
    loginName: string;
    name: string;
    principalType: number;
    userId?: string;
    userPrincipalName?: string;
}
interface Replies {
    results: any[];
}
interface LikedBy {
    __deferred: Deferred;
}
interface Deferred {
    uri: string;
}
interface Metadata {
    id: string;
    uri: string;
    type: string;
}
export {};
//# sourceMappingURL=IComment.d.ts.map