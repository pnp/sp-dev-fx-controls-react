import * as React from 'react';
import { IContentTypePickerProps, IContentTypePickerState } from './IContentTypePicker';
export declare class ContentTypePicker extends React.Component<IContentTypePickerProps, IContentTypePickerState> {
    private _selectedContentTypes;
    constructor(props: IContentTypePickerProps);
    componentDidMount(): void;
    private loadContentTypes;
    /**
     * Set the currently selected content type(s).
     */
    private setSelectedContentTypes;
    componentDidUpdate(prevProps: Readonly<IContentTypePickerProps>, prevState: Readonly<IContentTypePickerState>): void;
    /**
     * Fires when an item has been selected from the dropdown.
     * @param event Event that has been fired.
     * @param option The new selection.
     * @param index Index of the selection.
     */
    private onChange;
    render(): React.ReactElement<IContentTypePickerProps>;
}
//# sourceMappingURL=ContentTypePicker.d.ts.map