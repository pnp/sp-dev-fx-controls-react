import { IComment } from "../components/Comments/IComment";
export interface IlistItemCommentsResults {
  comments: IComment[];
  hasMore?: boolean;
  nextLink?: string;
}
