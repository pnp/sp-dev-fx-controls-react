
import { IDynamicFieldProps } from './dynamicField/IDynamicFieldProps';
export interface IDynamicFormState {
  fieldCollection: IDynamicFieldProps[];
  isSaving?: boolean;
  etag?: string;
  isValidationErrorDialogOpen: boolean;
}



