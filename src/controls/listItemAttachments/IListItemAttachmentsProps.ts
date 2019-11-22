import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ExtensionContext } from "@microsoft/sp-extension-base";

export interface IListItemAttachmentsProps {
  listId: string;
  itemId: number;
  className?: string;
  webUrl?:string;
  disabled?: boolean;
  context: WebPartContext |  ExtensionContext;
}
