import * as React from 'react';
import { Guid } from "@microsoft/sp-core-library";
import styles from './IFramePanelContent.module.scss';
import { Panel, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import omit = require('lodash/omit');
import { IFramePanelContent } from './IframePanelContent';

export interface IIFramePanelProps extends IPanelProps {
  /**
    * iframe Url
    */
  url: string;
  /**
  * iframe height, if null then hight is calculated
  */
  height?: string;
  /**
   * Specifies if iframe content can be displayed in a full screen.
   * Usage: <IFrameDialog allowFullScreen />
   */
  allowFullScreen?: boolean;
  /**
   * iframe's onload event handler
   */
  iframeOnLoad?: (iframe: any) => void;
  /**
   * Specifies if transparency is allowed in iframe
   */
  allowTransparency?: boolean;
  /**
   * Specifies the name of an <iframe>
   */
  name?: string;
  /**
   * Enables an extra set of restrictions for the content in an <iframe>
   */
  sandbox?: string;
  /**
   * Specifies whether or not to display scrollbars in an <iframe>
   */
  scrolling?: string;
  /**
   * When present, it specifies that the <iframe> should look like it is a part of the containing document (no borders or scrollbars)
   */
  seamless?: boolean;
}

export interface IIFramePanelState {
}

export class IFramePanel extends React.Component<IIFramePanelProps, IIFramePanelState> {
  constructor(props: IIFramePanelProps) {
    super(props);

    this.state = {
    };
  }

  public render(): React.ReactElement<IIFramePanelProps> {

    const {
      height,
      allowFullScreen,
      iframeOnLoad,
      allowTransparency,
      name,
      sandbox,
      scrolling,
      seamless
    } = this.props;
    return (
      <Panel
        {...omit(this.props, 'className')}
      >
        <IFramePanelContent src={this.props.url}
          iframeOnLoad={iframeOnLoad}
          close={this.props.onDismiss}
          height={height}
          allowFullScreen={allowFullScreen}
          allowTransparency={allowTransparency}
          name={name}
          sandbox={sandbox}
          scrolling={scrolling}
          seamless={seamless}
        />
      </Panel>
    );
  }
}
