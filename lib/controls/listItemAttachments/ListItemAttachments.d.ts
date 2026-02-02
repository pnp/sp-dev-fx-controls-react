import * as React from 'react';
import { IListItemAttachmentFile } from './IListItemAttachmentFile';
import { IListItemAttachmentsProps } from './IListItemAttachmentsProps';
import { IListItemAttachmentsState } from './IListItemAttachmentsState';
export declare class ListItemAttachments extends React.Component<IListItemAttachmentsProps, IListItemAttachmentsState> {
    private _spservice;
    private previewImages;
    private _utilities;
    constructor(props: IListItemAttachmentsProps);
    /**
     * componentDidMount lifecycle hook
     */
    componentDidMount(): Promise<void>;
    private loadAttachmentPreview;
    uploadAttachments(itemId: number): Promise<void>;
    protected loadAttachmentsPreview(files: IListItemAttachmentFile[]): Promise<void>;
    /**
     * Load Item Attachments
     */
    private loadAttachments;
    /**
     * Close the dialog
     */
    private _closeDialog;
    /**
     * Attachment uploaded event handler
     */
    private _onAttachmentUpload;
    /**
     * On delete attachment event handler
     *
     * @param file
     */
    private onDeleteAttachment;
    /**
     * Delete the attachment once it was confirmed
     */
    private onConfirmedDeleteAttachment;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IListItemAttachmentsProps>;
}
//# sourceMappingURL=ListItemAttachments.d.ts.map