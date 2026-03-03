import * as React from 'react';
import { IMultipleUploadFilePickerTabProps } from './IMultipleUploadFilePickerTabProps';
import { IMultipleUploadFilePickerTabState } from './IMultipleUploadFilePickerTabState';
export default class MultipleUploadFilePickerTab extends React.Component<IMultipleUploadFilePickerTabProps, IMultipleUploadFilePickerTabState> {
    constructor(props: IMultipleUploadFilePickerTabProps);
    private displayFileNames;
    render(): React.ReactElement<IMultipleUploadFilePickerTabProps>;
    /**
     * Gets called when files are uploaded via drag and drop
     */
    private _handleFileUpload;
    /**
     * Gets called when files are uploaded via file explorer
     */
    private _handleFileUploadExplorer;
    /**
     * Saves base64 encoded image back to property pane file picker
     */
    private _handleSave;
    /**
     * Closes tab without saving
     */
    private _handleClose;
}
//# sourceMappingURL=MultipleUploadFilePickerTab.d.ts.map