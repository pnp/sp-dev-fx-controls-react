import { BaseComponentContext } from '@microsoft/sp-component-base';
import { DirectionalHint } from "office-ui-fabric-react/lib/common/DirectionalHint";
import { IPersonaProps } from "office-ui-fabric-react/lib/components/Persona/Persona.types";
import { PrincipalType } from ".";

/**
 * Used to display a placeholder in case of no or temporary content. Button is optional.
 *
 */
export interface IPeoplePickerProps {
  /**
   * Context of the component
   */
  context: BaseComponentContext;
  /**
   * Text of the Control
  */
  titleText?: string;
  /**
   * Web Absolute Url of source site. When this is provided, a search request is done to the local site.
   */
  webAbsoluteUrl?: string;
  /**
   * Whether the control is enabled or not
   */
  disabled?: boolean;
  /**
   * Name of SharePoint Group
   */
  groupName?: string;
  /**
   * Maximum number of suggestions to show in the full suggestion list. (default: 5)
   */
  suggestionsLimit?: number;
  /**
   * Specify the user / group types to retrieve
   */
  resolveDelay?: number;
  /**
   * Selection Limit of Control
   */
  personSelectionLimit?: number;
  /**
   * Show or Hide Tooltip
   */
  showtooltip?: boolean;
  /**
   * People Field is mandatory
   */
  required?: boolean;
  /**
   * Static error message displayed below the picker. Use onGetErrorMessage to dynamically change the error message displayed (if any) based on the current value. errorMessage and onGetErrorMessage are mutually exclusive (errorMessage takes precedence).
   */
  errorMessage?: string;
  /**
   * The method is used to get the validation error message and determine whether the picker value is valid or not.
   * Mutually exclusive with the static string errorMessage (it will take precedence over this).
   *
   *   When it returns string:
   *   - If valid, it returns empty string.
   *   - If invalid, it returns the error message string and the picker will
   *     show an error message below the picker.
   *
   *   When it returns Promise<string>:
   *   - The resolved value is display as error message.
   *   - The rejected, the value is thrown away.
   *
   */
  onGetErrorMessage?: (items: IPersonaProps[]) => string | Promise<string>;
  /**
   * Method to check value of People Picker text
   */
  onChange?: (items: IPersonaProps[]) => void;
  /**
   * Tooltip Message
   */
  tooltipMessage?: string;
  /**
   * Directional Hint of tool tip
   */
  tooltipDirectional?: DirectionalHint;
  /**
  * Class Name for the whole People picker control
  */
  peoplePickerWPclassName?: string;
  /**
   * Class Name for the People picker control
   */
  peoplePickerCntrlclassName?: string;
  /**
   * Class Name for the Error Section
   */
  errorMessageClassName?: string;
  /**
   * Default Selected User Emails
   */
  defaultSelectedUsers?: string[];
  /**
   * @deprecated
   * Show users which are hidden from the UI
   */
  showHiddenInUI?: boolean;
  /**
   * Specify the user / group types to retrieve
   */
  principalTypes?: PrincipalType[];
  /**
   * When ensure user property is true, it will return the local user ID on the current site when doing a tenant wide search
   */
  ensureUser?: boolean;
  /**
   * Placeholder to be displayed in an empty term picker
   */
  placeholder?: string;
}

export interface IPeoplePickerState {
  mostRecentlyUsedPersons?: IPersonaProps[];
  errorMessage?: string;
  internalErrorMessage?: string;
  resolveDelay?: number;

  selectedPersons?: IPersonaProps[];
  peoplePersonaMenu?: IPersonaProps[];
  delayResults?: boolean;
}

export interface IPeoplePickerUserItem {
  /**
   * LoginName or Id of the principal in the site.
   */
  id: string;
  /**
   * LoginName of the principal.
   */
  loginName: string;
  imageUrl: string;
  imageInitials: string;
  text: string; // name
  secondaryText: string; // role
  tertiaryText: string; // status
  optionalText: string; // anything
}
