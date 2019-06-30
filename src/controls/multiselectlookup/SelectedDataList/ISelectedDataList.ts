import { Item } from '../IMultiSelectLookup';

export interface ISelectedDataListProps {
  items: Item[];
  onRemoveItem: (item: Item) => void;
  showRemoveIcon: boolean;
  disabled?: boolean;
}

export interface Indexes {
  oldIndex: number;
  newIndex: number;
}
