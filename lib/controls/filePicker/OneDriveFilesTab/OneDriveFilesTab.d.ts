import * as React from 'react';
import { IOneDriveFilesTabProps } from './IOneDriveFilesTabProps';
import { IOneDriveFilesTabState } from './IOneDriveFilesTabState';
export declare class OneDriveFilesTab extends React.Component<IOneDriveFilesTabProps, IOneDriveFilesTabState> {
    constructor(props: IOneDriveFilesTabProps);
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<IOneDriveFilesTabProps>;
    private renderBreadcrumbItem;
    /**
     * Handles breadcrump item click
     */
    private onBreadcrumpItemClick;
    /**
     * Is called when user selects a different file
     */
    private _handleSelectionChange;
    /**
     * Called when user saves
     */
    private _handleSave;
    /**
     * Called when user closes tab
     */
    private _handleClose;
    /**
     * Triggered when user opens a file folder
     */
    private _handleOpenFolder;
}
//# sourceMappingURL=OneDriveFilesTab.d.ts.map