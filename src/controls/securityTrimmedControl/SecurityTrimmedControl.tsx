import * as React from 'react';
import { ISecurityTrimmedControlProps, ISecurityTrimmedControlState, PermissionLevel } from '.';
import { SPHttpClient } from '@microsoft/sp-http';
import { SPPermission } from '@microsoft/sp-page-context';
import * as appInsights from '../../common/appInsights';

export class SecurityTrimmedControl extends React.Component<ISecurityTrimmedControlProps, ISecurityTrimmedControlState> {
  constructor(props: ISecurityTrimmedControlProps) {
    super(props);

    this.state = {
      allowRender: false
    };

    appInsights.track('ReactPlaceholder', {});
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
        prevProps.remoteSiteUrl !== this.props.remoteSiteUrl) {
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
    const { context, remoteSiteUrl, relativeLibOrListUrl, permissions } = this.props;
    // Check if all properties are provided
    if (remoteSiteUrl && relativeLibOrListUrl && permissions) {
      const apiUrl = `${remoteSiteUrl}/_api/web/GetList(@listUrl)/EffectiveBasePermissions?@listUrl='${encodeURIComponent(relativeLibOrListUrl)}'`;
      const result = await context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1).then(data => data.json());
      // Check if a result was retrieved
      if (result) {
        // Check if an error was retrieved
        if (result.error) {
          // Do not allow rendering when there was an error
          this.setState({
            allowRender: false
          });
          console.error(`Error retrieved while checking user's remote list or library permissions.`);
          return;
        }

        // Check the result high and low value are returned
        if (typeof result.High !== "undefined" && typeof result.Low !== "undefined") {
          // Create the permission mask
          const permission = new SPPermission(result);
          const hasPermissions = permission.hasAllPermissions(...permissions);

          this.setState({
            allowRender: hasPermissions
          });
          return;
        }
      } else {
        this.setState({
          allowRender: false
        });
        console.error(`No result value was retrieved when checking the user's remote list or library permissions.`);
        return;
      }
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
