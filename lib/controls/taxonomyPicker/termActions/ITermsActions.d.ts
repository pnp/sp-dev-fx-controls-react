import { ITerm } from '../../../services/ISPTermStorePickerService';
import SPTermStorePickerService from '../../../services/SPTermStorePickerService';
export interface ITermActionsControlProps {
    /**
     * Current term.
     */
    term: ITerm;
    /**
     * List of actions.
     */
    termActions: ITermActions;
    /**
     * Taxonomy Term Service
     */
    spTermService: SPTermStorePickerService;
    /**
     * Callback after execution term action.
     */
    termActionCallback: (updateAction: UpdateAction | undefined) => void;
}
export interface ITermActionsControlState {
    /**
     * Specifies the list of the available actions for the term.
     */
    availableActions: ITermAction[];
    /**
     * TermsAction display mode.
     */
    displayMode: TermActionsDisplayMode;
    /**
     * Specifies how the concreate term action is going to be displayed (icon/text/both).
     */
    displayStyle: TermActionsDisplayStyle;
    /**
     * TermAction state changes. Can be used to enable/disable/hide actions for specific terms.
     */
    termActionChanges?: TermActionChange;
}
export interface TermActionChange {
    [termId: string]: ActionChange[];
}
export interface ActionChange {
    actionId: string;
    disabled?: boolean;
    hidden?: boolean;
}
export interface IConcreteTermActionProps {
    termActions: ITermAction[];
    term: ITerm;
    displayStyle: TermActionsDisplayStyle;
    spTermService: SPTermStorePickerService;
    termActionChanges: TermActionChange;
    termActionCallback: (updateAction: UpdateAction | undefined) => void;
}
/**
 * Specifies the display mode of the term actions.
 */
export declare enum TermActionsDisplayMode {
    buttons = 1,
    dropdown = 2
}
/**
 * Specifies the style which is applied to display actions.
 */
export declare enum TermActionsDisplayStyle {
    text = 1,
    icon = 2,
    textAndIcon = 3
}
/**
 * Specifies the action that should be applied after executing the action callback.
 */
export declare enum UpdateType {
    /**
     * Allows you to update the label of the term
     */
    updateTermLabel = 1,
    /**
     * Allows you to update part of the taxonomy tree
     */
    updateTermsTree = 2,
    /**
     * Allows you to hide the term
     */
    hideTerm = 3,
    /**
     * Allows you to disable the term
     */
    disableTerm = 4,
    /**
     * Allows you to select the term
     */
    selectTerm = 5
}
/**
 * Specifies the result that will be returned to the Term after the execution of the callback.
 */
export interface UpdateAction {
    updateActionType: UpdateType;
    value?: string | boolean;
}
export interface ITermActions {
    actions: ITermAction[];
    termActionsDisplayStyle?: TermActionsDisplayStyle;
    termActionsDisplayMode?: TermActionsDisplayMode;
    /**
     * Initializes the term action with the taxonomy service.
     */
    initialize?: (spTermService: SPTermStorePickerService) => Promise<void>;
}
/**
 * Interface represents the possible action that could be execute on term level.
 */
export interface ITermAction {
    /**
     * Action ID
     */
    id: string;
    /**
     * Action title
     */
    title: string;
    /**
     * Icon class name to be displayed for the action.
     */
    iconName?: string;
    /**
     * Specify if the action is hidden. This could be used for instance when you want to invoke the action right after rendering.
     */
    hidden?: boolean;
    /**
     * Specifies if you want to invoke the action on render
     */
    invokeActionOnRender?: boolean;
    /**
    * Method checks if the current term is supported.
    * @param currentTerm
    */
    applyToTerm: (currentTerm: ITerm, triggerActionCallback: (updateAction: UpdateAction) => void, setActionStateForTerm: (actionId: string, termId: string, type: "disabled" | "hidden", value: boolean) => void) => Promise<boolean> | boolean;
    /**
     * Method to be executed when action is fired.
     */
    actionCallback: (spTermService: SPTermStorePickerService, currentTerm: ITerm) => Promise<UpdateAction>;
}
//# sourceMappingURL=ITermsActions.d.ts.map