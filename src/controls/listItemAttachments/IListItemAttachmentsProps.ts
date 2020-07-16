import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ExtensionContext } from "@microsoft/sp-extension-base";

export interface IListItemAttachmentsProps {
  listId: string;
  itemId: number;
  className?: string;
  webUrl?:string;
  disabled?: boolean;
  context: WebPartContext |  ExtensionContext;
  openAttachmentsInNewWindow?: boolean; // JJ - 20200613 - needed to support Microsoft Teams
}
