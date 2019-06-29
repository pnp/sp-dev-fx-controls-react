import * as React from "react";
import * as ReactDOM from "react-dom";
import { Dialog, IDialogProps } from 'office-ui-fabric-react/lib/Dialog';
import { IFrameDialogContent } from './IFrameDialogContent';
import * as telemetry from '../../common/telemetry';
import { Guid } from "@microsoft/sp-core-library";
import omit = require('lodash/omit');

export interface IFrameDialogProps extends IDialogProps {
  /**
   * iframe Url
   */
  url: string;
  /**
   * iframe's onload event handler
   */
  iframeOnLoad?: (iframe: any) => void;
  /**
   * iframe width
   */
  width: string;
  /**
   * iframe height
   */
  height: string;
  /**
   * Specifies if iframe content can be displayed in a full screen.
   * Usage: <IFrameDialog allowFullScreen />
   */
  allowFullScreen?: boolean;
  /**
   * Specifies if transparency is allowed in iframe
   */
  allowTransparency?: boolean;
  /**
   * Specifies the top and bottom margins of the content of an <iframe>
   */
  marginHeight?: number;
  /**
   * Specifies the left and right margins of the content of an <iframe>
   */
  marginWidth?: number;
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

export interface IFrameDialogState {
  dialogId: string | null;
  isStylingSet?: boolean;
}

/**
 * Dialog component to display content in iframe
 */
export class IFrameDialog extends React.Component<IFrameDialogProps, IFrameDialogState> {

  public constructor(props: IFrameDialogProps, state: IFrameDialogState) {
    super(props, state);

    telemetry.track('IFrameDialog', {});

    this.state = {
      dialogId: null
    };
  }

  /**
   * componentWillMount lifecycle hook
   */
  public componentWillMount(): void {
    this.setState({
      dialogId: `dialog-${Guid.newGuid().toString()}`
    });
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    this.setDialogStyling();
  }

  public componentDidUpdate(prevProps: IFrameDialogProps, prevState: IFrameDialogState): void {
    this.setDialogStyling();
  }

  public render(): JSX.Element {
    const {
      iframeOnLoad,
      height,
      allowFullScreen,
      allowTransparency,
      marginHeight,
      marginWidth,
      name,
      sandbox,
      scrolling,
      seamless,
      modalProps,
      className
    } = this.props;

    let dlgModalProps = {
      ...modalProps,
      onLayerDidMount: () => { this.setDialogStyling(); }
    };

    return (
      <Dialog
        className={`${this.state.dialogId} ${className || ''}`}
        modalProps={dlgModalProps}
        {...omit(this.props, 'className', 'modalProps')}>
        <IFrameDialogContent src={this.props.url}
          iframeOnLoad={iframeOnLoad}
          close={this.props.onDismiss}
          height={height}
          allowFullScreen={allowFullScreen}
          allowTransparency={allowTransparency}
          marginHeight={marginHeight}
          marginWidth={marginWidth}
          name={name}
          sandbox={sandbox}
          scrolling={scrolling}
          seamless={seamless}
        />
      </Dialog>);
  }

  /**
   * Set the dialog style
   */
  private setDialogStyling(): void {
    if (!this.state.isStylingSet && !this.props.hidden && this.state.dialogId) {
      const element = document.querySelector(`.${this.state.dialogId} .ms-Dialog-main`) as HTMLElement;
      const {
        width
      } = this.props;
      if (element && width) {
        element.style.width = width;
        element.style.minWidth = width;
        element.style.maxWidth = width;

        this.setState({
          isStylingSet: true
        });
      }
    }
  }
}
