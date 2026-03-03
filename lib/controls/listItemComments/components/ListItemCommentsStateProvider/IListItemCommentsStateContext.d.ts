/// <reference types="react" />
import { EListItemCommentsStateTypes } from "./EListItemCommentsStateTypes";
import { IListItemCommentsState } from "./IListItemCommentsState";
export interface IListItemCommentsStateContext {
    listItemCommentsState: IListItemCommentsState;
    setlistItemCommentsState: React.Dispatch<{
        type: EListItemCommentsStateTypes;
        payload: unknown;
    }>;
}
//# sourceMappingURL=IListItemCommentsStateContext.d.ts.map