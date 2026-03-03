import * as React from 'react';
import { IWebSearchTabProps } from './IWebSearchTabProps';
import { IWebSearchTabState } from './IWebSearchTabState';
/**
 * Renders search suggestions and performs seach queries
 */
export default class WebSearchTab extends React.Component<IWebSearchTabProps, IWebSearchTabState> {
    private _columnCount;
    private _columnWidth;
    private _rowHeight;
    private _selection;
    private _listElem;
    constructor(props: IWebSearchTabProps);
    /**
     * Render the tab
     */
    render(): React.ReactElement<IWebSearchTabProps>;
    private _onSelectionChanged;
    /**
     * Renders the returned search results
     */
    private _renderSearchResults;
    /**
     * Show an individual search result item
     */
    private _onRenderSearchResultsCell;
    /**
     * Renders suggestions when there aren't any queries
     */
    private _renderSearchSuggestions;
    /**
     * Gets search results from Bing
     */
    private _getSearchResults;
    /**
     * Calculates how many items there should be in the page
     */
    private _getItemCountForPage;
    /**
     * Gets the height of a list "page"
     */
    private _getPageHeight;
    /**
     * Renders a cell for search suggestions
     */
    private _onRenderSuggestionCell;
    /**
     * Renders the search box
     */
    private _renderSearchBox;
    /**
     * Handles when a user changes the size drop down.
     * Resubmits search query
     */
    private _handleChangeSize;
    /**
     * Handles when user selects a new layout from the drop down.
     * Resubmits search query.
     */
    private _handleChangeLayout;
    /**
     * Handles when a user changes the license from the drop down
     * Resubits search query
     */
    private _handleChangeLicense;
    /**
     * Renders the drop down placeholders
     */
    private _renderFilterPlaceholder;
    /**
     * Handles when user triggers search query
     */
    private _handleSearch;
    /**
     * Handles when user closes search pane
     */
    private _handleClose;
    /**
     * Handes when user saves selection
     * Calls property pane file picker's save function
     */
    private _handleSave;
    /**
     * Creates a reference to the list
     */
    private _linkElement;
}
//# sourceMappingURL=WebSearchTab.d.ts.map