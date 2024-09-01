import {  ISize } from '@fluentui/react/lib/Utilities';
import { IListProps } from '@fluentui/react/lib/List';

export interface IGridLayoutProps {
  /**
   * The array of items to display.
   */
  items: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any

  /**
   * In case you want to override the underlying list
   */
  listProps?: Partial<IListProps>;

  ariaLabel?: string;
  /**
   * The method to render each cell item
   */
  onRenderGridItem: (item: any, finalSize: ISize, isCompact: boolean) => JSX.Element; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface IGridLayoutState {}
