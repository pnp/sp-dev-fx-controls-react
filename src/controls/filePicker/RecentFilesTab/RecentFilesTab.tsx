import * as React from 'react';

import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/components/Button';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import { IRectangle } from '@fluentui/react/lib/Utilities';
import { css } from '@fluentui/react/lib/Utilities';
import { Selection, SelectionMode, SelectionZone } from '@fluentui/react/lib/Selection';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { Check } from '@fluentui/react/lib/Check';
import { Placeholder } from '../../../Placeholder';
import { IRecentFile } from '../../../services/FilesSearchService.types';
import { IFilePickerResult } from '../FilePicker.types';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import { IRecentFilesTabProps } from './IRecentFilesTabProps';
import { IRecentFilesTabState } from './IRecentFilesTabState';

import * as strings from 'ControlStrings';
import styles from './RecentFilesTab.module.scss';

/**
 * Rows per page
 */
const ROWS_PER_PAGE = 3;

/**
 * Maximum row height
 */
const MAX_ROW_HEIGHT = 175;

export default class RecentFilesTab extends React.Component<IRecentFilesTabProps, IRecentFilesTabState> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;
  private _selection: Selection;
  private _listElem: List = undefined;

  constructor(props: IRecentFilesTabProps) {
    super(props);

    this._selection = null;

    this.state = {
      isLoading: true,
      results: [],
      filePickerResults: [],
    };
  }

  /**
   * Gets the most recently used files
   */
  public async componentDidMount(): Promise<void> {
    const recentFilesResult = await this.props.fileSearchService.executeRecentSearch(this.props.accepts);
    this._selection = new Selection({
      selectionMode: SelectionMode.multiple,
      onSelectionChanged: this._onSelectionChanged
    });
    this._selection.setItems(recentFilesResult, true);

    this.setState({
      isLoading: false,
      results: recentFilesResult
    });
  }

  /**
   * Render the tab
   */
  public render(): React.ReactElement<IRecentFilesTabProps> {
    const { results,
      isLoading } = this.state;
    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{strings.RecentDocumentsHeader}</h2>
        </div>
        <div className={css(styles.tab, styles.tabOffset)}>
          {isLoading ?
            this._renderSpinner() :
            results === undefined || results.length < 1 ? this._renderPlaceholder() : this._renderGridList()
          }
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={this.state.filePickerResults && !this.state.filePickerResults.length}
              onClick={() => this._handleSave()}
              className={styles.actionButton}
            >{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  private _onSelectionChanged = (): void => {
    const filePickerResults: IFilePickerResult[] = [];
    // Get the selected item
    this._selection.getSelection().map((selectedKey: IRecentFile) => {
      if (!selectedKey.isFolder && selectedKey.fileUrl)
        filePickerResults.push({
          fileAbsoluteUrl: selectedKey.fileUrl,
          fileName: GeneralHelper.getFileNameFromUrl(selectedKey.fileUrl),
          fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(selectedKey.fileUrl),
          downloadFileContent: () => { return this.props.fileSearchService.downloadSPFileContent(selectedKey.fileUrl, GeneralHelper.getFileNameFromUrl(selectedKey.fileUrl)); }
        });
    });

    this.setState({ filePickerResults });

    if (this._listElem) {
      // Force the list to update to show the selection check
      this._listElem.forceUpdate();
    }
  }

  /**
     * Calculates how many items there should be in the page
     */
  private _getItemCountForPage = (itemIndex: number, surfaceRect: IRectangle): number => {
    if (itemIndex === 0) {
      if (surfaceRect.width === 0) {
        //surfaceRect.width is 0 on load of this component, passing some default values so it renders.
        this._columnCount = 9;
        this._columnWidth = 161;
      } else {
        this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
        this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
      }
      this._rowHeight = this._columnWidth;
    }
    return this._columnCount * ROWS_PER_PAGE;
  }

  /** Calculates the list "page" height (a.k.a. row) */
  private _getPageHeight = (): number => {
    return this._rowHeight * ROWS_PER_PAGE;
  }


  /**
   * Renders a "please wait" spinner while we're loading
   */
  private _renderSpinner = (): JSX.Element => {
    return <Spinner label={strings.Loading} />;
  }

  /**
   * Renders a message saying that there are no recent files
   */
  private _renderPlaceholder = (): JSX.Element => {
    return <Placeholder iconName='OpenFolderHorizontal'
      iconText={strings.NoRecentFiles}
      description={strings.NoRecentFilesDescription}
    />;
  }

  /**
   * Renders a grid list containing results
   */
  private _renderGridList = (): JSX.Element => {
    return <span className={styles.recentGridList} role="grid">
      <FocusZone>
        <SelectionZone selection={this._selection}
          selectionMode={SelectionMode.multiple}
          onItemInvoked={
            (item: any) => this._handleItemInvoked(item) // eslint-disable-line @typescript-eslint/no-explicit-any
          }>
          <List
            ref={this._linkElement}
            items={this.state.results}
            onRenderCell={this._onRenderCell}
            getItemCountForPage={this._getItemCountForPage}
            getPageHeight={this._getPageHeight}
            renderedWindowsAhead={4}
          />
        </SelectionZone>
      </FocusZone>
    </span>;
  }

  /**
   * Renders each result in its own cell
   */
  private _onRenderCell = (item: IRecentFile, index: number | undefined): JSX.Element => {
    let isSelected: boolean = false;

    if (this._selection) {
      isSelected = this._selection.isKeySelected(item.key);
    }

    return (
      <div
        className={styles.gridListCell} role={"gridCell"}>
        <div
          className={css(styles.itemTile, styles.isFile, styles.hasThumbnail, isSelected ? styles.isSelected : undefined)}
          role="link"
          aria-selected={isSelected}
          data-is-draggable="false"
          data-is-focusable="true"
          data-selection-index={index}
          data-selection-invoke="true"
          data-item-index={index}
          data-automationid="ItemTile"
          style={{
            width: this._columnWidth,
            height: this._rowHeight
          }}
        >
          <div className={styles.itemTileContent}>
            <div className={styles.itemTileFile}>
              <div className={styles.itemTileFileContainer}>
                <div className={styles.itemTileThumbnail}>
                  {/* <div className={styles.image}> */}
                  <Image src={item.fileUrl} width={this._columnWidth} height={this._rowHeight} imageFit={ImageFit.cover} />
                  {/* </div> */}
                </div>
                <div className={styles.itemTileCheckCircle}
                  role='checkbox'
                  aria-checked={isSelected}
                  data-item-index={index} data-selection-toggle={true} data-automationid='CheckCircle'>
                  <Check checked={isSelected} />
                </div>
                <div className={styles.itemTileNamePlate}>
                  <div className={styles.itemTileName}>{item.name}</div>
                  <div className={styles.itemTileSubText}>
                    <span>{strings.EditedByNamePlate}{item.editedBy}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Gets called what a file is selected.
   */
  private _handleItemInvoked = (item: IRecentFile): void => {
    if (!item.isFolder) {
      this._selection.toggleKeySelected(item.key);
    }
  }

  /**
   * Gets called when it is time to save the currently selected item
   */
  private _handleSave = (): void => {
    this.props.onSave(this.state.filePickerResults);
  }

  /**
   * Gets called when it is time to close (without saving)
   */
  private _handleClose = (): void => {
    this.props.onClose();
  }

  /**
   * Creates a ref to the list
   */
  private _linkElement = (e: List): void => {
    this._listElem = e;
  }
}
