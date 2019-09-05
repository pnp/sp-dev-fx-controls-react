import * as React from 'react';
import styles from './TilesList.module.scss';
import { SelectionZone, ISelection, Selection, SelectionMode } from 'office-ui-fabric-react/lib/Selection';
import { IFile } from '../../../../services/FileBrowserService.types';
import { List, IPageProps } from 'office-ui-fabric-react/lib/List';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { IRenderFunction, IRectangle, css } from 'office-ui-fabric-react/lib/Utilities';
import { FolderTile } from '../FolderTile';
import { DocumentTile } from '../DocumentTile';
import { ITilesListProps } from './ITilesListProps';

/**
 * Rows per page
 */
const ROWS_PER_PAGE: number = 3;

/**
 * Maximum row height
 */
const MAX_ROW_HEIGHT: number = 250;

/**
 * Maximum number of cells per page
 */
const CELLS_PER_PAGE: number = 48;

/**
 * Standard tile margin
 */
const STANDARD_TILE_MARGIN: number = 4;

/**
 * Standard left and right padding
 */
const TILE_HORZ_PADDING: number = 32;

/**
 * Standard bottom margin
 */
const BOTTOM_MARGIN: number = 36;

const LAYOUT_STORAGE_KEY: string = 'comparerOneDriveLayout';


export class TilesList extends React.Component<ITilesListProps> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;
  private _listElem: List = undefined;
  private _pageWidth: number;

  constructor(props: ITilesListProps) {
    super(props);
  }

  public componentDidUpdate(prevProps: ITilesListProps) {
    if (this.props.filePickerResult != prevProps.filePickerResult) {
      this._listElem.forceUpdate();
    }
  }

  public render(): React.ReactElement<ITilesListProps> {
    return (
      <SelectionZone selection={this.props.selection} onItemInvoked={(item: IFile) => {this._handleItemInvoked(item);}}>
        <FocusZone>
          <List
            ref={(e:any) => { this._listElem = e; }}
            className={styles.folderList}
            items={this.props.items}

            getItemCountForPage={this._getItemCountForPage}
            getPageHeight={this._getPageHeight}
            onRenderPage={(pageProps: IPageProps, defaultRender?: IRenderFunction<IPageProps>) => this._onRenderPage(pageProps, defaultRender)}
          />
        </FocusZone>
      </SelectionZone>
    );
  }

  /**
  * Gets called what a file is selected.
  */
 private _handleItemInvoked = (item: IFile) => {
  // If a file is selected, open the library
  if (item.isFolder) {
    this.props.onFolderOpen(item);
  } else {
    // Otherwise, remember it was selected
    this.props.onFileSelected(item);
  }
}

  /**
    * Calculates how many items there should be in the page
    */
   private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
      this._pageWidth = surfaceRect.width;
    }

    // Get the list of items
    const { items } = this.props;
    const isFolder: boolean = items && items.length > itemIndex && items[itemIndex] ? items[itemIndex].isFolder : undefined;

    // Group items by folders and files
    let pageLength: number = 0;
    for (let index = itemIndex; index < items.length; index++) {
      const element = items[index];
      if (element && element.isFolder === isFolder) {
        pageLength++;
      } else {
        break;
      }
    }

    // Return the page lenght, up to the maximum number of cells per page
    return Math.min(pageLength, CELLS_PER_PAGE);
  }

  /**
   * Renders a custom list page
   */
  private _onRenderPage = (pageProps: IPageProps, _defaultRender?: IRenderFunction<IPageProps>): JSX.Element => {
    const {
      page,
      className: pageClassName,
      ...divProps
    } = pageProps;

    const { items } = page;
    // If there are not items to be rendered or the last one is a null mark -> request for next page data
    if (!items) {
      return null;
    }

    return (<div {...divProps} className={css(pageClassName, styles.listPage)} key={page.key}>
      <div className={styles.grid}
        style={{
          width: this._pageWidth,
          marginTop: -STANDARD_TILE_MARGIN,
          marginBottom: BOTTOM_MARGIN,
          marginLeft: -STANDARD_TILE_MARGIN,
          marginRight: -STANDARD_TILE_MARGIN
        }}
      >
        {items.map((item: IFile, index: number) => {
          return this._onRenderCell(item, index);
        })}
      </div>
    </div>);
  }

  /** Calculates the list "page" height (a.k.a. row) */
  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  }

  /**
   * Renders a file folder cover
   */
  private _onRenderCell = (item: IFile, index: number | undefined): JSX.Element => {
    if (!item) {
      this.props.onNextPageDataRequest();
      return null;
    }
    let isSelected: boolean = this.props.filePickerResult && item.absoluteUrl == this.props.filePickerResult.fileAbsoluteUrl;

    // I know this is a lot of divs and spans inside of each other, but my
    // goal was to mimic the HTML and style of the out-of-the-box file picker
    // to the best of my ability.
    return (
      <div
        className={styles.listCell}
        data-item-index={index}
        style={{
          flexBasis: this._columnWidth,
          maxWidth: this._columnWidth,
          margin: STANDARD_TILE_MARGIN,
          borderStyle: "none",
          borderWidth: 0
        }}
      >
        <div
          role="presentation"
          className={styles.cell}

          // I don't agree with this magic number. Where does this come from?
          style={{ paddingTop: "97.16%" }}
        >
          <div role="presentation" className={styles.cellContent}>
            {
              item.isFolder ?
                <FolderTile
                  item={item}
                  index={index}
                  isSelected={isSelected}
                  pageWidth={this._pageWidth}
                  tileDimensions={{
                    width: this._columnWidth - TILE_HORZ_PADDING,
                    height: this._rowHeight - TILE_HORZ_PADDING
                  }}
                  onItemInvoked={(itemInvoked: IFile) => this._handleItemInvoked(itemInvoked)}
                />
              :
                <DocumentTile
                  fileBroserService={this.props.fileBrowserService}
                  item={item}
                  index={index}
                  isSelected={isSelected}
                  pageWidth={this._pageWidth}
                  tileDimensions={{
                    width: this._columnWidth - TILE_HORZ_PADDING,
                    height: this._rowHeight - TILE_HORZ_PADDING
                  }}
                  onItemInvoked={(itemInvoked: IFile) => this._handleItemInvoked(itemInvoked)}
                />
              }
          </div>
        </div>
      </div>
    );
  }
}
