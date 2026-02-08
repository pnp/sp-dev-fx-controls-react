import { FlatItem } from './FlatItem';
import { IToolbarItem } from './IToolbarItem';

/* ------------------------------------------------------------------ */
/*  groupItems — groups items by their `group` property               */
/* ------------------------------------------------------------------ */

export function groupItems(
  items: IToolbarItem[],
): Map<string, IToolbarItem[]> {
  const groups = new Map<string, IToolbarItem[]>();

  for (const item of items) {
    const groupName = item.group || 'default';
    if (!groups.has(groupName)) {
      groups.set(groupName, []);
    }
    groups.get(groupName)!.push(item);
  }

  return groups;
}

/* ------------------------------------------------------------------ */
/*  flattenWithDividers — builds a flat render-list from grouped items */
/* ------------------------------------------------------------------ */

export function flattenWithDividers(
  items: IToolbarItem[],
  showGroupDividers: boolean,
): FlatItem[] {
  const result: FlatItem[] = [];
  const grouped = groupItems(items);
  const groupEntries = Array.from(grouped.entries());

  for (let gi = 0; gi < groupEntries.length; gi++) {
    const [, groupItemsList] = groupEntries[gi];
    const isLastGroup = gi === groupEntries.length - 1;

    for (const item of groupItemsList) {
      if (item.dividerBefore) {
        result.push({ type: 'divider', key: `${item.key}-div-before` });
      }
      result.push({ type: 'item', item, key: item.key });
      if (item.dividerAfter) {
        result.push({ type: 'divider', key: `${item.key}-div-after` });
      }
    }

    if (showGroupDividers && !isLastGroup) {
      result.push({ type: 'divider', key: `group-div-${gi}` });
    }
  }

  return result;
}
