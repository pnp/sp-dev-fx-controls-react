import { BaseComponentContext } from "@microsoft/sp-component-base";
import { FieldsOrderBy } from "../../services/ISPService";
import { ISPField } from "../../common/SPEntities";
export interface IFieldPickerProps {
    /**
     * The web part context
     */
    context: BaseComponentContext;
    /**
     * The ID of the list or library you wish to select a column(s) from.
     * When not specified, picker will be populated with site columns.
     */
    listId?: string;
    /**
     * If provided, additional class name to provide on the dropdown element.
     */
    className?: string;
    /**
     * Whether or not the control is disabled.
     */
    disabled?: boolean;
    /**
     * Whether or not to include hidden fields. Default is true.
     */
    includeHidden?: boolean;
    /**
     * Whether or not to include read-only fields. Default is true.
     */
    includeReadOnly?: boolean;
    /**
     * Only show fields of a certain group.
     */
    group?: string;
    /**
     * Filter fields from OData query (takes the upperhand of Hidden, ReadOnly and Group Filters).
     */
    filter?: string;
    /**
     * How to order the fields.
     */
    orderBy?: FieldsOrderBy;
    /**
     * Internal names of the selected item(s). If you provide this, you must maintain selection
     * state by observing onSelectionChanged events and passing a new value in when changed.
     */
    selectedFields?: string | string[];
    /**
     * Indicates if multi-choice selections is allowed. Default to false.
     */
    multiSelect?: boolean;
    /**
     * The label to display.
     */
    label?: string;
    /**
     * Input placeholder text. Displayed until option is selected.
     */
    placeholder?: string;
    /**
     * Callback issued when the selected option changes.
     */
    onSelectionChanged?: (newValue: ISPField | ISPField[]) => void;
    /**
     * This function is invoked after the filtering has been done.
     * This allows you to add additional custom filtering.
     */
    filterItems?: (fields: ISPField[]) => ISPField[];
    /**
     * Absolute Web Url of target site (user requires permissions).
     */
    webAbsoluteUrl?: string;
    /**
     * Whether or not to show a blank option. Default false. Works only when multiSelect is false.
     */
    showBlankOption?: boolean;
}
export interface IFieldPickerState {
    /**
     * Whether or not the fieldPicker options are loading.
     */
    loading: boolean;
    /**
     * The fields available to the listPicker.
     */
    fields: ISPField[];
    /**
     * Keys of the currently selected item(s).
     */
    selectedFields?: string | string[];
}
//# sourceMappingURL=IFieldPicker.d.ts.map