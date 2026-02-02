import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
/**
 * Enum for specifying how the views should be sorted
 */
export declare enum orderBy {
    Id = 1,
    Title = 2
}
export interface IViewPickerProps {
    /**
     * Context of the current web part
    */
    context: BaseComponentContext;
    /**
     * If provided, additional class name to provide on the dropdown element.
     */
    className?: string;
    /**
     * Whether the view control is enabled or not.
     */
    disabled?: boolean;
    /**
     * Filter views from Odata query
     */
    filter?: string;
    /**
     * Specifies the text describing the ViewPicker
     */
    label?: string;
    /**
     * The List Id of the list
     */
    listId?: string;
    /**
     * Input placeholder text. Displayed until option is selected.
     */
    placeholder?: string;
    /**
     * How to order the set of views (By ID or Title).
     */
    orderBy?: orderBy;
    /**
     * Initial selected view(s) of the control
     */
    selectedView?: string | string[];
    /**
     * Indicates if multi-choice selections is allowed. Default to false.
     */
    multiSelect?: boolean;
    /**
     * Whether or not to show a blank option. Default false.
     */
    showBlankOption?: boolean;
    /**
     * Defines view titles which should be excluded from the view picker control
     */
    viewsToExclude?: string[];
    /**
     * Absolute Web Url of target site (user requires permissions)
     */
    webAbsoluteUrl?: string;
    /**
     * Callback issued when the selected option changes.
     */
    onSelectionChanged?: (newValue: string | string[]) => void;
}
export interface IViewPickerState {
    /**
    * The results fetched to the viewPicker
    */
    results: IDropdownOption[];
    /**
    * Keys of the currently selected item(s).
    */
    selectedView?: string | string[];
}
//# sourceMappingURL=IViewPicker.d.ts.map