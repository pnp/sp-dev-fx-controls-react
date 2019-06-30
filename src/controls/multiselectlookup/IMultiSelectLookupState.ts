import { Item } from './IMultiSelectLookup';

export interface IMultiSelectLookupState {
  keyword: string;
  checked: boolean;
  availableData: Item[];
  selectedData: Item[];
}
