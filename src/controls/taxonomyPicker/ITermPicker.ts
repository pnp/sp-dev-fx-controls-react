import { IWebPartContext } from '@microsoft/sp-webpart-base';



/**
 * Selected terms
 */
export interface IPickerTerm  {
  name: string;
  key: string;
  path: string;
  termSet: string;
  termSetName? : string;
}

export interface IPickerTerms extends Array<IPickerTerm> { }

/**
 * Generic Term Object (abstract interface)
 */
export interface ISPTermObject {
  Name: string;
  Guid: string;
  Identity: string;
  leaf: boolean;
  children?: ISPTermObject[];
  collapsed?: boolean;
  type: string;
}

/**
 * Defines a SharePoint Term Store
 */
export interface ISPTermStore extends ISPTermObject {
  IsOnline: boolean;
  WorkingLanguage: string;
  DefaultLanguage: string;
  Languages: string[];
}

/**
 * Defines an array of Term Stores
 */
export interface ISPTermStores extends Array<ISPTermStore> {
}

/**
 * Defines a Term Store Group of term sets
 */
export interface ISPTermGroup extends ISPTermObject {
  IsSiteCollectionGroup: boolean;
  IsSystemGroup: boolean;
  CreatedDate: string;
  LastModifiedDate: string;
}

/**
 * Array of Term Groups
 */
export interface ISPTermGroups extends Array<ISPTermGroup> {
}


/**
 * Public properties of the PropertyFieldTermPicker custom field
 */
export interface IPropertyFieldTermPickerProps {
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
   * Indicator to define if the system Groups are exclude. Default is false.
   */
  excludeSystemGroup?: boolean;
  /**
   * WebPart's context
   */
  context: IWebPartContext;
  /**
   * Limit the term sets that can be used by the group name or ID
   */
  limitByGroupNameOrID?: string;
  /**
   * Limit the terms that can be picked by the Term Set name or ID
   */
  limitByTermsetNameOrID?: string;
  /**
   * Defines a onPropertyChange function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onPropertyChange'
   * method of the web part object.
   */
  onPropertyChange(propertyPath: string, oldValue: any, newValue: any): void;
  /**
   * Parent Web Part properties
   */
  properties: any;
  /**
   * An UNIQUE key indicates the identity of this control
   */
  key: string;
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
  /**
   * Specifies if you want to show or hide the term store name from the panel
   */
  hideTermStoreName?: boolean;
}

/**
 * Private properties of the PropertyFieldTermPicker custom field.
 * We separate public & private properties to include onRender & onDispose method waited
 * by the PropertyFieldCustom, witout asking to the developer to add it when he's using
 * the PropertyFieldTermPicker.
 */
// export interface IPropertyFieldTermPickerPropsInternal extends IPropertyFieldTermPickerProps {
// //   // onRender(elem: HTMLElement): void;
// //   // onDispose(elem: HTMLElement): void;
//  }
