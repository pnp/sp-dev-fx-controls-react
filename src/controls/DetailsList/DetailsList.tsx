import * as React from 'react';
import { IdPrefixProvider, Spinner, Text, mergeClasses } from '@fluentui/react-components';
import type {
  DetailsListKey,
  DetailsListScrollToMode,
  IDetailsList,
  IDetailsListProps,
} from './DetailsList.types';
import {
  CheckboxVisibility,
  DetailsListLayoutMode,
  SelectionMode,
} from './DetailsList.types';
import {
  buildDetailsListEntries,
  calculateEntryOffsets,
  findEntryIndexAtOffset,
} from './DetailsList.utils';
import {
  DETAILS_LIST_COMPACT_ROW_HEIGHT,
  DETAILS_LIST_DEFAULT_HEIGHT,
  DETAILS_LIST_DEFAULT_ROW_HEIGHT,
  DETAILS_LIST_SELECTION_COLUMN_WIDTH,
  useDetailsListStyles,
} from './useDetailsListStyles';
import { renderDetailsListContent } from './DetailsListContent';
import { DetailsListGroupHeader } from './DetailsListGroupHeader';
import { DetailsListHeader } from './DetailsListHeader';
import { DetailsListRow } from './DetailsListRow';
import { DetailsListShimmerRows } from './DetailsListShimmerRows';
import { useDetailsListColumns } from './useDetailsListColumns';
import { useDetailsListGroups } from './useDetailsListGroups';
import { useDetailsListSelection } from './useDetailsListSelection';
import { useDetailsListViewport } from './useDetailsListViewport';
import * as strings from 'ControlStrings';

const DEFAULT_GROUP_HEADER_HEIGHT = 36;
const DEFAULT_OVERSCAN_COUNT = 5;
const DEFAULT_INFINITE_SCROLL_THRESHOLD = 160;
const DEFAULT_SHIMMER_LINES = 10;

// SPFx 1.23 hosts React 17, which does not expose React.useId. Keep the
// generated id stable for the lifetime of the component without requiring a
// runtime shim or a second React dependency.
let nextDetailsListId = 0;

const useDetailsListId = (): string => {
  const idRef = React.useRef<string>();
  if (idRef.current === undefined) {
    nextDetailsListId += 1;
    idRef.current = `details-list-${nextDetailsListId}`;
  }
  return idRef.current;
};

function DetailsListInner<T>(
  props: IDetailsListProps<T>,
  forwardedRef: React.ForwardedRef<IDetailsList<T>>,
): React.ReactElement {
  const {
    items,
    columns,
    getKey,
    setKey,
    componentRef,
    className,
    styles: styleOverrides,
    height,
    compact = false,
    layoutMode = DetailsListLayoutMode.justified,
    isHeaderVisible = true,
    selectionMode = SelectionMode.multiple,
    checkboxVisibility = CheckboxVisibility.onHover,
    selectedKeys,
    defaultSelectedKeys = [],
    selectionPreservedOnEmptyClick = false,
    isSelectedOnFocus = false,
    disabledItemKeys,
    onSelectionChanged,
    onActiveItemChanged,
    onItemInvoked,
    onItemContextMenu,
    onColumnHeaderClick,
    onColumnHeaderContextMenu,
    onColumnResize,
    columnReorderOptions,
    dragDropEvents,
    onRenderItemColumn,
    onRenderField,
    onRenderRow,
    onRenderDetailsHeader,
    onRenderDetailsFooter,
    groups,
    onToggleGroup,
    onRenderGroupHeader,
    enableVirtualization,
    rowHeight,
    groupHeaderHeight = DEFAULT_GROUP_HEADER_HEIGHT,
    overscanCount = DEFAULT_OVERSCAN_COUNT,
    initialFocusedIndex = 0,
    onShouldVirtualize,
    enableInfiniteScroll = false,
    infiniteScrollThreshold = DEFAULT_INFINITE_SCROLL_THRESHOLD,
    onLoadMore,
    hasNextPage = false,
    isLoadingMore = false,
    isLoading = false,
    enableShimmer = false,
    shimmerLines = DEFAULT_SHIMMER_LINES,
    ariaLabelForShimmer,
    onRenderCustomPlaceholder,
    loadingMessage,
    loadingMoreMessage,
    emptyState,
    ariaLabelForGrid,
    ariaLabelForListHeader,
    ariaLabelForSelectAllCheckbox,
    ariaLabelForSelectionColumn,
    getRowAriaLabel,
    getRowAriaDescribedBy,
  } = props;

  const resolvedAriaLabelForGrid = ariaLabelForGrid ?? strings.DetailsListAriaLabel;
  const resolvedAriaLabelForListHeader = ariaLabelForListHeader ?? strings.DetailsListHeaderAriaLabel;
  const resolvedAriaLabelForSelectAllCheckbox = ariaLabelForSelectAllCheckbox ?? strings.DetailsListSelectAllRowsAriaLabel;
  const resolvedAriaLabelForSelectionColumn = ariaLabelForSelectionColumn ?? strings.DetailsListSelectionAriaLabel;

  const classes = useDetailsListStyles();
  const selectionControlName = useDetailsListId();
  const headerViewportRef = React.useRef<HTMLDivElement>(null);
  const draggedItemRef = React.useRef<{ item: T; index: number }>();
  const initialFocusAppliedRef = React.useRef(false);

  const [, forceRender] = React.useReducer((version: number) => version + 1, 0);
  const [activeItemIndex, setActiveItemIndex] = React.useState(initialFocusedIndex ?? 0);
  const [dropTargetKey, setDropTargetKey] = React.useState<DetailsListKey>();

  const {
    viewportRef,
    viewportWidth,
    viewportHeight,
    scrollTop,
    setScrollTop,
    isLoadingMoreInternally,
    handleScroll,
    handleScrollIntent,
  } = useDetailsListViewport<T>({
    itemCount: items.length,
    enableInfiniteScroll,
    infiniteScrollThreshold,
    onLoadMore,
    hasNextPage,
    isLoadingMore,
  });

  const effectiveRowHeight = rowHeight ?? (compact ? DETAILS_LIST_COMPACT_ROW_HEIGHT : DETAILS_LIST_DEFAULT_ROW_HEIGHT);
  const shouldVirtualize =
    onShouldVirtualize?.(items.length) ?? enableVirtualization ?? items.length > 100;
  const effectiveHeight =
    height ?? (shouldVirtualize || enableInfiniteScroll ? DETAILS_LIST_DEFAULT_HEIGHT : undefined);
  const showSelectionColumn =
    selectionMode !== SelectionMode.none && checkboxVisibility !== CheckboxVisibility.hidden;
  const selectionColumnWidth = showSelectionColumn ? DETAILS_LIST_SELECTION_COLUMN_WIDTH : 0;
  const {
    getItemKey,
    selectedKeySet,
    disabledKeySet,
    selectedItems,
    isAllSelected,
    isPartiallySelected,
    commitSelection,
    selectItem,
    toggleSelectAll,
  } = useDetailsListSelection({
    items,
    getKey,
    setKey,
    selectionMode,
    selectedKeys,
    defaultSelectedKeys,
    disabledItemKeys,
    onSelectionChanged,
  });

  const {
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
  } = useDetailsListColumns({
    columns,
    viewportWidth,
    selectionColumnWidth,
    layoutMode,
    viewportRef,
    onColumnResize,
    columnReorderOptions,
  });

  const { isGroupCollapsed, toggleGroup } = useDetailsListGroups({ onToggleGroup });

  const entries = React.useMemo(
    () =>
      buildDetailsListEntries(
        items,
        groups,
        effectiveRowHeight,
        groupHeaderHeight,
        getItemKey,
        isGroupCollapsed,
      ),
    [effectiveRowHeight, getItemKey, groupHeaderHeight, groups, isGroupCollapsed, items],
  );
  const entryOffsets = React.useMemo(() => calculateEntryOffsets(entries), [entries]);
  const totalBodyHeight = entryOffsets[entryOffsets.length - 1] ?? 0;
  const firstVisibleEntry = findEntryIndexAtOffset(entryOffsets, scrollTop);
  const lastVisibleEntry = findEntryIndexAtOffset(
    entryOffsets,
    scrollTop + Math.max(viewportHeight, effectiveRowHeight),
  );
  const renderStartIndex = shouldVirtualize
    ? Math.max(0, firstVisibleEntry - overscanCount)
    : 0;
  const renderEndIndex = shouldVirtualize
    ? Math.min(entries.length, lastVisibleEntry + overscanCount + 1)
    : entries.length;
  const renderedEntries = entries.slice(renderStartIndex, renderEndIndex);
  const visibleItemIndexes = React.useMemo(
    () => entries.filter((entry) => entry.type === 'item').map((entry) => entry.itemIndex),
    [entries],
  );

  const scrollToIndex = React.useCallback(
    (itemIndex: number, mode: DetailsListScrollToMode = 'auto'): void => {
      const viewport = viewportRef.current;
      const entryIndex = entries.findIndex(
        (entry) => entry.type === 'item' && entry.itemIndex === itemIndex,
      );
      if (!viewport || entryIndex < 0) {
        return;
      }

      const entryTop = entryOffsets[entryIndex];
      const entryBottom = entryOffsets[entryIndex + 1];
      const visibleTop = viewport.scrollTop;
      const visibleBottom = viewport.scrollTop + viewport.clientHeight;

      if (mode === 'top') {
        viewport.scrollTop = entryTop;
      } else if (mode === 'bottom') {
        viewport.scrollTop = entryBottom - viewport.clientHeight;
      } else if (mode === 'center') {
        viewport.scrollTop = entryTop - (viewport.clientHeight - effectiveRowHeight) / 2;
      } else if (entryTop < visibleTop) {
        viewport.scrollTop = entryTop;
      } else if (entryBottom > visibleBottom) {
        viewport.scrollTop = entryBottom - viewport.clientHeight;
      }
      setScrollTop(viewport.scrollTop);
    },
    [effectiveRowHeight, entries, entryOffsets],
  );

  const focusIndex = React.useCallback(
    (itemIndex: number, mode: DetailsListScrollToMode = 'auto'): void => {
      setActiveItemIndex(itemIndex);
      scrollToIndex(itemIndex, mode);
      window.requestAnimationFrame(() => {
        viewportRef.current
          ?.querySelector<HTMLElement>(`[data-details-row-index="${itemIndex}"]`)
          ?.focus();
      });
    },
    [scrollToIndex],
  );

  React.useEffect(() => {
    if (
      initialFocusedIndex !== undefined &&
      !initialFocusAppliedRef.current &&
      items[initialFocusedIndex] !== undefined
    ) {
      initialFocusAppliedRef.current = true;
      focusIndex(initialFocusedIndex);
    }
  }, [focusIndex, initialFocusedIndex, items]);

  const imperativeHandle = React.useMemo<IDetailsList<T>>(
    () => ({
      forceUpdate: forceRender,
      focusIndex,
      scrollToIndex,
      getStartItemIndexInView: () => {
        for (let entryIndex = firstVisibleEntry; entryIndex < entries.length; entryIndex += 1) {
          const entry = entries[entryIndex];
          if (entry.type === 'item') {
            return entry.itemIndex;
          }
        }
        return 0;
      },
      updateColumn: (column, options) => {
        const currentIndex = orderedColumns.findIndex((candidate) => candidate.key === column.key);
        if (options.width !== undefined && currentIndex >= 0) {
          resizeColumn(column, currentIndex, options.width);
        }
        if (options.newColumnIndex !== undefined && currentIndex >= 0) {
          moveColumn(column, options.newColumnIndex);
        }
      },
      getSelectedItems: () => selectedItems,
      setSelectedKeys: (keys) => commitSelection(new Set(keys)),
    }),
    [
      commitSelection,
      entries,
      firstVisibleEntry,
      focusIndex,
      orderedColumns,
      moveColumn,
      resizeColumn,
      scrollToIndex,
      selectedItems,
    ],
  );

  React.useImperativeHandle(forwardedRef, () => imperativeHandle, [imperativeHandle]);
  React.useImperativeHandle(componentRef, () => imperativeHandle, [imperativeHandle]);

  const focusAdjacentItem = React.useCallback(
    (itemIndex: number, offset: number): void => {
      const visibleIndex = visibleItemIndexes.indexOf(itemIndex);
      const targetVisibleIndex = Math.max(
        0,
        Math.min(visibleItemIndexes.length - 1, visibleIndex + offset),
      );
      const targetItemIndex = visibleItemIndexes[targetVisibleIndex];
      if (targetItemIndex !== undefined) {
        focusIndex(targetItemIndex);
      }
    },
    [focusIndex, visibleItemIndexes],
  );

  const handleRowKeyDown = React.useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>, item: T, itemIndex: number): void => {
      const pageSize = Math.max(1, Math.floor(viewportHeight / effectiveRowHeight));
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        focusAdjacentItem(itemIndex, 1);
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        focusAdjacentItem(itemIndex, -1);
      } else if (event.key === 'PageDown') {
        event.preventDefault();
        focusAdjacentItem(itemIndex, pageSize);
      } else if (event.key === 'PageUp') {
        event.preventDefault();
        focusAdjacentItem(itemIndex, -pageSize);
      } else if (event.key === 'Home') {
        event.preventDefault();
        const firstIndex = visibleItemIndexes[0];
        if (firstIndex !== undefined) {
          focusIndex(firstIndex, 'top');
        }
      } else if (event.key === 'End') {
        event.preventDefault();
        const lastIndex = visibleItemIndexes[visibleItemIndexes.length - 1];
        if (lastIndex !== undefined) {
          focusIndex(lastIndex, 'bottom');
        }
      } else if (event.key === ' ') {
        event.preventDefault();
        selectItem(item, itemIndex, event, true);
      } else if (event.key === 'Enter') {
        event.preventDefault();
        onItemInvoked?.(item, itemIndex, event);
      }
    },
    [
      effectiveRowHeight,
      focusAdjacentItem,
      focusIndex,
      onItemInvoked,
      selectItem,
      viewportHeight,
      visibleItemIndexes,
    ],
  );

  const showLoadingMore = isLoadingMore || isLoadingMoreInternally;

  return (

    <div
      className={mergeClasses(classes.root, className)}
      style={styleOverrides?.root}
    >
      <div
        role="grid"
        aria-label={enableShimmer && ariaLabelForShimmer ? ariaLabelForShimmer : resolvedAriaLabelForGrid}
        aria-busy={enableShimmer || isLoading || showLoadingMore || undefined}
        aria-rowcount={(enableShimmer ? shimmerLines : entries.length) + (isHeaderVisible ? 1 : 0)}
        aria-colcount={orderedColumns.length + (showSelectionColumn ? 1 : 0)}
        className={classes.grid}
        style={{
          height: effectiveHeight,
          maxHeight: effectiveHeight,
          ...styleOverrides?.grid,
        }}
      >
        {isHeaderVisible && (
          <div ref={headerViewportRef} className={classes.headerViewport}>
            <div
              role="rowgroup"
              aria-label={resolvedAriaLabelForListHeader}
              className={classes.headerWrapper}
              style={{ width: gridWidth, minWidth: contentWidth }}
            >
              <DetailsListHeader
                columns={orderedColumns}
                selectionMode={selectionMode}
                checkboxVisibility={checkboxVisibility}
                isAllSelected={isAllSelected}
                isPartiallySelected={isPartiallySelected}
                onToggleSelectAll={toggleSelectAll}
                showSelectionColumn={showSelectionColumn}
                ariaLabelForSelectionColumn={resolvedAriaLabelForSelectionColumn}
                ariaLabelForSelectAllCheckbox={resolvedAriaLabelForSelectAllCheckbox}
                gridTemplateColumns={gridTemplateColumns}
                style={styleOverrides?.header}
                classes={classes}
                columnWidths={columnWidths}
                columnReorderOptions={columnReorderOptions}
                draggedColumnIndexRef={draggedColumnIndexRef}
                columnDropLocationRef={columnDropLocationRef}
                isColumnDraggable={isColumnDraggable}
                handleColumnDrop={handleColumnDrop}
                resizeColumn={resizeColumn}
                autoFitColumn={autoFitColumn}
                beginColumnResize={beginColumnResize}
                onColumnHeaderClick={onColumnHeaderClick}
                onColumnHeaderContextMenu={onColumnHeaderContextMenu}
                onRenderDetailsHeader={onRenderDetailsHeader}
              />
            </div>
          </div>
        )}
        <div
          ref={viewportRef}
          className={classes.viewport}
          style={styleOverrides?.viewport}
          onScroll={(event) => {
            handleScroll(event);
            if (headerViewportRef.current) {
              headerViewportRef.current.scrollLeft = event.currentTarget.scrollLeft;
            }
          }}
          onWheel={(event) => {
            if (event.deltaY > 0) {
              handleScrollIntent(event.currentTarget);
            }
          }}
          onTouchMove={(event) => handleScrollIntent(event.currentTarget)}
        >
          <div
            style={{ width: gridWidth, minWidth: contentWidth }}
            onClick={(event) => {
              if (
                !selectionPreservedOnEmptyClick &&
                event.target === event.currentTarget &&
                selectionMode !== SelectionMode.none
              ) {
                commitSelection(new Set());
              }
            }}
          >
            <div
              role="rowgroup"
              className={classes.body}
              style={{
                height:
                  shouldVirtualize && entries.length > 0 && !isLoading && !enableShimmer
                    ? totalBodyHeight
                    : undefined,
              }}
            >
              {enableShimmer ? (
                <DetailsListShimmerRows
                  columns={orderedColumns}
                  rowCount={Math.max(0, shimmerLines)}
                  rowHeight={effectiveRowHeight}
                  compact={compact}
                  selectionMode={selectionMode}
                  checkboxVisibility={checkboxVisibility}
                  showSelectionColumn={showSelectionColumn}
                  gridTemplateColumns={gridTemplateColumns}
                  classes={classes}
                  onRenderCustomPlaceholder={onRenderCustomPlaceholder}
                />
              ) : isLoading && items.length === 0 ? (
                  <div className={classes.stateContainer}>
                    <Spinner size="small" />
                    {loadingMessage !== undefined ? (
                      renderDetailsListContent(loadingMessage)
                    ) : (
                      <Text style={{ color: 'inherit' }}>{strings.DetailsListLoading}</Text>
                    )}
                  </div>
                ) : entries.length === 0 ? (
                <div className={classes.stateContainer}>
                  {emptyState !== undefined ? (
                    renderDetailsListContent(emptyState)
                  ) : (
                    <Text style={{ color: 'inherit' }}>{strings.DetailsListNoItems}</Text>
                  )}
                </div>
              ) : (
                renderedEntries.map((entry, renderedIndex) => {
                  const entryIndex = renderStartIndex + renderedIndex;
                  return (
                    <React.Fragment key={entry.type === 'group' ? `group:${entry.key}` : `item:${entry.key}`}>
                      {entry.type === 'group'
                        ? (
                            <DetailsListGroupHeader
                              entry={entry}
                              entryIndex={entryIndex}
                              isCollapsed={isGroupCollapsed(entry.group)}
                              onToggle={() => toggleGroup(entry.group)}
                              isHeaderVisible={isHeaderVisible}
                              shouldVirtualize={shouldVirtualize}
                              entryTop={entryOffsets[entryIndex]}
                              groupHeaderHeight={groupHeaderHeight}
                              gridTemplateColumns={gridTemplateColumns}
                              classes={classes}
                              style={styleOverrides?.groupHeader}
                              onRenderGroupHeader={onRenderGroupHeader}
                            />
                          )
                        : (
                            <DetailsListRow
                              entry={entry}
                              entryIndex={entryIndex}
                              columns={orderedColumns}
                              selectedKeySet={selectedKeySet}
                              disabledKeySet={disabledKeySet}
                              compact={compact}
                              activeItemIndex={activeItemIndex}
                              setActiveItemIndex={setActiveItemIndex}
                              dropTargetKey={dropTargetKey}
                              setDropTargetKey={setDropTargetKey}
                              draggedItemRef={draggedItemRef}
                              effectiveRowHeight={effectiveRowHeight}
                              entryTop={entryOffsets[entryIndex]}
                              gridTemplateColumns={gridTemplateColumns}
                              isHeaderVisible={isHeaderVisible}
                              shouldVirtualize={shouldVirtualize}
                              showSelectionColumn={showSelectionColumn}
                              selectionMode={selectionMode}
                              selectionControlName={selectionControlName}
                              checkboxVisibility={checkboxVisibility}
                              ariaLabelForSelectionColumn={resolvedAriaLabelForSelectionColumn}
                              isSelectedOnFocus={isSelectedOnFocus}
                              classes={classes}
                              rowStyle={styleOverrides?.row}
                              cellStyle={styleOverrides?.cell}
                              selectItem={selectItem}
                              handleRowKeyDown={handleRowKeyDown}
                              onActiveItemChanged={onActiveItemChanged}
                              onItemInvoked={onItemInvoked}
                              onItemContextMenu={onItemContextMenu}
                              dragDropEvents={dragDropEvents}
                              getRowAriaLabel={getRowAriaLabel}
                              getRowAriaDescribedBy={getRowAriaDescribedBy}
                              onRenderItemColumn={onRenderItemColumn}
                              onRenderField={onRenderField}
                              onRenderRow={onRenderRow}
                            />
                          )}
                    </React.Fragment>
                  );
                })
              )}
            </div>
            {showLoadingMore && !enableShimmer && (
              <div className={classes.loadingMore}>
                <Spinner size="tiny" />
                {loadingMoreMessage !== undefined ? (
                  renderDetailsListContent(loadingMoreMessage)
                ) : (
                  <Text style={{ color: 'inherit' }}>{strings.DetailsListLoadingMore}</Text>
                )}
              </div>
            )}
            {onRenderDetailsFooter ? renderDetailsListContent(onRenderDetailsFooter(items)) : null}
          </div>
        </div>
      </div>
    </div>

  );
}

export const DetailsList = React.forwardRef(DetailsListInner) as <T>(
  props: IDetailsListProps<T> & React.RefAttributes<IDetailsList<T>>,
) => React.ReactElement;

(DetailsList as React.FC).displayName = 'DetailsList';
