import * as React from 'react';
import { findIndex } from '@microsoft/sp-lodash-subset';

// Custom styles
import styles from './SiteFilePickerTab.module.scss';

// Custom picker interface
import { ISiteFilePickerTabProps, ISiteFilePickerTabState, SiteFilePickerBreadcrumbItem } from '.';
import { DocumentLibraryBrowser, FileBrowser, ILibrary } from '../controls';

// Office Fabric
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Breadcrumb } from 'office-ui-fabric-react/lib/Breadcrumb';

// Localized strings
import * as strings from 'ControlStrings';
import { IFile } from '../../../services/FileBrowserService.types';

export default class SiteFilePickerTab extends React.Component<ISiteFilePickerTabProps, ISiteFilePickerTabState> {
  constructor(props: ISiteFilePickerTabProps) {
    super(props);

    // Add current site to the breadcrumb
    const breadcrumbSiteNode: SiteFilePickerBreadcrumbItem = {
      isCurrentItem: true,
      text: props.context.pageContext.web.title,
      key: props.context.pageContext.web.id.toString()
    }
    breadcrumbSiteNode.onClick = () => { this.onBreadcrumpItemClick(breadcrumbSiteNode); }

    this.state = {
      libraryAbsolutePath: undefined,
      libraryTitle: strings.DocumentLibraries,
      libraryPath: undefined,
      folderName: strings.DocumentLibraries,
      breadcrumbItems: [breadcrumbSiteNode]
    };
  }

  public render(): React.ReactElement<ISiteFilePickerTabProps> {
    return (
      <div className={styles.tabContainer}>
        <div className={styles.tabHeaderContainer}>
          { /** TODO: Fix breadcrumb styles */}
          <Breadcrumb items={this.state.breadcrumbItems} className={styles.tabHeader}/>
        </div>
        <div className={styles.tabFiles}>
          {this.state.libraryAbsolutePath === undefined &&
            <DocumentLibraryBrowser
              context={this.props.context}
              onOpenLibrary={(selectedLibrary: ILibrary) => this._handleOpenLibrary(selectedLibrary, true)} />}
          {this.state.libraryAbsolutePath !== undefined &&
            <FileBrowser
              onChange={(fileUrl: string) => this._handleSelectionChange(fileUrl)}
              onOpenFolder={(folder: IFile) => this._handleOpenFolder(folder, true)}
              fileBrowserService={this.props.fileBrowserService}
              libraryName={this.state.libraryTitle}
              folderPath={this.state.libraryPath}
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
  private onBreadcrumpItemClick = (node: SiteFilePickerBreadcrumbItem) => {
    let { breadcrumbItems } = this.state;
    let breadcrumbClickedItemIndx = 0;
    // Site node clicked
    if (node.libraryData == null && node.folderData == null) {
      this.setState({
        libraryAbsolutePath: undefined,
        libraryPath: undefined,
        folderName: undefined
      });
    }
    // Check if it is folder item
    else if (node.folderData != null) {
      this._handleOpenFolder(node.folderData, false);
      // select which node has been clicked
      breadcrumbClickedItemIndx = findIndex(breadcrumbItems, item => item.folderData && item.folderData.absoluteRef === node.key);
    }
    // Check if it is library node
    else if (node.libraryData != null) {
      this._handleOpenLibrary(node.libraryData, false);
      // select which node has been clicked
      breadcrumbClickedItemIndx = findIndex(breadcrumbItems, item => item.libraryData && item.libraryData.serverRelativeUrl === node.key);
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
      const breadcrumbNode: SiteFilePickerBreadcrumbItem = {
        folderData: folder,
        isCurrentItem: true,
        text: folder.fileLeafRef,
        key: folder.absoluteRef
      };
      breadcrumbNode.onClick = () => { this.onBreadcrumpItemClick(breadcrumbNode); }
      breadcrumbItems.push(breadcrumbNode);
    }

    this.setState({
      libraryPath: folder.fileRef,
      folderName: folder.fileLeafRef,
      libraryAbsolutePath: folder.absoluteRef,
      breadcrumbItems
    });
  }

  /**
   * Triggered when user opens a top-level document library
   */
  private _handleOpenLibrary = (library: ILibrary, addBreadcrumbNode: boolean) => {
    const { breadcrumbItems } = this.state;
    if (addBreadcrumbNode) {
      breadcrumbItems.map(item => item.isCurrentItem = false);
      const breadcrumbNode: SiteFilePickerBreadcrumbItem = {
        libraryData: library,
        isCurrentItem: true,
        text: library.title,
        key: library.serverRelativeUrl
      };
      breadcrumbNode.onClick = () => { this.onBreadcrumpItemClick(breadcrumbNode); }
      breadcrumbItems.push(breadcrumbNode);
    }
    this.setState({
      libraryAbsolutePath: library.absoluteUrl,
      libraryTitle: library.title,
      libraryPath: library.serverRelativeUrl,
      breadcrumbItems
    });
  }
}
