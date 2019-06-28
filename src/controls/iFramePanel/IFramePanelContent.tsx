import * as React from "react";
import styles from './IFramePanelContent.module.scss';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import omit = require('lodash/omit');
import { IIFramePanelContentProps, IIFramePanelContentState } from ".";

/**
 * IFrame Panel content
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

  /**
   * Resize the iframe element
   */
  private resizeIframe = () => {
    if (!this.props.height) {
      if (this._iframe) {
        const mainDiv = this.findParent(this._iframe, "ms-Panel-main");
        const commandsDiv = mainDiv.querySelector(".ms-Panel-commands") as HTMLDivElement;
        const headerDiv = mainDiv.querySelector("ms-Panel-header") as HTMLDivElement;
        const footerDiv = mainDiv.querySelector("ms-Panel-footer") as HTMLDivElement;

        let height = this.getTrueHeight(mainDiv);
        height = height - this.getTrueHeight(commandsDiv);
        height = height - this.getTrueHeight(headerDiv);
        height = height - this.getTrueHeight(footerDiv);
        height = height - 20;  // padding on content div

        this._iframe.height = height.toString() + 'px';
      }
    }
  }

  /**
   * Find the parent element
   *
   * @param elm
   * @param className
   */
  private findParent(elm: HTMLElement, className: string) {
    while ((elm = elm.parentElement) && !elm.classList.contains(className));
    return elm;
  }

  /**
   * Get the element its height
   *
   * @param elm
   */
  private getTrueHeight(elm: HTMLElement): number {
    if (elm) {
      const style = elm.style || window.getComputedStyle(elm);
      let marginTop = parseInt((style.marginTop as string).replace("px", ""));
      let marginBottom = parseInt((style.marginTop as string).replace("px", ""));
      if (isNaN(marginTop)) {
        marginTop = 0;
      }
      if (isNaN(marginBottom)) {
        marginBottom = 0;
      }
      return elm.offsetHeight + marginTop + marginBottom;
    } else {
      return 0;
    }
  }

  /**
   * On iframe load event
   */
  private iframeOnLoad = () => {
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

  /**
   * Default React render
   */
  public render(): JSX.Element {
    return (
      <div className={styles.iFrameDialog}>
        <iframe ref={(iframe) => { this._iframe = iframe; }} frameBorder={0} onLoad={this.iframeOnLoad} style={{ width: '100%', height: this.props.height, visibility: this.state.isContentVisible ? 'visible' : 'hidden' }} {...omit(this.props, 'height')} />

        {
          !this.state.isContentVisible && (
            <div className={styles.spinnerContainer}>
              <Spinner size={SpinnerSize.large} />
            </div>
          )
        }
      </div>
    );
  }
}
