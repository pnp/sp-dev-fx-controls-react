import * as React from 'react';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { IDocumentLibraryBrowserProps, IDocumentLibraryBrowserState } from '.';
import { ILibrary } from '../../../../services/FileBrowserService.types';

import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';
import { DefaultButton } from 'office-ui-fabric-react/lib/Button';

import styles from './DocumentLibraryBrowser.module.scss';
import * as strings from 'ControlStrings';

/**
 * Rows per page
 */
export const ROWS_PER_PAGE = 3;

/**
 * Maximum row height
 */
export const MAX_ROW_HEIGHT = 250;

/**
 * This would have been better done as an Office Fabric TileList, but it isn't available yet for production use
 */
export class DocumentLibraryBrowser extends React.Component<IDocumentLibraryBrowserProps, IDocumentLibraryBrowserState> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;

  constructor(props: IDocumentLibraryBrowserProps) {
    super(props);

    this.state = {
      isLoading: true,
      lists: []
    };
  }

  public async componentDidMount() {
    const lists = await this.props.fileBrowserService.getSiteMediaLibraries();
    this.setState({
      lists: lists,
      isLoading: false
    });
  }

  public render(): React.ReactElement<IDocumentLibraryBrowserProps> {
    if (this.state.isLoading) {
      return (<Spinner label={strings.Loading} />);
    }
    const libraries: ILibrary[] = this.state.lists;

    return (
      <div className={styles.documentLibraryBrowserContainer}>
        <FocusZone>
          <List
            className={styles.filePickerFolderCardGrid}
            items={libraries}
            getItemCountForPage={this._getItemCountForPage}
            getPageHeight={this._getPageHeight}
            renderedWindowsAhead={4}
            onRenderCell={this._onRenderLibraryTile}
          />
        </FocusZone>
      </div>
    );
  }

  /**
   * Calculates how many items there should be in the page
   */
  private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      this._rowHeight = this._columnWidth;
    }

    return this._columnCount * ROWS_PER_PAGE;
  }

  /**
   * Gets the height of a list "page"
   */
  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  }

  /**
   * Renders a cell for search suggestions
   */
  private _onRenderLibraryTile = (item: ILibrary, index: number | undefined): JSX.Element => {
    const imgSrc = item.iconPath ? item.iconPath : "";

    return (
      <div
        className={styles.filePickerFolderCardTile}
        data-is-focusable={true}
        style={{
          width: 100 / this._columnCount + '%'
        }}
      >
        <div className={styles.filePickerFolderCardSizer}>
          <div className={styles.filePickerFolderCardPadder}>
            <Image src={imgSrc} className={styles.filePickerFolderCardImage} imageFit={ImageFit.cover} />
            <DefaultButton className={styles.filePickerFolderCardLabel} onClick={(_event) => this._handleOpenLibrary(item)}>{item.title}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }



  /**
   * Calls parent when library is opened
   */
  private _handleOpenLibrary = (library: ILibrary) => {
    this.props.onOpenLibrary(library);
  }
}
