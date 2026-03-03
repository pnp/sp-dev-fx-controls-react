import * as React from "react";
import { TToolbarLayout } from "./ToolbarActionsUtils";
export interface IToolbarFindProps {
    layout: TToolbarLayout;
    findActive: boolean;
    setFindActive: React.Dispatch<React.SetStateAction<boolean>>;
    onFindQueryChange?: (findQuery: string) => string;
}
export declare const ToolbarFind: (props: IToolbarFindProps) => JSX.Element;
//# sourceMappingURL=ToolbarFind.d.ts.map