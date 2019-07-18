import { Web } from '@pnp/sp';

/**
 * MultiSelectLookup component props.
 */
export interface IMultiSelectLookupProps {
  /**
   * Additional CSS class(es) to apply to the MultiSelectLookup container.
   */
  className?: string;

  /**
   * id of a root element
   */
  id?: string;
  /**
   * Label to display next to the checkbox.
   */
  label?: string;

  /**
   * Disabled state of the component.
   * @defaultvalue false
   */
  disabled?: boolean;

  /**
   * Required state of the component.
   * @defaultvalue false
   */
  required?: boolean;

  /**
   * Specifies rendering of the search box
   * @defaultvalue true
   */
  showSearchBox?: boolean;

  /**
   * Placeholder of searchbox
   * @defaultvalue 'Enter text...'
   */
  searchPlaceholder?: string;

  /**
   * Label near select all checkbox
   * @defaultvalue 'Selected all'
   */
  checkboxLabel?: string;

  /**
   * ListName to download datas
   * List should have columns: Title, Value
   * Constrol gets datas from list when this props is provided
   */
  listName?: string;

  /**
   * web usin to download datas
   */
  web?: Web;

  /**
   * All available data
   */
  availableData?: Item[];

  /**
   * start selected data (which includes in availableData)
   */
  selectedData?: Item[];

  /**
   */
  onChanged?: (value: IOnChangeState) => void;
}

export interface Item {
  label: string | number;
  value: string | number;
  isSelected?: boolean;
  isLocked?: boolean;
  sort?: number;
}

export interface IOnChangeState {
  allSelected: boolean;
  selectedData: Item[];
}
