import * as React from 'react';
import styles from './GridLayout.module.scss';

// Used to render list grid
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import { IRectangle, ISize } from '@fluentui/react/lib/Utilities';

import { IGridLayoutProps, IGridLayoutState } from './GridLayout.types';

import * as telemetry from '../../common/telemetry';

/**
 * Grid layout component
 */
export class GridLayout extends React.Component<IGridLayoutProps, IGridLayoutState> {

   /**
   * Constructor method
   */
  constructor(props: IGridLayoutProps) {
    super(props);

    telemetry.track('ReactGridLayout');
  }

  //Get constants from SCSS if they are not passed in props
  private ROWS_PER_PAGE: number = this.props.rowsPerPage ?? +styles.rowsPerPage;
  private MAX_WIDTH: number = this.props.itemMaxWidth ?? +styles.maxWidth;
  private MIN_WIDTH: number = this.props.itemMinWidth ?? +styles.minWidth;
  private PADDING: number = this.props.itemPadding ?? +styles.padding;
  private COMPACT_THRESHOLD: number = this.props.compactThreshold ?? +styles.compactThreshold;

  // Number of columns in a row
  private _columnCount: number;

  // Width of each column
  private _columnWidth: number;

  // The height of every column
  private _rowHeight: number;

  // Whether the control is compact (i.e.: less than 480px)
  private _isCompact: boolean;

  /**
   * Renders the grid control
   */
  public render(): React.ReactElement<IGridLayoutProps> {
    return (
      <div className={styles.gridLayout} role="group" aria-label={this.props.ariaLabel}>
        <FocusZone>
          <List
            role="presentation"
            className={styles.gridLayoutList}
            items={this.props.items}
            getItemCountForPage={this._getItemCountForPage}
            getPageHeight={this._getPageHeight}
            onRenderCell={this._onRenderCell}
            {...this.props.listProps}
          />
        </FocusZone>
      </div>
    );
  }

  /**
   * Calculates how many items in the page
   */
  private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this._isCompact = surfaceRect.width < this.COMPACT_THRESHOLD;
      if (this._isCompact) {
        this._columnCount = 1;
        this._columnWidth = surfaceRect.width;
        return this.props.items.length;
      } else {
        this._columnCount = Math.ceil(surfaceRect.width / (this.MAX_WIDTH));
        this._columnWidth = Math.max(this.MIN_WIDTH, Math.floor(surfaceRect.width / this._columnCount) + Math.floor(this.PADDING / this._columnCount));
        this._rowHeight = this._columnWidth;
      }
    }

    return this._columnCount * this.ROWS_PER_PAGE;
  }

  /**
   * Calculates the page height for the grid
   */
  private _getPageHeight = (): number => {
    if (this._isCompact) {
      return this.props.items.length * this._rowHeight;
    }
    return this._rowHeight * this.ROWS_PER_PAGE;
  }

  /**
   * Calls the passed onRenderCell
   */
  private _onRenderCell = (item: any, index: number | undefined): JSX.Element => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const isCompact: boolean = this._isCompact;
    const cellPadding: number = index % this._columnCount !== this._columnCount - 1 && !isCompact ? this.PADDING : 0;
    const finalSize: ISize = { width: this._columnWidth, height: this._rowHeight };
    const cellWidth: number = isCompact ? this._columnWidth + this.PADDING : this._columnWidth - this.PADDING;
    return (
      <div
        style={{
          width: `${cellWidth}px`,
          marginRight: `${cellPadding}px`
        }}
      >
          {this.props.onRenderGridItem(item, finalSize, isCompact)}
      </div>
    );
  }
}
