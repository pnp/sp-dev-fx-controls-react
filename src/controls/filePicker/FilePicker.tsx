import * as React from "react";

import * as strings from "ControlStrings";
import { IIconProps } from "@fluentui/react/lib/Icon";
import {
  ActionButton,
  PrimaryButton
} from "@fluentui/react/lib/Button";

import { Label } from "@fluentui/react/lib/Label";
import {
  Panel,
  PanelType
} from "@fluentui/react/lib/Panel";
import {
  INavLink,
  INavLinkGroup,
  Nav
} from "@fluentui/react/lib/Nav";
import { css } from "@fluentui/react/lib/Utilities";

import * as telemetry from "../../common/telemetry";
import { FileBrowserService } from "../../services/FileBrowserService";
import { FilesSearchService } from "../../services/FilesSearchService";
import { OneDriveService } from "../../services/OneDriveService";
import { OrgAssetsService } from "../../services/OrgAssetsService";
import styles from "./FilePicker.module.scss";
import { IFilePickerResult } from "./FilePicker.types";
import { IFilePickerProps } from "./IFilePickerProps";
import { IFilePickerState } from "./IFilePickerState";
import LinkFilePickerTab from "./LinkFilePickerTab/LinkFilePickerTab";
import { OneDriveFilesTab } from "./OneDriveFilesTab/OneDriveFilesTab";
import RecentFilesTab from "./RecentFilesTab/RecentFilesTab";
import SiteFilePickerTab from "./SiteFilePickerTab/SiteFilePickerTab";
import { StockImages } from "./StockImagesTab/StockImages";
import UploadFilePickerTab from "./UploadFilePickerTab/UploadFilePickerTab";
import MultipleUploadFilePickerTab from "./MultipleUploadFilePickerTab/MultipleUploadFilePickerTab";
import WebSearchTab from "./WebSearchTab/WebSearchTab";
import { FilePickerTab } from "./FilePickerTab";


export class FilePicker extends React.Component<
  IFilePickerProps,
  IFilePickerState
> {
  private fileBrowserService: FileBrowserService;
  private oneDriveService: OneDriveService;
  private orgAssetsService: OrgAssetsService;
  private fileSearchService: FilesSearchService;

  constructor(props: IFilePickerProps) {
    super(props);

    telemetry.track("ReactFilePicker", {});

    // Initialize file browser services
    this.fileBrowserService = new FileBrowserService(
      props.context,
      this.props.itemsCountQueryLimit,
      this.props.webAbsoluteUrl
    );
    this.oneDriveService = new OneDriveService(
      props.context,
      this.props.itemsCountQueryLimit
    );
    this.orgAssetsService = new OrgAssetsService(
      props.context,
      this.props.itemsCountQueryLimit
    );
    this.fileSearchService = new FilesSearchService(
      props.context,
      this.props.bingAPIKey,
      this.props.webAbsoluteUrl
    );

    this.state = {
      panelOpen: this.props.isPanelOpen || false,
      organisationAssetsEnabled: false,
      showFullNav: true,
    };
  }

  public async componentDidMount(): Promise<void> {
    // Load information about Organisation Assets Library
    let orgAssetsEnabled: boolean = false;
    if (!this.props.hideOrganisationalAssetTab) {
      const orgAssetsLibraries = await this.orgAssetsService.getSiteMediaLibraries();
      orgAssetsEnabled = orgAssetsLibraries ? true : false;
    }

    this.setState({
      organisationAssetsEnabled: orgAssetsEnabled,
      selectedTab: this._getDefaultSelectedTabKey(this.props, orgAssetsEnabled),
    });
    if (!!this.props.context && !!this.props.webAbsoluteUrl) {
      const { title, id } = await this.fileBrowserService.getSiteTitleAndId();
      this.setState({
        webTitle: title,
        webId: id
      });
    }
  }

  /**
 * componentWillReceiveProps lifecycle hook
 *
 * @param nextProps
 */
  public UNSAFE_componentWillReceiveProps(nextProps: IFilePickerProps): void {
    if (nextProps.isPanelOpen || nextProps.isPanelOpen !== this.props.isPanelOpen) {
      this.setState({
        panelOpen: nextProps.isPanelOpen
      });

    }
  }

  public render(): JSX.Element {
    // If no acceptable file type was passed, and we're expecting images, set the default image filter
    const accepts: string[] = this.props.accepts;
    const buttonClassName: string = this.props.buttonClassName
      ? this.props.buttonClassName
      : "";
    const panelClassName: string = this.props.panelClassName
      ? this.props.panelClassName
      : "";

    const linkTabProps = {
      accepts: accepts,
      context: this.props.context,
      onClose: () => this._handleClosePanel(),
      onSave: (value: IFilePickerResult[]) => {
        this._handleSave(value);
      },
    };
    const buttonProps = {
      text: this.props.buttonLabel,
      disabled: this.props.disabled,
      onClick: this._handleOpenPanel,
      className: `pnp__file-picker__button ${buttonClassName}`,
    };

    /**
     * Test if button Icon or buttonIconProps were specified
     */
    let buttonIconProps: IIconProps = {};
    if (this.props.buttonIconProps) {
      buttonIconProps = this.props.buttonIconProps;
      buttonIconProps.iconName = this.props.buttonIcon
        ? this.props.buttonIcon
        : this.props.buttonIconProps.iconName;
    } else if (this.props.buttonIcon) {
      buttonIconProps.iconName = this.props.buttonIcon;
    }

    return (
      <div className={`pnp__file-picker`}>
        {!this.props.hidden && this.props.label && (
          <Label required={this.props.required}>{this.props.label}</Label>
        )}
        {!this.props.hidden && (this.props.buttonIcon || this.props.buttonIconProps) ? (
          <ActionButton iconProps={buttonIconProps} {...buttonProps} />
        ) : (
          !this.props.hidden &&
          <PrimaryButton {...buttonProps} />
        )}

        <Panel
          isOpen={this.state.panelOpen}
          isBlocking={true}
          hasCloseButton={true}
          className={`pnp__file-picker__panel ${styles.filePicker} ${panelClassName}`}
          onDismiss={this._handleClosePanel}
          type={PanelType.extraLarge}
          isFooterAtBottom={true}
          onRenderNavigation={() => {
            return undefined;
          }}
          headerText={strings.FilePickerHeader}
          isLightDismiss={true}
          onRenderHeader={() => this._renderHeader()}
        >
          <div className={styles.nav}>
            <Nav
              groups={this._getNavPanelOptions()}
              selectedKey={this.state.selectedTab}
              onLinkClick={(
                ev?: React.MouseEvent<HTMLElement>,
                item?: INavLink
              ) => this._handleLinkClick(ev, item)}
            />
          </div>
          <div className={styles.tabsContainer}>
            {this.state.selectedTab === FilePickerTab.Link && (
              <LinkFilePickerTab
                fileSearchService={this.fileSearchService}
                renderCustomLinkTabContent={
                  this.props.renderCustomLinkTabContent
                }
                allowExternalLinks={this.props.allowExternalLinks}
                checkIfFileExists={this.props.checkIfFileExists !== false}
                {...linkTabProps}
              />
            )}
            {this.state.selectedTab === FilePickerTab.Upload && (
              <UploadFilePickerTab
                renderCustomUploadTabContent={
                  this.props.renderCustomUploadTabContent
                }
                {...linkTabProps}
                onChange={this._handleOnChange}
              />
            )}
            {this.state.selectedTab === FilePickerTab.MultipleUpload && (
              <MultipleUploadFilePickerTab
                renderCustomMultipleUploadTabContent={
                  this.props.renderCustomMultipleUploadTabContent
                }
                {...linkTabProps}
                onChange={this._handleOnChange}
              />
            )}
            {this.state.selectedTab === FilePickerTab.Site && (
              <SiteFilePickerTab
                fileBrowserService={this.fileBrowserService}
                includePageLibraries={this.props.includePageLibraries}
                defaultFolderAbsolutePath={this.props.defaultFolderAbsolutePath}
                webTitle={this.state.webTitle}
                webId={this.state.webId}
                webAbsoluteUrl={this.props.webAbsoluteUrl}
                {...linkTabProps}
              />
            )}
            {this.state.selectedTab === FilePickerTab.OrgAssets && (
              <SiteFilePickerTab
                breadcrumbFirstNode={{
                  isCurrentItem: true,
                  text: strings.OrgAssetsTabLabel,
                  key: FilePickerTab.OrgAssets,
                }}
                fileBrowserService={this.orgAssetsService}
                webTitle={this.state.webTitle}
                {...linkTabProps}
              />
            )}
            {this.state.selectedTab === FilePickerTab.Web && (
              <WebSearchTab
                bingSearchService={this.fileSearchService}
                {...linkTabProps}
              />
            )}
            {this.state.selectedTab === FilePickerTab.OneDrive && (
              <OneDriveFilesTab
                oneDriveService={this.oneDriveService}
                {...linkTabProps}
              />
            )}
            {this.state.selectedTab === FilePickerTab.Recent && (
              <RecentFilesTab
                fileSearchService={this.fileSearchService}
                {...linkTabProps}
              />
            )}
            {this.state.selectedTab === FilePickerTab.StockImages && (
              <StockImages
                language={
                  this.props.context.pageContext.cultureInfo.currentCultureName
                }
                fileSearchService={this.fileSearchService}
                {...linkTabProps}
              />
            )}
          </div>
        </Panel>
      </div>
    );
  }

  /**
   * Renders the panel header
   */
  private _renderHeader = (): JSX.Element => {
    return (
      <div className={"ms-Panel-header"}>
        <p className={css("ms-Panel-headerText", styles.header)} role="heading">
          {strings.FilePickerHeader}
        </p>
      </div>
    );
  }

  /**
   * Open the panel
   */
  private _handleOpenPanel = (): void => {
    this.setState({
      panelOpen: true,
      selectedTab: this._getDefaultSelectedTabKey(
        this.props,
        this.state.organisationAssetsEnabled
      ),
    });
  }

  /**
   * Closes the panel
   */
  private _handleClosePanel = (): void => {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
    this.setState({
      panelOpen: false,
    });
  }

  /**
   * On save action
   */
  private _handleSave = (filePickerResult: IFilePickerResult[]): void => {
    this.props.onSave(filePickerResult);
    this.setState({
      panelOpen: false,
    });
  }

  private _handleOnChange = (filePickerResult: IFilePickerResult[]): void => {
    if (this.props.onChange) {
      this.props.onChange(filePickerResult);
    }
  }

  /**
   * Changes the selected tab when a link is selected
   */
  private _handleLinkClick = (
    ev?: React.MouseEvent<HTMLElement>,
    item?: INavLink
  ): void => {
    this.setState({ selectedTab: item.key });
  }

  /**
   * Prepares navigation panel options
   */
  private _getNavPanelOptions = (): INavLinkGroup[] => {
    const addUrl = this.props.storeLastActiveTab !== false;
    let links = [];

    if (!this.props.hideRecentTab) {
      links.push({
        name: strings.RecentLinkLabel,
        url: addUrl ? "#recent" : undefined,
        icon: "Recent",
        key: FilePickerTab.Recent,
      });
    }
    if (!this.props.hideStockImages) {
      links.push({
        name: strings.StockImagesLinkLabel,
        url: addUrl ? "#stockImages" : undefined,
        key: FilePickerTab.StockImages,
        icon: "ImageSearch",
      });
    }
    if (this.props.bingAPIKey && !this.props.hideWebSearchTab) {
      links.push({
        name: strings.WebSearchLinkLabel,
        url: addUrl ? "#search" : undefined,
        key: FilePickerTab.Web,
        icon: "Search",
      });
    }
    if (
      !this.props.hideOrganisationalAssetTab &&
      this.state.organisationAssetsEnabled
    ) {
      links.push({
        name: strings.OrgAssetsLinkLabel,
        url: addUrl ? "#orgAssets" : undefined,
        icon: "FabricFolderConfirm",
        key: FilePickerTab.OrgAssets,
      });
    }
    if (!this.props.hideOneDriveTab) {
      links.push({
        name: "OneDrive",
        url: addUrl ? "#onedrive" : undefined,
        key: FilePickerTab.OneDrive,
        icon: "OneDrive",
      });
    }
    if (!this.props.hideSiteFilesTab) {
      links.push({
        name: strings.SiteLinkLabel,
        url: addUrl ? "#globe" : undefined,
        key: FilePickerTab.Site,
        icon: "Globe",
      });
    }
    if (!this.props.hideLocalUploadTab) {
      links.push({
        name: strings.UploadLinkLabel,
        url: addUrl ? "#upload" : undefined,
        key: FilePickerTab.Upload,
        icon: "System",
      });
    }
    if (!this.props.hideLocalMultipleUploadTab) {
      links.push({
        name: strings.UploadLinkLabel + " " + strings.OneDriveRootFolderName,
        url: addUrl ? "#Multipleupload" : undefined,
        key: FilePickerTab.MultipleUpload,
        icon: "BulkUpload",
      });
    }
    if (!this.props.hideLinkUploadTab) {
      links.push({
        name: strings.FromLinkLinkLabel,
        url: addUrl ? "#link" : undefined,
        key: FilePickerTab.Link,
        icon: "Link",
      });
    }

    if(this.props.tabOrder) {
      links = this._getTabOrder(links);
    }

    const groups: INavLinkGroup[] = [{ links }];
    return groups;
  }

  /**
   * Sorts navigation tabs based on the tabOrder prop
   */
  private _getTabOrder = (links): INavLink[] => {
    const sortedKeys = [
      ...this.props.tabOrder,
      ...links.map(l => l.key).filter(key => !this.props.tabOrder.includes(key)),
    ];

    links.sort((a, b) => {
      return sortedKeys.indexOf(a.key) - sortedKeys.indexOf(b.key);
    });

    return links;
  };

  /**
   * Returns the default selected tab key
   */
  private _getDefaultSelectedTabKey = (
    props: IFilePickerProps,
    orgAssetsEnabled: boolean
  ): string => {
    const tabsConfig = [
      { isTabVisible: !props.hideRecentTab, tabKey: FilePickerTab.Recent },
      { isTabVisible: !props.hideStockImages, tabKey: FilePickerTab.StockImages },
      { isTabVisible: props.bingAPIKey && !props.hideWebSearchTab, tabKey: FilePickerTab.Web },
      { isTabVisible: !props.hideOrganisationalAssetTab && orgAssetsEnabled, tabKey: FilePickerTab.OrgAssets },
      { isTabVisible: !props.hideOneDriveTab, tabKey: FilePickerTab.OneDrive },
      { isTabVisible: !props.hideSiteFilesTab, tabKey: FilePickerTab.Site },
      { isTabVisible: !props.hideLocalUploadTab, tabKey: FilePickerTab.Upload },
      { isTabVisible: !props.hideLinkUploadTab, tabKey: FilePickerTab.Link },
      { isTabVisible: !props.hideLocalMultipleUploadTab, tabKey: FilePickerTab.MultipleUpload }
    ];

    const visibleTabs = tabsConfig.filter(tab => tab.isTabVisible);
    const visibleTabKeys = visibleTabs.map(tab => tab.tabKey);

    // If defaultSelectedTab is provided and is visible, then return tabKey
    if(this.props.defaultSelectedTab && visibleTabKeys.includes(this.props.defaultSelectedTab)) {
      return this.props.defaultSelectedTab;
    }

    // If no valid default tab is provided, find the first visible tab in the order
    if (this.props.tabOrder) {
      const visibleTabSet = new Set(visibleTabKeys);
      return this.props.tabOrder.find(key => visibleTabSet.has(key));
    } else {
      return visibleTabKeys[0]; // first visible tab from default order
    }
  }
}
