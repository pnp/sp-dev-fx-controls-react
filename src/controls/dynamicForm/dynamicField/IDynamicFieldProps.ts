import { BaseComponentContext } from '@microsoft/sp-component-base';
import { IDropdownOption } from "@fluentui/react/lib/Dropdown";
import { IStyle, IStyleFunctionOrObject, Theme } from '@fluentui/react';
import { IFilePickerResult } from '../../filePicker';
import { ChoiceFieldFormatType } from '@pnp/sp/fields';

export type DateFormat = 'DateTime' | 'DateOnly';
export type FieldChangeAdditionalData = IFilePickerResult;

export interface IDynamicFieldProps {
  context: BaseComponentContext;

  /** Internal column name */
  columnInternalName: string;
  cultureName?: string;

  /** SharePoint Field Type */
  fieldType: string;

  /** Text label for field */
  label?: string;

  /** Placeholder text for field */
  placeholder?: string;

  /** Specifies if a field should be filled in order to pass validation */
  required: boolean;

  /** Specifies if a field should be disabled */
  disabled?: boolean;

  /** List Item Id, passed to various utility/helper functions to determine things like selected User UPN, Lookup text, Term labels etc. */
  listItemId?: number;

  /** The default value of the field. */
  defaultValue: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  /** Holds a field value. Set on all fields in the form. */
  value?: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  /** Fired by DynamicField when a field value is changed */
  onChanged?: (
    columnInternalName: string,
    newValue: any, // eslint-disable-line @typescript-eslint/no-explicit-any
    validate: boolean,
    additionalData?: FieldChangeAdditionalData
  ) => void; // eslint-disable-line @typescript-eslint/no-explicit-any

  /** Represents the value of the field as updated by the user. Only updated by fields when changed. */
  newValue?: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  /** Represents a stringified value of the field. Used in custom formatting and validation. */
  stringValue: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  /** Holds additional properties that can be queried in validation. For example a Person column may be reference by both [$Person] and [$Person.email] */
  subPropertyValues?: Record<string, any>; // eslint-disable-line @typescript-eslint/no-explicit-any

  /** If validation raises an error message, it can be stored against the field here for display by DynamicField  */
  validationErrorMessage?: string;

  /** Field Term Set ID, used in Taxonomy / Metadata fields */
  fieldTermSetId?: string;

  /** Field Anchor ID, used in Taxonomy / Metadata fields */
  fieldAnchorId?: string;

  /** Lookup List ID, used in Lookup and User fields */
  lookupListID?: string;

  /** Lookup Field. Represents the field used for Lookup values. */
  lookupField?: string;

  // changedValue: any; // eslint-disable-line @typescript-eslint/no-explicit-any

  /** Equivalent to HiddenListInternalName, used for Taxonomy Metadata fields */
  hiddenFieldName?: string;

  /** Order of the field in the form */
  Order: number;

  /** Used for files / image uploads */
  additionalData?: FieldChangeAdditionalData;

  /** Used to Render TaxonomyPicker or ModernTaxonomyPicker */
  useModernTaxonomyPickerControl?: boolean;

  // Related to various field types
  options?: IDropdownOption[];
  isRichText?: boolean;
  dateFormat?: DateFormat;
  firstDayOfWeek: number;
  principalType?: string;
  description?: string;
  maximumValue?: number;
  minimumValue?: number;
  showAsPercentage?: boolean;
  itemsQueryCountLimit?: number;
  customIcon?: string;
  orderBy?: string;
  choiceType?: ChoiceFieldFormatType;
  /** Used for customize component styling */
  styles?:IStyleFunctionOrObject<IDynamicFieldStyleProps, IDynamicFieldStyles>;
}


export interface IDynamicFieldStyleProps {
  theme: Theme; 
  required?: boolean;
}

export interface IDynamicFieldStyles {
 titleContainer: IStyle;
 fieldIcon:IStyle;
 fieldDisplay:IStyle;
 fieldDisplayNoPadding:IStyle;
 fieldContainer:IStyle;
 fieldDescription:IStyle,
 fieldLabel:IStyle;
 labelContainer:IStyle;
 pickersContainer:IStyle;
 fieldEditor:IStyle;
 errormessage:IStyle;
 richText:IStyle;
 thumbnailFieldButtons:IStyle;
 selectedFileContainer:IStyle;
 fieldRequired:IStyle;
}
