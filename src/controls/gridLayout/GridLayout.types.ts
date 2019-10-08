import {  ISize } from 'office-ui-fabric-react/lib/Utilities';
import { IListProps } from 'office-ui-fabric-react/lib/List';

export interface IGridLayoutProps {
  /**
   * The array of items to display.
   */
  items: any[];

  /**
   * In case you want to override the underlying list
   */
  listProps?: Partial<IListProps>;

  ariaLabel?: string;
  /**
   * The method to render each cell item
   */
  onRenderGridItem: (item: any, finalSize: ISize, isCompact: boolean) => JSX.Element;
}

export interface IGridLayoutState {}
