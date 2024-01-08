import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import { FieldBaseTextRenderer } from '../fieldBaseTextRenderer/FieldBaseTextRenderer';
import * as telemetry from '../../../common/telemetry';

export interface IFieldDateRendererProps extends IFieldRendererProps {
    /**
     * text to be rendered
     */
    text?: string;
}

/**
 * For future
 */
export interface IFieldDateRendererState {

}

/**
 * Field Date Renderer.
 * Used for:
 *   - Date Time
 */
export class FieldDateRenderer extends React.Component<IFieldDateRendererProps, IFieldDateRendererState> {
    public constructor(props: IFieldDateRendererProps, state: IFieldDateRendererState) {
        super(props, state);

        telemetry.track('FieldDateRenderer', {});

        this.state = {};
    }

    public render(): JSX.Element {
            return (<FieldBaseTextRenderer cssProps={this.props.cssProps} className={css(this.props.className)} noTextRender={true}>{this.props.text}</FieldBaseTextRenderer>);
    }
}
