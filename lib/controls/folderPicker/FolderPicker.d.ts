import * as React from 'react';
import { IFolderPickerProps, IFolderPickerState } from '.';
export declare class FolderPicker extends React.Component<IFolderPickerProps, IFolderPickerState> {
    private _folderLinkId;
    private _selectedFolder;
    constructor(props: IFolderPickerProps);
    UNSAFE_componentWillReceiveProps(nextProps: IFolderPickerProps): void;
    render(): React.ReactElement<IFolderPickerProps>;
    private _showPanel;
    private _hidePanel;
    private _onRenderFooterContent;
    private _onFolderSelect;
    private _onFolderSave;
    private _resetSelection;
}
//# sourceMappingURL=FolderPicker.d.ts.map