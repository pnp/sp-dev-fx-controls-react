import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IListItemAttachmentsProps {
  listId: string;
  itemId: number;
  className?: string;
  webUrl?:string;
  disabled?: boolean;
  context: BaseComponentContext;
  openAttachmentsInNewWindow?: boolean; // JJ - 20200613 - needed to support Microsoft Teams
}
