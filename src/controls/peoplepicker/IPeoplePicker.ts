import { WebPartContext } from '@microsoft/sp-webpart-base';
import { ExtensionContext } from '@microsoft/sp-extension-base';
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
  context: WebPartContext | ExtensionContext;
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
  isRequired?: boolean;
  /**
   * Mandatory field error message
   */
  errorMessage?: string;
  /**
   * Method to check value of People Picker text
   */
  selectedItems?: (items: IPersonaProps[]) => void;
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
  mostRecentlyUsedPersons: IPersonaProps[];
  showRequiredError: boolean;
  errorMessage: string;
  resolveDelay : number;

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
