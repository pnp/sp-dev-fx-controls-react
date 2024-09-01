import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { css } from '@fluentui/react/lib/Utilities';
import { Icon } from '@fluentui/react/lib/Icon';
import { Link } from '@fluentui/react/lib/Link';

import { FieldBaseTextRenderer } from '../fieldBaseTextRenderer/FieldBaseTextRenderer';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import * as telemetry from '../../../common/telemetry';

import styles from './FieldNameRenderer.module.scss';

export interface IFieldNameRendererProps extends IFieldRendererProps {
    /**
     * text to display
     */
    text?: string;
    /**
     * if the Name should be rendered as link
     */
    isLink: boolean;
    /**
     * path to the document
     */
    filePath?: string;
    /**
     * true if the document is new
     */
    isNew?: boolean;
    /**
     * true if the document type has preview (true by default).
     * The flag impacts on the link's href:
     * if the flag is tru then the href is constructed like #id=${filePath}&parent=${filePath.substring(0, filePath.lastIndexOf('/'))},
     * otherwise the href will contain filePath only.
     */
    hasPreview?: boolean;
    /**
     * custom handler for link click. If not set link click will lead to rendering document preview
     */
    onClick?: (args: IFieldNameClickEventArgs) => void;
    /**
     * custom handler for link double click. If not set link will use OOTB behavior.
     */
    onDoubleClick?: (args: IFieldNameClickEventArgs) => void;
}

/**
 * For future
 */
export interface IFieldNameRendererState {

}

/**
 * Name click event arguments
 */
export interface IFieldNameClickEventArgs {
    filePath?: string;
}

/**
 * Field Title Renderer.
 * Used for:
 *   - Title
 */
export class FieldNameRenderer extends React.Component<IFieldNameRendererProps, IFieldNameRendererState> {
    private _button: HTMLButtonElement;

    public constructor(props: IFieldNameRendererProps, state: IFieldNameRendererState) {
        super(props, state);

        telemetry.track('FieldNameRenderer', {});

        this.state = {};

        this._onDoubleClick = this._onDoubleClick.bind(this);
    }

    public componentDidMount(): void {
        //
        // small hack for double click.
        // unfortunately, we can't use React onDoubleClick because React doesn't guaranty the sequence of handlers.
        // And stopPropagation could not make effect.
        //
        if (this.props.onDoubleClick && this.props.isLink) {
            const domNode = ReactDOM.findDOMNode(this) as HTMLElement; // eslint-disable-line react/no-find-dom-node
            this._button = domNode.querySelector('button');
            this._button.addEventListener('dblclick', this._onDoubleClick, false);
        }
    }

    public componentWillUnmount(): void {
        if (this._button) {
            this._button.removeEventListener('dblclick', this._onDoubleClick);
        }
    }

    public render(): JSX.Element {
        const isLink: boolean = this.props.isLink;
        //
        // for now only signal for New documents is implemented
        //
        const signal: JSX.Element = this.props.isNew ? <span className={css(styles.signal, styles.newItem)}><Icon iconName={'Glimmer'} className={css(styles.newIcon)} /></span> : null;
        let value: JSX.Element;

        if (isLink) {
            if (this.props.onClick) {
                value = <Link
                    onClick={this._onClick.bind(this)}
                    style={this.props.cssProps}
                    className={styles.value}>{this.props.text}</Link>;
            }
            else {
                let url: string;
                const filePath = this.props.filePath;
                const parentPath = filePath.substring(0, filePath.lastIndexOf('/'));
                if (this.props.hasPreview !== false) {
                    url = `#id=${encodeURIComponent(filePath)}&parent=${encodeURIComponent(parentPath)}`;
                }
                else {
                    url = filePath;
                }

                value = <Link href={url} style={this.props.cssProps} className={styles.value}>{this.props.text}</Link>;
            }
        }
        else {
            value = <FieldBaseTextRenderer cssProps={this.props.cssProps} text={this.props.text} />;
        }

        return <span className={css(styles.signalField, this.props.className)} style={this.props.cssProps}>
            {signal}
            <span className={styles.signalFieldValue}>
                {value}
            </span>
        </span>;
    }

    private _onClick(e): boolean {
        if (this.props.onClick) {
            e.stopPropagation();
            e.preventDefault();
            const args: IFieldNameClickEventArgs = this.props as IFieldNameClickEventArgs;
            this.props.onClick(args);
            return false;
        }
    }

    private _onDoubleClick(e): boolean {
        if (this.props.onDoubleClick) {
            e.stopPropagation();
            e.preventDefault();
            const args: IFieldNameClickEventArgs = this.props as IFieldNameClickEventArgs;
            this.props.onDoubleClick(args);
            return false;
        }
    }
}
