import React from "react";
import { IFilterBarItemGroup } from "./IFilterBarItemGroup";
export interface IPillGroupProps {
    item: IFilterBarItemGroup;
    onRemoveFilter?: (label: string, value: string) => void;
}
export declare const PillGroup: React.FunctionComponent<IPillGroupProps>;
//# sourceMappingURL=PillGroup.d.ts.map