import * as React from 'react';

import type {
  DetailsListKey,
  IDetailsListProps,
  IDetailsListSelectionChange,
} from './DetailsList.types';
import { SelectionMode } from './DetailsList.types';

interface UseDetailsListSelectionOptions<T> {
  items: readonly T[];
  getKey: IDetailsListProps<T>['getKey'];
  setKey: IDetailsListProps<T>['setKey'];
  selectionMode: SelectionMode;
  selectedKeys: IDetailsListProps<T>['selectedKeys'];
  defaultSelectedKeys: readonly DetailsListKey[];
  disabledItemKeys: IDetailsListProps<T>['disabledItemKeys'];
  onSelectionChanged: ((change: IDetailsListSelectionChange<T>) => void) | undefined;
}

interface UseDetailsListSelectionResult<T> {
  getItemKey: (item: T, index: number) => DetailsListKey;
  selectedKeySet: ReadonlySet<DetailsListKey>;
  disabledKeySet: ReadonlySet<DetailsListKey>;
  selectedItems: readonly T[];
  isAllSelected: boolean;
  isPartiallySelected: boolean;
  commitSelection: (nextKeys: Set<DetailsListKey>) => void;
  selectItem: (
    item: T,
    itemIndex: number,
    event: React.SyntheticEvent,
    preserveExistingSelection: boolean,
  ) => void;
  toggleSelectAll: (event: React.SyntheticEvent) => void;
}

const toKeySet = (
  keys: ReadonlySet<DetailsListKey> | readonly DetailsListKey[] | undefined,
): Set<DetailsListKey> => new Set(keys ?? []);

export const useDetailsListSelection = <T>({
  items,
  getKey,
  setKey,
  selectionMode,
  selectedKeys,
  defaultSelectedKeys,
  disabledItemKeys,
  onSelectionChanged,
}: UseDetailsListSelectionOptions<T>): UseDetailsListSelectionResult<T> => {
  const lastSelectedIndexRef = React.useRef<number>();
  const previousSetKeyRef = React.useRef(setKey);
  const [internalSelectedKeys, setInternalSelectedKeys] = React.useState<Set<DetailsListKey>>(() =>
    toKeySet(defaultSelectedKeys),
  );
  const isSelectionControlled = selectedKeys !== undefined;
  const selectedKeySet = React.useMemo(
    () => (isSelectionControlled ? toKeySet(selectedKeys) : internalSelectedKeys),
    [internalSelectedKeys, isSelectionControlled, selectedKeys],
  );
  const disabledKeySet = React.useMemo(() => toKeySet(disabledItemKeys), [disabledItemKeys]);

  const getItemKey = React.useCallback(
    (item: T, index: number): DetailsListKey => getKey?.(item, index) ?? index,
    [getKey],
  );

  React.useEffect(() => {
    if (previousSetKeyRef.current !== setKey) {
      previousSetKeyRef.current = setKey;
      if (!isSelectionControlled) {
        setInternalSelectedKeys(toKeySet(defaultSelectedKeys));
      }
    }
  }, [defaultSelectedKeys, isSelectionControlled, setKey]);

  const selectedItems = React.useMemo(
    () => items.filter((item, index) => selectedKeySet.has(getItemKey(item, index))),
    [getItemKey, items, selectedKeySet],
  );
  const enabledItemKeys = React.useMemo(
    () =>
      items
        .map((item, index) => getItemKey(item, index))
        .filter((itemKey) => !disabledKeySet.has(itemKey)),
    [disabledKeySet, getItemKey, items],
  );
  const isAllSelected =
    enabledItemKeys.length > 0 && enabledItemKeys.every((itemKey) => selectedKeySet.has(itemKey));
  const isPartiallySelected =
    !isAllSelected && enabledItemKeys.some((itemKey) => selectedKeySet.has(itemKey));

  const commitSelection = React.useCallback(
    (nextKeys: Set<DetailsListKey>): void => {
      if (!isSelectionControlled) {
        setInternalSelectedKeys(new Set(nextKeys));
      }
      const nextItems = items.filter((item, index) => nextKeys.has(getItemKey(item, index)));
      onSelectionChanged?.({ selectedItems: nextItems, selectedKeys: new Set(nextKeys) });
    },
    [getItemKey, isSelectionControlled, items, onSelectionChanged],
  );

  const selectItem = React.useCallback(
    (
      item: T,
      itemIndex: number,
      event: React.SyntheticEvent,
      preserveExistingSelection: boolean,
    ): void => {
      if (selectionMode === SelectionMode.none) {
        return;
      }

      const itemKey = getItemKey(item, itemIndex);
      if (disabledKeySet.has(itemKey)) {
        return;
      }

      const nextKeys = new Set(selectedKeySet);
      const nativeEvent = event.nativeEvent;
      const shiftKey = 'shiftKey' in nativeEvent && Boolean(nativeEvent.shiftKey);
      const modifierKey =
        ('metaKey' in nativeEvent && Boolean(nativeEvent.metaKey)) ||
        ('ctrlKey' in nativeEvent && Boolean(nativeEvent.ctrlKey));

      if (selectionMode === SelectionMode.single) {
        nextKeys.clear();
        if (!selectedKeySet.has(itemKey) || !preserveExistingSelection) {
          nextKeys.add(itemKey);
        }
      } else if (shiftKey && lastSelectedIndexRef.current !== undefined) {
        if (!modifierKey) {
          nextKeys.clear();
        }
        const rangeStart = Math.min(lastSelectedIndexRef.current, itemIndex);
        const rangeEnd = Math.max(lastSelectedIndexRef.current, itemIndex);
        for (let index = rangeStart; index <= rangeEnd; index += 1) {
          const rangeItem = items[index];
          if (rangeItem !== undefined) {
            const rangeKey = getItemKey(rangeItem, index);
            if (!disabledKeySet.has(rangeKey)) {
              nextKeys.add(rangeKey);
            }
          }
        }
      } else if (preserveExistingSelection || modifierKey) {
        if (nextKeys.has(itemKey)) {
          nextKeys.delete(itemKey);
        } else {
          nextKeys.add(itemKey);
        }
      } else {
        nextKeys.clear();
        nextKeys.add(itemKey);
      }

      lastSelectedIndexRef.current = itemIndex;
      commitSelection(nextKeys);
    },
    [commitSelection, disabledKeySet, getItemKey, items, selectedKeySet, selectionMode],
  );

  const toggleSelectAll = React.useCallback(
    (event: React.SyntheticEvent): void => {
      event.stopPropagation();
      if (selectionMode !== SelectionMode.multiple) {
        return;
      }
      const nextKeys = new Set(selectedKeySet);
      if (isAllSelected) {
        enabledItemKeys.forEach((itemKey) => nextKeys.delete(itemKey));
      } else {
        enabledItemKeys.forEach((itemKey) => nextKeys.add(itemKey));
      }
      commitSelection(nextKeys);
    },
    [commitSelection, enabledItemKeys, isAllSelected, selectedKeySet, selectionMode],
  );

  return {
    getItemKey,
    selectedKeySet,
    disabledKeySet,
    selectedItems,
    isAllSelected,
    isPartiallySelected,
    commitSelection,
    selectItem,
    toggleSelectAll,
  };
};
