import * as React from 'react';
import * as strings from 'ControlStrings';
import { Button, Checkbox, mergeClasses } from '@fluentui/react-components';
import {
  ArrowSortDown16Regular,
  ArrowSortUp16Regular,
  ChevronDown16Regular,
  Filter16Regular,
  ReOrderDotsVertical16Regular,
} from '@fluentui/react-icons';

import type {
  IColumn,
  IColumnReorderOptions,
  IDetailsHeaderProps,
  IDetailsListProps,
} from './DetailsList.types';
import {
  CheckboxVisibility,
  ColumnActionsMode,
  ColumnDragEndLocation,
  SelectionMode,
} from './DetailsList.types';
import { renderDetailsListContent } from './DetailsListContent';
import type { useDetailsListStyles } from './useDetailsListStyles';

const COLUMN_RESIZE_KEYBOARD_STEP = 10;

interface DetailsListHeaderProps<T> {
  columns: readonly IColumn<T>[];
  selectionMode: SelectionMode;
  checkboxVisibility: CheckboxVisibility;
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  onToggleSelectAll: (event: React.SyntheticEvent) => void;
  showSelectionColumn: boolean;
  ariaLabelForSelectionColumn: string;
  ariaLabelForSelectAllCheckbox: string;
  gridTemplateColumns: string;
  style: React.CSSProperties | undefined;
  classes: ReturnType<typeof useDetailsListStyles>;
  columnWidths: Readonly<Record<string, number>>;
  columnReorderOptions: IColumnReorderOptions<T> | undefined;
  draggedColumnIndexRef: React.MutableRefObject<number | undefined>;
  columnDropLocationRef: React.MutableRefObject<ColumnDragEndLocation>;
  isColumnDraggable: (columnIndex: number) => boolean;
  handleColumnDrop: (targetIndex: number) => void;
  resizeColumn: (column: IColumn<T>, columnIndex: number, width: number) => void;
  autoFitColumn: (column: IColumn<T>, columnIndex: number) => void;
  beginColumnResize: (
    event: React.PointerEvent<HTMLButtonElement>,
    column: IColumn<T>,
    columnIndex: number,
  ) => void;
  onColumnHeaderClick: IDetailsListProps<T>['onColumnHeaderClick'];
  onColumnHeaderContextMenu: IDetailsListProps<T>['onColumnHeaderContextMenu'];
  onRenderDetailsHeader: IDetailsListProps<T>['onRenderDetailsHeader'];
}

export const DetailsListHeader = <T,>({
  columns,
  selectionMode,
  checkboxVisibility,
  isAllSelected,
  isPartiallySelected,
  onToggleSelectAll,
  showSelectionColumn,
  ariaLabelForSelectionColumn,
  ariaLabelForSelectAllCheckbox,
  gridTemplateColumns,
  style,
  classes,
  columnWidths,
  columnReorderOptions,
  draggedColumnIndexRef,
  columnDropLocationRef,
  isColumnDraggable,
  handleColumnDrop,
  resizeColumn,
  autoFitColumn,
  beginColumnResize,
  onColumnHeaderClick,
  onColumnHeaderContextMenu,
  onRenderDetailsHeader,
}: DetailsListHeaderProps<T>): React.ReactElement => {
  const headerProps: IDetailsHeaderProps<T> = {
    columns,
    selectionMode,
    checkboxVisibility,
    isAllSelected,
    isPartiallySelected,
    onToggleSelectAll,
  };

  const defaultRender = (renderProps: IDetailsHeaderProps<T>): React.ReactElement => (
    <div
      role="row"
      className={classes.headerRow}
      style={{ gridTemplateColumns, ...style }}
    >
      {showSelectionColumn && (
        <div
          role="columnheader"
          aria-colindex={1}
          aria-label={ariaLabelForSelectionColumn}
          className={classes.selectionCell}
        >
          {renderProps.selectionMode === SelectionMode.multiple && (
            <Checkbox
              checked={renderProps.isPartiallySelected ? 'mixed' : renderProps.isAllSelected}
              aria-label={ariaLabelForSelectAllCheckbox}
              onChange={(event) => renderProps.onToggleSelectAll(event)}
            />
          )}
        </div>
      )}
      {renderProps.columns.map((column, columnIndex) => {
        const isActionable = column.columnActionsMode !== ColumnActionsMode.disabled;
        const isDraggable = isColumnDraggable(columnIndex);
        const ariaSort = column.isSorted
          ? column.isSortedDescending
            ? 'descending'
            : 'ascending'
          : 'none';
        const headerContent = column.onRenderHeader
          ? column.onRenderHeader(column)
          : column.name;

        return (
          <div
            key={column.key}
            role="columnheader"
            aria-colindex={columnIndex + (showSelectionColumn ? 2 : 1)}
            aria-sort={ariaSort}
            aria-label={column.ariaLabel ?? column.name}
            data-details-column-key={column.key}
            draggable={isDraggable}
            className={mergeClasses(classes.headerCell, column.headerClassName)}
            onContextMenu={(event) => {
              column.onColumnContextMenu?.(column, event);
              onColumnHeaderContextMenu?.(column, event);
            }}
            onDragStart={(event) => {
              draggedColumnIndexRef.current = columnIndex;
              columnDropLocationRef.current = ColumnDragEndLocation.outside;
              event.dataTransfer.effectAllowed = 'move';
              event.dataTransfer.setData('text/plain', column.key);
              columnReorderOptions?.onColumnDragStart?.(true);
            }}
            onDragOver={(event) => {
              if (draggedColumnIndexRef.current !== undefined && isColumnDraggable(columnIndex)) {
                event.preventDefault();
                event.dataTransfer.dropEffect = 'move';
              }
            }}
            onDrop={(event) => {
              event.preventDefault();
              handleColumnDrop(columnIndex);
            }}
            onDragEnd={() => {
              columnReorderOptions?.onColumnDragStart?.(false);
              columnReorderOptions?.onDragEnd?.(columnDropLocationRef.current);
              draggedColumnIndexRef.current = undefined;
              columnDropLocationRef.current = ColumnDragEndLocation.outside;
            }}
          >
            <Button
              appearance="subtle"
              size="small"
              disabled={!isActionable}
              className={classes.headerButton}
              title={column.name}
              onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                column.onColumnClick?.(event, column);
                onColumnHeaderClick?.(event, column);
              }}
              onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => column.onColumnKeyDown?.(event, column)}
            >
              {isDraggable && (
                <ReOrderDotsVertical16Regular aria-hidden className={classes.headerIcon} />
              )}
              {column.icon}
              {!column.isIconOnly && (
                renderDetailsListContent(headerContent, classes.headerLabel)
              )}
              {(column.isSorted || column.showSortIconWhenUnsorted) &&
                (column.isSortedDescending ? (
                  <ArrowSortDown16Regular
                    aria-label={column.sortDescendingAriaLabel}
                    className={classes.headerIcon}
                  />
                ) : (
                  <ArrowSortUp16Regular
                    aria-label={column.isSorted ? column.sortAscendingAriaLabel : column.sortableAriaLabel}
                    className={classes.headerIcon}
                  />
                ))}
              {column.isFiltered && (
                <Filter16Regular aria-label={column.filterAriaLabel} className={classes.headerIcon} />
              )}
              {column.columnActionsMode === ColumnActionsMode.hasDropdown && (
                <ChevronDown16Regular className={classes.headerIcon} />
              )}
            </Button>
            {column.isResizable && (
              <Button
                appearance="transparent"
                size="small"
                aria-label={strings.DetailsListResizeColumnAriaLabel.replace('{0}', column.name)}
                className={classes.resizeHandle}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => event.stopPropagation()}
                onDoubleClick={() => autoFitColumn(column, columnIndex)}
                onPointerDown={(event: React.PointerEvent<HTMLButtonElement>) => beginColumnResize(event, column, columnIndex)}
                onKeyDown={(event: React.KeyboardEvent<HTMLButtonElement>) => {
                  if (event.key === 'ArrowLeft') {
                    event.preventDefault();
                    resizeColumn(
                      column,
                      columnIndex,
                      columnWidths[column.key] - COLUMN_RESIZE_KEYBOARD_STEP,
                    );
                  } else if (event.key === 'ArrowRight') {
                    event.preventDefault();
                    resizeColumn(
                      column,
                      columnIndex,
                      columnWidths[column.key] + COLUMN_RESIZE_KEYBOARD_STEP,
                    );
                  } else if (event.key === 'Home') {
                    event.preventDefault();
                    resizeColumn(column, columnIndex, column.minWidth);
                  } else if (event.key === 'End' && column.maxWidth !== undefined) {
                    event.preventDefault();
                    resizeColumn(column, columnIndex, column.maxWidth);
                  }
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {onRenderDetailsHeader
        ? onRenderDetailsHeader(headerProps, defaultRender)
        : defaultRender(headerProps)}
    </>
  );
};
