import { override } from '@microsoft/decorators';
import * as React from 'react';
import { css, Icon } from 'office-ui-fabric-react';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import * as appInsights from '../../../common/appInsights';

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

        appInsights.track('FieldAttachmentsRenderer', {});

        this.state = {};
    }

    @override
    public render(): JSX.Element {
        return (
            <div className={css(this.props.className, styles.container, styles.fabricIcon)} style={this.props.cssProps}>
                {this.props.count && <Icon iconName={'Attach'}></Icon>}
            </div>
        );
    }
}
