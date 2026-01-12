import * as React from 'react';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
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
export declare class FieldTextRenderer extends React.Component<IFieldTextRendererProps, IFieldTextRendererState> {
    constructor(props: IFieldTextRendererProps, state: IFieldTextRendererState);
    render(): JSX.Element;
}
//# sourceMappingURL=FieldTextRenderer.d.ts.map