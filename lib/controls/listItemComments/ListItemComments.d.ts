import * as React from "react";
import { ServiceScope } from "@microsoft/sp-core-library";
export interface IListItemCommentsProps {
    webUrl?: string;
    listId: string;
    itemId: string;
    serviceScope: ServiceScope;
    numberCommentsPerPage?: 5 | 10 | 15 | 20;
    label?: string;
    highlightedCommentId?: string;
}
export declare const ListItemComments: React.FunctionComponent<IListItemCommentsProps>;
//# sourceMappingURL=ListItemComments.d.ts.map