import * as React from 'react';

import type { IDetailsListGroup, IDetailsListProps } from './DetailsList.types';

interface UseDetailsListGroupsOptions<T> {
  onToggleGroup: IDetailsListProps<T>['onToggleGroup'];
}

interface UseDetailsListGroupsResult<T> {
  isGroupCollapsed: (group: IDetailsListGroup<T>) => boolean;
  toggleGroup: (group: IDetailsListGroup<T>) => void;
}

export const useDetailsListGroups = <T>({
  onToggleGroup,
}: UseDetailsListGroupsOptions<T>): UseDetailsListGroupsResult<T> => {
  const [collapsedGroupKeys, setCollapsedGroupKeys] = React.useState<Set<string>>(new Set());

  const isGroupCollapsed = React.useCallback(
    (group: IDetailsListGroup<T>): boolean =>
      group.isCollapsed ?? collapsedGroupKeys.has(group.key),
    [collapsedGroupKeys],
  );

  const toggleGroup = React.useCallback(
    (group: IDetailsListGroup<T>): void => {
      const nextCollapsed = !isGroupCollapsed(group);
      if (group.isCollapsed === undefined) {
        setCollapsedGroupKeys((currentKeys) => {
          const nextKeys = new Set(currentKeys);
          if (nextCollapsed) {
            nextKeys.add(group.key);
          } else {
            nextKeys.delete(group.key);
          }
          return nextKeys;
        });
      }
      onToggleGroup?.(group, nextCollapsed);
    },
    [isGroupCollapsed, onToggleGroup],
  );

  return { isGroupCollapsed, toggleGroup };
};