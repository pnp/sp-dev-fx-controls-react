import { Theme } from "spfx-uifabric-themes";
import { ServiceScope } from "@microsoft/sp-core-library";
export interface IAppContext {
    theme: Theme;
    serviceScope: ServiceScope;
    webUrl: string;
    listId: string;
    itemId: string;
    numberCommentsPerPage?: number;
    label?: string;
    highlightedCommentId?: string;
}
//# sourceMappingURL=IAppContext.d.ts.map