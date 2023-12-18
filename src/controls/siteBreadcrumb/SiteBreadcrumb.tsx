import * as React from 'react';

import * as strings from 'ControlStrings';
import {
  Breadcrumb,
  IBreadcrumbItem,
} from '@fluentui/react/lib/Breadcrumb';

import {
  Environment,
  EnvironmentType,
} from '@microsoft/sp-core-library';
import {
  HttpClientResponse,
  SPHttpClient,
} from '@microsoft/sp-http';

import * as telemetry from '../../common/telemetry';
import {
  ISiteBreadcrumbProps,
  ISiteBreadcrumbState,
  IWebInfo,
} from './ISiteBreadcrumb';
import styles from './SiteBreadcrumb.module.scss';

/**
 * Site breadcrumb component
 */
export class SiteBreadcrumb extends React.Component<ISiteBreadcrumbProps, ISiteBreadcrumbState> {
  private _linkItems: IBreadcrumbItem[];

  constructor(props: ISiteBreadcrumbProps) {
    super(props);

    telemetry.track('ReactSiteBreadcrumb');

    // Initiate the private link items variable
    this._linkItems = [];

    // Initiate the component state
    this.state = {
      breadcrumbItems: []
    };
  }

  /**
   * React component lifecycle hook, runs after render
   */
  public componentDidMount(): void {
    // Start generating the links for the breadcrumb
    this._generateLinks();
  }

  /**
   * Start the link generation for the breadcrumb
   */
  private _generateLinks(): void {
    // Add the current site to the links list
    this._linkItems.push({
      text: this.props.context.pageContext.web.title,
      key: this.props.context.pageContext.web.id.toString(),
      href: this.props.context.pageContext.web.absoluteUrl,
      isCurrentItem: !!this.props.context.pageContext.list && !this.props.context.pageContext.list.serverRelativeUrl
    });

    // Check if the current list URL is available
    if (!!this.props.context.pageContext.list && !!this.props.context.pageContext.list.serverRelativeUrl) {
      // Add the current list to the links list
      this._linkItems.push({
        text: this.props.context.pageContext.list.title,
        key: this.props.context.pageContext.list.id.toString(),
        href: this.props.context.pageContext.list.serverRelativeUrl,
        isCurrentItem: true
      });
    }

    // Check if you are already on the root site
    if (this.props.context.pageContext.site.serverRelativeUrl === this.props.context.pageContext.web.serverRelativeUrl) {
      this._setBreadcrumbData();
    } else {
      if (Environment.type === EnvironmentType.Local) {
        // Nothing to do right now
        this._setBreadcrumbData();
      } else {
        // Retrieve the parent webs information
        this._getParentWeb(this.props.context.pageContext.web.absoluteUrl);
      }
    }
  }

  /**
   * Retrieve the parent web URLs
   * @param webUrl Current URL of the web to process
   */
  private _getParentWeb(webUrl: string): void {
    // Retrieve the parent web info
    const apiUrl = `${webUrl}/_api/web/parentweb?$select=Id,Title,ServerRelativeUrl`;
    this.props.context.spHttpClient.get(apiUrl, SPHttpClient.configurations.v1)
      .then((response: HttpClientResponse) => {
        return response.json();
      })
      .then((webInfo: IWebInfo) => {
        if (!webInfo.error) {
          // Check if the correct data is retrieved
          if (!webInfo.ServerRelativeUrl && !webInfo.Title) {
            this._setBreadcrumbData();
            return;
          }

          // Store the current site
          this._linkItems.unshift({
            text: webInfo.Title,
            key: webInfo.Id,
            href: webInfo.ServerRelativeUrl
          });

          // Check if you retrieved all the information up until the root site
          if (webInfo.ServerRelativeUrl === this.props.context.pageContext.site.serverRelativeUrl) {
            this._setBreadcrumbData();
          } else {
            // retrieve the information from the parent site
            webUrl = webUrl.substring(0, (webUrl.indexOf(`${webInfo.ServerRelativeUrl}/`) + webInfo.ServerRelativeUrl.length));
            this._getParentWeb(webUrl);
          }
        } else {
          // Set the current breadcrumb data which is already retrieved
          this._setBreadcrumbData();
        }
      })
      .catch(() => {
        // no-op;
      });
  }

  /**
   * Set the current breadcrumb data
   */
  private _setBreadcrumbData(): void {
    this.setState({
      breadcrumbItems: this._linkItems
    });
  }

  /**
   * Default React component render method
   */
  public render(): React.ReactElement<ISiteBreadcrumbProps> {
    return (
      <div className={styles.breadcrumb} >
        <Breadcrumb
          items={this.state.breadcrumbItems}
          ariaLabel={strings.SiteBreadcrumbLabel}
          className={styles.breadcrumbLinks}

          />
      </div >
    );
  }
}
