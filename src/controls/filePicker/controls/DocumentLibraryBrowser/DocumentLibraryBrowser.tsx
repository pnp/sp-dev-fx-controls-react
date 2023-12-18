import * as React from 'react';
import { List } from '@fluentui/react/lib/List';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { IDocumentLibraryBrowserProps } from './IDocumentLibraryBrowserProps';
import { IDocumentLibraryBrowserState } from './IDocumentLibraryBrowserState';
import { ILibrary } from '../../../../services/FileBrowserService.types';

import { IRectangle } from '@fluentui/react/lib/Utilities';
import { DefaultButton } from '@fluentui/react/lib/Button';

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

  public async componentDidMount(): Promise<void> {
    const lists = await this.props.fileBrowserService.getSiteMediaLibraries(this.props.includePageLibraries);
    this.setState({
      lists: lists,
      isLoading: false
    });
  }

  public render(): React.ReactElement<IDocumentLibraryBrowserProps> {

    const { lists, isLoading } = this.state;

    return (
      <div className={styles.documentLibraryBrowserContainer}>
        {isLoading && <Spinner label={strings.Loading} />}
        <List
          className={styles.filePickerFolderCardGrid}
          items={lists}
          getItemCountForPage={this._getItemCountForPage}
          getPageHeight={this._getPageHeight}
          renderedWindowsAhead={4}
          onRenderCell={this._onRenderLibraryTile}
        />
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
  private _handleOpenLibrary = (library: ILibrary): void => {
    this.props.onOpenLibrary(library);
  }
}
