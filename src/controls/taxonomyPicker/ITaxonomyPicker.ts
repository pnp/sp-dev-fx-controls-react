import { IPickerTerms } from './ITermPicker';
import { ITermStore, IGroup, ITermSet, ITerm } from '../../services/ISPTermStorePickerService';
import SPTermStorePickerService from '../../services/SPTermStorePickerService';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

/**
 * PropertyFieldTermPickerHost properties interface
//  */
export interface ITaxonomyPickerProps  {
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
   * Defines the selected by default term sets.
   */
  initialValues?: IPickerTerms;
  /**
   * WebPart's context
   */
  context: IWebPartContext;
  /**
   * Limit the terms that can be picked by the Term Set name or ID
   */
  termsetNameOrID: string;
    /**
   * Id of a child term in the termset where to be able to selected and search the terms from
   */
  ancoreId?: string;
  /**
   * Whether the property pane field is enabled or not.
   */
  disabled?: boolean;
  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
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
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;

  onChange?: (newValue?: IPickerTerms) => void;
}

/**
 * PropertyFieldTermPickerHost state interface
 */
export interface ITaxonomyPickerState {
 
  termSetAndTerms? : ITermSet;
  errorMessage?: string;
  openPanel?: boolean;
  loaded?: boolean;
  activeNodes?: IPickerTerms;
}

export interface ITermChanges {
  changedCallback: (term: ITerm, checked: boolean) => void;
  activeNodes?: IPickerTerms;
}

export interface ITermGroupProps extends ITermChanges {
  group: IGroup;
  termstore: string;
  termsService: SPTermStorePickerService;
  multiSelection: boolean;
}

export interface ITermGroupState {
  expanded: boolean;
}

export interface ITermSetProps extends ITermChanges {
  termset: ITermSet;
  autoExpand: () => void;
  multiSelection: boolean;
}

export interface ITermSetState {
 
  loaded?: boolean;
  expanded?: boolean;
}

export interface ITermProps extends ITermChanges {
  termset: string;
  term: ITerm;
  multiSelection: boolean;
}

export interface ITermState {
  selected?: boolean;
}
