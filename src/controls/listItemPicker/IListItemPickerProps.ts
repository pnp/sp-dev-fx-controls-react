import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface IListItemPickerProps {
  columnInternalName: string;
  context: WebPartContext |  ApplicationCustomizerContext;
  listId: string;
  itemLimit: number;

  className?: string;
  webUrl?: string;
  defaultSelectedItems?: any[];
  disabled?: boolean;
  suggestionsHeaderText?:string;
  noResultsFoundText?:string;

  onSelectedItem: (item:any) => void;
}
