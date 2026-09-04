import type * as React from 'react';

export type DetailsListKey = React.Key;

export enum SelectionMode {
  none = 0,
  single = 1,
  multiple = 2,
}

/** Public alias that avoids ambiguity with the legacy Fluent UI 8 ListView export. */
export { SelectionMode as DetailsListSelectionMode };

export enum CheckboxVisibility {
  onHover = 0,
  always = 1,
  hidden = 2,
}

export enum DetailsListLayoutMode {
  fixedColumns = 0,
  justified = 1,
}

export enum ConstrainMode {
  unconstrained = 0,
  horizontalConstrained = 1,
}

export enum ColumnActionsMode {
  disabled = 0,
  clickable = 1,
  hasDropdown = 2,
}

export enum ColumnDragEndLocation {
  outside = 0,
  surface = 1,
  header = 2,
}

export type DetailsListScrollToMode = 'auto' | 'top' | 'bottom' | 'center';

export interface IDetailsListColumnDragDropDetails<T> {
  draggedColumn: IColumn<T>;
  draggedIndex: number;
  targetColumn: IColumn<T>;
  targetIndex: number;
}

export interface IColumnReorderOptions<T> {
  frozenColumnCountFromStart?: number;
  frozenColumnCountFromEnd?: number;
  onColumnDragStart?: (dragStarted: boolean) => void;
  onColumnDrop?: (details: IDetailsListColumnDragDropDetails<T>) => void;
  onDragEnd?: (location: ColumnDragEndLocation) => void;
}

export interface IColumn<T> {
  key: string;
  name: string;
  fieldName?: keyof T & string;
  minWidth: number;
  maxWidth?: number;
  currentWidth?: number;
  flexGrow?: number;
  targetWidthProportion?: number;
  ariaLabel?: string;
  className?: string;
  headerClassName?: string;
  isRowHeader?: boolean;
  isResizable?: boolean;
  isMultiline?: boolean;
  isPadded?: boolean;
  isSorted?: boolean;
  isSortedDescending?: boolean;
  isFiltered?: boolean;
  isGrouped?: boolean;
  isIconOnly?: boolean;
  isCollapsible?: boolean;
  showSortIconWhenUnsorted?: boolean;
  columnActionsMode?: ColumnActionsMode;
  icon?: React.ReactNode;
  data?: unknown;
  sortAscendingAriaLabel?: string;
  sortDescendingAriaLabel?: string;
  sortableAriaLabel?: string;
  filterAriaLabel?: string;
  groupAriaLabel?: string;
  onRender?: (item: T, index: number, column: IColumn<T>) => React.ReactNode;
  onRenderHeader?: (column: IColumn<T>) => React.ReactNode;
  onColumnClick?: (event: React.MouseEvent<HTMLElement>, column: IColumn<T>) => void;
  onColumnContextMenu?: (column: IColumn<T>, event: React.MouseEvent<HTMLElement>) => void;
  onColumnKeyDown?: (event: React.KeyboardEvent<HTMLElement>, column: IColumn<T>) => void;
  onColumnResize?: (width: number) => void;
}

export interface IDetailsListSelectionChange<T> {
  selectedItems: readonly T[];
  selectedKeys: ReadonlySet<DetailsListKey>;
}

export interface IDetailsListFieldProps<T> {
  item: T;
  itemIndex: number;
  isSelected: boolean;
  column: IColumn<T>;
  children: React.ReactNode;
}

export interface IDetailsRowProps<T> {
  item: T;
  itemIndex: number;
  itemKey: DetailsListKey;
  columns: readonly IColumn<T>[];
  isSelected: boolean;
  compact: boolean;
  disabled: boolean;
  onToggleSelection: (event: React.SyntheticEvent) => void;
  onInvoke: (event: React.SyntheticEvent) => void;
}

export interface IDetailsHeaderProps<T> {
  columns: readonly IColumn<T>[];
  selectionMode: SelectionMode;
  checkboxVisibility: CheckboxVisibility;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  onToggleSelectAll: (event: React.SyntheticEvent) => void;
}

export interface IDetailsListGroup<T> {
  key: string;
  name: string;
  startIndex: number;
  count: number;
  level?: number;
  isCollapsed?: boolean;
  children?: readonly IDetailsListGroup<T>[];
  data?: unknown;
}

export interface IDetailsGroupHeaderProps<T> {
  group: IDetailsListGroup<T>;
  isCollapsed: boolean;
  onToggle: () => void;
}

export interface IDetailsListShimmerRowProps<T> {
  columns: readonly IColumn<T>[];
  rowIndex: number;
  compact: boolean;
  selectionMode: SelectionMode;
  checkboxVisibility: CheckboxVisibility;
}

export interface IDetailsListRowDragDropEvents<T> {
  canDrag?: (item: T, index: number) => boolean;
  canDrop?: (draggedItem: T, targetItem: T, targetIndex: number) => boolean;
  onDragStart?: (item: T, index: number, event: React.DragEvent<HTMLElement>) => void;
  onDragEnter?: (item: T, index: number, event: React.DragEvent<HTMLElement>) => void;
  onDragLeave?: (item: T, index: number, event: React.DragEvent<HTMLElement>) => void;
  onDrop?: (
    draggedItem: T,
    targetItem: T,
    targetIndex: number,
    event: React.DragEvent<HTMLElement>,
  ) => void;
  onDragEnd?: (item: T, index: number, event: React.DragEvent<HTMLElement>) => void;
}

export interface IDetailsListStyles {
  root?: React.CSSProperties;
  viewport?: React.CSSProperties;
  grid?: React.CSSProperties;
  header?: React.CSSProperties;
  row?: React.CSSProperties;
  cell?: React.CSSProperties;
  groupHeader?: React.CSSProperties;
}

export interface IDetailsListProps<T> {
  items: readonly T[];
  columns: readonly IColumn<T>[];
  getKey?: (item: T, index: number) => DetailsListKey;
  setKey?: string;
  componentRef?: React.Ref<IDetailsList<T>>;
  className?: string;
  styles?: IDetailsListStyles;
  height?: number;
  compact?: boolean;
  layoutMode?: DetailsListLayoutMode;
  constrainMode?: ConstrainMode;
  isHeaderVisible?: boolean;
  selectionMode?: SelectionMode;
  checkboxVisibility?: CheckboxVisibility;
  selectedKeys?: ReadonlySet<DetailsListKey> | readonly DetailsListKey[];
  defaultSelectedKeys?: readonly DetailsListKey[];
  selectionPreservedOnEmptyClick?: boolean;
  isSelectedOnFocus?: boolean;
  disabledItemKeys?: ReadonlySet<DetailsListKey> | readonly DetailsListKey[];
  onSelectionChanged?: (change: IDetailsListSelectionChange<T>) => void;
  onActiveItemChanged?: (item: T, index: number, event: React.FocusEvent<HTMLElement>) => void;
  onItemInvoked?: (item: T, index: number, event: React.SyntheticEvent) => void;
  onItemContextMenu?: (item: T, index: number, event: React.MouseEvent<HTMLElement>) => void | boolean;
  onColumnHeaderClick?: (event: React.MouseEvent<HTMLElement>, column: IColumn<T>) => void;
  onColumnHeaderContextMenu?: (column: IColumn<T>, event: React.MouseEvent<HTMLElement>) => void;
  onColumnResize?: (column: IColumn<T>, width: number, columnIndex: number) => void;
  columnReorderOptions?: IColumnReorderOptions<T>;
  dragDropEvents?: IDetailsListRowDragDropEvents<T>;
  onRenderItemColumn?: (item: T, index: number, column: IColumn<T>) => React.ReactNode;
  onRenderField?: (
    props: IDetailsListFieldProps<T>,
    defaultRender: (props: IDetailsListFieldProps<T>) => React.ReactElement,
  ) => React.ReactNode;
  onRenderRow?: (
    props: IDetailsRowProps<T>,
    defaultRender: (props: IDetailsRowProps<T>) => React.ReactElement,
  ) => React.ReactNode;
  onRenderDetailsHeader?: (
    props: IDetailsHeaderProps<T>,
    defaultRender: (props: IDetailsHeaderProps<T>) => React.ReactElement,
  ) => React.ReactNode;
  onRenderDetailsFooter?: (items: readonly T[]) => React.ReactNode;
  groups?: readonly IDetailsListGroup<T>[];
  onToggleGroup?: (group: IDetailsListGroup<T>, isCollapsed: boolean) => void;
  onRenderGroupHeader?: (
    props: IDetailsGroupHeaderProps<T>,
    defaultRender: (props: IDetailsGroupHeaderProps<T>) => React.ReactElement,
  ) => React.ReactNode;
  enableVirtualization?: boolean;
  rowHeight?: number;
  groupHeaderHeight?: number;
  overscanCount?: number;
  initialFocusedIndex?: number;
  onShouldVirtualize?: (itemCount: number) => boolean;
  enableInfiniteScroll?: boolean;
  infiniteScrollThreshold?: number;
  onLoadMore?: () => void | Promise<void>;
  hasNextPage?: boolean;
  isLoadingMore?: boolean;
  isLoading?: boolean;
  enableShimmer?: boolean;
  shimmerLines?: number;
  ariaLabelForShimmer?: string;
  onRenderCustomPlaceholder?: (
    rowProps: IDetailsListShimmerRowProps<T>,
    index?: number,
    defaultRender?: (props: IDetailsListShimmerRowProps<T>) => React.ReactNode,
  ) => React.ReactNode;
  loadingMessage?: React.ReactNode;
  loadingMoreMessage?: React.ReactNode;
  emptyState?: React.ReactNode;
  ariaLabelForGrid?: string;
  ariaLabelForListHeader?: string;
  ariaLabelForSelectAllCheckbox?: string;
  ariaLabelForSelectionColumn?: string;
  getRowAriaLabel?: (item: T) => string;
  getRowAriaDescribedBy?: (item: T) => string | undefined;
}

export interface IDetailsList<T> {
  forceUpdate: () => void;
  focusIndex: (index: number, scrollToMode?: DetailsListScrollToMode) => void;
  scrollToIndex: (index: number, scrollToMode?: DetailsListScrollToMode) => void;
  getStartItemIndexInView: () => number;
  updateColumn: (column: IColumn<T>, options: { width?: number; newColumnIndex?: number }) => void;
  getSelectedItems: () => readonly T[];
  setSelectedKeys: (keys: readonly DetailsListKey[]) => void;
}
