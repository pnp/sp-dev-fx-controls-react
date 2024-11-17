import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import { Link } from '@fluentui/react/lib/Link';

import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import * as telemetry from '../../../common/telemetry';

import styles from './FieldUrlRenderer.module.scss';

export interface IFieldUrlRendererProps extends IFieldRendererProps {
    /**
     * text to be displayed
     */
    text?: string;
    /**
     * url
     */
    url: string;
    /**
     * if the field should be rendered as image
     */
    isImageUrl?: boolean;
}

/**
 * For future
 */
export interface IFieldUrlRendererState {

}

/**
 * Field URL Renderer.
 * Used for:
 *   - URL (Hyperlink, Image)
 */
export class FieldUrlRenderer extends React.Component<IFieldUrlRendererProps, IFieldUrlRendererState> {
    public constructor(props: IFieldUrlRendererProps, state: IFieldUrlRendererState) {
        super(props, state);

        telemetry.track('FieldUrlRenderer', {});

        this.state = {};
    }

    public render(): JSX.Element {
        const isImageUrl: boolean = this.props.isImageUrl;

        if (isImageUrl) {
            return (<div className={css(this.props.className, styles.image)} style={this.props.cssProps} onClick={this._onImgClick.bind(this)}><img src={this.props.url} alt={this.props.text} /></div>);
        }
        else {
            return (<Link className={css(this.props.className, styles.link)} target={'_blank'} href={this.props.url} style={this.props.cssProps}>{this.props.text}</Link>);
        }
    }

    private _onImgClick(): void {
        window.open(this.props.url, '_blank');
    }
}
