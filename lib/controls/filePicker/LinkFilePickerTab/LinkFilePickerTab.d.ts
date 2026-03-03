import * as React from 'react';
import { ILinkFilePickerTabProps } from './ILinkFilePickerTabProps';
import { ILinkFilePickerTabState } from './ILinkFilePickerTabState';
export default class LinkFilePickerTab extends React.Component<ILinkFilePickerTabProps, ILinkFilePickerTabState> {
    constructor(props: ILinkFilePickerTabProps);
    render(): React.ReactElement<ILinkFilePickerTabProps>;
    /**
     * Called as user types in a new value
     */
    private _handleChange;
    /**
     * Verifies the url that was typed in
     * @param value
     */
    private _getErrorMessagePromise;
    /**
     * Handles when user saves
     */
    private _handleSave;
    /**
     * HAndles when user closes without saving
     */
    private _handleClose;
    /**
     * Is this a URL ?
     * (insert guy holding a butterfly meme)
     */
    private _isUrl;
    private _isSameDomain;
}
//# sourceMappingURL=LinkFilePickerTab.d.ts.map