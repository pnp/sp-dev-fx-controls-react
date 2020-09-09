import { ICustomCollectionField } from "..";

export interface ICollectionNumberFieldProps {
  field: ICustomCollectionField;
  item: any;
  disableEdit: boolean;

  fOnValueChange: (fieldId: string, value: any) => void;
  fValidation: (field: ICustomCollectionField, value: any) => Promise<string>;
}
