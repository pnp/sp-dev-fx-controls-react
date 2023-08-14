import { IDynamicFieldProps } from './dynamicField/IDynamicFieldProps';
import { IFilePickerResult } from "../filePicker";

export interface IDynamicFormState {
  fieldCollection: IDynamicFieldProps[];
  isSaving?: boolean;
  etag?: string;
  isValidationErrorDialogOpen: boolean;
  selectedFile?: IFilePickerResult;
  missingSelectedFile?: boolean;
}
