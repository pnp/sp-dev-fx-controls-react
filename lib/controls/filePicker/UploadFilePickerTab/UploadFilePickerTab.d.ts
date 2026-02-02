import * as React from 'react';
import { IUploadFilePickerTabProps } from './IUploadFilePickerTabProps';
import { IUploadFilePickerTabState } from './IUploadFilePickerTabState';
export default class UploadFilePickerTab extends React.Component<IUploadFilePickerTabProps, IUploadFilePickerTabState> {
    constructor(props: IUploadFilePickerTabProps);
    render(): React.ReactElement<IUploadFilePickerTabProps>;
    private _loadPreiview;
    /**
     * Gets called when a file is uploaded
     */
    private _handleFileUpload;
    /**
     * Saves base64 encoded image back to property pane file picker
     */
    private _handleSave;
    /**
     * Closes tab without saving
     */
    private _handleClose;
}
//# sourceMappingURL=UploadFilePickerTab.d.ts.map