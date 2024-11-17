import * as React from 'react';
import styles from './FolderExplorer.module.scss';
import * as strings from 'ControlStrings';
import { Icon } from "@fluentui/react/lib/Icon";
import { IFolderExplorerProps, IFolderExplorerState } from '.';
import { FolderExplorerService } from '../../../services/FolderExplorerService';
import { IFolder, IFolderExplorerService } from '../../../services/IFolderExplorerService';
import { NewFolder } from "../NewFolder";
import { Breadcrumb, IBreadcrumbItem } from "@fluentui/react/lib/Breadcrumb";
import * as telemetry from '../../../common/telemetry';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { IFileInfo } from '@pnp/sp/files';


export class FolderExplorer extends React.Component<IFolderExplorerProps, IFolderExplorerState> {

  private _spService: IFolderExplorerService;
  private _allLibraries: IFolder[] = [];
  private _allFolders: IFolder[] = [];
  private _allFiles: IFileInfo[] = [];

  constructor(props: IFolderExplorerProps) {
    super(props);

    telemetry.track('FolderExplorer');

    this._spService = new FolderExplorerService(this.props.context.serviceScope);

    this.state = {
      foldersLoading: false,
      folders: [],
      files: [],
      selectedFolder: null,
    };
  }

  public async componentDidMount(): Promise<void> {
    const targetFolder = this.props.defaultFolder ? this.props.defaultFolder : this.props.rootFolder;
    const siteAbsoluteUrl: string = this.props.siteAbsoluteUrl || this.props.context.pageContext.web.absoluteUrl;
    // get libraries if site absolute url does not end with folder relative url - if not retrieving document libraries by default
    if (siteAbsoluteUrl.lastIndexOf(targetFolder.ServerRelativeUrl, siteAbsoluteUrl.length - targetFolder.ServerRelativeUrl.length) === -1) {
      this._allLibraries = await this._spService.GetDocumentLibraries(siteAbsoluteUrl);
    }
    await this._getFolders(targetFolder);

  }

  public render(): React.ReactElement<IFolderExplorerProps> {
    const siteAbsoluteUrl: string = this.props.siteAbsoluteUrl || this.props.context.pageContext.web.absoluteUrl;
    return (
      <div>
        {!this.props.hiddenBreadcrumb &&
          this._getBreadcrumbDOM()
        }
        <div style={{ opacity: this.state.foldersLoading ? 0.8 : 1, }}>
          {!this.props.hiddenFilterBox && this._allFolders.length > 0 &&
            <div>
              <SearchBox className={styles.filterBox} placeholder={strings.FolderFilterBoxPlaceholder} onSearch={this._onChangeFilterText} onChange={(e, value) =>this._onChangeFilterText(value)} />
            </div>
          }
          {this.state.folders.length === 0 &&
            <div className={styles.status}>
              <span role="status">{this.state.foldersLoading ? strings.FolderExplorerLoading : strings.FolderExplorerNoItems}</span>
            </div>
          }
          {this.state.folders.length > 0 &&
            <div>
              {this.state.folders.map((folder) => {
                return (
                  <div className={styles.libraryItem} key={folder.ServerRelativeUrl} onClick={() => { this._getFolders(folder).then(() => { /* no-op; */ }).catch(() => { /* no-op; */ }); }}>
                    <Icon iconName="FabricFolder" className={styles.icon} />
                    {folder.Name}
                  </div>
                );
              })
              }
            </div>
          }
          {this.props.canCreateFolders && (this.state.selectedFolder && this.state.selectedFolder.ServerRelativeUrl !== this.props.context.pageContext.web.serverRelativeUrl) &&
            <NewFolder context={this.props.context}
              siteAbsoluteUrl={siteAbsoluteUrl}
              selectedFolder={this.state.selectedFolder}
              addSubFolder={this._addSubFolder} />
          }
          {this.state.files.length > 0 &&
            <div>
              {this.state.files.map((file) => {
                return (
                  <div className={styles.libraryItem} key={file.ServerRelativeUrl} onClick={() => this.props.onFileClick ? this.props.onFileClick(file) : null} >
                    <Icon iconName="FileASPX" className={styles.icon} />
                    {file.Name}
                  </div>
                );
              })
              }
            </div>
          }
        </div>
      </div>
    );

  }

  /**
 * Get HTML elements for rendering breadcrumb
 */
  private _getBreadcrumbDOM = (): JSX.Element => {
    let breadCrumbDOM = null;

    const breadCrumbItems = this._getCurrentBreadcrumbItems();
    const overflowIndex = breadCrumbItems.length > 1 ? 1 : 0;
    breadCrumbDOM = <Breadcrumb items={breadCrumbItems} className={styles.breadcrumbPath} maxDisplayedItems={3} overflowIndex={overflowIndex} />;

    return breadCrumbDOM;
  }

  /**
 * Get breadcrumb items
 * @returns an array of IBreadcrumbItem objects
 */
  private _getCurrentBreadcrumbItems = (): IBreadcrumbItem[] => {
    let items: IBreadcrumbItem[] = [];

    if (this.props.initialBreadcrumbItems) {
      items = [...this.props.initialBreadcrumbItems];
    }

    const rootItem: IBreadcrumbItem = { text: this.props.rootFolder.Name, key: 'Root-Item', onClick: this._getFolders.bind(this, this.props.rootFolder) };
    items.push(rootItem);

    if (this.state.selectedFolder && this.state.selectedFolder.ServerRelativeUrl !== this.props.rootFolder.ServerRelativeUrl) {
      const folderPathSplit = this.state.selectedFolder.ServerRelativeUrl.replace(this.props.rootFolder.ServerRelativeUrl, '').split('/');
      let folderPath = this.props.rootFolder.ServerRelativeUrl;
      folderPathSplit.forEach((folderName, index) => {
        if (folderName !== '') {
          folderPath += '/' + folderName;
          let itemText = folderName;
          // check if library and if so use the Title of the library that was retrieved in case it's not the same as the url part
          const lib = this._allLibraries.filter(l => l.ServerRelativeUrl === folderPath);
          if (lib.length === 1) {
            itemText = lib[0].Name;
          }

          const folderItem: IBreadcrumbItem = { text: itemText, key: `Folder-${index.toString()}`, onClick: this._getFolders.bind(this, { Name: folderName, ServerRelativeUrl: folderPath }) };
          items.push(folderItem);
        }
      });
    }

    items[items.length - 1].isCurrentItem = true;
    return items;
  }

  /**
 * Filter list of folders based on user input
 * @param filterText - The text to use when filtering the collection
 */
  private _onChangeFilterText = (filterText: string): void => {
    this.setState({
      folders: filterText ? this._allFolders.filter(f => f.Name.toLowerCase().indexOf(filterText.toLowerCase()) > -1) : this._allFolders
    });
  }

  /**
* Load sub folders and files within a given folder
* @param folder - Name of the folder
*/
  private _getFolders = async (folder: IFolder): Promise<void> => {

    this.setState({ foldersLoading: true });
    try {

      const siteAbsoluteUrl: string = this.props.siteAbsoluteUrl || this.props.context.pageContext.web.absoluteUrl;
      // check if absolute url ends with relative url to know if we are at the site level
      if (siteAbsoluteUrl.lastIndexOf(folder.ServerRelativeUrl, siteAbsoluteUrl.length - folder.ServerRelativeUrl.length) !== -1) {
        // site level, get libraries
        if (this._allLibraries.length > 0) {
          this._allFolders = [...this._allLibraries];
        } else {
          this._allLibraries = await this._spService.GetDocumentLibraries(siteAbsoluteUrl);
          this._allFolders = [...this._allLibraries];
        }
      } else {
        // library/folder level, get folders
        const orderBy = this.props.orderby !== undefined ? this.props.orderby : 'Name';
        const orderAscending = this.props.orderAscending !== undefined ? this.props.orderAscending : true;
        this._allFolders = await this._spService.GetFolders(siteAbsoluteUrl, folder.ServerRelativeUrl, orderBy, orderAscending);
        if (this.props.showFiles) {
          this._allFiles = await this._spService.GetFiles(siteAbsoluteUrl, folder.ServerRelativeUrl, orderBy, orderAscending);
        }
      }
      this.setState({ folders: this._allFolders, files: this._allFiles, selectedFolder: folder, foldersLoading: false });

      // callback to parent component
      this.props.onSelect(folder);

    } catch (error) {
      this.setState({ selectedFolder: null, foldersLoading: false });
      console.error(error);
    }
  }

  /**
  * Add new subfolder to current folder
  */
  private _addSubFolder = async (newFolder: IFolder): Promise<void> => {
    if (newFolder) {

      // add folder if a folder with the same name does not exist yet
      if (!this._allFolders.some(f => f.Name === newFolder.Name)) {
        // update both list of folders
        this._allFolders.push(newFolder);
        this.setState({
          folders: this._allFolders
        });
      }
    }
  }
}
