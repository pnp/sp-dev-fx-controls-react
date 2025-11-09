import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IListItemAttachmentsProps {
  listId: string;
  itemId?: number;
  className?: string;
  webUrl?:string;
  disabled?: boolean;
  context: BaseComponentContext;
  openAttachmentsInNewWindow?: boolean; // JJ - 20200613 - needed to support Microsoft Teams
  /**
   * Main text to display on the placeholder, next to the icon
   */
  label?:string;
  /**
   * Description text to display on the placeholder, below the main text and icon
   */
  description?:string;
  /**
   * Callback function to notify parent components when attachments are modified and the item ETag changes
   * @param itemData - The updated item data including the new ETag
   */
  onAttachmentChange?: (itemData: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}
