import * as React from 'react';
import { IFilterBarItem } from './IFilterBarItem';
export interface IFilterPillBarProps {
    /**
        Filters to be displayed. Multiple filters with the same label are grouped together
    */
    items: IFilterBarItem[];
    /**
        Number of filters, after which filters start showing as overflow
    */
    inlineItemCount?: number;
    /**
        Callback function called after clicking 'Clear filters' pill.
    */
    onClearFilters?: () => void;
    /**
        Callback function called after clicking a singular filter pill
    */
    onRemoveFilter?: (label: string, value: string) => void;
}
export declare const FilterBar: React.FunctionComponent<IFilterPillBarProps>;
//# sourceMappingURL=FilterlBar.d.ts.map