import { IItem } from '@pnp/sp/items';
import { SPFxContext } from '../../common/Types';

export interface IDynamicFormProps {
  /**
   * Current context
   */
  context: SPFxContext;
  /**
   * Specifies if the form is disabled
   */
  disabled?: boolean;
  /**
   * List id
   */
  listId: string;
  /**
   * Before submit handler.
   * Allows to modify the object to be submitted or cancel the submission.
   */
  onBeforeSubmit?: (listItemData: any) => Promise<boolean>;
  /**
   * Handler for form submitted event
   */
  onSubmitted?: (listItemData: any, listItem?: IItem) => void;
  /**
   * Handler of submission error
   */
  onSubmitError?: (listItemData: any, error: Error) => void;
  /**
   * Handler for form cancelled event
   */
  onCancelled?: () => void;
  /**
   * ID of the list item to display on the form
   */
  listItemId?: number;
  /**
   * Content type id of the item
   */
  contentTypeId?: string;

  /**
   * Specifies if onSubmitted event should pass PnPJS list item (IItem) as a second parameter. Default - true
   */
  returnListItemInstanceOnSubmit?: boolean;

  /**
 * Used to execute WebSearch. If not provided SearchTab will not be available.
 */
  //bingAPIKey?: string;
  /**
   * InternalName of fields that should be disabled
   */
   disabledFields?: string[];
}
