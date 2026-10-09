import * as React from 'react';
import { Skeleton, SkeletonItem } from '@fluentui/react-components';

import type {
  IDetailsListShimmerRowProps,
  IDetailsListProps,
} from './DetailsList.types';
import type { useDetailsListStyles } from './useDetailsListStyles';

interface DetailsListShimmerRowsProps<T> {
  columns: IDetailsListShimmerRowProps<T>['columns'];
  rowCount: number;
  rowHeight: number;
  compact: boolean;
  selectionMode: IDetailsListShimmerRowProps<T>['selectionMode'];
  checkboxVisibility: IDetailsListShimmerRowProps<T>['checkboxVisibility'];
  showSelectionColumn: boolean;
  gridTemplateColumns: string;
  classes: ReturnType<typeof useDetailsListStyles>;
  onRenderCustomPlaceholder: IDetailsListProps<T>['onRenderCustomPlaceholder'];
}

const SHIMMER_LINE_WIDTHS = ['72%', '88%', '64%', '80%'] as const;

export const DetailsListShimmerRows = <T,>({
  columns,
  rowCount,
  rowHeight,
  compact,
  selectionMode,
  checkboxVisibility,
  showSelectionColumn,
  gridTemplateColumns,
  classes,
  onRenderCustomPlaceholder,
}: DetailsListShimmerRowsProps<T>): React.ReactElement => (
  <>
    {Array.from({ length: rowCount }, (_, rowIndex) => {
      const shimmerRowProps: IDetailsListShimmerRowProps<T> = {
        columns,
        rowIndex,
        compact,
        selectionMode,
        checkboxVisibility,
      };
      const defaultRender = (
        renderProps: IDetailsListShimmerRowProps<T>,
      ): React.ReactElement => (
        <div
          role="presentation"
          className={classes.shimmerRow}
          style={{
            gridTemplateColumns,
            minHeight: rowHeight,
            height: rowHeight,
          }}
        >
          {showSelectionColumn && (
            <div className={classes.selectionCell}>
              <Skeleton animation="wave">
                <SkeletonItem shape="circle" size={16} />
              </Skeleton>
            </div>
          )}
          {renderProps.columns.map((column, columnIndex) => (
            <div key={column.key} className={classes.shimmerCell}>
              <Skeleton animation="wave" style={{ width: '100%' }}>
                <SkeletonItem
                  shape="rectangle"
                  size={12}
                  style={{
                    width: column.isIconOnly
                      ? 16
                      : SHIMMER_LINE_WIDTHS[(columnIndex + renderProps.rowIndex) % SHIMMER_LINE_WIDTHS.length],
                  }}
                />
              </Skeleton>
            </div>
          ))}
        </div>
      );

      return (
        <React.Fragment key={rowIndex}>
          {onRenderCustomPlaceholder
            ? onRenderCustomPlaceholder(shimmerRowProps, rowIndex, defaultRender)
            : defaultRender(shimmerRowProps)}
        </React.Fragment>
      );
    })}
  </>
);