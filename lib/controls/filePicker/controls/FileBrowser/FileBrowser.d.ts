import * as React from 'react';
import { IFileBrowserProps } from './IFileBrowserProps';
import { IFileBrowserState } from './IFileBrowserState';
export declare class FileBrowser extends React.Component<IFileBrowserProps, IFileBrowserState> {
    private _selection;
    constructor(props: IFileBrowserProps);
    /**
     * Gets the list of files when settings change
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: IFileBrowserProps, prevState: IFileBrowserState): void;
    /**
     * Gets the list of files when tab first loads
     */
    componentDidMount(): void;
    render(): React.ReactElement<IFileBrowserProps>;
    /**
     * Triggers paged data load
     */
    private _loadNextDataRequest;
    /**
    * Renders a placeholder to indicate that the folder is empty
    */
    private _renderEmptyFolder;
    /**
     * Renders row with file or folder style.
     */
    private _onRenderRow;
    /**
     * Get the list of toolbar items on the left side of the toolbar.
     * We leave it empty for now, but we may add the ability to upload later.
     */
    private _getToolbarItems;
    private getFarItems;
    /**
     * Called when users switch the view
     */
    private _handleSwitchLayout;
    /**
     * Gratuitous sorting
     */
    private _onColumnClick;
    /**
     * When a folder is opened, calls parent tab to navigate down
     */
    private _handleOpenFolder;
    /**
     * Handles selected item change
     */
    private _itemSelectionChanged;
    /**
     * Gets all files in a library with a matchihg path
     */
    private _getListItems;
}
//# sourceMappingURL=FileBrowser.d.ts.map