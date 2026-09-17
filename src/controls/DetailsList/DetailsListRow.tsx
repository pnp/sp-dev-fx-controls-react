import * as React from 'react';
import * as strings from 'ControlStrings';
import { Checkbox, mergeClasses, Radio } from '@fluentui/react-components';

import type {
  DetailsListKey,
  IColumn,
  IDetailsListFieldProps,
  IDetailsListProps,
  IDetailsRowProps,
} from './DetailsList.types';
import { CheckboxVisibility, SelectionMode } from './DetailsList.types';
import type { IDetailsListItemEntry } from './DetailsList.utils';
import { renderDetailsListContent } from './DetailsListContent';
import type { useDetailsListStyles } from './useDetailsListStyles';

interface DetailsListCellProps<T> {
  item: T;
  itemIndex: number;
  column: IColumn<T>;
  isSelected: boolean;
  ariaColumnIndex: number;
  classes: ReturnType<typeof useDetailsListStyles>;
  style: React.CSSProperties | undefined;
  onRenderItemColumn: IDetailsListProps<T>['onRenderItemColumn'];
  onRenderField: IDetailsListProps<T>['onRenderField'];
}

interface DetailsListRowProps<T> {
  entry: IDetailsListItemEntry<T>;
  entryIndex: number;
  columns: readonly IColumn<T>[];
  selectedKeySet: ReadonlySet<DetailsListKey>;
  disabledKeySet: ReadonlySet<DetailsListKey>;
  compact: boolean;
  activeItemIndex: number;
  setActiveItemIndex: React.Dispatch<React.SetStateAction<number>>;
  dropTargetKey: DetailsListKey | undefined;
  setDropTargetKey: React.Dispatch<React.SetStateAction<DetailsListKey | undefined>>;
  draggedItemRef: React.MutableRefObject<{ item: T; index: number } | undefined>;
  effectiveRowHeight: number;
  entryTop: number;
  gridTemplateColumns: string;
  isHeaderVisible: boolean;
  shouldVirtualize: boolean;
  showSelectionColumn: boolean;
  selectionMode: SelectionMode;
  selectionControlName: string;
  checkboxVisibility: CheckboxVisibility;
  ariaLabelForSelectionColumn: string;
  isSelectedOnFocus: boolean;
  classes: ReturnType<typeof useDetailsListStyles>;
  rowStyle: React.CSSProperties | undefined;
  cellStyle: React.CSSProperties | undefined;
  selectItem: (
    item: T,
    itemIndex: number,
    event: React.SyntheticEvent,
    preserveExistingSelection: boolean,
  ) => void;
  handleRowKeyDown: (event: React.KeyboardEvent<HTMLDivElement>, item: T, itemIndex: number) => void;
  onActiveItemChanged: IDetailsListProps<T>['onActiveItemChanged'];
  onItemInvoked: IDetailsListProps<T>['onItemInvoked'];
  onItemContextMenu: IDetailsListProps<T>['onItemContextMenu'];
  dragDropEvents: IDetailsListProps<T>['dragDropEvents'];
  getRowAriaLabel: IDetailsListProps<T>['getRowAriaLabel'];
  getRowAriaDescribedBy: IDetailsListProps<T>['getRowAriaDescribedBy'];
  onRenderItemColumn: IDetailsListProps<T>['onRenderItemColumn'];
  onRenderField: IDetailsListProps<T>['onRenderField'];
  onRenderRow: IDetailsListProps<T>['onRenderRow'];
}

const isInteractiveTarget = (target: EventTarget | null): boolean =>
  target instanceof Element &&
  Boolean(
    target.closest(
      'a, button, input, select, textarea, [role="button"], [data-selection-disabled]',
    ),
  );

const DetailsListCell = <T,>({
  item,
  itemIndex,
  column,
  isSelected,
  ariaColumnIndex,
  classes,
  style,
  onRenderItemColumn,
  onRenderField,
}: DetailsListCellProps<T>): React.ReactElement => {
  const rawContent = column.onRender
    ? column.onRender(item, itemIndex, column)
    : onRenderItemColumn
      ? onRenderItemColumn(item, itemIndex, column)
      : column.fieldName
        ? String(item[column.fieldName] ?? '')
        : '';
  const fieldProps: IDetailsListFieldProps<T> = {
    item,
    itemIndex,
    isSelected,
    column,
    children: rawContent,
  };
  const defaultRender = (renderProps: IDetailsListFieldProps<T>): React.ReactElement => (
    <div
      role={renderProps.column.isRowHeader ? 'rowheader' : 'gridcell'}
      aria-colindex={ariaColumnIndex}
      data-details-column-key={renderProps.column.key}
      className={mergeClasses(
        classes.cell,
        renderProps.column.isPadded && classes.paddedCell,
        renderProps.column.isMultiline && classes.multilineCell,
        renderProps.column.isRowHeader && classes.rowHeaderCell,
        renderProps.column.className,
      )}
      style={style}
      title={
        typeof renderProps.children === 'string' || typeof renderProps.children === 'number'
          ? String(renderProps.children)
          : undefined
      }
    >
      {renderDetailsListContent(renderProps.children, classes.cellText)}
    </div>
  );

  return <>{onRenderField ? onRenderField(fieldProps, defaultRender) : defaultRender(fieldProps)}</>;
};

export const DetailsListRow = <T,>({
  entry,
  entryIndex,
  columns,
  selectedKeySet,
  disabledKeySet,
  compact,
  activeItemIndex,
  setActiveItemIndex,
  dropTargetKey,
  setDropTargetKey,
  draggedItemRef,
  effectiveRowHeight,
  entryTop,
  gridTemplateColumns,
  isHeaderVisible,
  shouldVirtualize,
  showSelectionColumn,
  selectionMode,
  selectionControlName,
  checkboxVisibility,
  ariaLabelForSelectionColumn,
  isSelectedOnFocus,
  classes,
  rowStyle,
  cellStyle,
  selectItem,
  handleRowKeyDown,
  onActiveItemChanged,
  onItemInvoked,
  onItemContextMenu,
  dragDropEvents,
  getRowAriaLabel,
  getRowAriaDescribedBy,
  onRenderItemColumn,
  onRenderField,
  onRenderRow,
}: DetailsListRowProps<T>): React.ReactElement => {
  const { item, itemIndex, key: itemKey } = entry;
  const isSelected = selectedKeySet.has(itemKey);
  const isDisabled = disabledKeySet.has(itemKey);
  const rowProps: IDetailsRowProps<T> = {
    item,
    itemIndex,
    itemKey,
    columns,
    isSelected,
    compact,
    disabled: isDisabled,
    onToggleSelection: (event) => selectItem(item, itemIndex, event, true),
    onInvoke: (event) => onItemInvoked?.(item, itemIndex, event),
  };

  const defaultRender = (renderProps: IDetailsRowProps<T>): React.ReactElement => (
    <div
      role="row"
      aria-rowindex={entryIndex + (isHeaderVisible ? 2 : 1)}
      aria-selected={selectionMode === SelectionMode.none ? undefined : renderProps.isSelected}
      aria-disabled={renderProps.disabled || undefined}
      aria-label={getRowAriaLabel?.(renderProps.item)}
      aria-describedby={getRowAriaDescribedBy?.(renderProps.item)}
      data-details-row-index={renderProps.itemIndex}
      tabIndex={activeItemIndex === renderProps.itemIndex ? 0 : -1}
      draggable={Boolean(
        dragDropEvents?.canDrag?.(renderProps.item, renderProps.itemIndex) ?? dragDropEvents,
      )}
      className={mergeClasses(
        classes.row,
        renderProps.isSelected && classes.selectedRow,
        renderProps.disabled && classes.disabledRow,
        dropTargetKey === renderProps.itemKey && classes.dropTargetRow,
      )}
      style={{
        gridTemplateColumns,
        minHeight: effectiveRowHeight,
        height: effectiveRowHeight,
        ...rowStyle,
        ...(shouldVirtualize
          ? {
              position: 'absolute',
              top: entryTop,
              right: 0,
              left: 0,
            }
          : {}),
      }}
      onClick={(event) => {
        if (!isInteractiveTarget(event.target)) {
          selectItem(renderProps.item, renderProps.itemIndex, event, false);
        }
      }}
      onDoubleClick={(event) => onItemInvoked?.(renderProps.item, renderProps.itemIndex, event)}
      onContextMenu={(event) => {
        if (onItemContextMenu?.(renderProps.item, renderProps.itemIndex, event) !== true) {
          event.preventDefault();
        }
      }}
      onFocus={(event) => {
        setActiveItemIndex(renderProps.itemIndex);
        onActiveItemChanged?.(renderProps.item, renderProps.itemIndex, event);
        if (isSelectedOnFocus && !renderProps.isSelected) {
          selectItem(renderProps.item, renderProps.itemIndex, event, false);
        }
      }}
      onKeyDown={(event) => handleRowKeyDown(event, renderProps.item, renderProps.itemIndex)}
      onDragStart={(event) => {
        draggedItemRef.current = { item: renderProps.item, index: renderProps.itemIndex };
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', String(renderProps.itemKey));
        dragDropEvents?.onDragStart?.(renderProps.item, renderProps.itemIndex, event);
      }}
      onDragEnter={(event) => {
        const draggedItem = draggedItemRef.current;
        if (
          draggedItem &&
          (dragDropEvents?.canDrop?.(
            draggedItem.item,
            renderProps.item,
            renderProps.itemIndex,
          ) ?? true)
        ) {
          setDropTargetKey(renderProps.itemKey);
          dragDropEvents?.onDragEnter?.(renderProps.item, renderProps.itemIndex, event);
        }
      }}
      onDragOver={(event) => {
        if (dropTargetKey === renderProps.itemKey) {
          event.preventDefault();
          event.dataTransfer.dropEffect = 'move';
        }
      }}
      onDragLeave={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setDropTargetKey(undefined);
          dragDropEvents?.onDragLeave?.(renderProps.item, renderProps.itemIndex, event);
        }
      }}
      onDrop={(event) => {
        event.preventDefault();
        const draggedItem = draggedItemRef.current;
        if (draggedItem) {
          dragDropEvents?.onDrop?.(
            draggedItem.item,
            renderProps.item,
            renderProps.itemIndex,
            event,
          );
        }
        setDropTargetKey(undefined);
      }}
      onDragEnd={(event) => {
        dragDropEvents?.onDragEnd?.(renderProps.item, renderProps.itemIndex, event);
        draggedItemRef.current = undefined;
        setDropTargetKey(undefined);
      }}
    >
      {showSelectionColumn && (
        <div
          role="gridcell"
          aria-colindex={1}
          aria-label={ariaLabelForSelectionColumn}
          className={mergeClasses(
            classes.selectionCell,
            checkboxVisibility === CheckboxVisibility.onHover &&
              !renderProps.isSelected &&
              classes.selectionCellOnHover,
          )}
        >
          {selectionMode === SelectionMode.single ? (
            <Radio
              name={selectionControlName}
              value={String(renderProps.itemKey)}
              checked={renderProps.isSelected}
              disabled={renderProps.disabled}
              aria-label={strings.DetailsListSelectRowAriaLabel.replace('{0}', String(renderProps.itemIndex + 1))}
              onChange={(event) => {
                event.stopPropagation();
                renderProps.onToggleSelection(event);
              }}
            />
          ) : (
            <Checkbox
              checked={renderProps.isSelected}
              disabled={renderProps.disabled}
              aria-label={strings.DetailsListSelectRowAriaLabel.replace('{0}', String(renderProps.itemIndex + 1))}
              onChange={(event) => {
                event.stopPropagation();
                renderProps.onToggleSelection(event);
              }}
            />
          )}
        </div>
      )}
      {renderProps.columns.map((column, columnIndex) => (
        <DetailsListCell
          key={column.key}
          item={renderProps.item}
          itemIndex={renderProps.itemIndex}
          column={column}
          isSelected={renderProps.isSelected}
          ariaColumnIndex={columnIndex + (showSelectionColumn ? 2 : 1)}
          classes={classes}
          style={cellStyle}
          onRenderItemColumn={onRenderItemColumn}
          onRenderField={onRenderField}
        />
      ))}
    </div>
  );

  return <>{onRenderRow ? onRenderRow(rowProps, defaultRender) : defaultRender(rowProps)}</>;
};
