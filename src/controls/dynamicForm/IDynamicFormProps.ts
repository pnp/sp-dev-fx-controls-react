import { ExtensionContext } from '@microsoft/sp-extension-base';
import { WebPartContext } from '@microsoft/sp-webpart-base';

export interface IDynamicFormProps {
  /**
   * Current context
   */
  context: WebPartContext | ExtensionContext;
  /**
   * Specifies if the form is disabled
   */
  disabled?: boolean;
  /**
   * List id
   */
  listId: string;
  /**
   * Handler for form submitted event
   */
  onSubmitted?: (ListItem: any) => void;
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
 * Used to execute WebSearch. If not provided SearchTab will not be available.
 */
  bingAPIKey?: string;
}
