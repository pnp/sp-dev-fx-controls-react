import * as React from 'react';
import findIndex from 'lodash/findIndex';
import { ISiteFilePickerTabProps } from './ISiteFilePickerTabProps';
import { ISiteFilePickerTabState } from './ISiteFilePickerTabState';
import { DocumentLibraryBrowser } from '../controls/DocumentLibraryBrowser/DocumentLibraryBrowser';
import { FileBrowser } from '../controls/FileBrowser/FileBrowser';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/components/Button';
import { Breadcrumb, IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { IFile, IFolder, ILibrary } from '../../../services/FileBrowserService.types';
import { Link } from 'office-ui-fabric-react/lib/Link';
import { IFilePickerResult, FilePickerBreadcrumbItem } from '../FilePicker.types';

import { SPWeb } from "@microsoft/sp-page-context";

import styles from './SiteFilePickerTab.module.scss';
import * as strings from 'ControlStrings';
import { urlCombine } from '../../../common/utilities';
import { cloneDeep } from '@microsoft/sp-lodash-subset';

export default class SiteFilePickerTab extends React.Component<ISiteFilePickerTabProps, ISiteFilePickerTabState> {
  private _defaultLibraryNamePromise: Promise<void | string> = Promise.resolve();

  constructor(props: ISiteFilePickerTabProps) {
    super(props);

    // Add current site to the breadcrumb or the provided node
    const breadcrumbSiteNode: FilePickerBreadcrumbItem = this.props.breadcrumbFirstNode ? this.props.breadcrumbFirstNode : {
      isCurrentItem: false,
      text: props.context.pageContext.web.title,
      key: props.context.pageContext.web.id.toString(),
      onClick: (ev, itm) => { this.onBreadcrumpItemClick(itm); }
    };

    let breadcrumbItems: FilePickerBreadcrumbItem[] = [breadcrumbSiteNode];

    let { folderAbsPath = undefined, libraryServRelUrl = undefined, folderServRelPath = undefined, folderBreadcrumbs = [] } = props.defaultFolderAbsolutePath
      ? this._parseInitialLocationState(
        props.defaultFolderAbsolutePath,
        props.context.pageContext.web
      )
      : {};

    breadcrumbItems.push(...folderBreadcrumbs);

    breadcrumbItems[breadcrumbItems.length - 1].isCurrentItem = true;

    this.state = {
      filePickerResult: null,
      libraryAbsolutePath: folderAbsPath || undefined,
      libraryUrl: libraryServRelUrl || urlCombine(props.context.pageContext.web.serverRelativeUrl, '/Shared%20Documents'),
      libraryPath: folderServRelPath,
      folderName: strings.DocumentLibraries,
      breadcrumbItems
    };
  }

  private _parseInitialLocationState(folderAbsPath: string, { serverRelativeUrl: webServRelUrl, absoluteUrl: webAbsUrl }: SPWeb) {
    // folderAbsPath: "https://tenant.sharepoint.com/teams/Test/DocLib/Folder"

    // folderServRelPath: "/teams/Test/DocLib/Folder"
    let folderServRelPath = folderAbsPath && folderAbsPath.substr(folderAbsPath.indexOf(webServRelUrl));

    // folderWebRelPath: "/DocLib/Folder"
    let folderWebRelPath = folderServRelPath && folderServRelPath.substr(webServRelUrl.length);
    let libInternalName = folderWebRelPath && folderWebRelPath.substring(1, Math.max(folderWebRelPath.indexOf("/", 2), 0) || undefined);

    // libraryServRelUrl: "/teams/Test/DocLib/"
    let libraryServRelUrl = urlCombine(webServRelUrl, libInternalName);

    let tenantUrl = folderAbsPath.substring(0, folderAbsPath.indexOf(webServRelUrl));
    let folderBreadcrumbs: FilePickerBreadcrumbItem[] = this.parseBreadcrumbsFromPaths(
      libraryServRelUrl,
      folderServRelPath,
      folderWebRelPath,
      webAbsUrl,
      tenantUrl,
      libInternalName
    );

    return { libraryServRelUrl, folderServRelPath, folderAbsPath, folderBreadcrumbs };
  }

  private parseBreadcrumbsFromPaths(
    libraryServRelUrl: string,
    folderServRelPath: string,
    folderWebRelPath: string,
    webAbsUrl: string,
    tenantUrl: string,
    libInternalName: string
  ) {
    this._defaultLibraryNamePromise = this.props.fileBrowserService.getLibraryNameByInternalName(libInternalName);
    let folderBreadcrumbs: FilePickerBreadcrumbItem[] = [];
    folderBreadcrumbs.push({
      isCurrentItem: false,
      text: libInternalName,
      key: libraryServRelUrl,
      libraryData: {
        serverRelativeUrl: libraryServRelUrl,
        absoluteUrl: urlCombine(webAbsUrl, libInternalName),
        title: libInternalName
      },
      onClick: (ev, itm) => { this.onBreadcrumpItemClick(itm); }
    });

    if (folderServRelPath != libraryServRelUrl) {
      let folderLibRelPath = folderWebRelPath.substring(libInternalName.length + 2);
      let breadcrumbFolderServRelPath = libraryServRelUrl;

      let crumbs: FilePickerBreadcrumbItem[] = folderLibRelPath.split("/").map((currFolderName => {
        breadcrumbFolderServRelPath += `/${currFolderName}`;
        return {
          isCurrentItem: false,
          text: currFolderName,
          key: urlCombine(tenantUrl, breadcrumbFolderServRelPath),
          folderData: {
            name: currFolderName,
            absoluteUrl: urlCombine(tenantUrl, breadcrumbFolderServRelPath),
            serverRelativeUrl: breadcrumbFolderServRelPath,
          },
          onClick: (ev, itm) => { this.onBreadcrumpItemClick(itm); }
        };
      }));

      folderBreadcrumbs.push(...crumbs);
    }
    return folderBreadcrumbs;
  }

  public componentDidMount(): void {
    this._defaultLibraryNamePromise.then(docLibName => {
      if (docLibName) {
        let updatedBCItems = cloneDeep(this.state.breadcrumbItems);
        updatedBCItems.forEach(crumb => {
          if (crumb.libraryData) {
            crumb.text = docLibName;
            crumb.libraryData.title = docLibName;
          }
        });
        this.setState({ breadcrumbItems: updatedBCItems });
      }
    }).catch((err) => {
      console.log("[SiteFilePicker] Failed To Fetch defaultLibraryName, defaulting to internal name");
    });
  }

  public render(): React.ReactElement<ISiteFilePickerTabProps> {
    return (
      <div className={styles.tabContainer} >
        <div className={styles.tabHeaderContainer}>
          <Breadcrumb items={this.state.breadcrumbItems} /*onRenderItem={this.renderBreadcrumbItem}*/ className={styles.breadcrumbNav} />
        </div>
        <div className={styles.tabFiles}>
          {this.state.libraryAbsolutePath === undefined &&
            <DocumentLibraryBrowser
              fileBrowserService={this.props.fileBrowserService}
              includePageLibraries={this.props.includePageLibraries}
              onOpenLibrary={(selectedLibrary: ILibrary) => this._handleOpenLibrary(selectedLibrary, true)} />}
          {this.state.libraryAbsolutePath !== undefined &&
            <FileBrowser
              onChange={(filePickerResult: IFilePickerResult) => this._handleSelectionChange(filePickerResult)}
              onOpenFolder={(folder: IFile) => this._handleOpenFolder(folder, true)}
              fileBrowserService={this.props.fileBrowserService}
              libraryUrl={this.state.libraryUrl}
              folderPath={this.state.libraryPath}
              accepts={this.props.accepts} />}
        </div>
        <div className={styles.actionButtonsContainer}>
          <div className={styles.actionButtons}>
            <PrimaryButton
              disabled={!this.state.filePickerResult}
              onClick={() => this._handleSave()} className={styles.actionButton}>{strings.OpenButtonLabel}</PrimaryButton>
            <DefaultButton onClick={() => this._handleClose()} className={styles.actionButton}>{strings.CancelButtonLabel}</DefaultButton>
          </div>
        </div>
      </div>
    );
  }

  private renderBreadcrumbItem = (item: IBreadcrumbItem): JSX.Element => {
    return (
      <Link href={item.href} onClick={item.onClick} key={item.key} className={`ms-Link ms-Breadcrumb-itemLink ${styles.breadcrumbNavItem}`}>{item.text}</Link>
    );
  }

  /**
   * Handles breadcrump item click
   */
  private onBreadcrumpItemClick = (node: FilePickerBreadcrumbItem) => {
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
      breadcrumbClickedItemIndx = findIndex(breadcrumbItems, item => item.folderData && item.folderData.absoluteUrl === node.key);
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
      filePickerResult: undefined
    });
  }

  /**
   * Is called when user selects a different file
   */
  private _handleSelectionChange = (filePickerResult: IFilePickerResult) => {
    if (filePickerResult) {
      filePickerResult.downloadFileContent = () => { return this.props.fileBrowserService.downloadSPFileContent(filePickerResult.fileAbsoluteUrl, filePickerResult.fileName); };
    }
    // this.props.fileBrowserService
    this.setState({
      filePickerResult
    });
  }

  /**
   * Called when user saves
   */
  private _handleSave = () => {
    this.props.onSave([this.state.filePickerResult]);
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
  private _handleOpenFolder = (folder: IFolder, addBreadcrumbNode: boolean) => {
    const { breadcrumbItems } = this.state;

    if (addBreadcrumbNode) {
      breadcrumbItems.map(item => item.isCurrentItem = false);
      const breadcrumbNode: FilePickerBreadcrumbItem = {
        folderData: folder,
        isCurrentItem: true,
        text: folder.name,
        key: folder.absoluteUrl,
        onClick: (ev, itm) => { this.onBreadcrumpItemClick(itm); }
      };
      breadcrumbItems.push(breadcrumbNode);
    }

    this.setState({
      filePickerResult: null,
      libraryPath: folder.serverRelativeUrl,
      folderName: folder.name,
      libraryAbsolutePath: folder.absoluteUrl,
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
      const breadcrumbNode: FilePickerBreadcrumbItem = {
        libraryData: library,
        isCurrentItem: true,
        text: library.title,
        key: library.serverRelativeUrl,
        onClick: (ev, itm) => { this.onBreadcrumpItemClick(itm); }
      };
      breadcrumbItems.push(breadcrumbNode);
    }
    this.setState({
      libraryAbsolutePath: library.absoluteUrl,
      libraryUrl: library.serverRelativeUrl,
      libraryPath: library.serverRelativeUrl,
      breadcrumbItems
    });
  }
}
