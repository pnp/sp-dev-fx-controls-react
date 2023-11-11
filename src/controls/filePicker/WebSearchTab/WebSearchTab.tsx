import * as React from 'react';

import { IWebSearchTabProps } from './IWebSearchTabProps';
import { IWebSearchTabState } from './IWebSearchTabState';
import { ISearchSuggestion, ImageSize, ImageAspect, ImageLicense, DEFAULT_SUGGESTIONS, MAX_ROW_HEIGHT, ROWS_PER_PAGE } from './WebSearchTab.types';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/components/Button';
import { Label } from '@fluentui/react/lib/Label';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Check } from '@fluentui/react/lib/Check';
import { Dropdown, IDropdownProps, IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { Image, ImageFit } from '@fluentui/react/lib/Image';
import { Link } from '@fluentui/react/lib/Link';
import { FocusZone } from '@fluentui/react/lib/FocusZone';
import { List } from '@fluentui/react/lib/List';
import { IRectangle } from '@fluentui/react/lib/Utilities';
import { Selection, SelectionMode, SelectionZone } from '@fluentui/react/lib/Selection';
import { MessageBar } from '@fluentui/react/lib/MessageBar';
import { css } from '@fluentui/react/lib/Utilities';
import { IFilePickerResult } from '../FilePicker.types';
import { GeneralHelper } from '../../../common/utilities/GeneralHelper';
import { ISearchResult, BingQuerySearchParams } from '../../../services/FilesSearchService.types';

import styles from './WebSearchTab.module.scss';
import * as strings from 'ControlStrings';

/**
 * Renders search suggestions and performs seach queries
 */
export default class WebSearchTab extends React.Component<IWebSearchTabProps, IWebSearchTabState> {
  private _columnCount: number;
  private _columnWidth: number;
  private _rowHeight: number;
  private _selection: Selection;
  private _listElem: List = undefined;

  constructor(props: IWebSearchTabProps) {
    super(props);

    this._selection = new Selection({
      selectionMode: SelectionMode.single,
      onSelectionChanged: this._onSelectionChanged
    });

    this.state = {
      isLoading: false,
      results: undefined,
      filePickerResult: null
    };
  }

  /**
   * Render the tab
   */
  public render(): React.ReactElement<IWebSearchTabProps> {
    const { query, results } = this.state;

    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          <h2 className={styles.tabHeader}>{strings.WebSearchLinkLabel}</h2>
        </div>
        {this.props.bingSearchService && this._renderSearchBox()}
        <div className={css(styles.tab, styles.tabOffset)}>
          {!query && this._renderSearchSuggestions()}
          {query && results && this._renderSearchResults()}
        </div>
        <div className={styles.actionButtonsContainer}>
          {
            this.state.results && this.state.license === 'Any' &&
            <MessageBar>
              {strings.CreativeCommonsMessage}
            </MessageBar>}
          <Label className={styles.copyrightLabel}>
            {strings.CopyrightWarning}&nbsp;&nbsp;
            <Link target='_blank' href={strings.CopyrightUrl}>{strings.LearnMoreLink}</Link>
          </Label>

          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!this.state.filePickerResult}
              className={styles.actionButton}
              onClick={() => this._handleSave()}
            >{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  private _onSelectionChanged = (): void => {
    // Get the selected item
    const selectedItems = this._selection.getSelection();
    const filePickerResult = this.state.filePickerResult;

    let selectedFileResult: IFilePickerResult = null;
    if (selectedItems && selectedItems.length > 0) {
      //Get the selected key
      const selectedItem: ISearchResult = selectedItems[0] as ISearchResult;

      //Brute force approach to making sure all URLs are loading over HTTPS
      // even if it breaks the page.
      const selectedUrl: string = selectedItem.contentUrl.replace('http://', 'https://');
      selectedFileResult = {
        fileAbsoluteUrl: selectedUrl,
        fileName: GeneralHelper.getFileNameFromUrl(selectedUrl),
        fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(selectedUrl),
        downloadFileContent: () => { return this.props.bingSearchService.downloadBingContent(selectedUrl, GeneralHelper.getFileNameFromUrl(selectedUrl)); }
      };
    }

    // If clicked on already selected file -> deselect it
    if (filePickerResult && selectedFileResult && filePickerResult.fileAbsoluteUrl === selectedFileResult.fileAbsoluteUrl) {
      this._selection.setAllSelected(false);
      selectedFileResult = null;
    }

    // Save the selected file
    this.setState({
      filePickerResult: selectedFileResult
    });
    if (this._listElem) {
      // Force the list to update to show the selection check
      this._listElem.forceUpdate();
    }
  }

  /**
   * Renders the returned search results
   */
  private _renderSearchResults = (): JSX.Element => {
    const { results } = this.state;

    // If there are no results, tell 'em.
    if (results === undefined || results.length < 1) {
      return <Label className={styles.noResultLabel}>{strings.NoResultsBadEnglish}</Label>;
    }

    return (
      <FocusZone>
        <SelectionZone selection={this._selection}
          onItemInvoked={(item: ISearchResult) => this._selection.setKeySelected(item.key, true, true)}
        >
          <List
            ref={this._linkElement}
            className={styles.bingGrildList}
            items={this.state.results}
            getItemCountForPage={this._getItemCountForPage}
            getPageHeight={this._getPageHeight}
            renderedWindowsAhead={4}
            onRenderCell={this._onRenderSearchResultsCell}
          />
        </SelectionZone>
      </FocusZone>
    );
  }

  /**
   * Show an individual search result item
   */
  private _onRenderSearchResultsCell = (item: ISearchResult, index: number | undefined): JSX.Element => {
    const { query } = this.state;

    let isSelected: boolean = false;

    if (this._selection && index !== undefined) {
      isSelected = this._selection.isIndexSelected(index);
    }

    // The logic for calculating the thumbnail dimensions is not quite the same as the out-of-the-box file picker,
    // but it'll have to do.

    // Find the aspect ratio of the picture
    const ratio: number = item.width / item.height;

    // Fit the height to the desired row height
    const thumbnailHeight: number = Math.min(this._rowHeight, item.height);

    // Resize the picture with the same aspect ratio
    const thumbnailWidth: number = thumbnailHeight * ratio;

    const searchResultAltText: string = strings.SearchResultAlt.replace('{0}', query);
    return (
      <div
        className={styles.bingGridListCell}
        style={{
          width: 100 / this._columnCount + '%'
        }}
      >
        <div
          aria-label={searchResultAltText}
          className={css(styles.bingTile, isSelected ? styles.isSelected : undefined)}
          data-is-focusable={true}
          data-selection-index={index}
          style={{
            width: `${thumbnailWidth}px`,
            height: `${thumbnailHeight}px`
          }}>
          <div className={styles.bingTileContent} data-selection-invoke={true}>
            <Image src={item.thumbnailUrl} className={styles.bingTileThumbnail} alt={searchResultAltText} width={thumbnailWidth} height={thumbnailHeight} />
            <div className={styles.bingTileFrame} />
            <div className={styles.bingTileCheckCircle}
              role='checkbox'
              aria-checked={isSelected}
              data-item-index={index} data-selection-toggle={true} data-automationid='CheckCircle'>
              <Check checked={isSelected} />
            </div>
            <div className={styles.bingTileNamePlate}>
              <Link
                href={item.contentUrl}
                target='_blank'
                aria-label={strings.SearchResultAriaLabel}
              >{item.displayUrl}</Link>
            </div>
          </div>
        </div>
      </div>);
  }

  /**
   * Renders suggestions when there aren't any queries
   */
  private _renderSearchSuggestions = (): JSX.Element => {
    const suggestions: ISearchSuggestion[] = this.props.suggestions !== undefined ? this.props.suggestions : DEFAULT_SUGGESTIONS;

    return (
      <FocusZone>
        <List
          className={styles.filePickerFolderCardGrid}
          items={suggestions}
          getItemCountForPage={this._getItemCountForPage}
          getPageHeight={this._getPageHeight}
          renderedWindowsAhead={4}
          onRenderCell={this._onRenderSuggestionCell}
        />
      </FocusZone>
    );
  }

  /**
   * Gets search results from Bing
   */
  private _getSearchResults = async (): Promise<void> => {
    // Do nothing
    if (this.state.query === undefined || !this.props.bingSearchService) {
      return;
    }

    // Show a loading indicator + remove selection
    this.setState({
      filePickerResult: null,
      isLoading: true
    });

    const searchParams: BingQuerySearchParams = {
      aspect: this.state.aspect,
      size: this.state.size,
      license: this.state.license,
      query: this.state.query
    };
    const searchResults = await this.props.bingSearchService.executeBingSearch(searchParams);

    // If the results were obtained
    if (searchResults) {
      // Set the items so that the selection zone can keep track of them
      this._selection.setItems(searchResults, true);
    }

    // Save results and stop loading indicator
    this.setState({
      isLoading: false,
      results: searchResults
    });
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
  private _onRenderSuggestionCell = (item: ISearchSuggestion, index: number | undefined): JSX.Element => {
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
            <Image src={item.backgroundUrl} className={styles.filePickerFolderCardImage} imageFit={ImageFit.cover} />
            <DefaultButton className={styles.filePickerFolderCardLabel} onClick={(_event) => this._handleSearch(item.topic)}>{item.topic}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Renders the search box
   */
  private _renderSearchBox = (): JSX.Element => {
    const { query } = this.state;
    const hasQuery: boolean = query !== undefined;
    const license: string = this.state.license ? this.state.license : 'All';

    return (
      <div className={styles.searchBoxContainer}>
        <div className={styles.searchBoxMedium}>
          <div className={styles.searchBox}>
            <SearchBox
              placeholder={strings.SearchBoxPlaceholder}
              value={query}
              onSearch={newQuery => this._handleSearch(newQuery)}
            />
          </div>
        </div>
        <Label>{strings.PoweredByBing}</Label>
        {
          hasQuery &&
          <div className={styles.dropdownContainer}>
            <Dropdown
              className={styles.filterDropdown}
              onRenderPlaceHolder={(props: IDropdownProps) => this._renderFilterPlaceholder(props)}
              selectedKey={this.state.size}
              options={[
                { key: 'All', text: strings.SizeOptionAll },
                { key: 'Small', text: strings.SizeOptionSmall },
                { key: 'Medium', text: strings.SizeOptionMedium },
                { key: 'Large', text: strings.SizeOptionLarge },
                { key: 'Wallpaper', text: strings.SizeOptionExtraLarge }
              ]}
              onChanged={(option: IDropdownOption, index?: number) => this._handleChangeSize(option)}
            />
            <Dropdown
              className={styles.filterDropdown}
              onRenderPlaceHolder={(props: IDropdownProps) => this._renderFilterPlaceholder(props)}
              selectedKey={this.state.aspect}
              options={[
                { key: 'All', text: strings.LayoutOptionAll },
                { key: 'Square', text: strings.LayoutOptionSquare },
                { key: 'Wide', text: strings.LayoutOptionWide },
                { key: 'Tall', text: strings.LayoutOptionTall },
              ]}
              onChanged={(option: IDropdownOption, index?: number) => this._handleChangeLayout(option)}
            />
            <Dropdown
              className={styles.filterDropdown}
              onRenderPlaceHolder={(props: IDropdownProps) => this._renderFilterPlaceholder(props)}
              selectedKey={license}
              options={[
                { key: 'All', text: strings.LicenseOptionAll },
                { key: 'Any', text: strings.LicenseOptionAny }
              ]}
              onChanged={(option: IDropdownOption, index?: number) => this._handleChangeLicense(option)}
            />
          </div>
        }
      </div>);
  }

  /**
   * Handles when a user changes the size drop down.
   * Resubmits search query
   */
  private _handleChangeSize = (option: IDropdownOption): void => {
    this.setState({
      size: option.key as ImageSize
    }, () => this._getSearchResults());
  }

  /**
   * Handles when user selects a new layout from the drop down.
   * Resubmits search query.
   */
  private _handleChangeLayout = (option: IDropdownOption): void => {
    this.setState({
      aspect: option.key as ImageAspect
    }, () => this._getSearchResults());
  }

  /**
   * Handles when a user changes the license from the drop down
   * Resubits search query
   */
  private _handleChangeLicense = (option: IDropdownOption): void => {
    this.setState({
      license: option.key as ImageLicense
    }, () => this._getSearchResults());
  }

  /**
   * Renders the drop down placeholders
   */
  private _renderFilterPlaceholder = (props: IDropdownProps): JSX.Element => {
    // return <span>{props.placeholder}</span>;
    return <span>Pick the value</span>;
  }

  /**
   * Handles when user triggers search query
   */
  private _handleSearch = (newQuery?: string): void => {
    this.setState({
      query: newQuery
    }, () => this._getSearchResults());
  }

  /**
   * Handles when user closes search pane
   */
  private _handleClose = (): void => {
    this.props.onClose();
  }

  /**
   * Handes when user saves selection
   * Calls property pane file picker's save function
   */
  private _handleSave = (): void => {
    this.props.onSave([this.state.filePickerResult]);
  }

  /**
   * Creates a reference to the list
   */
  private _linkElement = (e: List): void => {
    this._listElem = e;
  }
}
