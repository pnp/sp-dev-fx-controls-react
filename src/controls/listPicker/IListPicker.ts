import { ExtensionContext } from '@microsoft/sp-extension-base';
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { LibsOrderBy } from "../../services/ISPService";

export interface IListPickerProps {
  /**
  * The web part context
  */
  context: WebPartContext | ExtensionContext;
  /**
  * If provided, additional class name to provide on the dropdown element.
  */
  className?: string;
  /**
  * Whether or not the control is disabled
  */
  disabled?: boolean;
  /**
  * The SharePoint BaseTemplate to filter the list options by
  */
  baseTemplate?: number;
  /**
  * Whether or not to include hidden lists. Default is true
  */
  includeHidden?: boolean;
  /**
   * Filter list from OData query (takes precendents over Hidden and BaseTemplate Filters)
   */
  filter?: string;
  /**
  * How to order the lists retrieved from SharePoint
  */
  orderBy?: LibsOrderBy;
  /**
  * Keys of the selected item(s). If you provide this, you must maintain selection
  * state by observing onSelectionChanged events and passing a new value in when changed.
  */
  selectedList?: string | string[];
  /**
  * Optional mode indicates if multi-choice selections is allowed.  Default to false
  */
  multiSelect?: boolean;
  /**
  * The label to use
  */
  label?: string;
  /**
  * Input placeholder text. Displayed until option is selected.
  */
  placeHolder?: string;
  /**
  * Input placeholder text. Displayed until option is selected.
  */
 placeholder?: string;
  /**
  * Callback issues when the selected option changes
  */
  onSelectionChanged?: (newValue: string | string[]) => void;
}

export interface IListPickerState {
  /**
  * The options available to the listPicker
  */
  options: IDropdownOption[];
  /**
  * Whether or not the listPicker options are loading
  */
  loading: boolean;
  /**
  * Keys of the currently selected item(s).
  */
  selectedList?: string | string[];
}
