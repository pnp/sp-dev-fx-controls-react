import { IPersonaProps, DirectionalHint } from "office-ui-fabric-react";
import { WebPartContext } from '@microsoft/sp-webpart-base';

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
  primaryText: string; // name
  secondaryText: string; // role
  tertiaryText: string; // status
  optionalText: string; // anything
}
