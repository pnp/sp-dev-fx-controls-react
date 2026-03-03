import { BaseComponentContext } from "@microsoft/sp-component-base";
import { ICustomCollectionField } from "../ICustomCollectionField";
export interface ICollectionDataItemProps {
    fields: ICustomCollectionField[];
    index?: number;
    item?: any;
    sortingEnabled?: boolean;
    totalItems?: number;
    disableItemDeletion?: boolean;
    context?: BaseComponentContext;
    fAddItem?: (item: any) => void;
    fAddInCreation?: (item: any) => void;
    fUpdateItem?: (idx: number, item: any) => void;
    fDeleteItem?: (idx: number) => void;
    fValidation?: (idx: number, isValid: boolean) => void;
    fOnSorting?: (oldIdx: number, newIdx: number) => void;
}
//# sourceMappingURL=ICollectionDataItemProps.d.ts.map