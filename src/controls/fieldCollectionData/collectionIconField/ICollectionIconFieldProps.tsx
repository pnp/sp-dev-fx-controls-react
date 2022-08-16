import { ICustomCollectionField } from "../ICustomCollectionField";

export interface ICollectionIconFieldProps {
  field: ICustomCollectionField;
  item: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  disableEdit: boolean;

  fOnValueChange: (fieldId: string, value: any) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  fValidation: (field: ICustomCollectionField, value: any) => Promise<string>; // eslint-disable-line @typescript-eslint/no-explicit-any
}
