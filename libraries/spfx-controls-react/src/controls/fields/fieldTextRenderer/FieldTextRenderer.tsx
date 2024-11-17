import * as React from 'react';
import { css, ICssInput } from '@fluentui/react/lib/Utilities';

import styles from './FieldTextRenderer.module.scss';

import { FieldBaseTextRenderer } from '../fieldBaseTextRenderer/FieldBaseTextRenderer';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import * as telemetry from '../../../common/telemetry';

export interface IFieldTextRendererProps extends IFieldRendererProps {
    /**
     * text to be displayed
     */
    text?: string;
    /**
     * true if props.text can be inserted as innerHTML of the component
     */
    isSafeForInnerHTML?: boolean;
    /**
     * true if the text should be truncated
     */
    isTruncated?: boolean;
}

/**
 * For future
 */
export interface IFieldTextRendererState {

}

/**
 * Field Text Renderer.
 * Used for:
 *   - Single line of text
 *   - Multiline text
 *   - Choice
 *   - Checkbox
 *   - Number
 *   - Currency
 */
export class FieldTextRenderer extends React.Component<IFieldTextRendererProps, IFieldTextRendererState> {
    public constructor(props: IFieldTextRendererProps, state: IFieldTextRendererState) {
        super(props, state);

        telemetry.track('FieldTextRenderer', {});

        this.state = {};
    }

    public render(): JSX.Element {
        const isSafeForInnerHTML: boolean = this.props.isSafeForInnerHTML;
        const isTruncatedClassNameObj: ICssInput = {};
        isTruncatedClassNameObj[styles.isTruncated] = this.props.isTruncated;
        let text: string = this.props.text;
        if (isSafeForInnerHTML && this.props.isTruncated) {
            text += `<div class=${styles.truncate} style="background: linear-gradient(to bottom, transparent, ${(this.props.cssProps && (this.props.cssProps.background || this.props.cssProps.backgroundColor)) || '#ffffff'} 100%)"></div>`;
        }


        if (isSafeForInnerHTML) {
            return (<div className={css(this.props.className, styles.fieldRendererText, isTruncatedClassNameObj)} style={this.props.cssProps} dangerouslySetInnerHTML={{__html: text}} />);
        }
        else {
            return (<FieldBaseTextRenderer className={css(this.props.className, styles.fieldRendererText)} cssProps={this.props.cssProps} text={this.props.text} />);
        }
    }
}
