
import { ISPField } from '../../common/SPEntities';
import { IDynamicFieldProps } from './dynamicField/IDynamicFieldProps';
export interface IDynamicFormState {
  fieldCollection: IDynamicFieldProps[];
  validationFormulas: Record<string, Pick<ISPField, 'ValidationFormula' | 'ValidationMessage'>>;
  clientValidationFormulas: Record<string, Pick<ISPField, 'ValidationFormula' | 'ValidationMessage'>>;
  isSaving?: boolean;
  etag?: string;
  isValidationErrorDialogOpen: boolean;
}



