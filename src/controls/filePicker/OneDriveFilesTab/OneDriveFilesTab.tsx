import * as React from 'react';
import { IOneDriveFilesTabProps, IOneDriveFilesTabState } from '.';
import { IFile } from '../../../services/FileBrowserService.types';
import { OneDriveFilesBreadcrumbItem } from './OneDriveFilesTab.types';
import { findIndex } from '@microsoft/sp-lodash-subset';


import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';
import { FileBrowser } from '../controls';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';

import styles from './OneDriveFilesTab.module.scss';
import * as strings from 'ControlStrings';
import { mergeStyles } from 'office-ui-fabric-react/lib/Styling';

export class OneDriveFilesTab extends React.Component<IOneDriveFilesTabProps, IOneDriveFilesTabState> {
  constructor(props: IOneDriveFilesTabProps) {
    super(props);

    this.state = {
      libraryAbsolutePath: undefined,
      libraryTitle: strings.DocumentLibraries,
      folderPath: undefined,
      folderName: strings.DocumentLibraries,
      breadcrumbItems: []
    };
  }

  public async componentDidMount() {
    const folderPath = await this.props.oneDriveService.getOneDriveRootFolderRelativeUrl();
    const libraryAbsolutePath = await this.props.oneDriveService.getOneDriveRootFolderFullUrl();
    const libraryTitle = await this.props.oneDriveService.getOneDrivePersonalLibraryTitle();

    const oneDriveFolderData: IFile = {
      isFolder: true,
      modified: null,
      absoluteUrl: libraryAbsolutePath,
      name: libraryTitle,
      fileIcon: "",
      serverRelativeUrl: folderPath,
      spItemUrl: "",
      supportsThumbnail: false,
      fileType: ""
    };

    const breadcrumbItems = this.state.breadcrumbItems;
    // Add OneDrive folder as a first node
    const breadcrumbNode: OneDriveFilesBreadcrumbItem = {
      folderData: oneDriveFolderData,
      isCurrentItem: true,
      text: oneDriveFolderData.name,
      key: oneDriveFolderData.absoluteUrl
    };
    breadcrumbNode.onClick = () => { this.onBreadcrumpItemClick(breadcrumbNode); };
    breadcrumbItems.push(breadcrumbNode);

    this.setState({
      libraryAbsolutePath: libraryAbsolutePath,
      folderName: folderPath,
      libraryTitle
    });
  }

  public render(): React.ReactElement<IOneDriveFilesTabProps> {
    const listStyle = mergeStyles({
      flex: "1 1 auto",
      overflowX: "hidden",
      overflowY: "auto"
  });
    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          { /** TODO: Fix breadcrumb styles */}
          <Breadcrumb items={this.state.breadcrumbItems} className={styles.tabHeader}/>
        </div>
        <div className={styles.tabFiles}>
          {this.state.libraryAbsolutePath !== undefined &&
            <FileBrowser
              onChange={(fileUrl: string) => this._handleSelectionChange(fileUrl)}
              onOpenFolder={(folder: IFile) => this._handleOpenFolder(folder, true)}
              fileBrowserService={this.props.oneDriveService}
              libraryName={this.state.libraryTitle}
              folderPath={this.state.folderPath}
              accepts={this.props.accepts} />}
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!this.state.fileUrl}
              onClick={() => this._handleSave()} className={styles.actionButton}>{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  /**
   * Handles breadcrump item click
   */
  private onBreadcrumpItemClick = (node: OneDriveFilesBreadcrumbItem) => {
    let { breadcrumbItems } = this.state;
    let breadcrumbClickedItemIndx = 0;
    // Site node clicked
    if (node.folderData == null) {
      this.setState({
        libraryAbsolutePath: undefined,
        folderPath: undefined,
        folderName: undefined
      });
    }
    // Check if it is folder item
    else if (node.folderData != null) {
      this._handleOpenFolder(node.folderData, false);
      // select which node has been clicked
      breadcrumbClickedItemIndx = findIndex(breadcrumbItems, item => item.folderData && item.folderData.absoluteUrl === node.key);
    }

    // Trim nodes array
    breadcrumbItems = breadcrumbItems.slice(0, breadcrumbClickedItemIndx + 1);
    // Set new current node
    breadcrumbItems[breadcrumbItems.length - 1].isCurrentItem = true;

    this.setState({
      breadcrumbItems,
      fileUrl: undefined
    });
  }

  /**
   * Is called when user selects a different file
   */
  private _handleSelectionChange = (imageUrl: string) => {
    this.setState({
      fileUrl: imageUrl
    });
  }

  /**
   * Called when user saves
   */
  private _handleSave = () => {
    this.props.onSave(encodeURI(this.state.fileUrl));
  }

  /**
   * Called when user closes tab
   */
  private _handleClose = () => {
    this.props.onClose();
  }

  /**
   * Triggered when user opens a file folder
   */
  private _handleOpenFolder = (folder: IFile, addBreadcrumbNode: boolean) => {
    const { breadcrumbItems } = this.state;

    if (addBreadcrumbNode) {
      breadcrumbItems.map(item => item.isCurrentItem = false);
      const breadcrumbNode: OneDriveFilesBreadcrumbItem = {
        folderData: folder,
        isCurrentItem: true,
        text: folder.name,
        key: folder.absoluteUrl
      };
      breadcrumbNode.onClick = () => { this.onBreadcrumpItemClick(breadcrumbNode); };
      breadcrumbItems.push(breadcrumbNode);
    }

    this.setState({
      folderPath: folder.serverRelativeUrl,
      folderName: folder.name,
      libraryAbsolutePath: folder.absoluteUrl,
      breadcrumbItems
    });
  }
}
