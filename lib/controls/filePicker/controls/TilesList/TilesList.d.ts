import * as React from 'react';
import { ITilesListProps } from './ITilesListProps';
export declare class TilesList extends React.Component<ITilesListProps> {
    private _columnCount;
    private _columnWidth;
    private _rowHeight;
    private _listElem;
    private _pageWidth;
    constructor(props: ITilesListProps);
    componentDidUpdate(prevProps: ITilesListProps): void;
    componentDidMount(): void;
    render(): React.ReactElement<ITilesListProps>;
    /**
    * Gets called what a file is selected.
    */
    private _handleItemInvoked;
    /**
      * Calculates how many items there should be in the page
      */
    private _getItemCountForPage;
    /**
     * Renders a custom list page
     */
    private _onRenderPage;
    /** Calculates the list "page" height (a.k.a. row) */
    private _getPageHeight;
    /**
     * Renders a file folder cover
     */
    private _onRenderCell;
}
//# sourceMappingURL=TilesList.d.ts.map