import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IItem } from '@pnp/sp/items';
import { IStyle, IStyleFunctionOrObject } from '@fluentui/react';
import React from 'react';
import { IDynamicFieldProps,IDynamicFieldStyles } from './dynamicField';
import { IValidationErrorDialogProps } from './IValidationErrorDialogProps';

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
   * Specify if save button is disabled.
   */
  saveDisabled?: boolean;
  /**
   * List id
   */
  listId: string;
  /**
   * List item loaded handler.
   * Allows to access list item information after it's loaded.
   */
  onListItemLoaded?: (listItemData: any) => Promise<void>; // eslint-disable-line @typescript-eslint/no-explicit-any
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
  fieldOverrides?: {
    [columnInternalName: string]: {
      (
        fieldProperties: IDynamicFieldProps
      ): React.ReactElement<IDynamicFieldProps>;
    };
  };

  /**
   * Specifies if onSubmitted event should pass PnPJS list item (IItem) as a second parameter. Default - true
   */
  returnListItemInstanceOnSubmit?: boolean;

  /**
   * InternalName of fields that should be disabled
   */
  disabledFields?: string[];

  /**
   * InternalName of fields that should be hidden
   */
  hiddenFields?: string[];

  /**
   * Absolute Web Url of target site (user requires permissions)
   */
  webAbsoluteUrl?: string;

  /**
   * Specifies if ETag should be respected when updating the item. Default - true
   */
  respectETag?: boolean;

  /**
   * Specifies whether custom formatting (set when customizing the out of the box form) should be used. Default - true
   */
  useCustomFormatting?: boolean;

  /**
   * Specifies whether client side validation should be used. Default - true
   */
  useClientSideValidation?: boolean;

  /**
   * Specifies whether field validation (set in column settings) should be used. Default - true
   */
  useFieldValidation?: boolean;

  /**
   * Specify validation error dialog properties
   */
  validationErrorDialogProps?: IValidationErrorDialogProps;

  /**
   * Specify if the form should support the creation of a new list item in a document library attaching a file to it.
   * This option is only available for document libraries and works only when the contentTypeId is specified and has a base type of type Document.
   * Default - false
   */
  enableFileSelection?: boolean;

  /**
   * Specify the supported file extensions for the file picker. Default - "docx", "doc", "pptx", "ppt", "xlsx", "xls", "pdf"
   * Only used when enableFileSelection is true
   */
  supportedFileExtensions?: string[];

  /**
   * Specify a set of custom icons to be used.
   * The key is the field internal name and the value is the Fluent UI icon name.
   */
  customIcons?: { [columnInternalName: string]: string };

  /**
   * Specify fields custom sorting.
   * The value is the field internal name.
   */
  fieldOrder?: string[]

  /**
   * When uploading files: Specifies if last active tab will be stored after the Upload panel has been closed.
   * Note: the value of selected tab is stored in the queryString hash.
   * @default true
   */
   storeLastActiveTab?: boolean;

  /**
   * Library relative folder to create the item in.
   * This option is only available for document libraries and works only when the contentTypeId is specified and has a base type of type Document or Folder.
   * Defaults to the root folder.
   */
  folderPath?: string;

  /**
   * Set to true to use the Modern Taxonomy Picker (ModernTaxonomyPicker).
   * Set to false to use the classic TaxonomyPicker.
   * Default is false
   */
  useModernTaxonomyPicker?: boolean;

  /**
   * Call to provide customized styling
   * Read https://github.com/microsoft/fluentui/blob/master/docs/react-wiki-archive/Component-Styling.md#using-a-styleable-component for more information
   */
  styles?: IStyleFunctionOrObject<IDynamicFormStyleProps, IDynamicFormStyles>;

  /**
   * CSS Class name to add to the root element.
   */
  className?: string;
}



export type IDynamicFormStyleProps = Pick<IDynamicFormProps, 'className'> & { };

export interface IDynamicFormSubComponentStyles {
  fieldStyles: IDynamicFieldStyles;
}

export interface IDynamicFormStyles {
  root: IStyle;
  sectionTitle: IStyle;
  sectionFormFields: IStyle;
  sectionFormField: IStyle;
  sectionLine: IStyle;
  header:IStyle;
  footer:IStyle;
  validationErrorDialog: IStyle;
  buttons: IStyle;
  actions: IStyle;
  actionsRight: IStyle;
  action: IStyle;
   /**
   * sub component styles for dynamic field
   */
   subComponentStyles: IDynamicFormSubComponentStyles;
}