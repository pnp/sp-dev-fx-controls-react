import * as React from 'react';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
export interface IFieldBaseTextRendererProps extends IFieldRendererProps {
    /**
     * text to be displayed
     */
    text?: string;
    /**
     * true if no need to render span element with text content
     */
    noTextRender?: boolean;
}
/**
 * For future
 */
export interface IFieldBaseTextRendererState {
}
/**
 * Base renderer. Used to render text.
 */
export declare class FieldBaseTextRenderer extends React.Component<IFieldBaseTextRendererProps, IFieldBaseTextRendererState> {
    constructor(props: IFieldBaseTextRendererProps, state: IFieldBaseTextRendererState);
    render(): JSX.Element;
}
//# sourceMappingURL=FieldBaseTextRenderer.d.ts.map