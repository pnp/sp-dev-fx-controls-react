import * as React from 'react';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
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
export declare class FieldAttachmentsRenderer extends React.Component<IFieldAttachmentsRendererProps, IFieldAttahcmentsRendererState> {
    constructor(props: IFieldAttachmentsRendererProps, state: IFieldAttahcmentsRendererState);
    render(): JSX.Element;
}
//# sourceMappingURL=FieldAttachmentsRenderer.d.ts.map