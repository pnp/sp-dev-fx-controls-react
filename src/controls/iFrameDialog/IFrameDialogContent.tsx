import * as React from "react";
import styles from './IFrameDialogContent.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import omit from 'lodash/omit';

export interface IIFrameDialogContentProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  close: () => void;
  iframeOnLoad?: (iframe: HTMLIFrameElement) => void;
}

export interface IIFrameDialogContentState {
  isContentVisible?: boolean;
}

/**
 * IFrame Dialog content
 */
export class IFrameDialogContent extends React.Component<IIFrameDialogContentProps, IIFrameDialogContentState> {
  private _iframe: HTMLIFrameElement;

  constructor(props: IIFrameDialogContentProps) {
    super(props);

    this.state = {
      isContentVisible: false
    };
  }

  public render(): JSX.Element {
    return (<div className={styles.iFrameDialog}>
      <iframe ref={(iframe) => { this._iframe = iframe; }} frameBorder={0} onLoad={this._iframeOnLoad.bind(this)} style={{ width: '100%', height: '100%', visibility: this.state.isContentVisible ? 'visible' : 'hidden' }} {...omit(this.props, 'height')} />
      {!this.state.isContentVisible &&
        <div className={styles.spinnerContainer}>
          <Spinner size={SpinnerSize.large} />
        </div>}
    </div>);
  }

  private _iframeOnLoad(): void {
    try { // for cross origin requests we can have issues with accessing frameElement
      /* eslint-disable @typescript-eslint/no-explicit-any */
      (this._iframe.contentWindow.frameElement as any).cancelPopUp = this.props.close;
      (this._iframe.contentWindow.frameElement as any).commitPopUp = this.props.close;
      // SP.UI.Dialog has misspelling of commitPopUp
      (this._iframe.contentWindow.frameElement as any).commitPopup = this.props.close;
      /* eslint-enable @typescript-eslint/no-explicit-any */
    }
    catch (err) {
      if (err.name !== 'SecurityError') {
        throw err;
      }
    }


    if (this.props.iframeOnLoad) {
      this.props.iframeOnLoad(this._iframe);
    }

    this.setState({
      isContentVisible: true
    });
  }
}
