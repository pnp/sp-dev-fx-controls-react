import { WebPartContext } from '@microsoft/sp-webpart-base';
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
  context: WebPartContext;
  /**
   * Text of the Control
  */
  titleText: string;
  /**
   * Web Absolute Url of source site
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
   * Selection Limit of Control
   */
  personSelectionLimit?: number;
  /**
   * Show or Hide Tooltip
   */
  showtooltip? : boolean;
  /**
   * People Field is mandatory
   */
  isRequired? : boolean;
  /**
   * Mandatory field error message
   */
  errorMessage? : string;
  /**
   * Method to check value of People Picker text
   */
  selectedItems?: (items: any[]) => void;
  /**
   * Tooltip Message
   */
  tooltipMessage? : string;
  /**
   * Directional Hint of tool tip
   */
  tooltipDirectional? : DirectionalHint;
   /**
   * Class Name for the whole People picker control
   */
  peoplePickerWPclassName?:string;
  /**
   * Class Name for the People picker control
   */
  peoplePickerCntrlclassName?: string;
  /**
   * Class Name for the Error Section
   */
  errorMessageclassName?: string;
  /**
   * Default Selected User Emails
   */
  defaultSelectedUsers? : string[];
  /**
   * Show users which are hidden from the UI
   */
  showHiddenInUI?: boolean;
  /**
   * Specify the user / group types to retrieve
   */
  principleTypes?: PrincipalType[];
}

export interface IPeoplePickerState {
  selectedPersons?: IPersonaProps[];
  mostRecentlyUsedPersons: IPersonaProps[];
  currentSelectedPersons: IPersonaProps[];
  allPersons: IPeoplePickerUserItem[];
  delayResults?: boolean;
  currentPicker?: number | string;
  peoplePersonaMenu?: IPersonaProps[];
  peoplePartTitle: string;
  peoplePartTooltip : string;
  isLoading : boolean;
  peopleValidatorText? : string;
  showmessageerror: boolean;
}

export interface IPeoplePickerUserItem {
  id: string;
  imageUrl: string;
  imageInitials: string;
  text: string; // name
  secondaryText: string; // role
  tertiaryText: string; // status
  optionalText: string; // anything
}
