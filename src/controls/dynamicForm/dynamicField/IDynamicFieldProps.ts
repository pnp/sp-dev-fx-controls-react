import { ExtensionContext } from '@microsoft/sp-extension-base';
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IDynamicFieldProps {
  context: WebPartContext | ExtensionContext;
  className?: string;
  disabled?: boolean;
  listId: string;
  columnInternalName: string;
  label?: string;
  placeholder?: string;
  onChanged?: (columnInternalName: string, newValue: any) => void;
  value?: any;
  required: boolean;
  newValue?: any;
  fieldType: string;
  fieldTitle: string;
  fieldDefaultValue: any;
  options: IDropdownOption[];
  fieldTermSetId: string;
  lookupListID?: string;
  lookupField?: string;
  changedvalue: any;
  hiddenFieldName?: string;
  Order: number;
  isRichText: boolean;
  bingAPIKey?: string;
}
