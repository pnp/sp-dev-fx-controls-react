import * as React from 'react';
import { IRecentFilesTabProps } from './IRecentFilesTabProps';
import { IRecentFilesTabState } from './IRecentFilesTabState';
export default class RecentFilesTab extends React.Component<IRecentFilesTabProps, IRecentFilesTabState> {
    private _columnCount;
    private _columnWidth;
    private _rowHeight;
    private _selection;
    private _listElem;
    constructor(props: IRecentFilesTabProps);
    /**
     * Gets the most recently used files
     */
    componentDidMount(): Promise<void>;
    /**
     * Render the tab
     */
    render(): React.ReactElement<IRecentFilesTabProps>;
    private _onSelectionChanged;
    /**
       * Calculates how many items there should be in the page
       */
    private _getItemCountForPage;
    /** Calculates the list "page" height (a.k.a. row) */
    private _getPageHeight;
    /**
     * Renders a "please wait" spinner while we're loading
     */
    private _renderSpinner;
    /**
     * Renders a message saying that there are no recent files
     */
    private _renderPlaceholder;
    /**
     * Renders a grid list containing results
     */
    private _renderGridList;
    /**
     * Renders each result in its own cell
     */
    private _onRenderCell;
    /**
     * Gets called what a file is selected.
     */
    private _handleItemInvoked;
    /**
     * Gets called when it is time to save the currently selected item
     */
    private _handleSave;
    /**
     * Gets called when it is time to close (without saving)
     */
    private _handleClose;
    /**
     * Creates a ref to the list
     */
    private _linkElement;
}
//# sourceMappingURL=RecentFilesTab.d.ts.map