import { Item } from '../IMultiSelectLookup';

export interface IAvailableDataListProps {
  onSelectItem: (item: Item, checked: boolean) => void;
  avaiableItems: Item[];
  disabled?: boolean;
  searchKeyword?: string;
}

export interface IAvailableDataListState {
  visibleItems: Item[];
}
