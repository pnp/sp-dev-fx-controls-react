import { ITerm } from '../../../services/ISPTermStorePickerService';

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
   * Callback after execution term action.
   */
  termActionCallback: (updateAction: UpdateAction) => void;
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
}

export interface IConreteTermActionProps {
  termActions: ITermAction[];
  term: ITerm;
  displayStyle: TermActionsDisplayStyle;
  termActionCallback: (updateAction: UpdateAction) => void;
}

/**
 * Specifies the display mode of the term actions.
 */
export enum TermActionsDisplayMode {
  buttons = 1,
  dropdown
}

/**
 * Specifies the style which is applied to display actions.
 */
export enum TermActionsDisplayStyle {
  text = 1,
  icon,
  textAndIcon
}

/**
 * Specifies the action that should be applied after executing the action callback.
 */
export enum UpdateType {
  updateTermLabel = 1,
  updateTermsTree
}
/**
 * Specifies the result that will be returned to the Term after the execution of the callback.
 */
export interface UpdateAction {
  updateActionType: UpdateType;
  value?: string;
}

export interface ITermActions {
  addDefaultActions: boolean;
  concreateActions: ITermAction[];
  termActionsDisplayStyle?: TermActionsDisplayStyle;
  termActionsDisplayMode?: TermActionsDisplayMode;
}
/**
 * Interface represents the possible action that could be execute on term level.
 */
export interface ITermAction {
  id: string;
  /**
   * Display name of the action
   */
  displayText?: string;
  /**
   * Icon class name to be displayed for the action.
   */
  iconName?: string;

  /**
   * Specifies it the waiting dialog should be displayed when executing the action.
   */
  isBlocking?: boolean;
  /**
   * Method that verifies if the action can be applied to the term. If false, action won't be avaialable.
   * @param currentTerm
   */
  applyToTerm(currentTerm: ITerm): boolean;
  /**
   * Method to be executed when action is fired.
   */
  actionCallback: (currentTerm: ITerm) => Promise<UpdateAction>;
}
