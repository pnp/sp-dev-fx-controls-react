import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IItem } from '@pnp/sp/items';
import React from 'react';
import { IDynamicFieldProps } from './dynamicField';

export interface IDynamicFormProps {
  /**
   * Current context
   */
  context: BaseComponentContext;
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
  onBeforeSubmit?: (listItemData: any) => Promise<boolean>; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Handler for form submitted event
   */
  onSubmitted?: (listItemData: any, listItem?: IItem) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Handler of submission error
   */
  onSubmitError?: (listItemData: any, error: Error) => void; // eslint-disable-line @typescript-eslint/no-explicit-any
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
   * Key value pair for fields you want to override.  Key is the internal field name, value is the function to be called for the custom element to render
   */
  fieldOverrides?: {[columnInternalName: string] : {(fieldProperties: IDynamicFieldProps): React.ReactElement<IDynamicFieldProps>}};
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

  /**
   * Absolute Web Url of target site (user requires permissions)
   * */
  webAbsoluteUrl?: string;
}
