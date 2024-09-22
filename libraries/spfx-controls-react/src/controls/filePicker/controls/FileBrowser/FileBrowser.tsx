import * as React from 'react';
import { IFile, FilesQueryResult } from '../../../../services/FileBrowserService.types';
import { GeneralHelper, sortDate, sortString } from '../../../../common/utilities/GeneralHelper';
import { LoadingState } from './IFileBrowserState';
import { TilesList } from '../TilesList/TilesList';
import { IFilePickerResult } from '../../FilePicker.types';
import { IFileBrowserProps } from './IFileBrowserProps';
import { IFileBrowserState } from './IFileBrowserState';
import { ViewType } from './FileBrowser.types';
import { Spinner } from '@fluentui/react/lib/Spinner';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn, IDetailsRowProps, DetailsRow } from '@fluentui/react/lib/DetailsList';
import { CommandBar, ICommandBarItemProps } from '@fluentui/react/lib/CommandBar';
import { IContextualMenuItem } from '@fluentui/react/lib/ContextualMenu';
import { ScrollablePane } from '@fluentui/react/lib/ScrollablePane';

import styles from './FileBrowser.module.scss';
import * as strings from 'ControlStrings';
import { FileTypeIcon } from '../../../fileTypeIcon/FileTypeIcon';
import { IconType, ImageSize } from '../../../fileTypeIcon';

const LAYOUT_STORAGE_KEY: string = 'comparerSiteFilesLayout';

export class FileBrowser extends React.Component<IFileBrowserProps, IFileBrowserState> {
  private _selection: Selection;
  constructor(props: IFileBrowserProps) {
    super(props);

    // If possible, load the user's favourite layout
    const lastLayout: ViewType = localStorage ?
      localStorage.getItem(LAYOUT_STORAGE_KEY) as ViewType
      : 'list' as ViewType;

    const columns: IColumn[] = [
      {
        key: 'column1',
        name: 'Type',
        ariaLabel: strings.TypeAriaLabel,
        iconName: 'Page',
        isIconOnly: true,
        fieldName: 'docIcon',
        headerClassName: styles.iconColumnHeader,
        minWidth: 20,
        maxWidth: 20,
        onColumnClick: this._onColumnClick,
        onRender: (item: IFile) => {
          // const folderIcon: string = strings.FolderIconUrl;
          // // TODO: Improve file icon URL
          // const isPhoto = GeneralHelper.isImage(item.name);
          // let fileType = item.fileType;
          // if (fileType.toLowerCase() === 'aspx') {
          //   fileType = 'html';
          // }
          // const iconUrl = isPhoto ? strings.PhotoIconUrl : `https://spoprod-a.akamaihd.net/files/odsp-next-prod_2019-01-11_20190116.001/odsp-media/images/itemtypes/20_2x/${fileType}.png`;

          // const altText: string = item.isFolder ? strings.FolderAltText : strings.ImageAltText.replace('{0}', item.fileType);
          // return <div className={styles.fileTypeIcon}>
          //   <img src={item.isFolder ? folderIcon : iconUrl} className={styles.fileTypeIconIcon} alt={altText} title={altText} />
          // </div>;
          if (item.isFolder) {
            return <div className={styles.fileTypeIcon}>
              <img src={strings.FolderIconUrl} className={styles.fileTypeIconIcon} alt={strings.FolderAltText} title={strings.FolderAltText} />
            </div>;
          }
          return <FileTypeIcon type={IconType.image} path={item.serverRelativeUrl} size={ImageSize.normal} />;
        }
      },
      {
        key: 'column2',
        name: strings.NameField,
        fieldName: 'name',
        minWidth: 210,
        isRowHeader: true,
        isResizable: true,
        isSorted: true,
        isSortedDescending: false,
        sortAscendingAriaLabel: strings.SortedAscending,
        sortDescendingAriaLabel: strings.SortedDescending,
        onColumnClick: this._onColumnClick,
        data: 'string',
        isPadded: true,
        onRender: (item: IFile) => {
          if (item.isFolder) {
            return <span className={styles.folderItem} onClick={(_event) => this._handleOpenFolder(item)}>{item.name}</span>;
          } else {
            return <span className={styles.fileItem}>{item.name}</span>;
          }
        },
      },
      {
        key: 'column3',
        name: strings.ModifiedField,
        fieldName: 'modified',
        minWidth: 120,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'date',
        onRender: (item: IFile) => {
          //const dateModified = moment(item.modified).format(strings.DateFormat);
          return <span>{item.modified}</span>;
        },
        isPadded: true
      },
      {
        key: 'column4',
        name: strings.ModifiedByField,
        fieldName: 'modifiedBy',
        minWidth: 120,
        isResizable: true,
        data: 'string',
        onColumnClick: this._onColumnClick,
        onRender: (item: IFile) => {
          return <span>{item.modifiedBy}</span>;
        },
        isPadded: true
      },
      {
        key: 'column5',
        name: strings.FileSizeField,
        fieldName: 'fileSize',
        minWidth: 70,
        maxWidth: 90,
        isResizable: true,
        data: 'number',
        onColumnClick: this._onColumnClick,
        onRender: (item: IFile) => {
          return <span>{item.fileSize ? GeneralHelper.formatBytes(item.fileSize, 1) : undefined}</span>;
        }
      }
    ];

    this.state = {
      columns: columns,
      items: [],
      nextPageQueryString: null,
      loadingState: LoadingState.loading,
      selectedView: lastLayout,
      filePickerResults: []
    };
  }

  /**
   * Gets the list of files when settings change
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IFileBrowserProps, prevState: IFileBrowserState): void {

    if (this.props.folderPath !== prevProps.folderPath) {
      this._selection.setAllSelected(false);
      this._getListItems().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
    }
  }

  /**
   * Gets the list of files when tab first loads
   */
  public componentDidMount(): void {
    this._getListItems().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
    this._selection = new Selection({
      selectionMode: SelectionMode.multiple,
      onSelectionChanged: this._itemSelectionChanged
    });
  }

  public render(): React.ReactElement<IFileBrowserProps> {
    return (
      <div>
        {
          (this.state.items && this.state.items.length > 0 && this.state.loadingState !== LoadingState.loading) &&
          <div>
            <div className={styles.itemPickerTopBar}>
              <CommandBar
                items={this._getToolbarItems()}
                farItems={this.getFarItems()}
              />
            </div>
            <div className={styles.scrollablePaneWrapper}>
              <ScrollablePane>

                {
                  this.state.selectedView !== 'tiles' ?
                    (
                      <DetailsList
                        items={this.state.items}
                        compact={this.state.selectedView === 'compact'}
                        columns={this.state.columns}
                        selectionMode={SelectionMode.multiple}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        selection={this._selection}
                        selectionPreservedOnEmptyClick={true}
                        enterModalSelectionOnTouch={true}
                        onRenderRow={this._onRenderRow}
                        onRenderMissingItem={() => { this._loadNextDataRequest().then(() => { /* no-op; */ }).catch(() => { /* no-op; */ }); return null; }}
                      />) :
                    (<TilesList
                      fileBrowserService={this.props.fileBrowserService}
                      filePickerResults={this.state.filePickerResults ? this.state.filePickerResults : null}
                      selection={this._selection}
                      items={this.state.items}
                      onFolderOpen={this._handleOpenFolder}
                      onFileSelected={this._itemSelectionChanged}
                      onNextPageDataRequest={this._loadNextDataRequest}
                    />)
                }
              </ScrollablePane>
            </div>
          </div>
        }

        {
          (this.state.loadingState === LoadingState.idle && (!this.state.items || this.state.items.length <= 0)) &&
          /* Render information about empty folder */
          this._renderEmptyFolder()
        }

        {
          this.state.loadingState !== LoadingState.idle &&
          <Spinner label={strings.Loading} />
        }
      </div>
    );
  }

  /**
   * Triggers paged data load
   */
  private _loadNextDataRequest = async (): Promise<void> => {
    if (this.state.loadingState === LoadingState.idle) {
      // Load next list items from next page
      await this._getListItems(true);
    }
  }

  /**
  * Renders a placeholder to indicate that the folder is empty
  */
  private _renderEmptyFolder = (): JSX.Element => {
    return (
      <div className={styles.emptyFolder}>
        <div className={styles.emptyFolderImage}>
          <img
            className={styles.emptyFolderImageTag}
            src={strings.OneDriveEmptyFolderIconUrl}
            alt={strings.OneDriveEmptyFolderAlt} />
        </div>
        <div role="alert">
          <div className={styles.emptyFolderTitle}>
            {strings.OneDriveEmptyFolderTitle}
          </div>
          <div className={styles.emptyFolderSubText}>
            <span className={styles.emptyFolderPc}>
              {strings.OneDriveEmptyFolderDescription}
            </span>
            {/* Removed until we add support to upload */}
            {/* <span className={styles.emptyFolderMobile}>
            Tap <Icon iconName="Add" className={styles.emptyFolderIcon} /> to add files here.
        </span> */}
          </div>
        </div>
      </div>
    );
  }

  /**
   * Renders row with file or folder style.
   */
  private _onRenderRow = (props: IDetailsRowProps): JSX.Element => {
    const fileItem: IFile = props.item;
    return <DetailsRow {...props} className={fileItem.isFolder ? styles.folderRow : styles.fileRow} />;
  }

  /**
   * Get the list of toolbar items on the left side of the toolbar.
   * We leave it empty for now, but we may add the ability to upload later.
   */
  private _getToolbarItems = (): ICommandBarItemProps[] => {
    return [

    ];
  }

  private getFarItems = (): ICommandBarItemProps[] => {
    const { selectedView } = this.state;

    let viewIconName: string = undefined;
    let viewName: string = undefined;
    switch (this.state.selectedView) {
      case 'list':
        viewIconName = 'List';
        viewName = strings.ListLayoutList;
        break;
      case 'compact':
        viewIconName = 'AlignLeft';
        viewName = strings.ListLayoutCompact;
        break;
      default:
        viewIconName = 'GridViewMedium';
        viewName = strings.ListLayoutTile;
    }

    const farItems: ICommandBarItemProps[] = [
      {
        key: 'listOptions',
        className: styles.commandBarNoChevron,
        title: strings.ListOptionsTitle,
        ariaLabel: strings.ListOptionsAlt.replace('{0}', viewName),
        iconProps: {
          iconName: viewIconName
        },
        iconOnly: true,
        subMenuProps: {
          items: [
            {
              key: 'list',
              name: strings.ListLayoutList,
              iconProps: {
                iconName: 'List'
              },
              canCheck: true,
              checked: this.state.selectedView === 'list',
              ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutList).replace('{1}', selectedView === 'list' ? strings.Selected : undefined),
              title: strings.ListLayoutListDescrition,
              onClick: (_ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => this._handleSwitchLayout(item)
            },
            {
              key: 'compact',
              name: strings.ListLayoutCompact,
              iconProps: {
                iconName: 'AlignLeft'
              },
              canCheck: true,
              checked: this.state.selectedView === 'compact',
              ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutCompact).replace('{1}', selectedView === 'compact' ? strings.Selected : undefined),
              title: strings.ListLayoutCompactDescription,
              onClick: (_ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => this._handleSwitchLayout(item)
            },
            {
              key: 'tiles',
              name: 'Tiles',
              iconProps: {
                iconName: 'GridViewMedium'
              },
              canCheck: true,
              checked: this.state.selectedView === 'tiles',
              ariaLabel: strings.ListLayoutAriaLabel.replace('{0}', strings.ListLayoutTile).replace('{1}', selectedView === 'tiles' ? strings.Selected : undefined),
              title: strings.ListLayoutTileDescription,
              onClick: (_ev?: React.MouseEvent<HTMLElement> | React.KeyboardEvent<HTMLElement>, item?: IContextualMenuItem) => this._handleSwitchLayout(item)
            }
          ]
        }
      }
    ];
    return farItems;
  }

  /**
   * Called when users switch the view
   */
  private _handleSwitchLayout = (item?: IContextualMenuItem): void => {
    if (item) {
      // Store the user's favourite layout
      if (localStorage) {
        localStorage.setItem(LAYOUT_STORAGE_KEY, item.key);
      }

      this.setState({
        selectedView: item.key as ViewType
      });
    }
  }

  /**
   * Gratuitous sorting
   */
  private _onColumnClick = (event: React.MouseEvent<HTMLElement>, column: IColumn): void => {
    const { columns } = this.state;
    let { items } = this.state;
    let isSortedDescending = column.isSortedDescending;

    // If we've sorted this column, flip it.
    if (column.isSorted) {
      isSortedDescending = !isSortedDescending;
    }

    const updatedColumns: IColumn[] = columns.map(col => {
      col.isSorted = col.key === column.key;

      if (col.isSorted) {
        col.isSortedDescending = isSortedDescending;
      }

      return col;
    });

    if (!this.state.nextPageQueryString) { // all items have been loaded to the client
      // Sort the items.
      items = items.concat([]).sort((a, b) => {
        if (a.isFolder && !b.isFolder) {
          return 1;
        }
        else if (!a.isFolder && b.isFolder) {
          return -1;
        }
        let firstValue = a[column.fieldName] || '';
        let secondValue = b[column.fieldName] || '';

        if (column.data === 'string') {
          return sortString(firstValue, secondValue, isSortedDescending);
        }
        else if (column.data === 'date') {
          return sortDate(firstValue, secondValue, isSortedDescending);
        }
        else if (column.data === 'number') {
          firstValue = parseFloat(firstValue);
          secondValue = parseFloat(secondValue);
        }

        return isSortedDescending ? secondValue - firstValue : firstValue - secondValue;
      });

      // Reset the items and columns to match the state.
      this.setState({
        items: items,
        columns: updatedColumns
      });
    }
    else {
      this.setState({
        items: [],
        columns: updatedColumns
      }, () => {
        this._getListItems(false).then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
      });
    }
  }

  /**
   * When a folder is opened, calls parent tab to navigate down
   */
  private _handleOpenFolder = (item: IFile): void => {
    // De-select the list item that was clicked, the item in the same position
    this._selection.setAllSelected(false);
    // item in the folder will appear selected
    this.setState({
      loadingState: LoadingState.loading,
      filePickerResults: undefined
    }, () => { this.props.onOpenFolder(item); });
  }

  /**
   * Handles selected item change
   */
  private _itemSelectionChanged = (): void => {
    const filePickerResults: IFilePickerResult[] = [];
    this._selection.getSelection().map((item: IFile, index: number) => {
      if (!item.isFolder) {
        filePickerResults.push({
          fileAbsoluteUrl: item.absoluteUrl,
          fileName: GeneralHelper.getFileNameFromUrl(item.name),
          fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(item.name),
          spItemUrl: item.spItemUrl,
          downloadFileContent: null
        });
      }
    });

    this.props.onChange(filePickerResults);
    this.setState({ filePickerResults });
  }

  /**
   * Gets all files in a library with a matchihg path
   */
  private async _getListItems(concatenateResults: boolean = false): Promise<void> {
    const { libraryUrl, folderPath, accepts, fileBrowserService } = this.props;
    const { items } = this.state;
    let nextPageQueryString = this.state.nextPageQueryString;

    let filesQueryResult: FilesQueryResult = { items: [], nextHref: null };
    const loadingState = concatenateResults ? LoadingState.loadingNextPage : LoadingState.loading;
    // If concatenate results is set to false -> it's needed to load new data without nextPageUrl
    nextPageQueryString = concatenateResults ? nextPageQueryString : null;

    try {
      this.setState({
        loadingState,
        nextPageQueryString
      });

      let sortField: string | undefined = undefined;
      let isDesc: boolean | undefined = undefined;

      const sortByCol = this.state.columns.filter(c => c.isSorted)[0];
      if (sortByCol) {
        sortField = fileBrowserService.getSPFieldNameForFileProperty(sortByCol.fieldName);
        isDesc = !!sortByCol.isSortedDescending;
      }

      // Load files in the folder
      filesQueryResult = await this.props.fileBrowserService.getListItems(libraryUrl, folderPath, accepts, nextPageQueryString, sortField, isDesc);
    } catch (error) {
      filesQueryResult.items = null;
      console.error(error.message);
    } finally {


      // Remove the null mark from the end of the items array
      if (concatenateResults && items && items.length > 0 && items[items.length - 1] === null) {
        // Remove the null mark
        items.splice(items.length - 1, 1);
      }
      //concatenate results
      const newItems = concatenateResults ? items.concat(filesQueryResult.items) : filesQueryResult.items;

      // If there are more items to load -> add null mark at the end of the array
      if (filesQueryResult.nextHref) {
        newItems.push(null);
      }

      this._selection.setItems(newItems);

      if (!concatenateResults) {
        // de-select anything that was previously selected
        this._selection.setAllSelected(false);
      }

      this.setState({
        items: newItems,
        nextPageQueryString: filesQueryResult.nextHref,
        // isLoading: false,
        // isLoadingNextPage: false
        loadingState: LoadingState.idle
      });
    }
  }
}
