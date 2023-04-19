import { BaseComponentContext } from '@microsoft/sp-component-base';
import { ISPView } from "../../../src/common/SPEntities";
import { IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';


/**
 * Enum for specifying how the views should be sorted
 */
export enum PropertyFieldViewPickerOrderBy {
    Id = 1,
    Title
}

export interface IViewPickerProps {
  /**
   * Context of the current web part
  */
  context: BaseComponentContext;

  /**
   * If provided, additional class name to provide on the dropdown element.
   */
  className?: string;

  /**
   * Custom Field will start to validate after users stop typing for `deferredValidationTime` milliseconds.
   * Default value is 200.
   */
  deferredValidationTime?: number;

  /**
   * Whether the property pane field is enabled or not.
   */
  disabled?: boolean;

  /**
   * Filter views from Odata query
   */
  filter?: string;

  /**
   * Property field label displayed on top
   */
  label: string;

  /**
   * The List Id of the list where you want to get the views
   */
  listId?: string;

  /**
   * Input placeholder text. Displayed until option is selected.
   */
  placeholder?: string;

  /**
   * Specify the property on which you want to order the retrieve set of views.
   */
  orderBy?: PropertyFieldViewPickerOrderBy;

  /**
   * Initial selected view of the control
   */
  selectedView?: string;

  /**
   * Whether or not to show a blank option. Default false.
   */
  showBlankOption?: boolean;

  /**
   * Defines view titles which should be excluded from the view picker control
   */
  viewsToExclude?: string[];

  /**
   * Absolute Web Url of target site (user requires permissions)
   */
  webAbsoluteUrl?: string;



  /**
   * Defines a change function to raise when the selected value changed.
   * Normally this function must be always defined with the 'this.onViewPickerPropertyChange'
   * method of the web part object.
   */
  onViewPickerPropertyChange : (newValue: string | string[]) => void;
  /**
    * Callback that is called before the dropdown is populated
    */
  onViewsRetrieved?: (views: ISPView[]) => PromiseLike<ISPView[]> | ISPView[];

}

export interface IViewPickerState {
    results: IDropdownOption[];
    selectedKey?: string | string[];
    errorMessage?: string | string[];
}