import { IPalette } from "@fluentui/react/lib/Styling";
import { ServiceScope } from "@microsoft/sp-core-library";

export interface IAppContext {
  theme: IPalette;
  serviceScope: ServiceScope;
  webUrl: string;
  listId: string;
  itemId: string;
  numberCommentsPerPage?: number;
  label?:string;
  highlightedCommentId?:string;
}
