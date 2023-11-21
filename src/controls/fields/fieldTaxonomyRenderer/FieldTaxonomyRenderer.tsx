import * as React from 'react';
import { css } from '@fluentui/react/lib/Utilities';

import { ITerm } from '../../../common/SPEntities';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
import * as telemetry from '../../../common/telemetry';

import styles from './FieldTaxonomyRenderer.module.scss';

export interface IFieldTaxonomyRendererProps extends IFieldRendererProps {
    /**
     * terms to display
     */
    terms: ITerm | ITerm[];
}

/**
 * For future
 */
export interface IFieldTaxonomyRendererState {

}

/**
 * Field Taxonomy Renderer.
 * Used for:
 *   - Taxonomy
 */
export class FieldTaxonomyRenderer extends React.Component<IFieldTaxonomyRendererProps, IFieldTaxonomyRendererState> {
    public constructor(props: IFieldTaxonomyRendererProps, state: IFieldTaxonomyRendererState) {
        super(props, state);

        telemetry.track('FieldTaxonomyRenderer', {});

        this.state = {};
    }

    public render(): JSX.Element {
        let termEls: JSX.Element | JSX.Element[] = null;
        if (Array.isArray(this.props.terms)) {
            termEls = this.props.terms.map((term) => {
                return <div key={term.TermID} className={styles.term} style={this.props.cssProps}><span>{term.Label}</span></div>;
            });
        } else {
            termEls = <div className={styles.term} style={this.props.cssProps}><span>{this.props.terms.Label}</span></div>;
        }
        return (<div style={this.props.cssProps} className={css(this.props.className)}>{termEls}</div>);
    }
}
