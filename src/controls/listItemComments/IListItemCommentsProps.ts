import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ExtensionContext } from "@microsoft/sp-extension-base";

export interface IListItemCommentsProps {

    /**
     * id of the list where the comments needs to be fetched
     */
    listId: string;

    /**
     * id of list item to fetch comments
     */
    itemID: number;

    /**
     * context to fetch the comments from the list
     */
    context: WebPartContext | ExtensionContext;

    /**
     * CSS class to apply to the rich text editor.
     * @defaultvalue null
     */
    className?: string;

    /**
     * weburl in case the list is present in different web
     * @defaultvalue null
     */
    webUrl?: string;

    /**
     * replyButtonText to change the text of the reply button
     * @defaultvalue Add Reply
     */
    replyButtonText?: string;
}