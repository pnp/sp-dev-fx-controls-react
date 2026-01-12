import { IListItemAttachmentFile } from './IListItemAttachmentFile';
export interface IListItemAttachmentsState {
    file: IListItemAttachmentFile;
    hideDialog: boolean;
    dialogMessage: string;
    attachments: IListItemAttachmentFile[];
    deleteAttachment: boolean;
    disableButton: boolean;
    showPlaceHolder: boolean;
    fireUpload: boolean;
    filesToUpload?: File[];
    itemId?: number;
}
//# sourceMappingURL=IListItemAttachmentsState.d.ts.map