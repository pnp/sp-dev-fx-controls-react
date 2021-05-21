import { ExtensionContext } from '@microsoft/sp-extension-base';
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IFilePickerResult } from '../../filePicker';

export type DateFormat = 'DateTime' | 'DateOnly';
export type FieldChangeAdditionalData = IFilePickerResult;

export interface IDynamicFieldProps {
  context: WebPartContext | ExtensionContext;
  disabled?: boolean;
  listId: string;
  listItemId?: number;
  columnInternalName: string;
  label?: string;
  placeholder?: string;
  onChanged?: (columnInternalName: string, newValue: any, additionalData?: FieldChangeAdditionalData) => void;
  value?: any;
  required: boolean;
  newValue?: any;
  fieldType: string;
  fieldTitle: string;
  fieldDefaultValue: any;
  options?: IDropdownOption[];
  fieldTermSetId?: string;
  lookupListID?: string;
  lookupField?: string;
  changedValue: any;
  hiddenFieldName?: string;
  Order: number;
  isRichText?: boolean;
  //bingAPIKey?: string;
  dateFormat?: DateFormat;
  additionalData?: FieldChangeAdditionalData;
}
