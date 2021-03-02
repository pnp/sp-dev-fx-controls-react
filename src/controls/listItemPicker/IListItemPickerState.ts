import { ISPField } from '../../common/SPEntities';

export interface IListItemPickerState {
  noresultsFoundText: string;
  showError: boolean;
  errorMessage: string;
  suggestionsHeaderText:string;
  selectedItems?: any[];
  field?: ISPField;
}
