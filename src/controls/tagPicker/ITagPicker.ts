import type * as React from 'react';
import type {
  FieldProps,
  TagPickerControlProps,
  TagPickerGroupProps,
  TagPickerInputProps,
  TagPickerListProps,
  TagPickerOptionGroupProps,
  TagPickerOptionProps,
  TagPickerProps,
  Theme,
} from '@fluentui/react-components';

export type TagPickerSelectionMode = 'single' | 'multiple';

export type TagPickerSelectionReason = 'option' | 'clear' | 'selectAll' | 'paste' | 'dismiss';

export interface ITagPickerOption<TData = unknown> {
  key: string;
  text: string;
  secondaryText?: string;
  groupKey?: string;
  disabled?: boolean;
  media?: React.ReactNode;
  data?: TData;
}

export interface ITagPickerGroupDescriptor {
  key: string;
  label: React.ReactNode;
}

export interface ITagPickerHandle {
  focus: () => void;
  clear: () => void;
  selectAll: () => void;
  setQuery: (query: string) => void;
}

export interface ITagPickerStrings {
  placeholder?: string;
  noOptionsText?: string;
  selectAllLabel?: string;
  clearAllLabel?: string;
  selectedItemsAriaLabel?: string;
  selectionLimitReachedText?: string;
}

export interface ITagPickerClassNames {
  root?: string;
  field?: string;
  control?: string;
  input?: string;
  selectedGroup?: string;
  selectedTag?: string;
  selectedTagContent?: string;
  list?: string;
  optionGroup?: string;
  option?: string;
  optionContent?: string;
  optionSecondary?: string;
  secondaryAction?: string;
  selectAllButton?: string;
  clearAllButton?: string;
  expandIcon?: string;
  noOptions?: string;
}

export interface ITagPickerStyles {
  root?: React.CSSProperties;
  field?: React.CSSProperties;
  control?: React.CSSProperties;
  input?: React.CSSProperties;
  selectedGroup?: React.CSSProperties;
  selectedTag?: React.CSSProperties;
  selectedTagContent?: React.CSSProperties;
  list?: React.CSSProperties;
  optionGroup?: React.CSSProperties;
  option?: React.CSSProperties;
  optionContent?: React.CSSProperties;
  optionSecondary?: React.CSSProperties;
  secondaryAction?: React.CSSProperties;
  selectAllButton?: React.CSSProperties;
  clearAllButton?: React.CSSProperties;
  expandIcon?: React.CSSProperties;
  noOptions?: React.CSSProperties;
}

export interface ITagPickerActionRenderContext<TData = unknown> {
  selectedOptions: string[];
  selectedItems: ITagPickerOption<TData>[];
  canSelectAll: boolean;
  canClear: boolean;
  selectAll: () => void;
  clear: () => void;
}

export interface ITagPickerExpandIconRenderContext {
  open: boolean;
  disabled?: boolean;
}

export interface ITagPickerSelectionChangeData<TData = unknown> {
  selectedOptions: string[];
  selectedItems: ITagPickerOption<TData>[];
  reason: TagPickerSelectionReason;
}

export interface ITagPickerProps<TData = unknown> {
  options: ITagPickerOption<TData>[];
  groups?: ITagPickerGroupDescriptor[];
  mode?: TagPickerSelectionMode;
  selectedOptions?: string[];
  defaultSelectedOptions?: string[];
  onSelectionChange?: (data: ITagPickerSelectionChangeData<TData>) => void;
  theme?: Theme;
  label?: FieldProps['label'];
  required?: boolean;
  validationMessage?: FieldProps['validationMessage'];
  validationState?: FieldProps['validationState'];
  hint?: FieldProps['hint'];
  fieldProps?: Omit<FieldProps, 'children' | 'label' | 'required' | 'validationMessage' | 'validationState' | 'hint'>;
  strings?: ITagPickerStrings;
  placeholder?: string;
  noOptionsText?: string;
  selectAllLabel?: string;
  clearAllLabel?: string;
  selectedItemsAriaLabel?: string;
  selectionLimitReachedText?: string;
  disabled?: boolean;
  maxSelections?: number;
  maxSelectedItemsHeight?: number | string;
  clearable?: boolean;
  enablePaste?: boolean;
  pasteDelimiter?: string | RegExp;
  allowFreeform?: boolean;
  /** Receives the raw, untrimmed query. The default filter trims and lower-cases it. */
  filterOption?: (option: ITagPickerOption<TData>, query: string) => boolean;
  renderOption?: (option: ITagPickerOption<TData>) => React.ReactNode;
  renderGroupHeader?: (group: ITagPickerGroupDescriptor) => React.ReactNode;
  renderTag?: (option: ITagPickerOption<TData>) => React.ReactNode;
  renderSelectAllButton?: (context: ITagPickerActionRenderContext<TData>) => React.ReactNode;
  renderClearAllButton?: (context: ITagPickerActionRenderContext<TData>) => React.ReactNode;
  renderSecondaryAction?: (context: ITagPickerActionRenderContext<TData>) => React.ReactNode;
  renderExpandIcon?: (context: ITagPickerExpandIconRenderContext) => React.ReactNode;
  getPasteOption?: (value: string) => ITagPickerOption<TData>;
  onQueryChange?: (query: string) => void;
  className?: string;
  classNames?: ITagPickerClassNames;
  styles?: ITagPickerStyles;
  tagPickerProps?: Omit<TagPickerProps, 'children' | 'selectedOptions' | 'defaultSelectedOptions' | 'onOptionSelect' | 'disabled'>;
  controlProps?: TagPickerControlProps;
  inputProps?: Omit<TagPickerInputProps, 'value' | 'onChange' | 'disabled' | 'placeholder'>;
  selectedGroupProps?: TagPickerGroupProps;
  listProps?: TagPickerListProps;
  optionGroupProps?: Omit<TagPickerOptionGroupProps, 'children' | 'label'>;
  optionProps?: Omit<TagPickerOptionProps, 'value' | 'text' | 'children'>;
}
