import { BaseComponentContext } from '@microsoft/sp-component-base';

export interface IUploadAttachmentProps {
  listId: string;
  itemId: number;
  className?: string;
  webUrl?:string;
  disabled?: boolean;
  context: BaseComponentContext;
  fireUpload?:boolean;
  onAttachmentUpload: () => void;
}
