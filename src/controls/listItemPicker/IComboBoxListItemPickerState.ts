import { IListItemPickerState } from "./IListItemPickerState";
import { IComboBoxOption } from "office-ui-fabric-react/lib/ComboBox";

export interface IComboBoxListItemPickerState extends IListItemPickerState{
    availableOptions?: IComboBoxOption[];
} 