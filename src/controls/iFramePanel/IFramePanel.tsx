import * as React from 'react';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import omit = require('lodash/omit');
import { IFramePanelContent } from './IFramePanelContent';
import { IIFramePanelProps, IIFramePanelState } from '.';

export class IFramePanel extends React.Component<IIFramePanelProps, IIFramePanelState> {

  constructor(props: IIFramePanelProps) {
    super(props);

    this.state = {};
  }

  /**
   * Default React render
   */
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
      <Panel {...omit(this.props, 'className')} >
        <IFramePanelContent src={this.props.url}
                            iframeOnLoad={iframeOnLoad}
                            close={this.props.onDismiss}
                            height={height}
                            allowFullScreen={allowFullScreen}
                            allowTransparency={allowTransparency}
                            name={name}
                            sandbox={sandbox}
                            scrolling={scrolling}
                            seamless={seamless} />
      </Panel>
    );
  }
}
