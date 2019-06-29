import * as React from 'react';
import { ISecurityTrimmedControlProps, ISecurityTrimmedControlState, PermissionLevel } from '.';
import { SPHttpClient } from '@microsoft/sp-http';
import { SPPermission } from '@microsoft/sp-page-context';
import * as telemetry from '../../common/telemetry';

export class SecurityTrimmedControl extends React.Component<ISecurityTrimmedControlProps, ISecurityTrimmedControlState> {
  constructor(props: ISecurityTrimmedControlProps) {
    super(props);

    this.state = {
      allowRender: false
    };

    telemetry.track('ReactPlaceholder', {});
  }

  /**
   * componentDidMount lifecycle method
   */
  public componentDidMount(): void {
    this.checkPermissions();
  }

  /**
   * componentDidUpdate lifecycle method
   */
  public componentDidUpdate(prevProps: ISecurityTrimmedControlProps, prevState: ISecurityTrimmedControlState): void {
    // Check permissions only if necessary
    if (prevProps.level !== this.props.level ||
      prevProps.permissions !== this.props.permissions ||
      prevProps.relativeLibOrListUrl !== this.props.relativeLibOrListUrl ||
      prevProps.remoteSiteUrl !== this.props.remoteSiteUrl ||
      prevProps.folderPath !== this.props.folderPath ||
      prevProps.itemId !== this.props.itemId) {
      this.checkPermissions();
    }
  }

  /**
   * Check if the user has the permissions to render the element
   */
  private checkPermissions() {
    const { context, level } = this.props;
    // Check if the permission level needs to be checked on the current site
    if (level === PermissionLevel.currentWeb || level === PermissionLevel.currentList) {
      // Get the permission scope
      const { permissions } = level === PermissionLevel.currentWeb ? context.pageContext.web : context.pageContext.list;
      // Check the user its permissions
      if (permissions.hasAllPermissions(...this.props.permissions)) {
        this.setState({
          allowRender: true
        });
      } else {
        this.setState({
          allowRender: false
        });
      }
    } else if (level === PermissionLevel.remoteWeb) {
      // Check permissions on remote site
      this.checkRemoteSitePermissions();
    } else if (level === PermissionLevel.remoteListOrLib) {
      // Check permissions on remote list/library
      this.checkRemoteListOrLibPermissions();
    } else if (level === PermissionLevel.remoteListItem) {
      this.checkRemoteListItem();
    } else if (level === PermissionLevel.remoteFolder) {
      this.checkRemoteFolder();
    }
  }

  /**
   * Check the user its permissions on the remote site
   */
  private async checkRemoteSitePermissions() {
    const { context, remoteSiteUrl, permissions } = this.props;
    if (remoteSiteUrl && permissions) {
      for (const permission of permissions) {
        const apiUrl = `${remoteSiteUrl}/_api/web/DoesUserHavePermissions(@v)?@v=${JSON.stringify(permission.value)}`;
        const result = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1).then(data => data.json());
        // Check if a result was retrieved
        if (result) {
          // Check if an error was retrieved
          if (result.error) {
            // Do not allow rendering when there was an error
            this.setState({
              allowRender: false
            });
            console.error(`Error retrieved while checking user's remote site permissions.`);
            return;
          }
          // Check the result value
          if (typeof result.value !== "undefined" && result.value === false) {
            this.setState({
              allowRender: false
            });
            return;
          }
        } else {
          this.setState({
            allowRender: false
          });
          console.error(`No result value was retrieved when checking the user's remote site permissions.`);
          return;
        }
      }

      // Render the controls when the permissions were OK for the user
      this.setState({
        allowRender: true
      });
    }
  }

  /**
   * Check the user its permissions on the remote list or library
   */
  private async checkRemoteListOrLibPermissions() {
    const { remoteSiteUrl, relativeLibOrListUrl, permissions } = this.props;
    // Check if all properties are provided
    if (remoteSiteUrl && relativeLibOrListUrl && permissions) {
      const apiUrl = `${remoteSiteUrl}/_api/web/GetList(@listUrl)/EffectiveBasePermissions?@listUrl='${encodeURIComponent(relativeLibOrListUrl)}'`;
      const hasPermissions = await this.checkRemotePermissions(apiUrl);
      this.setState({
        allowRender: hasPermissions
      });
    }
  }

  /**
   * Check permissions on item level
   */
  private async checkRemoteListItem() {
    const { remoteSiteUrl, relativeLibOrListUrl, permissions, itemId } = this.props;
    // Check if all properties are provided
    if (remoteSiteUrl && relativeLibOrListUrl && permissions && itemId) {
      const apiUrl = `${remoteSiteUrl}/_api/web/GetList(@listUrl)/Items(${itemId})/EffectiveBasePermissions?@listUrl='${encodeURIComponent(relativeLibOrListUrl)}'`;
      const hasPermissions = await this.checkRemotePermissions(apiUrl);
      this.setState({
        allowRender: hasPermissions
      });
    }
  }

  /**
   * Check permissions on folder
   */
  private async checkRemoteFolder() {
    const { remoteSiteUrl, relativeLibOrListUrl, permissions, folderPath } = this.props;
    // Check if all properties are provided
    if (remoteSiteUrl && relativeLibOrListUrl && permissions && folderPath) {
      const folderByServerRelativeUrl: string = `${encodeURIComponent(relativeLibOrListUrl)}/${encodeURIComponent(folderPath)}`;
      const apiUrl = `${remoteSiteUrl}/_api/web/GetFolderByServerRelativeUrl(@folderByServerRelativeUrl)/ListItemAllFields/EffectiveBasePermissions?@folderByServerRelativeUrl='${folderByServerRelativeUrl}'`;
      const hasPermissions = await this.checkRemotePermissions(apiUrl);
      this.setState({
        allowRender: hasPermissions
      });
    }
  }

  /**
   * Check the permissions
   *
   * @param apiUrl
   */
  private async checkRemotePermissions(apiUrl: string) {
    const { context, permissions } = this.props;
    const data = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1);
    // Check if a result was retrieved
    if (data && data.ok) {
      const result = await data.json();
      // Check if an error was retrieved
      if (result.error) {
        // Do not allow rendering when there was an error
        console.error(`Error retrieved while checking permissions`);
        return false;
      }

      // Check the result high and low value are returned
      if (typeof result.High !== "undefined" && typeof result.Low !== "undefined") {
        // Create the permission mask
        const permission = new SPPermission(result);
        const hasPermissions = permission.hasAllPermissions(...permissions);
        return hasPermissions;
      }
    } else {
      console.error(`No result value was retrieved when checking the user's permissions.`);
      return false;
    }
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<ISecurityTrimmedControlProps> {
    return (
      this.state.allowRender ? (
        <div>{this.props.children}</div>
      ) : null
    );
  }
}
