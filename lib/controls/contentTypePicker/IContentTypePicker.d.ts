import { IDropdownStyles } from '@fluentui/react';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISPContentType } from '../../common/SPEntities';
import { ContentTypesOrderBy } from '../../services/ISPService';
export interface IContentTypePickerProps {
    /**
     * The web part context
     */
    context: BaseComponentContext;
    /**
     * The ID of the list or library you wish to select content type from.
     * When not specified, picker will be populated with site content types.
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
     * Whether or not to include hidden content types. Default is true.
     */
    includeHidden?: boolean;
    /**
     * Whether or not to include read-only content types. Default is true.
     */
    includeReadOnly?: boolean;
    /**
     * Only show content types of a certain group.
     */
    group?: string;
    /**
     * Filter content types from OData query (takes the upperhand of `hidden`, `readOnly` and `group` filters).
     */
    filter?: string;
    /**
     * How to order the content types.
     */
    orderBy?: ContentTypesOrderBy;
    /**
     * IDs of the selected item(s). If you provide this, you must maintain selection
     * state by observing onSelectionChanged events and passing a new value in when changed.
     */
    selectedContentTypes?: string | string[];
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
    onSelectionChanged?: (newValue: ISPContentType | ISPContentType[]) => void;
    /**
     * This function is invoked after the filtering has been done.
     * This allows you to add additional custom filtering.
     */
    filterItems?: (contentTypes: ISPContentType[]) => ISPContentType[];
    /**
     * Absolute Web Url of target site (user requires permissions).
     */
    webAbsoluteUrl?: string;
    /**
     * Whether or not to show a blank option. Default false. Works only when multiSelect is false.
     */
    showBlankOption?: boolean;
    /** styles prop **/
    styles?: IDropdownStyles;
}
export interface IContentTypePickerState {
    /**
     * Whether or not the content type picker options are loading.
     */
    loading: boolean;
    /**
     * The content types available to the listPicker.
     */
    contentTypes: ISPContentType[];
    /**
     * Keys of the currently selected item(s).
     */
    selectedContentTypes?: string | string[];
}
//# sourceMappingURL=IContentTypePicker.d.ts.map