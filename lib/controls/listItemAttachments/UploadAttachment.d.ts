import * as React from 'react';
import { IUploadAttachmentProps } from './IUploadAttachmentProps';
import { IUploadAttachmentState } from './IUploadAttachmentState';
export declare class UploadAttachment extends React.Component<IUploadAttachmentProps, IUploadAttachmentState> {
    private _spservice;
    private fileInput;
    private _isFileExplorerOpen;
    constructor(props: IUploadAttachmentProps);
    /**
     * componentDidUpdate lifecycle hook
     *
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: IUploadAttachmentProps, prevState: IUploadAttachmentState): void;
    /**
     * On attachment upload event
     */
    private onAttachmentUpload;
    /**
     * Add a new attachment
     */
    private addAttachment;
    /**
     * Called when the hidden file input is clicked (activated).
     * @param e - Mouse click event on the file input element.
    */
    private onInputActivated;
    /**
     * Handles window focus event after the file picker dialog is closed.
    */
    private handleFocusAfterDialog;
    /**
     * Close dialog
     */
    private closeDialog;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IUploadAttachmentProps>;
}
//# sourceMappingURL=UploadAttachment.d.ts.map