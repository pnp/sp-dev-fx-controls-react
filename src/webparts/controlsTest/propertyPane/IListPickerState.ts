import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";

export interface IListPickerState {
    loading: boolean;
    options: IDropdownOption[];
    error: string;
}