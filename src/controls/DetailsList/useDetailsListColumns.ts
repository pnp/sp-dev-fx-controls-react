import * as React from 'react';

import type { IColumn, IColumnReorderOptions, IDetailsListProps } from './DetailsList.types';
import { ColumnDragEndLocation, DetailsListLayoutMode } from './DetailsList.types';
import { calculateColumnWidths, clampColumnWidth } from './DetailsList.utils';
import { DETAILS_LIST_SELECTION_COLUMN_WIDTH } from './useDetailsListStyles';

interface UseDetailsListColumnsOptions<T> {
  columns: readonly IColumn<T>[];
  viewportWidth: number;
  selectionColumnWidth: number;
  layoutMode: DetailsListLayoutMode;
  viewportRef: React.RefObject<HTMLDivElement>;
  onColumnResize: IDetailsListProps<T>['onColumnResize'];
  columnReorderOptions: IColumnReorderOptions<T> | undefined;
}

interface UseDetailsListColumnsResult<T> {
  orderedColumns: readonly IColumn<T>[];
  columnWidths: Readonly<Record<string, number>>;
  contentWidth: number;
  gridWidth: number;
  gridTemplateColumns: string;
  draggedColumnIndexRef: React.MutableRefObject<number | undefined>;
  columnDropLocationRef: React.MutableRefObject<ColumnDragEndLocation>;
  resizeColumn: (column: IColumn<T>, columnIndex: number, width: number) => void;
  beginColumnResize: (
    event: React.PointerEvent<HTMLButtonElement>,
    column: IColumn<T>,
    columnIndex: number,
  ) => void;
  autoFitColumn: (column: IColumn<T>, columnIndex: number) => void;
  isColumnDraggable: (columnIndex: number) => boolean;
  handleColumnDrop: (targetIndex: number) => void;
  moveColumn: (column: IColumn<T>, targetIndex: number) => void;
}

const areArraysEqual = (left: readonly string[], right: readonly string[]): boolean =>
  left.length === right.length && left.every((value, index) => value === right[index]);

export const useDetailsListColumns = <T>({
  columns,
  viewportWidth,
  selectionColumnWidth,
  layoutMode,
  viewportRef,
  onColumnResize,
  columnReorderOptions,
}: UseDetailsListColumnsOptions<T>): UseDetailsListColumnsResult<T> => {
  const resizeCleanupRef = React.useRef<(() => void) | undefined>();
  const draggedColumnIndexRef = React.useRef<number>();
  const columnDropLocationRef = React.useRef(ColumnDragEndLocation.outside);
  const [columnOrder, setColumnOrder] = React.useState<readonly string[]>(() =>
    columns.map((column) => column.key),
  );
  const [columnWidthOverrides, setColumnWidthOverrides] = React.useState<Record<string, number>>({});

  React.useEffect(() => {
    const nextOrder = columns.map((column) => column.key);
    setColumnOrder((currentOrder) => {
      const retainedKeys = currentOrder.filter((key) => nextOrder.includes(key));
      const addedKeys = nextOrder.filter((key) => !retainedKeys.includes(key));
      const mergedOrder = [...retainedKeys, ...addedKeys];
      return areArraysEqual(currentOrder, mergedOrder) ? currentOrder : mergedOrder;
    });
  }, [columns]);

  React.useEffect(() => () => resizeCleanupRef.current?.(), []);

  const orderedColumns = React.useMemo(() => {
    const columnByKey = new Map(columns.map((column) => [column.key, column]));
    return columnOrder
      .map((key) => columnByKey.get(key))
      .filter((column): column is IColumn<T> => Boolean(column));
  }, [columnOrder, columns]);

  const columnWidths = React.useMemo(
    () =>
      calculateColumnWidths(
        orderedColumns,
        columnWidthOverrides,
        Math.max(0, viewportWidth - selectionColumnWidth),
        layoutMode === DetailsListLayoutMode.justified,
      ),
    [columnWidthOverrides, layoutMode, orderedColumns, selectionColumnWidth, viewportWidth],
  );

  const contentWidth = React.useMemo(
    () =>
      selectionColumnWidth +
      orderedColumns.reduce((total, column) => total + columnWidths[column.key], 0),
    [columnWidths, orderedColumns, selectionColumnWidth],
  );
  const gridWidth = Math.max(contentWidth, viewportWidth);
  const gridTemplateColumns = [
    ...(selectionColumnWidth > 0 ? [`${DETAILS_LIST_SELECTION_COLUMN_WIDTH}px`] : []),
    ...orderedColumns.map((column) => `${columnWidths[column.key]}px`),
  ].join(' ');

  const resizeColumn = React.useCallback(
    (column: IColumn<T>, columnIndex: number, width: number): void => {
      const nextWidth = clampColumnWidth(column, width);
      setColumnWidthOverrides((currentWidths) => ({
        ...currentWidths,
        [column.key]: nextWidth,
      }));
      column.onColumnResize?.(nextWidth);
      onColumnResize?.(column, nextWidth, columnIndex);
    },
    [onColumnResize],
  );

  const beginColumnResize = React.useCallback(
    (event: React.PointerEvent<HTMLButtonElement>, column: IColumn<T>, columnIndex: number): void => {
      event.preventDefault();
      event.stopPropagation();
      resizeCleanupRef.current?.();
      const originX = event.clientX;
      const originWidth = columnWidths[column.key];

      const handlePointerMove = (pointerEvent: PointerEvent): void => {
        resizeColumn(column, columnIndex, originWidth + pointerEvent.clientX - originX);
      };
      const handlePointerUp = (): void => {
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        window.removeEventListener('pointercancel', handlePointerUp);
        resizeCleanupRef.current = undefined;
      };

      window.addEventListener('pointermove', handlePointerMove);
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointercancel', handlePointerUp);
      resizeCleanupRef.current = handlePointerUp;
    },
    [columnWidths, resizeColumn],
  );

  const autoFitColumn = React.useCallback(
    (column: IColumn<T>, columnIndex: number): void => {
      const cells = viewportRef.current?.querySelectorAll<HTMLElement>('[data-details-column-key]');
      let measuredWidth = column.minWidth;
      cells?.forEach((cell) => {
        if (cell.dataset.detailsColumnKey === column.key) {
          measuredWidth = Math.max(measuredWidth, cell.scrollWidth);
        }
      });
      resizeColumn(column, columnIndex, measuredWidth);
    },
    [resizeColumn, viewportRef],
  );

  const isColumnDraggable = React.useCallback(
    (columnIndex: number): boolean => {
      if (!columnReorderOptions) {
        return false;
      }
      const frozenFromStart = columnReorderOptions.frozenColumnCountFromStart ?? 0;
      const frozenFromEnd = columnReorderOptions.frozenColumnCountFromEnd ?? 0;
      return columnIndex >= frozenFromStart && columnIndex < orderedColumns.length - frozenFromEnd;
    },
    [columnReorderOptions, orderedColumns.length],
  );

  const handleColumnDrop = React.useCallback(
    (targetIndex: number): void => {
      const draggedIndex = draggedColumnIndexRef.current;
      if (draggedIndex === undefined || draggedIndex === targetIndex || !isColumnDraggable(targetIndex)) {
        return;
      }
      const draggedColumn = orderedColumns[draggedIndex];
      const targetColumn = orderedColumns[targetIndex];
      setColumnOrder((currentOrder) => {
        const nextOrder = [...currentOrder];
        const [draggedKey] = nextOrder.splice(draggedIndex, 1);
        nextOrder.splice(targetIndex, 0, draggedKey);
        return nextOrder;
      });
      columnDropLocationRef.current = ColumnDragEndLocation.header;
      columnReorderOptions?.onColumnDrop?.({
        draggedColumn,
        draggedIndex,
        targetColumn,
        targetIndex,
      });
    },
    [columnReorderOptions, isColumnDraggable, orderedColumns],
  );

  const moveColumn = React.useCallback(
    (column: IColumn<T>, targetIndex: number): void => {
      const currentIndex = orderedColumns.findIndex((candidate) => candidate.key === column.key);
      if (currentIndex < 0) {
        return;
      }
      const boundedTargetIndex = Math.max(0, Math.min(targetIndex, orderedColumns.length - 1));
      setColumnOrder((currentOrder) => {
        const nextOrder = [...currentOrder];
        const [columnKey] = nextOrder.splice(currentIndex, 1);
        nextOrder.splice(boundedTargetIndex, 0, columnKey);
        return nextOrder;
      });
    },
    [orderedColumns],
  );

  return {
    orderedColumns,
    columnWidths,
    contentWidth,
    gridWidth,
    gridTemplateColumns,
    draggedColumnIndexRef,
    columnDropLocationRef,
    resizeColumn,
    beginColumnResize,
    autoFitColumn,
    isColumnDraggable,
    handleColumnDrop,
    moveColumn,
  };
};
