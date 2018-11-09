import {IListItemAttachmentFile } from './IListItemAttachmentFile';
export interface IListItemAttachmentsState {
      file: IListItemAttachmentFile;
      showDialog: boolean;
      dialogMessage: string;
      attachments: IListItemAttachmentFile[];
      deleteAttachment: boolean;
      disableButton: boolean;
}
