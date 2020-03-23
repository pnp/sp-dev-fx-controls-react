import { WebPartContext } from "@microsoft/sp-webpart-base";
import { ExtensionContext } from "@microsoft/sp-extension-base";

export interface IListItemPickerProps {
  columnInternalName: string;
  keyColumnInternalName?: string;
  context: WebPartContext |  ExtensionContext;
  listId: string;
  itemLimit: number;
  filter?: string;
  className?: string;
  webUrl?: string;
  defaultSelectedItems?: any[];
  disabled?: boolean;
  suggestionsHeaderText?:string;
  noResultsFoundText?:string;
  /**
   * Placeholder to be displayed in an empty term picker
   */
  placeholder?: string;

  onSelectedItem: (item:any) => void;
}
