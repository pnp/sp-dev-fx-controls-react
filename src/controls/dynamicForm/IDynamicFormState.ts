import { IInstalledLanguageInfo } from '@pnp/sp/regional-settings';
import { IDynamicFieldProps } from './dynamicField/IDynamicFieldProps';
import { IFilePickerResult } from "../filePicker";

export interface IDynamicFormState {
  fieldCollection: IDynamicFieldProps[];
  installedLanguages?: IInstalledLanguageInfo[];
  isSaving?: boolean;
  etag?: string;
  isValidationErrorDialogOpen: boolean;
  selectedFile?: IFilePickerResult;
  missingSelectedFile?: boolean;
}
