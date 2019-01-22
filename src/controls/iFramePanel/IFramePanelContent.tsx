import * as React from "react";
import styles from './IFramePanelContent.module.scss';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import omit = require('lodash/omit');

export interface IIFramePanelContentProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  close: () => void;
  iframeOnLoad?: (iframe: any) => void;
}

export interface IIFramePanelContentState {
  isContentVisible?: boolean;
}

/**
 * IFrame Dialog content
 */
export class IFramePanelContent extends React.Component<IIFramePanelContentProps, IIFramePanelContentState> {
  private _iframe: any;

  constructor(props: IIFramePanelContentProps) {
    super(props);

    this.state = {
      isContentVisible: false
    };
    window.onresize = this.resizeIframe;
  }

  private resizeIframe = () => {
    if (!this.props.height) {
      if (this._iframe) {
        let mainDiv = this._iframe.parentElement.parentElement.parentElement.parentElement as HTMLDivElement;
        let commandsDiv = mainDiv.getElementsByClassName("ms-Panel-commands")[0] as HTMLDivElement;
        let headerDiv = mainDiv.getElementsByClassName("ms-Panel-header")[0] as HTMLDivElement;
        let footerDiv = mainDiv.getElementsByClassName("ms-Panel-footer")[0] as HTMLDivElement;

        let height = this.getTrueHeight(mainDiv);
        height = height - this.getTrueHeight(commandsDiv);
        height = height - this.getTrueHeight(headerDiv);
        height = height - this.getTrueHeight(footerDiv);
        height = height - 20;  // padding on content div


        this._iframe.height = height.toString() + 'px';
      }
    }
  }

  private getTrueHeight(element): number {
    if (element) {
      let style = element.currentStyle || window.getComputedStyle(element);
      let marginTop = parseInt((style.marginTop as string).replace("px", ""));
      let marginBottom = parseInt((style.marginTop as string).replace("px", ""));
      if (isNaN(marginTop)) {
        marginTop = 0;
      }
      if (isNaN(marginBottom)) {
        marginBottom = 0;
      }
      return element.offsetHeight + marginTop + marginBottom;
    }
    else {
      return 0;
    }
  }

  public render(): JSX.Element {
    return (<div className={styles.iFrameDialog}>
      <iframe ref={(iframe) => { this._iframe = iframe; }} frameBorder={0} onLoad={this._iframeOnLoad} style={{ width: '100%', height: this.props.height, visibility: this.state.isContentVisible ? 'visible' : 'hidden' }} {...omit(this.props, 'height')} />
      {!this.state.isContentVisible &&
        <div className={styles.spinnerContainer}>
          <Spinner size={SpinnerSize.large} />
        </div>}
    </div>);
  }

  private _iframeOnLoad = () => {
    try { // for cross origin requests we can have issues with accessing frameElement
      this._iframe.contentWindow.frameElement.cancelPopUp = this.props.close;
    }
    catch (err) {
      if (err.name !== 'SecurityError') {
        throw err;
      }
    }

    this.resizeIframe();

    if (this.props.iframeOnLoad) {
      this.props.iframeOnLoad(this._iframe);
    }

    this.setState({
      isContentVisible: true
    });
  }
}
