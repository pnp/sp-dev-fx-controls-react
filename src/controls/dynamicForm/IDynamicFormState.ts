
import { IInstalledLanguageInfo } from '@pnp/sp/regional-settings';
import { IDynamicFieldProps } from './dynamicField/IDynamicFieldProps';
export interface IDynamicFormState {
  fieldCollection: IDynamicFieldProps[];
  installedLanguages?: IInstalledLanguageInfo[];
  isSaving?: boolean;
  etag?: string;
  isValidationErrorDialogOpen: boolean;
}



