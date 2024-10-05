import { IDropdownOption } from '@fluentui/react/lib/Dropdown';

export interface IListPickerState {
    loading: boolean;
    options: IDropdownOption[];
    error: string;
}