import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';
import { Icon } from '@fluentui/react/lib/Icon';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import * as telemetry from '../../../common/telemetry';

import styles from './FieldAttachmentsRenderer.module.scss';

/**
 * Attachments renderer props
 */
export interface IFieldAttachmentsRendererProps extends IFieldRendererProps {
    /**
     * amount of attachments
     */
    count?: number;
}

/**
 * For future
 */
export interface IFieldAttahcmentsRendererState {

}

/**
 * Attachments Renderer.
 * Used for:
 *   - Attachments
 */
export class FieldAttachmentsRenderer extends React.Component<IFieldAttachmentsRendererProps, IFieldAttahcmentsRendererState> {
    public constructor(props: IFieldAttachmentsRendererProps, state: IFieldAttahcmentsRendererState) {
        super(props, state);

        telemetry.track('FieldAttachmentsRenderer', {});

        this.state = {};
    }

    public render(): JSX.Element {
        return (
            <div className={css(this.props.className, styles.container, styles.fabricIcon)} style={this.props.cssProps}>
                {this.props.count && <Icon iconName={'Attach'} />}
            </div>
        );
    }
}
