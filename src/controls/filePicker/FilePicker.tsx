import * as React from 'react';
import { IFilePickerProps } from './IFilePickerProps';
import { IFilePickerState } from './IFilePickerState';

// Office Fabric controls
import { PrimaryButton } from 'office-ui-fabric-react/lib/components/Button';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/components/Panel';
import { Label } from 'office-ui-fabric-react/lib/components/Label';
import { Nav, INavLink, INavLinkGroup } from 'office-ui-fabric-react/lib/Nav';
import { css } from "@uifabric/utilities/lib/css";

// Localization
import * as strings from 'ControlStrings';

// Custom property pane file picker tabs
import LinkFilePickerTab from './LinkFilePickerTab/LinkFilePickerTab';
import UploadFilePickerTab from './UploadFilePickerTab/UploadFilePickerTab';
import SiteFilePickerTab from './SiteFilePickerTab/SiteFilePickerTab';
import WebSearchTab from './WebSearchTab/WebSearchTab';
import RecentFilesTab from './RecentFilesTab/RecentFilesTab';

import styles from './FilePicker.module.scss';
import { FileBrowserService } from '../../services/FileBrowserService';
import { OneDriveFilesTab } from './OneDriveFilesTab';
import { OneDriveService } from '../../services/OneDriveService';
import { OrgAssetsService } from '../../services/OrgAssetsService';

export class FilePicker extends React.Component<IFilePickerProps, IFilePickerState> {
  private fileBrowserService: FileBrowserService;
  private oneDriveService: OneDriveService;
  private orgAssetsService: OrgAssetsService;

  constructor(props: IFilePickerProps) {
    super(props);

    // Initialize file browser services
    this.fileBrowserService = new FileBrowserService(props.webPartContext);
    this.oneDriveService = new OneDriveService(props.webPartContext);
    this.orgAssetsService = new OrgAssetsService(props.webPartContext);

    this.state = {
      panelOpen: false,
      selectedTab: 'keyRecent',
      organisationAssetsEnabled: false,
      showFullNav: true
    };
  }

  public async componentDidMount() {
    // Load information about Organisation Assets Library
    const orgAssetsLibraries = await this.orgAssetsService.getSiteMediaLibraries();
    const organisationAssetsEnabled = orgAssetsLibraries ? true : false;

    this.setState({
      organisationAssetsEnabled
    })
  }

  public render(): JSX.Element {
    // If no acceptable file type was passed, and we're expecting images, set the default image filter
    const accepts: string = this.props.accepts;

    return (
      <div >
        <Label required={this.props.required}>{this.props.label}</Label>
        <PrimaryButton text={this.props.buttonLabel}
          onClick={this._handleOpenPanel}
          disabled={this.props.disabled} />

        <Panel isOpen={this.state.panelOpen}
          isBlocking={true}
          hasCloseButton={true}
          className={styles.filePicker}
          onDismiss={this._handleClosePanel}
          type={PanelType.extraLarge}
          isFooterAtBottom={true}
          onRenderNavigation={() => { return undefined; }}
          headerText={strings.FilePickerHeader}
          isLightDismiss={true}
          onRenderHeader={() => this._renderHeader()}
        >

          <div className={styles.nav}>
            <Nav
              groups={this._getNavPanelOptions()}
              selectedKey={this.state.selectedTab}
              onLinkClick={(ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => this._handleLinkClick(ev, item)}
            />
          </div>
          <div className={styles.tabsContainer}>
            {
              this.state.selectedTab === "keyLink" &&
              <LinkFilePickerTab
                allowExternalTenantLinks={true}
                accepts={accepts}
                context={this.props.webPartContext}
                onClose={() => this._handleClosePanel()}
                onSave={(value: string) => this._handleSave(value)}
              />
            }
            {
              this.state.selectedTab === "keyUpload" &&
              <UploadFilePickerTab
                context={this.props.webPartContext}
                accepts={accepts}
                onClose={() => this._handleClosePanel()}
                onSave={(value: string) => this._handleSave(value)}
              />
            }
            {
              this.state.selectedTab === "keySite" &&
              <SiteFilePickerTab
                fileBrowserService={this.fileBrowserService}
                context={this.props.webPartContext}
                accepts={accepts}
                onClose={() => this._handleClosePanel()}
                onSave={(value: string) => this._handleSave(value)}
              />
            }
            {
              this.state.selectedTab === "keyOrgAssets" &&
              <SiteFilePickerTab
                breadcrumbFirstNode={{
                  isCurrentItem: true,
                  text: "Images and files provided by your organization",
                  key: "keyOrgAssets"
                }}
                fileBrowserService={this.orgAssetsService}
                context={this.props.webPartContext}
                accepts={accepts}
                onClose={() => this._handleClosePanel()}
                onSave={(value: string) => this._handleSave(value)}
              />
            }
            {
              this.state.selectedTab === "keyWeb" &&
              <WebSearchTab
                context={this.props.webPartContext}
                accepts={accepts}
                onClose={() => this._handleClosePanel()}
                onSave={(value: string) => this._handleSave(value)}
              />
            }
            {
              this.state.selectedTab === "keyOneDrive" &&
              <OneDriveFilesTab
                oneDriveService={this.oneDriveService}
                context={this.props.webPartContext}
                accepts={accepts}
                onClose={() => this._handleClosePanel()}
                onSave={(value: string) => this._handleSave(value)}
              />
            }
            {
              this.state.selectedTab === "keyRecent" &&
              <RecentFilesTab
                context={this.props.webPartContext}
                accepts={accepts}
                onClose={() => this._handleClosePanel()}
                onSave={(value: string) => this._handleSave(value)}
              />
            }

          </div>
        </Panel>
      </div >
    );
  }

  /**
   * Renders the panel header
   */
  private _renderHeader = (): JSX.Element => {
    return <div className={"ms-Panel-header"}><p className={css("ms-Panel-headerText", styles.header)} role="heading">{strings.FilePickerHeader}</p></div>;
  }

  /**
   * Open the panel
   */
  private _handleOpenPanel = () => {
    this.setState({
      panelOpen: true,
      selectedTab: 'keyRecent'
    });
  }

  /**
   * Closes the panel
   */
  private _handleClosePanel = () => {
    this.setState({
      panelOpen: false
    });
  }

  /**
   * On save action
   */
  private _handleSave = (image: string) => {
    this.props.onChanged(image);
    this.setState({
      panelOpen: false
    });
  }

  /**
   * Changes the selected tab when a link is selected
   */
  private _handleLinkClick = (ev?: React.MouseEvent<HTMLElement>, item?: INavLink) => {
    this.setState({ selectedTab: item.key });
  }

  private _getNavPanelOptions = () => {
    let links = [];

    if (!this.props.hideRecentTab) {
      links.push({
        name: strings.RecentLinkLabel,
        url: '#recent',
        icon: 'Recent',
        key: 'keyRecent',
      });
    }
    if (!this.props.hideWebSearchTab) {
      links.push({
        name: strings.WebSearchLinkLabel,
        url: '#search',
        key: 'keyWeb',
        icon: 'Search',
      });
    }
    if (!this.props.hideOrganisationalAssetTab && this.state.organisationAssetsEnabled) {
      links.push({
        name: 'Your organisation',
        url: '#orgAssets',
        icon: 'FabricFolderConfirm',
        key: 'keyOrgAssets',
      });
    }
    if (!this.props.hideOneDriveTab) {
      links.push({
        name: "OneDrive",
        url: '#onedrive',
        key: 'keyOneDrive',
        icon: 'OneDrive',
      });
    }
    if (!this.props.hideSiteFilesTab) {
      links.push({
        name: strings.SiteLinkLabel,
        url: '#globe',
        key: 'keySite',
        icon: 'Globe',
      });
    }
    if (!this.props.hideLocalUploadTab) {
      links.push({
        name: strings.UploadLinkLabel,
        url: '#upload',
        key: 'keyUpload',
        icon: 'System'
      });
    }
    if (!this.props.hideLinkUploadTab) {
      links.push({
        name: strings.FromLinkLinkLabel,
        url: '#link',
        key: 'keyLink',
        icon: 'Link'
      });
    }

    let groups: INavLinkGroup[] = [ { links} ];
    return groups;
  }

}
