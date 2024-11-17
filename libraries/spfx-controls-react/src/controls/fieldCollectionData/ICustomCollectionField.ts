import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { IRenderFunction } from '@uifabric/utilities/lib/IRenderFunction';
import { ISelectableOption } from '@fluentui/react/lib/utilities/selectableOption/SelectableOption.types';
import { IComboBoxOption } from '@fluentui/react/lib/ComboBox';

export interface ICustomCollectionField {
  /**
   * ID of the field.
   */
  id: string;
  /**
   * Title of the field. This will be used for the label in the table.
   */
  title: string;
  /**
   * Specifies the type of field to render.
   */
  type: CustomCollectionFieldType;
  /**
   * Allows you to specify if a field is disabled for editing
   */
  disableEdit?: boolean;
  /**
   * Specify if the field is required.
   */
  required?: boolean;
  /**
   * Dropdown / combobox options. Only nescessary when dropdown or combobox type is used.
   */
  options?: IDropdownOption[] | IComboBoxOption[];
  /**
   * Whether multiple options can be selcted. Only when combobox or peoplepicker is used. Defaults to false (combobox) and true (peoplepicker)
   */
  multiSelect?: boolean
  /**
   * Whether own options can be added. Only when combobox is used. Defaults to false
   */
  allowFreeform?: boolean
  /**
   * Dropdown custom options render method.
   */
  onRenderOption?: IRenderFunction<ISelectableOption>;
  /**
   * Input placeholder text.
   */
  placeholder?: string;
  /**
   * Minimum users to be selected. Only when people picker is used.
   */
  minimumUsers?: number;
    /**
   * The message to be displayed when minimum users is not met. Only when people picker is used. If omitted, the default value is displayed
   */
  minimumUsersMessage?: string;
  /**
   * Maximum users to be selected. Only when people picker is used.
   */
  maximumUsers?: number;
  /**
   * Default value for the field
   */
  defaultValue?: any; // eslint-disable-line @typescript-eslint/no-explicit-any
  /**
   * Field will start to validate after users stop typing for `deferredValidationTime` milliseconds. Default: 200ms.
   */
  deferredValidationTime?: number;
  /**
   * The method is used to get the validation error message and determine whether the input value is valid or not.
   *
   * When it returns string:
   * - If valid, it returns empty string.
   * - If invalid, the field will show a red border
   */
   onGetErrorMessage?: (value: any, index: number, currentItem: any) => string | Promise<string>; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * Custom field rendering support
   */
  onCustomRender?: (
    field: ICustomCollectionField,
    /* eslint-disable @typescript-eslint/no-explicit-any */
    value: any,
    onUpdate: (fieldId: string, value: any) => void,
    item: any,
    /* eslint-enable @typescript-eslint/no-explicit-any */
    rowUniqueId: string,
    onCustomFieldValidation: (fieldId: string, errorMessage: string) => void
  ) => JSX.Element;
}

export enum CustomCollectionFieldType {
  string = 1,
  number,
  boolean,
  dropdown,
  combobox,
  peoplepicker,
  fabricIcon,
  url,
  date,
  custom
}
