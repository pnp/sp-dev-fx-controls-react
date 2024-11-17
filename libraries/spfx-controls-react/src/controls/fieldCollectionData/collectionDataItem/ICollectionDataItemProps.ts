import { BaseComponentContext } from "@microsoft/sp-component-base"
import { ICustomCollectionField } from "../ICustomCollectionField";

export interface ICollectionDataItemProps {
  fields: ICustomCollectionField[];
  index?: number;
  item?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  sortingEnabled?: boolean;
  totalItems?: number;
  disableItemDeletion?: boolean;
  context?: BaseComponentContext;

  /* eslint-disable @typescript-eslint/no-explicit-any */
  fAddItem?: (item: any) => void;
  fAddInCreation?: (item: any) => void;
  fUpdateItem?: (idx: number, item: any) => void;
  /* eslint-enable @typescript-eslint/no-explicit-any */
  fDeleteItem?: (idx: number) => void;
  fValidation?: (idx: number, isValid: boolean) => void;
  fOnSorting?: (oldIdx: number, newIdx: number) => void;
}
