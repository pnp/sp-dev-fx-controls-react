import * as React from 'react';
import { IAccessibleChartTableState, IAccessibleChartTableProps } from './AccessibleChartTable.types';
export declare class AccessibleChartTable extends React.Component<IAccessibleChartTableProps, IAccessibleChartTableState> {
    render(): React.ReactElement<IAccessibleChartTableProps>;
    /**
     * Adds a caption to the top of the accessible table
     */
    private _renderCaption;
    /**
     * Renders the table's headers for X and Y axes
     */
    private _renderTableHeader;
    /**
     * Renders an accessible table body with data from the chart
     */
    private _renderTableBody;
    /**
     * Gets the caption for the table.
     * If no caption, gets the title.
     */
    private _getAccessibleTitle;
}
//# sourceMappingURL=AccessibleChartTable.d.ts.map