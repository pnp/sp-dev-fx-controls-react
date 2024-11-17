import * as React from 'react';
import styles from './FolderPicker.module.scss';
import { IFolderPickerProps, IFolderPickerState } from '.';
import { IFolder } from '../../services/IFolderExplorerService';
import { IconButton, PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Label } from '@fluentui/react/lib/Label';
import { Link } from '@fluentui/react/lib/Link';
import { getId } from '@fluentui/react/lib/Utilities';
import { Panel, PanelType } from '@fluentui/react/lib/Panel';
import { FolderExplorer } from '../folderExplorer/FolderExplorer';
import * as telemetry from '../../common/telemetry';


export class FolderPicker extends React.Component<IFolderPickerProps, IFolderPickerState> {

  private _folderLinkId = getId('folderLink');
  private _selectedFolder: IFolder;

  constructor(props: IFolderPickerProps) {
    super(props);

    telemetry.track('ReactFolderPicker', {});

    this.state = {
      showPanel: false,
      selectedFolder: this.props.defaultFolder
    };
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IFolderPickerProps): void {

    this.setState({
      selectedFolder: nextProps.defaultFolder,
    });

  }

  public render(): React.ReactElement<IFolderPickerProps> {
    return (
      <div>
        {this.props.label &&
          <Label className={this.props.required ? styles.required : ''} htmlFor={this._folderLinkId}>{this.props.label}</Label>
        }
        <div className={styles.folderPicker}>
          <div className={styles.selection}>
            {!this.state.selectedFolder &&
              <span className={styles.selectFolderLabel}>Select a folder</span>
            }
            {this.state.selectedFolder &&
              <div className={styles.selectFolder}>
                <Link className={styles.selectedLink} target='_blank' data-interception="off" id={this._folderLinkId} href={this.state.selectedFolder.ServerRelativeUrl}>
                  <span title={this.state.selectedFolder.Name}>{this.state.selectedFolder.Name}</span>
                </Link>
                <IconButton
                  iconProps={{ iconName: 'Cancel' }}
                  title="Delete selection"
                  ariaLabel="Delete selection"
                  onClick={this._resetSelection}
                  disabled={this.props.disabled}
                />
              </div>
            }
          </div>
          <div className={styles.selectButton}>
            <IconButton
              iconProps={{ iconName: 'FolderList' }}
              title="Select folder"
              ariaLabel="Select folder"
              disabled={this.props.disabled}
              onClick={this._showPanel}
            />
          </div>
        </div>

        <Panel
          isOpen={this.state.showPanel}
          type={PanelType.medium}
          onDismiss={this._hidePanel}
          headerText="Select folder"
          closeButtonAriaLabel="Close"
          onRenderFooterContent={this._onRenderFooterContent}
        >
          <div>
            <FolderExplorer
              context={this.props.context}
              rootFolder={this.props.rootFolder}
              defaultFolder={this.state.selectedFolder}
              onSelect={this._onFolderSelect}
              canCreateFolders={this.props.canCreateFolders}
              siteAbsoluteUrl={this.props.siteAbsoluteUrl}
            />
          </div>
        </Panel>

      </div>
    );
  }

  private _showPanel = (): void => {
    this.setState({ showPanel: true });
  }

  private _hidePanel = (): void => {
    this.setState({ showPanel: false });
  }

  private _onRenderFooterContent = (): JSX.Element => {
    return (
      <div className={styles.actions}>
        <PrimaryButton iconProps={{ iconName: 'Save' }} onClick={this._onFolderSave}>
          Save
        </PrimaryButton>
        <DefaultButton iconProps={{ iconName: 'Cancel' }} onClick={this._hidePanel}>
          Cancel
        </DefaultButton>
      </div>
    );
  }

  private _onFolderSelect = (folder: IFolder): void => {
    this._selectedFolder = folder;
  }

  private _onFolderSave = (): void => {
    this.setState({
      selectedFolder: this._selectedFolder,
      showPanel: false,
    });

    this.props.onSelect(this._selectedFolder);
  }

  private _resetSelection = (): void => {
    this._selectedFolder = null;

    this.setState({
      selectedFolder: this._selectedFolder,
    });

    this.props.onSelect(this._selectedFolder);
  }



}
