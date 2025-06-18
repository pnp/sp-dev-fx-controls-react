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

  /**
   * Layout configuration props.
   * All properties are optional; defaults are provided via styles (SCSS module).
   */

  /**
   * Gap between items.
   * Default: 20.
   */
  itemPadding?: number;

  /**
   * Minimum width for each item.
   * Default: 210.
   */
  itemMinWidth?: number;

  /**
   * Maximum width for each item.
   * Default: 320
   */
  itemMaxWidth?: number;

  /**
   * Threshold width below which the compact layout is activated.
   * Default: 480.
   */
  compactThreshold?: number;

  /**
   * Number of rows displayed per page.
   * Default: 3.
   */
  rowsPerPage?: number;
}

export interface IGridLayoutState {}
