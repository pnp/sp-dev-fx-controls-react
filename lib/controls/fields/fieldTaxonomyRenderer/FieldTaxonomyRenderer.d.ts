import * as React from 'react';
import { ITerm } from '../../../common/SPEntities';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
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
export declare class FieldTaxonomyRenderer extends React.Component<IFieldTaxonomyRendererProps, IFieldTaxonomyRendererState> {
    constructor(props: IFieldTaxonomyRendererProps, state: IFieldTaxonomyRendererState);
    render(): JSX.Element;
}
//# sourceMappingURL=FieldTaxonomyRenderer.d.ts.map