import * as React from "react";
import styles from './IFrameDialogContent.module.scss';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';

export interface IIFrameDialogContentProps {
    url: string;
    close: () => void;
    iframeOnLoad?: (iframe: any) => void;
    width: string;
    height: string;
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
            <iframe ref={(iframe) => { this._iframe = iframe; }} frameBorder={0} src={this.props.url} onLoad={this._iframeOnLoad.bind(this)} style={{ width: '100%', height: this.props.height, visibility: this.state.isContentVisible ? 'visible' : 'hidden' }} />
            {!this.state.isContentVisible &&
                <div className={styles.spinnerContainer}>
                    <Spinner size={SpinnerSize.large} />
                </div>}
        </div>);
    }

    private _iframeOnLoad(): void {
        this._iframe.contentWindow.frameElement.cancelPopUp = this.props.close;


        if (this.props.iframeOnLoad) {
            this.props.iframeOnLoad(this._iframe);
        }

        this.setState({
            isContentVisible: true
        });
    }
}
