import * as React from 'react';
import { Button, Text } from '@fluentui/react-components';
import { ChevronDown16Regular, ChevronRight16Regular } from '@fluentui/react-icons';

import type { IDetailsGroupHeaderProps, IDetailsListProps } from './DetailsList.types';
import type { IDetailsListGroupEntry } from './DetailsList.utils';
import type { useDetailsListStyles } from './useDetailsListStyles';

interface DetailsListGroupHeaderProps<T> {
  entry: IDetailsListGroupEntry<T>;
  entryIndex: number;
  isCollapsed: boolean;
  onToggle: () => void;
  isHeaderVisible: boolean;
  shouldVirtualize: boolean;
  entryTop: number;
  groupHeaderHeight: number;
  gridTemplateColumns: string;
  classes: ReturnType<typeof useDetailsListStyles>;
  style: React.CSSProperties | undefined;
  onRenderGroupHeader: IDetailsListProps<T>['onRenderGroupHeader'];
}

export const DetailsListGroupHeader = <T,>({
  entry,
  entryIndex,
  isCollapsed,
  onToggle,
  isHeaderVisible,
  shouldVirtualize,
  entryTop,
  groupHeaderHeight,
  gridTemplateColumns,
  classes,
  style,
  onRenderGroupHeader,
}: DetailsListGroupHeaderProps<T>): React.ReactElement => {
  const groupProps: IDetailsGroupHeaderProps<T> = {
    group: entry.group,
    isCollapsed,
    onToggle,
  };
  const defaultRender = (renderProps: IDetailsGroupHeaderProps<T>): React.ReactElement => (
    <div
      role="row"
      aria-rowindex={entryIndex + (isHeaderVisible ? 2 : 1)}
      className={classes.groupHeader}
      style={{
        gridTemplateColumns,
        minHeight: groupHeaderHeight,
        height: groupHeaderHeight,
        ...style,
        ...(shouldVirtualize
          ? {
              position: 'absolute',
              top: entryTop,
              right: 0,
              left: 0,
            }
          : {}),
      }}
    >
      <Button
        appearance="subtle"
        size="small"
        role="gridcell"
        aria-expanded={!renderProps.isCollapsed}
        className={classes.groupButton}
        style={{
          gridColumn: '1 / -1',
          // Fluent UI 9 Button centers its content by default. Group labels
          // follow the list's leading edge instead.
          justifyContent: 'flex-start',
          textAlign: 'left',
        }}
        onClick={renderProps.onToggle}
      >
        {Array.from({ length: renderProps.group.level ?? 0 }, (_, level) => (
          <span key={level} aria-hidden className={classes.groupIndent} />
        ))}
        {renderProps.isCollapsed ? <ChevronRight16Regular /> : <ChevronDown16Regular />}
        <Text weight="semibold" truncate>
          {renderProps.group.name}
        </Text>
        <Text style={{ color: 'inherit' }}>({renderProps.group.count})</Text>
      </Button>
    </div>
  );

  return (
    <>
      {onRenderGroupHeader
        ? onRenderGroupHeader(groupProps, defaultRender)
        : defaultRender(groupProps)}
    </>
  );
};
