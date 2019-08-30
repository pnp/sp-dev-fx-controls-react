import * as React from 'react';

// Custom styles
import styles from './FileBrowser.module.scss';

// Custom properties and state
import { IFileBrowserProps, IFileBrowserState, ViewType } from '.';

// Office Fabric
import { Spinner } from 'office-ui-fabric-react/lib/Spinner';
import {
  DetailsList,
  DetailsListLayoutMode,
  Selection,
  SelectionMode,
  IColumn,
  IDetailsRowProps,
  DetailsRow
} from 'office-ui-fabric-react/lib/DetailsList';
import { CommandBar, ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { IContextualMenuItem } from 'office-ui-fabric-react/lib/ContextualMenu';

const LAYOUT_STORAGE_KEY: string = 'comparerSiteFilesLayout';

// Localized strings
import * as strings from 'ControlStrings';

// OneDrive services
import { IFile } from '../../../../services/FileBrowserService.types';
import { OneDriveService } from '../../../../services/OneDriveService';
import { GeneralHelper } from '../../../../Utilities';
import { SPHttpClient } from '@microsoft/sp-http';
import { FileBrowserService } from '../../../../services/FileBrowserService';

/**
 * Renders list of file in a list.
 * I should have used the PnP ListView control, but I wanted specific behaviour that I didn't
 * get with the PnP control.
 */
export class FileBrowser extends React.Component<IFileBrowserProps, IFileBrowserState> {
  private _selection: Selection;
  private _fileBrowserService: FileBrowserService;

  constructor(props: IFileBrowserProps) {
    super(props);

    this._fileBrowserService = new FileBrowserService(props.context);
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
          const iconUrl: string = strings.PhotoIconUrl;
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
            return <span className={styles.folderItem} onClick={(_event) => this._handleOpenFolder(item)}>{item.fileLeafRef}</span>;
          } else {
            return <span className={styles.fileItem}>{item.fileLeafRef}</span>;
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
      onSelectionChanged: () => {

      }
    });

    this.state = {
      columns: columns,
      items: [],
      isLoading: true,
      selectedView: lastLayout
    };
  }

  /**
   * Gets the list of files when settings change
   * @param prevProps
   * @param prevState
   */
  public componentDidUpdate(prevProps: IFileBrowserProps, prevState: IFileBrowserState): void {

    if (this.props.folderPath !== prevProps.folderPath) {
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
    if (this.state.isLoading) {
      return (<Spinner label={strings.Loading} />);
    }

    return (
      <div>
        {
          (this.state.items && this.state.items.length > 0) ?
            <div>
              <div className={styles.itemPickerTopBar}>
                <CommandBar
                  items={this._getToolbarItems()}
                  farItems={this.getFarItems()}
                />
              </div>
              <DetailsList
                items={this.state.items}
                compact={this.state.selectedView === 'compact'}
                columns={this.state.columns}
                selectionMode={SelectionMode.single}
                setKey="set"
                layoutMode={DetailsListLayoutMode.justified}
                isHeaderVisible={true}
                selection={this._selection}
                selectionPreservedOnEmptyClick={true}
                onActiveItemChanged={(item: IFile, index: number, ev: React.FormEvent<Element>) => this._itemChangedHandler(item, index, ev)}
                enterModalSelectionOnTouch={true}
                onRenderRow={this._onRenderRow}
              />
            </div>
            /* Render information about empty folder */
            : this._renderEmptyFolder()
        }
      </div>
    );
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
    // item in the folder will appear selected
    this.setState({
      fileUrl: undefined,
    });
    this.props.onOpenFolder(item);
  }

  /**
   * When user selects an item, save selection
   */
  private _itemChangedHandler = (item: IFile, _index: number, _ev): void => {
    if (item.isFolder) {
      this.setState({
        fileUrl: undefined
      });
      return;
    }

    // Notify parent tab
    const absoluteFileUrl: string = item.absoluteRef;
    this.props.onChange(absoluteFileUrl);
    this.setState({
      fileUrl: absoluteFileUrl
    });
  }

  /**
   * Gets all files in a library with a matchihg path
   */
  private async _getListItems() {
    const { libraryName, folderPath, accepts } = this.props;
    let fileItems: IFile[] = [];
    try {
      this.setState({
        isLoading: true
      });
      // Load files in the folder
      fileItems = await this._fileBrowserService.getListItems(libraryName, folderPath, accepts);
    } catch (error) {
      fileItems = null;
      console.error(error.message);
    } finally {
      // de-select anything that was previously selected
      this._selection.setAllSelected(false);
      this.setState({
        items: fileItems,
        isLoading: false
      });
    }
  }


}
