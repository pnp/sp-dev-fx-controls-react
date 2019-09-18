import * as React from 'react';

import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { FocusZone } from 'office-ui-fabric-react/lib/FocusZone';
import { List } from 'office-ui-fabric-react/lib/List';
import { IRectangle } from 'office-ui-fabric-react/lib/Utilities';
import { css } from "@uifabric/utilities/lib/css";
import { Selection, SelectionMode, SelectionZone } from 'office-ui-fabric-react/lib/Selection';
import { Image, ImageFit } from 'office-ui-fabric-react/lib/Image';
import { Check } from 'office-ui-fabric-react/lib/Check';
import { Placeholder } from '../../../Placeholder';
import { IRecentFile } from '../../../services/FilesSearchService.types';
import { IFilePickerResult } from '../FilePicker.types';
import { GeneralHelper } from '../../../Utilities';
import { IRecentFilesTabProps, IRecentFilesTabState } from '.';

import * as strings from 'ControlStrings';
import styles from './RecentFilesTab.module.scss';

/**
 * Rows per page
 */
const ROWS_PER_PAGE = 3;

/**
 * Maximum row height
 */
const MAX_ROW_HEIGHT = 250;

export default class RecentFilesTab extends React.Component<IRecentFilesTabProps, IRecentFilesTabState> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;
  private _selection: Selection;
  private _listElem: List = undefined;

  constructor(props: IRecentFilesTabProps) {
    super(props);

    this._selection = new Selection({
      selectionMode: SelectionMode.single,
      onSelectionChanged: this._onSelectionChanged
    });


    this.state = {
      isLoading: true,
      results: [],
      filePickerResult: null
    };
  }

  /**
   * Gets the most recently used files
   */
  public async componentDidMount() {
    const recentFilesResult = await this.props.fileSearchService.executeRecentSearch(this.props.accepts);
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
      <span className={styles.tabContainer}>
        <span className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{strings.RecentDocumentsHeader}</h2>
        </span>
        <span className={styles.tab}>
          {isLoading ?
            this._renderSpinner() :
            results === undefined || results.length < 1 ? this._renderPlaceholder() : this._renderGridList()
          }
        </span>
        <span className={styles.actionButtonsContainer}>
          <span className={styles.actionButtons}>
            <PrimaryButton
              disabled={!this.state.filePickerResult}
              onClick={() => this._handleSave()}
              className={styles.actionButton}
            >{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </span>
        </span>
      </span>
    );
  }

  private _onSelectionChanged = () => {
    // Get the selected item
    const selectedItems = this._selection.getSelection();
    if (selectedItems && selectedItems.length > 0) {
      //Get the selected key
      const selectedKey: IRecentFile = selectedItems[0] as IRecentFile;
      const filePickerResult: IFilePickerResult = {
        fileAbsoluteUrl: selectedKey.fileUrl,
        fileName: GeneralHelper.getFileNameFromUrl(selectedKey.fileUrl),
        fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(selectedKey.fileUrl),
        downloadFileContent: () => { return this.props.fileSearchService.downloadSPFileContent(selectedKey.fileUrl, GeneralHelper.getFileNameFromUrl(selectedKey.fileUrl)); }
      };

      // Save the selected file
      this.setState({
        filePickerResult
      });
    } else {
      // Remove any selected file
      this.setState({
        filePickerResult: undefined
      });
    }
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
      this._columnCount = Math.ceil(surfaceRect.width / MAX_ROW_HEIGHT);
      this._columnWidth = Math.floor(surfaceRect.width / this._columnCount);
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
          onItemInvoked={(item: IRecentFile) => this._handleItemInvoked(item)}>
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

    if (this._selection && index !== undefined) {
      isSelected = this._selection.isIndexSelected(index);
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
  private _handleItemInvoked = (item: IRecentFile) => {
    this._selection.setKeySelected(item.key, true, true);
  }

  /**
   * Gets called when it is time to save the currently selected item
   */
  private _handleSave = () => {
    this.props.onSave(this.state.filePickerResult);
  }

  /**
   * Gets called when it is time to close (without saving)
   */
  private _handleClose = () => {
    this.props.onClose();
  }

  /**
   * Creates a ref to the list
   */
  private _linkElement = (e: any) => {
    this._listElem = e;
  }
}
