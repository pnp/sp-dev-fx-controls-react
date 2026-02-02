import * as React from 'react';
import { ISiteFilePickerTabProps } from './ISiteFilePickerTabProps';
import { ISiteFilePickerTabState } from './ISiteFilePickerTabState';
export default class SiteFilePickerTab extends React.Component<ISiteFilePickerTabProps, ISiteFilePickerTabState> {
    private _defaultLibraryNamePromise;
    constructor(props: ISiteFilePickerTabProps);
    componentDidMount(): void;
    render(): React.ReactElement<ISiteFilePickerTabProps>;
    /**
     * Handles breadcrumb item click
     */
    private onBreadcrumbItemClick;
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
    /**
     * Triggered when user opens a top-level document library
     */
    private _handleOpenLibrary;
    /**
     * Initializes the initial location for the navigation
     * @param folderAbsPath Absolute folder path
     * @param param1 custom object with absolute & relative Url
     * @returns initial location parameters set
     */
    private _parseInitialLocationState;
    /**
     * Creates a breadcrumb from the paths
     * @param libraryServRelUrl Library server relative URL
     * @param folderServRelPath Folder server relative path
     * @param folderWebRelPath Folder web relative path
     * @param webAbsUrl Web absolute URL
     * @param tenantUrl Tenant URL
     * @param libInternalName Library internal name
     * @param webServRelUrl Web server relative URL
     * @returns Breadcrumb items
     */
    private parseBreadcrumbsFromPaths;
}
//# sourceMappingURL=SiteFilePickerTab.d.ts.map