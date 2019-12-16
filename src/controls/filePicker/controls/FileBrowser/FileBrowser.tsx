import * as React from 'react';
import { IFile, FilesQueryResult } from '../../../../services/FileBrowserService.types';
import { GeneralHelper } from '../../../../Utilities';
import { LoadingState } from './IFileBrowserState';
import { TilesList } from '../TilesList/TilesList';
import { IFilePickerResult } from '../../FilePicker.types';
import { IFileBrowserProps, IFileBrowserState, ViewType } from '.';
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import { DetailsList, DetailsListLayoutMode, Selection, SelectionMode, IColumn, IDetailsRowProps, DetailsRow, SelectionZone } from 'office-ui-fabric-react/lib/DetailsList';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';
import { ScrollablePane } from 'office-ui-fabric-react/lib/ScrollablePane';

import styles from './FileBrowser.module.scss';
import * as strings from 'ControlStrings';

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
        minWidth: 16,
        maxWidth: 16,
        onColumnClick: this._onColumnClick,
        onRender: (item: IFile) => {
          const folderIcon: string = strings.FolderIconUrl;
          // TODO: Improve file icon URL
          const isPhoto = GeneralHelper.isImage(item.name);
          const iconUrl = isPhoto ? strings.PhotoIconUrl : `https://spoprod-a.akamaihd.net/files/odsp-next-prod_2019-01-11_20190116.001/odsp-media/images/itemtypes/20_2x/${item.fileType}.png`;

          const altText: string = item.isFolder ? strings.FolderAltText : strings.ImageAltText.replace('{0}', item.fileType);
          return <div className={styles.fileTypeIcon}>
            <img src={item.isFolder ? folderIcon : iconUrl} className={styles.fileTypeIconIcon} alt={altText} title={altText} />
          </div>;
        }
      },
      {
        key: 'column2',
        name: strings.NameField,
        fieldName: 'fileLeafRef',
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
        fieldName: 'dateModifiedValue',
        minWidth: 120,
        isResizable: true,
        onColumnClick: this._onColumnClick,
        data: 'number',
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
        fieldName: 'fileSizeRaw',
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

    this._selection = new Selection({
      selectionMode: SelectionMode.single
    });

    this.state = {
      columns: columns,
      items: [],
      nextPageQueryString: null,
      loadingState: LoadingState.loading,
      selectedView: lastLayout,
      filePickerResult: null
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
      this._getListItems();
    }
  }

  /**
   * Gets the list of files when tab first loads
   */
  public componentDidMount(): void {
    this._getListItems();
  }

  public render(): React.ReactElement<IFileBrowserProps> {
    return (
      <div>
        {
          (this.state.items && this.state.items.length > 0 && this.state.loadingState != LoadingState.loading) &&
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
                        selectionMode={SelectionMode.single}
                        setKey="set"
                        layoutMode={DetailsListLayoutMode.justified}
                        isHeaderVisible={true}
                        selection={this._selection}
                        onActiveItemChanged={(item: IFile, index: number, ev: React.FormEvent<Element>) => this._handleItemInvoked(item)}
                        selectionPreservedOnEmptyClick={true}
                        enterModalSelectionOnTouch={true}
                        onRenderRow={this._onRenderRow}
                        onRenderMissingItem={this._loadNextDataRequest}
                      />) :
                      (<TilesList
                        fileBrowserService={this.props.fileBrowserService}
                        filePickerResult={this.state.filePickerResult}
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
          this.state.loadingState != LoadingState.idle &&
          <Spinner label={strings.Loading} />
        }
      </div>
    );
  }

  /**
   * Triggers paged data load
   */
  private _loadNextDataRequest = async () => {
    if (this.state.loadingState == LoadingState.idle) {
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
  private _handleSwitchLayout = (item?: IContextualMenuItem) => {
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

    // Sort the items.
    items = items!.concat([]).sort((a, b) => {
      const firstValue = a[column.fieldName || ''];
      const secondValue = b[column.fieldName || ''];

      if (isSortedDescending) {
        return firstValue > secondValue ? -1 : 1;
      } else {
        return firstValue > secondValue ? 1 : -1;
      }
    });

    // Reset the items and columns to match the state.
    this.setState({
      items: items,
      columns: columns!.map(col => {
        col.isSorted = col.key === column.key;

        if (col.isSorted) {
          col.isSortedDescending = isSortedDescending;
        }

        return col;
      })
    });
  }

  /**
   * When a folder is opened, calls parent tab to navigate down
   */
  private _handleOpenFolder = (item: IFile) => {
    // De-select the list item that was clicked, the item in the same position
    this._selection.setAllSelected(false);
    // item in the folder will appear selected
    this.setState({
      loadingState: LoadingState.loading,
      filePickerResult: undefined
    }, () => { this.props.onOpenFolder(item); });
  }

  /**
   * Handles selected item change
   */
  private _itemSelectionChanged = (item?: IFile) => {
    let selectedItem: IFile = null;
    // Deselect item
    if (item && this.state.filePickerResult && item.absoluteUrl == this.state.filePickerResult.fileAbsoluteUrl) {
      this._selection.setAllSelected(false);
      selectedItem = null;
    }
    else if (item) {
      const selectedItemIndex = this.state.items.indexOf(item);
      this._selection.selectToIndex(selectedItemIndex);
      selectedItem = item;
    }

    let filePickerResult: IFilePickerResult = null;
    if (selectedItem && !selectedItem.isFolder) {
      filePickerResult = {
        fileAbsoluteUrl: selectedItem.absoluteUrl,
        fileName: GeneralHelper.getFileNameFromUrl(selectedItem.name),
        fileNameWithoutExtension: GeneralHelper.getFileNameWithoutExtension(selectedItem.name),
        spItemUrl: selectedItem.spItemUrl,
        downloadFileContent: null
      };
    }
    this.props.onChange(filePickerResult);
    this.setState({
      filePickerResult
    });
  }

  /**
   * Handles item click.
   */
  private _handleItemInvoked = (item: IFile) => {
   // If a file is selected, open the library
   if (item.isFolder) {
     this._handleOpenFolder(item);
   } else {
     // Otherwise, remember it was selected
     this._itemSelectionChanged(item);
   }
 }

  /**
   * Gets all files in a library with a matchihg path
   */
  private async _getListItems(concatenateResults: boolean = false) {
    const { libraryName, folderPath, accepts } = this.props;
    let { items, nextPageQueryString } = this.state;

    let filesQueryResult: FilesQueryResult = { items: [], nextHref: null };
    const loadingState = concatenateResults ? LoadingState.loadingNextPage : LoadingState.loading;
    // If concatenate results is set to false -> it's needed to load new data without nextPageUrl
    nextPageQueryString = concatenateResults ? nextPageQueryString : null;

    try {
      this.setState({
        loadingState,
        nextPageQueryString
      });
      // Load files in the folder
      filesQueryResult = await this.props.fileBrowserService.getListItems(libraryName, folderPath, accepts, nextPageQueryString);
    } catch (error) {
      filesQueryResult.items = null;
      console.error(error.message);
    } finally {


      // Remove the null mark from the end of the items array
      if (concatenateResults && items && items.length > 0 && items.length[items.length - 1] == null) {
        // Remove the null mark
        items.splice(items.length - 1, 1);
      }
      //concatenate results
      const newItems = concatenateResults ? items.concat(filesQueryResult.items) : filesQueryResult.items;

      // If there are more items to load -> add null mark at the end of the array
      if (filesQueryResult.nextHref != null) {
        newItems.push(null);
      }

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
