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
   * Name of SharePoint Group
   */
  groupName?: string;
  /**
   * image Initials
   */
  getAllUsers?: boolean;
  /** 
   * Text of the Control 
  */
  titleText: string;
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
}

export interface IPeoplePickerState {
  selectedPersons?: IPersonaProps[];
  mostRecentlyUsedPersons: IPersonaProps[];
  currentSelectedPersons: IPersonaProps[];
  allPersons: [{
    id: string,
    imageUrl: string,
    imageInitials: string,
    primaryText: string, //Name
    secondaryText: string, //Role
    tertiaryText: string, //status
    optionalText: string //stgring
  }];
  delayResults?: boolean;
  currentPicker?: number | string;
  peoplePersonaMenu?: IPersonaProps[];
  peoplePartTitle: string;
  peoplePartTooltip : string;
  isLoading : boolean;
  peopleValidatorText? : string;
  showmessageerror: boolean;
}
