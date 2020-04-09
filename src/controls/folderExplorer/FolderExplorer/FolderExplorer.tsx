import * as React from 'react';
import { TextField } from "office-ui-fabric-react/lib/TextField";
import styles from './FolderExplorer.module.scss';
import * as strings from 'ControlStrings';
import { Icon } from "office-ui-fabric-react/lib/Icon";
import { IFolderExplorerProps, IFolderExplorerState } from '.';
import { FolderExplorerService } from '../../../services/FolderExplorerService';
import { IFolder, IFolderExplorerService } from '../../../services/IFolderExplorerService';
import { NewFolder } from "../NewFolder";
import { Breadcrumb, IBreadcrumbItem } from "office-ui-fabric-react/lib/Breadcrumb";
import * as telemetry from '../../../common/telemetry';


export class FolderExplorer extends React.Component<IFolderExplorerProps, IFolderExplorerState> {

  private _spService: IFolderExplorerService;
  private _allFolders: IFolder[] = [];

  constructor(props: IFolderExplorerProps) {
    super(props);

    telemetry.track('FolderExplorer');

    this._spService = new FolderExplorerService(this.props.context.serviceScope);

    this.state = {
      foldersLoading: false,
      folders: [],
      selectedFolder: null,
    };
  }

  public async componentDidMount() {
    await this._getFolders(this.props.defaultFolder ? this.props.defaultFolder : this.props.rootFolder);
  }

  public render(): React.ReactElement<IFolderExplorerProps> {
    return (
      <div>
        {!this.props.hiddenBreadcrumb &&
          this._getBreadcrumbDOM()
        }
        <div style={{ opacity: this.state.foldersLoading ? 0.8 : 1, }}>
          {!this.props.hiddenFilterBox && this._allFolders.length > 0 &&
            <div>
              <TextField className={styles.filterBox} placeholder={strings.FolderFilterBoxPlaceholder} onChanged={this._onChangeFilterText} />
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
                  <div className={styles.libraryItem} onClick={() => { this._getFolders(folder); }}>
                    <Icon iconName="FabricFolder" className={styles.folderIcon} />
                    {folder.Name}
                  </div>
                );
              })
              }
            </div>
          }
          {this.props.canCreateFolders && (this.state.selectedFolder && this.state.selectedFolder.ServerRelativeUrl !== this.props.context.pageContext.web.serverRelativeUrl) &&
            <NewFolder context={this.props.context}
              selectedFolder={this.state.selectedFolder}
              addSubFolder={this._addSubFolder}></NewFolder>
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

    let breadCrumbItems = this._getCurrentBreadcrumbItems();
    let overflowIndex = breadCrumbItems.length > 1 ? 1 : 0;
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

    let rootItem: IBreadcrumbItem = { text: this.props.rootFolder.Name, key: 'Root-Item', onClick: this._getFolders.bind(this, this.props.rootFolder) };
    items.push(rootItem);

    if (this.state.selectedFolder && this.state.selectedFolder.ServerRelativeUrl !== this.props.rootFolder.ServerRelativeUrl) {
      const folderPathSplit = this.state.selectedFolder.ServerRelativeUrl.replace(this.props.rootFolder.ServerRelativeUrl, '').split('/');
      let folderPath = this.props.rootFolder.ServerRelativeUrl;
      folderPathSplit.forEach((folderName, index) => {
        if (folderName !== '') {
          folderPath += '/' + folderName;
          let folderItem: IBreadcrumbItem = { text: folderName, key: `Folder-${index.toString()}`, onClick: this._getFolders.bind(this, { Name: folderName, ServerRelativeUrl: folderPath }) };
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
      if (this.props.context.pageContext.web.serverRelativeUrl === folder.ServerRelativeUrl) {
        // site level, get libraries
        this._allFolders = await this._spService.GetDocumentLibraries(this.props.context.pageContext.web.absoluteUrl);
      } else {
        // library/folder level, get folders
        this._allFolders = await this._spService.GetFolders(this.props.context.pageContext.web.absoluteUrl, folder.ServerRelativeUrl);
      }
      this.setState({ folders: this._allFolders, selectedFolder: folder, foldersLoading: false });

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
