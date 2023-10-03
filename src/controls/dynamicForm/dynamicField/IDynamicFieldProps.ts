import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { IFilePickerResult } from '../../filePicker';

export type DateFormat = 'DateTime' | 'DateOnly';
export type FieldChangeAdditionalData = IFilePickerResult;

export interface IDynamicFieldProps {
  context: BaseComponentContext;
  disabled?: boolean;
  listId: string;
  listItemId?: number;
  columnInternalName: string;
  label?: string;
  placeholder?: string;
  onChanged?: (columnInternalName: string, newValue: any, additionalData?: FieldChangeAdditionalData) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  value?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  required: boolean;
  newValue?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  fieldType: string;
  fieldTitle: string;
  fieldDefaultValue: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  options?: IDropdownOption[];
  fieldTermSetId?: string;
  fieldAnchorId?: string;
  lookupListID?: string;
  lookupField?: string;
  changedValue: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  hiddenFieldName?: string;
  Order: number;
  isRichText?: boolean;
  dateFormat?: DateFormat;
  firstDayOfWeek: number;
  additionalData?: FieldChangeAdditionalData;
  principalType?: string;
  description?: string;
  maximumValue?: number;
  minimumValue?: number;
  showAsPercentage?: boolean;
  validationErrorMessage?: string;
}
