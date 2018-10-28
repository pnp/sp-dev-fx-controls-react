import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ApplicationCustomizerContext } from "@microsoft/sp-application-base";

export interface IListItemPickerProps {
  listId: string;
  columnInternalName:string;
  onSelectedItem: (item:any) => void;
  className?: string;
  webUrl?:string;
  value?:Array<string>;
  disabled?: boolean;
  itemLimit: number;
  context: WebPartContext |  ApplicationCustomizerContext;
  sugestedHeaderText?:string;
  noresultsFoundText?:string;
}
