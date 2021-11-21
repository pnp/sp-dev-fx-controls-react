import { SPFxContext } from '../../common/Types';

export interface IListItemPickerProps {

  columnInternalName: string;
  keyColumnInternalName?: string;
  context: SPFxContext;
  listId: string;
  itemLimit: number;
  filter?: string;
  orderBy?: string;
  className?: string;
  webUrl?: string;
  defaultSelectedItems?: any[];
  disabled?: boolean;
  suggestionsHeaderText?:string;
  noResultsFoundText?:string;
  substringSearch?: boolean; // JJ - 20200613 - find by substring as an option
  /**
   * Placeholder to be displayed in an empty term picker
   */
  placeholder?: string;

  onSelectedItem: (item:any) => void;

  /**
   * The label for the control
   */
   label?: string;

   /**
    * Enable default suggestions. All options are displayed by default when clicking on the control
    */
   enableDefaultSuggestions?: boolean;

}
