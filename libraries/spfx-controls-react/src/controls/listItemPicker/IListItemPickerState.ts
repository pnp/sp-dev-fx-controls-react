import { ISPField } from '../../common/SPEntities';

export interface IListItemPickerState {
  noresultsFoundText: string;
  showError: boolean;
  errorMessage: string;
  suggestionsHeaderText:string;
  selectedItems?: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
  field?: ISPField;
  safeListId: string;
}
