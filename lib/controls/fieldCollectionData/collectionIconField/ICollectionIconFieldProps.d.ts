import { ICustomCollectionField } from "../ICustomCollectionField";
export interface ICollectionIconFieldProps {
    field: ICustomCollectionField;
    item: any;
    disableEdit: boolean;
    fOnValueChange: (fieldId: string, value: any) => void;
    fValidation: (field: ICustomCollectionField, value: any) => Promise<string>;
}
//# sourceMappingURL=ICollectionIconFieldProps.d.ts.map