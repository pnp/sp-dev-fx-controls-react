import { ExtensionContext } from '@microsoft/sp-extension-base';
import { IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { LibsOrderBy } from "../../../services/ISPService";

export interface IDynamicFieldState {
  /**
  * The options available to the listPicker
  */
  changedvalue:any;
}
