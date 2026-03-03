import { IPickerTerm, IPickerTerms } from './ITermPicker';
import { ITermSet, ITerm } from '../../services/ISPTermStorePickerService';
import { ITermActions } from './termActions/ITermsActions';
import SPTermStorePickerService from '../../services/SPTermStorePickerService';
import { BaseComponentContext } from '@microsoft/sp-component-base';
/**
 * PropertyFieldTermPickerHost properties interface
//  */
export interface ITaxonomyPickerProps {
    /**
    * Property field label displayed on top
    */
    label: string;
    /**
     * TermSet Picker Panel title
     */
    panelTitle: string;
    /**
     * Defines if the user can select only one or many term sets. Default value is false.
     */
    allowMultipleSelections?: boolean;
    /**
     * Defines the terms selected by default. For each term object, an empty string can be provided for properties path and termset.
     */
    initialValues?: IPickerTerms;
    /**
     * WebPart's context
     */
    context: BaseComponentContext;
    /**
     * Limit the terms that can be picked by the Term Set name or ID
     */
    termsetNameOrID: string;
    /**
     * Id of a child term in the termset where to be able to selected and search the terms from
     */
    anchorId?: string;
    /**
     * Specify if the term set itself is selectable in the tree view
     */
    isTermSetSelectable?: boolean;
    /**
     * Specify which terms should be disabled in the term set so that they cannot be selected
     */
    disabledTermIds?: string[];
    /**
     * Specify if you want to disable the child terms when their parent is disabled
     */
    disableChildrenOfDisabledParents?: boolean;
    /**
     * Whether the property pane field is enabled or not.
     */
    disabled?: boolean;
    /**
     * Include standard term actions.
     */
    includeDefaultTermActions?: boolean;
    /**
     * Specifies the available term actions and their basic properties.
     */
    termActions?: ITermActions;
    /**
     * Specifies if the tags marked with 'Available for tagging' = false should be hidden
     */
    hideTagsNotAvailableForTagging?: boolean;
    /**
     * Specifies if deprecated tags  should be hidden
     */
    hideDeprecatedTags?: boolean;
    /**
     * Placeholder to be displayed in an empty term picker
     */
    placeholder?: string;
    /**
     * Specifies if the initial values will be validated, when the component is loaded
     */
    validateOnLoad?: boolean;
    /**
     * Specifies if the input text will be validated, when the component focus is changed
     */
    validateInput?: boolean;
    /**
     * The method is used to get the validation error message and determine whether the input value is valid or not.
     * Mutually exclusive with the static string errorMessage (it will take precedence over this).
     *
     *   When it returns string:
     *   - If valid, it returns empty string.
     *   - If invalid, it returns the error message string and the text field will
     *     show a red border and show an error message below the text field.
     *
     *   When it returns Promise<string>:
     *   - The resolved value is display as error message.
     *   - The rejected, the value is thrown away.
     *
     */
    onGetErrorMessage?: (value: IPickerTerms) => string | Promise<string>;
    /**
     *  Called when text is in the input field and the enter key is pressed.
     */
    onNewTerm?: (value: IPickerTerm) => void;
    /**
     * Static error message displayed below the text field. Use onGetErrorMessage to dynamically change the error message displayed (if any) based on the current value. errorMessage and onGetErrorMessage are mutually exclusive (errorMessage takes precedence).
     */
    errorMessage?: string;
    /**
     * onChange Event
     */
    onChange?: (newValue?: IPickerTerms) => void;
    /**
     * Specifies if to display an asterisk near the label.
     * Note that error message should be specified in onGetErrorMessage
     */
    required?: boolean;
    /**
     * Specifies if you want to use session storage
     * Default will be true
     */
    useSessionStorage?: boolean;
    /**
     * Panel selection change handler. Can be used to interact with the control while selecting items in the panel, before Click or Cancel is clicked.
     */
    onPanelSelectionChange?: (prevValue: IPickerTerms, newValue: IPickerTerms) => void;
    /**
     * Specifies if the childrens should be selected when parent is selected.
     * By default this is set to false.
     */
    selectChildrenIfParentSelected?: boolean;
}
/**
 * PropertyFieldTermPickerHost state interface
 */
export interface ITaxonomyPickerState {
    termSetAndTerms?: ITermSet;
    errorMessage?: string;
    /**
     * Error message populated in the component. errorMessage takes precedence over this.
     */
    internalErrorMessage?: string;
    openPanel?: boolean;
    loaded?: boolean;
    activeNodes?: IPickerTerms;
    invalidNodeIds?: string[];
}
export interface ITermChanges {
    changedCallback: (term: ITerm, checked: boolean) => void;
    activeNodes?: IPickerTerms;
    disabledTermIds?: string[];
    disableChildrenOfDisabledParents?: boolean;
}
export interface ITermParentProps extends ITermChanges {
    termset: ITermSet;
    multiSelection: boolean;
    anchorId?: string;
    isTermSetSelectable?: boolean;
    termActions?: ITermActions;
    spTermService: SPTermStorePickerService;
    autoExpand: () => void;
    updateTaxonomyTree: () => void;
    termSetSelectedChange?: (termSet: ITermSet, isChecked: boolean) => void;
}
export interface ITermParentState {
    loaded?: boolean;
    expanded?: boolean;
}
export interface ITermProps extends ITermChanges {
    termset: string;
    term: ITerm;
    multiSelection: boolean;
    disabled: boolean;
    termActions?: ITermActions;
    spTermService: SPTermStorePickerService;
    updateTaxonomyTree: () => void;
}
export interface ITermState {
    selected?: boolean;
    termLabel: string;
    hidden?: boolean;
    disabled?: boolean;
}
//# sourceMappingURL=ITaxonomyPicker.d.ts.map