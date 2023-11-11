import * as React from 'react';
import { Icon, IIconProps } from '@fluentui/react/lib/Icon';
import { IconButton } from '@fluentui/react/lib/Button';
import { TextField } from '@fluentui/react/lib/TextField';
import { Spinner, SpinnerSize } from "@fluentui/react/lib/Spinner";
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

    const {
      folderName,
      errorMessage
    } = this.state;

    const hasError = folderName && /["*:<>?/\\|]/gmi.test(folderName);

    return (
      <div className={styles.libraryItem}>
        {this.state.loading &&
          <span className={styles.spinner}><Spinner size={SpinnerSize.xSmall} styles={{
            root: {
              height: '32px'
            }
          }} /></span>
        }
        {!this.state.loading &&
          <Icon iconName="FabricNewFolder" className={styles.folderIcon} />
        }
        {!this.state.showInput &&
          <div className={styles.defaultText} onClick={this._onShowInputChange}>New folder</div>
        }
        {this.state.showInput &&
          <TextField
            styles={{
              errorMessage: {
                paddingTop: 0
              },
              root: {
                width: '100%'
              }
            }}
            placeholder={strings.NewFolderNamePlaceholder}
            value={folderName}
            onChange={(e, value) => this._onFolderNameChange(value)}
            errorMessage={hasError ? strings.NewFolderIncorrectSymbolsError : errorMessage}
          // styles={{ fieldGroup: { width: 300 } }}
          />
        }
        {this.state.folderName.length > 0 &&
          <IconButton
            iconProps={addIcon}
            title="Add"
            ariaLabel="Add"
            className={styles.button}
            disabled={this.state.loading || hasError}
            onClick={this._addSubFolder} />
        }
      </div>
    );
  }

  private _onFolderNameChange = (newValue?: string): void => {
    this.setState({ folderName: newValue || '', errorMessage: '' });
  }

  private _onShowInputChange = (event: React.MouseEvent<HTMLDivElement>): void => {
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
      this.setState({
        loading: false,
        errorMessage: strings.SomethingWentWrong
      });
    }

    // callback
    this.props.addSubFolder(newFolder).then(() => { /* no-op; */}).catch(() => { /* no-op; */ });
  }
}
