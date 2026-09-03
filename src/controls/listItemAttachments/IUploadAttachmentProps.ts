import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IUploadAttachmentProps {
  listId: string;
  itemId?: number;
  className?: string;
  webUrl?: string;
  disabled?: boolean;
  context: BaseComponentContext;
  fireUpload?: boolean;
  onAttachmentUpload: (file?: File) => void;
  onUploadDialogClosed: () => void;
  /**
   * Callback function to notify parent components when attachments are modified and the item ETag changes
   * @param itemData - The updated item data including the new ETag
   */
  onAttachmentChange?: (itemData: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
}
