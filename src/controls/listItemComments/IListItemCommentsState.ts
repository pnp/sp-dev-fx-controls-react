export interface IListItemCommentsState {
    comments: any[];
    //If while fetching comments there is any error such as list item not found then the variable would be true else false
    itemFetchError: boolean;
    //To add comment
    commentText: string;
    //Delete dialog visibility
    hideDeleteDialog: boolean;
    //Delete comment id
    deleteCommentID?: number;
}