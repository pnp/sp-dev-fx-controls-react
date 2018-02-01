import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dialog, IDialogProps } from 'office-ui-fabric-react';
import IFrameDialogContent from './IFrameDialogContent';
import * as appInsights from '../../common/appInsights';

export interface IFrameDialogProps extends IDialogProps {
  /**
   * iframe Url
   */
  url: string;
  /**
   * iframe's onload event handler
   */
  iframeOnLoad?: (iframe: any) => {};
  /**
   * iframe width
   */
  width: string;
  /**
   * iframe height
   */
  height: string;
}

export interface IFrameDialogState {
}

/**
 * Dialog component to display content in iframe
 */
export default class IFrameDialog extends React.Component<IFrameDialogProps, IFrameDialogState> {

  public constructor(props: IFrameDialogProps, state: IFrameDialogState) {
    super(props, state);

    appInsights.track('IFrameDialog', {});
  }

  public render(): JSX.Element {
    return (
      <Dialog
        {...this.props}>
        <IFrameDialogContent
          url={this.props.url}
          iframeOnLoad={this.props.iframeOnLoad}
          close={this.props.onDismiss}
          width={this.props.width}
          height={this.props.height} />
      </Dialog>);

  }
}
