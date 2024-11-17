import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import { Link } from '@fluentui/react/lib/Link';

import { FieldBaseTextRenderer } from '../fieldBaseTextRenderer/FieldBaseTextRenderer';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import * as telemetry from '../../../common/telemetry';

export interface IFieldTitleRendererProps extends IFieldRendererProps {
    /**
     * text to be displayed
     */
    text?: string;
    /**
     * true if the Title should be rendered as link
     */
    isLink?: boolean;
    /**
     * web url
     */
    baseUrl?: string;
    /**
     * list id
     */
    listId?: string;
    /**
     * item id
     */
    id?: number;
    /**
     * custom title click event handler. If not set Display form for the item will be displayed
     */
    onClick?: (args: IFieldTitleClickEventArgs) => void;
}

/**
 * For future
 */
export interface IFieldTitleRendererState {

}

/**
 * Title click event arguments
 */
export interface IFieldTitleClickEventArgs {
    listId?: string;
    id?: string;
}

/**
 * Field Title Renderer.
 * Used for:
 *   - Title
 */
export class FieldTitleRenderer extends React.Component<IFieldTitleRendererProps, IFieldTitleRendererState> {
    public constructor(props: IFieldTitleRendererProps, state: IFieldTitleRendererState) {
        super(props, state);

        telemetry.track('FieldTitleRenderer', {});

        this.state = {};
    }

    public render(): JSX.Element {
        const isLink: boolean = this.props.isLink;

        if (isLink) {
            return (<Link onClick={this._onClick.bind(this)} className={css(this.props.className)} style={this.props.cssProps}>{this.props.text}</Link>);
        }
        else {
            return (<FieldBaseTextRenderer className={this.props.className} cssProps={this.props.cssProps} text={this.props.text} />);
        }
    }

    private _onClick(): void {
        if (this.props.onClick) {
            const args: IFieldTitleClickEventArgs = {
                listId: this.props.listId,
                id: this.props.id.toString()
            };
            this.props.onClick(args);
            return;
        }
        const url: string = `${this.props.baseUrl}/_layouts/15/listform.aspx?PageType=4&ListId=${this.props.listId}&ID=${this.props.id}`;
        location.href = url;
    }
}
