import * as React from 'react';
import { IGridLayoutProps, IGridLayoutState } from './GridLayout.types';
/**
 * Grid layout component
 */
export declare class GridLayout extends React.Component<IGridLayoutProps, IGridLayoutState> {
    /**
    * Constructor method
    */
    constructor(props: IGridLayoutProps);
    private ROWS_PER_PAGE;
    private MAX_WIDTH;
    private MIN_WIDTH;
    private PADDING;
    private COMPACT_THRESHOLD;
    private _columnCount;
    private _columnWidth;
    private _rowHeight;
    private _isCompact;
    /**
     * Renders the grid control
     */
    render(): React.ReactElement<IGridLayoutProps>;
    /**
     * Calculates how many items in the page
     */
    private _getItemCountForPage;
    /**
     * Calculates the page height for the grid
     */
    private _getPageHeight;
    /**
     * Calls the passed onRenderCell
     */
    private _onRenderCell;
}
//# sourceMappingURL=GridLayout.d.ts.map