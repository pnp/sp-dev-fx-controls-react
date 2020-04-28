import * as React from 'react';
import { Icon, IIconProps } from 'office-ui-fabric-react/lib/Icon';
import { IconButton } from 'office-ui-fabric-react/lib/Button';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Spinner, SpinnerSize } from "office-ui-fabric-react/lib/Spinner";
import styles from './NewFolder.module.scss';
import * as strings from 'ControlStrings';
import { INewFolderProps, INewFolderState } from '.';
import { FolderExplorerService } from '../../../services/FolderExplorerService';
import { IFolder, IFolderExplorerService } from '../../../services/IFolderExplorerService';

const addIcon: IIconProps = { iconName: 'CheckMark' };

export class NewFolder extends React.Component<INewFolderProps, INewFolderState> {

  private _spService: IFolderExplorerService;

  constructor(props: INewFolderProps) {
    super(props);

    this._spService = new FolderExplorerService(this.props.context.serviceScope);

    this.state = {
      folderName: '',
      showInput: false,
      loading: false,
    };
  }


  public render(): React.ReactElement<INewFolderProps> {
    return (
      <div className={styles.libraryItem}>
        {this.state.loading &&
          <span className={styles.spinner}><Spinner size={SpinnerSize.xSmall} /></span>
        }
        {!this.state.loading &&
          <Icon iconName="FabricNewFolder" className={styles.folderIcon}></Icon>
        }
        {!this.state.showInput &&
          <div className={styles.defaultText} onClick={this._onShowInputChange}>New folder</div>
        }
        {this.state.showInput &&
          <TextField
            placeholder={strings.NewFolderNamePlaceholder}
            value={this.state.folderName}
            onChanged={this._onFolderNameChange}
          // styles={{ fieldGroup: { width: 300 } }}
          />
        }
        {this.state.folderName.length > 0 &&
          <IconButton
            iconProps={addIcon}
            title="Add"
            ariaLabel="Add"
            className={styles.button}
            disabled={this.state.loading}
            onClick={this._addSubFolder} />
        }
      </div>
    );
  }

  private _onFolderNameChange = (newValue?: string) => {
    this.setState({ folderName: newValue || '' });
  }

  private _onShowInputChange = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({ showInput: true });
  }

  /**
 * Add new subfolder to current folder
 */
  private _addSubFolder = async (): Promise<void> => {

    let newFolder: IFolder = null;

    this.setState({ loading: true });

    try {
      const siteAbsoluteUrl = this.props.siteAbsoluteUrl || this.props.context.pageContext.web.absoluteUrl;

      const folder = await this._spService.AddFolder(
        siteAbsoluteUrl,
        this.props.selectedFolder.ServerRelativeUrl,
        this.state.folderName);

      // update folder variable to be used on the callback
      newFolder = { Name: folder.Name, ServerRelativeUrl: folder.ServerRelativeUrl };
      // update return variable

      this.setState({ loading: false, folderName: '' });

    } catch (error) {
      console.error('Error adding folder', error);
    }

    // callback
    this.props.addSubFolder(newFolder);
  }
}
