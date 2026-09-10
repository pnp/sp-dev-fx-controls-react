import type {
  DetailsListKey,
  IColumn,
  IDetailsListGroup,
} from './DetailsList.types';

export interface IDetailsListItemEntry<T> {
  type: 'item';
  key: DetailsListKey;
  item: T;
  itemIndex: number;
  height: number;
}

export interface IDetailsListGroupEntry<T> {
  type: 'group';
  key: string;
  group: IDetailsListGroup<T>;
  height: number;
}

export type DetailsListEntry<T> =
  | IDetailsListItemEntry<T>
  | IDetailsListGroupEntry<T>;

export const clampColumnWidth = <T>(
  column: IColumn<T>,
  width: number,
): number =>
  Math.max(
    column.minWidth,
    Math.min(width, column.maxWidth ?? Number.POSITIVE_INFINITY),
  );

export const calculateColumnWidths = <T>(
  columns: readonly IColumn<T>[],
  widthOverrides: Readonly<Record<string, number>>,
  availableWidth: number,
  justifyColumns: boolean,
): Readonly<Record<string, number>> => {
  const widths = columns.map((column) =>
    clampColumnWidth(
      column,
      widthOverrides[column.key] ?? column.currentWidth ?? column.minWidth,
    ),
  );

  let remainingWidth = justifyColumns
    ? Math.max(
        0,
        availableWidth - widths.reduce((total, width) => total + width, 0),
      )
    : 0;
  let activeIndexes = columns
    .map((column, index) => ({ column, index }))
    .filter(
      ({ column, index }) =>
        !Object.prototype.hasOwnProperty.call(widthOverrides, column.key) &&
        widths[index] < (column.maxWidth ?? Number.POSITIVE_INFINITY),
    )
    .map(({ index }) => index);

  while (remainingWidth > 0.5 && activeIndexes.length > 0) {
    const totalWeight = activeIndexes.reduce(
      (total, index) =>
        total +
        (columns[index].flexGrow ?? columns[index].targetWidthProportion ?? 1),
      0,
    );
    let distributedWidth = 0;

    activeIndexes.forEach((index) => {
      const column = columns[index];
      const weight = column.flexGrow ?? column.targetWidthProportion ?? 1;
      const share = remainingWidth * (weight / totalWeight);
      const nextWidth = clampColumnWidth(column, widths[index] + share);
      distributedWidth += nextWidth - widths[index];
      widths[index] = nextWidth;
    });

    if (distributedWidth <= 0.5) {
      break;
    }

    remainingWidth -= distributedWidth;
    activeIndexes = activeIndexes.filter(
      (index) =>
        widths[index] < (columns[index].maxWidth ?? Number.POSITIVE_INFINITY),
    );
  }

  return Object.fromEntries(
    columns.map((column, index) => [column.key, widths[index]]),
  );
};

export const buildDetailsListEntries = <T>(
  items: readonly T[],
  groups: readonly IDetailsListGroup<T>[] | undefined,
  rowHeight: number,
  groupHeaderHeight: number,
  getKey: (item: T, index: number) => DetailsListKey,
  isGroupCollapsed: (group: IDetailsListGroup<T>) => boolean,
): readonly DetailsListEntry<T>[] => {
  if (!groups?.length) {
    return items.map((item, itemIndex) => ({
      type: 'item',
      key: getKey(item, itemIndex),
      item,
      itemIndex,
      height: rowHeight,
    }));
  }

  const entries: DetailsListEntry<T>[] = [];

  const appendGroup = (group: IDetailsListGroup<T>): void => {
    entries.push({
      type: 'group',
      key: group.key,
      group,
      height: groupHeaderHeight,
    });

    if (isGroupCollapsed(group)) {
      return;
    }

    if (group.children?.length) {
      group.children.forEach(appendGroup);
      return;
    }

    const lastIndex = Math.min(items.length, group.startIndex + group.count);
    for (
      let itemIndex = group.startIndex;
      itemIndex < lastIndex;
      itemIndex += 1
    ) {
      const item = items[itemIndex];
      entries.push({
        type: 'item',
        key: getKey(item, itemIndex),
        item,
        itemIndex,
        height: rowHeight,
      });
    }
  };

  groups.forEach(appendGroup);
  return entries;
};

export const calculateEntryOffsets = <T>(
  entries: readonly DetailsListEntry<T>[],
): readonly number[] => {
  const offsets: number[] = [0];
  entries.forEach((entry) =>
    offsets.push(offsets[offsets.length - 1] + entry.height),
  );
  return offsets;
};

export const findEntryIndexAtOffset = (
  offsets: readonly number[],
  offset: number,
): number => {
  if (offsets.length <= 1) {
    return 0;
  }

  let low = 0;
  let high = offsets.length - 2;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    if (offsets[middle] <= offset && offset < offsets[middle + 1]) {
      return middle;
    }
    if (offset < offsets[middle]) {
      high = middle - 1;
    } else {
      low = middle + 1;
    }
  }

  return Math.max(0, Math.min(low, offsets.length - 2));
};
