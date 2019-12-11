import * as React from "react";
import styles from './IFrameDialogContent.module.scss';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import omit = require('lodash/omit');

export interface IIFrameDialogContentProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    close: () => void;
    iframeOnLoad?: (iframe: any) => void;
}

export interface IIFrameDialogContentState {
    isContentVisible?: boolean;
}

/**
 * IFrame Dialog content
 */
export class IFrameDialogContent extends React.Component<IIFrameDialogContentProps, IIFrameDialogContentState> {
    private _iframe: any;

    constructor(props: IIFrameDialogContentProps) {
        super(props);

        this.state = {
            isContentVisible: false
        };
    }

    public render(): JSX.Element {
        return (<div className={styles.iFrameDialog}>
            <iframe ref={(iframe) => { this._iframe = iframe; }} frameBorder={0} onLoad={this._iframeOnLoad.bind(this)} style={{ width: '100%', height: this.props.height, visibility: this.state.isContentVisible ? 'visible' : 'hidden' }} {...omit(this.props, 'height')} />
            {!this.state.isContentVisible &&
                <div className={styles.spinnerContainer}>
                    <Spinner size={SpinnerSize.large} />
                </div>}
        </div>);
    }

    private _iframeOnLoad(): void {
        try { // for cross origin requests we can have issues with accessing frameElement
            this._iframe.contentWindow.frameElement.cancelPopUp = this.props.close;
            this._iframe.contentWindow.frameElement.commitPopUp = this.props.close;
            // SP.UI.Dialog has misspelling of commitPopUp
            this._iframe.contentWindow.frameElement.commitPopup = this.props.close;
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
