import { ExtensionContext } from '@microsoft/sp-extension-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IComboBoxOption } from '@fluentui/react/lib/';
export interface ILocationBoxOption extends IComboBoxOption {
    locationItem: ILocationPickerItem;
}
export interface ILocationPickerItem {
    EntityType: string;
    LocationSource?: string;
    LocationUri?: string;
    UniqueId?: string;
    DisplayName: string;
    Address?: IAddress;
    Coordinates?: any;
}
interface IAddress {
    City?: string;
    CountryOrRegion?: string;
    State?: string;
    Street?: string;
}
export interface ILocationPickerProps {
    /**
  * The web part context
  */
    context: WebPartContext | ExtensionContext;
    /**
    * If provided, additional class name to provide on the dropdown element.
    */
    className?: string;
    /**
    * Whether or not the control is disabled
    */
    disabled?: boolean;
    /**
    * The label to use
    */
    label?: string;
    /**
    * Input placeholder text. Displayed until option is selected.
    */
    placeholder?: string;
    /**
  * Input placeholder text. Displayed until option is selected.
  */
    defaultValue?: ILocationPickerItem;
    /**
    * Callback issued when the selected option changes
    */
    onChange?: (newValue: ILocationPickerItem) => void;
    /**
    * This can be use to show error message for combobox
    */
    errorMessage?: string;
}
export interface ILocationPickerState {
    currentMode: Mode;
    searchText: string;
    isCalloutVisible: boolean;
    selectedItem: ILocationPickerItem;
    /**
    * The options available to the listPicker
    */
    options: ILocationBoxOption[];
}
export declare enum Mode {
    view = 0,
    empty = 1,
    editView = 2
}
export {};
//# sourceMappingURL=ILocationPicker.d.ts.map