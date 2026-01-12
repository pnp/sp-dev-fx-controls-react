import * as React from 'react';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
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
export declare class FieldDateRenderer extends React.Component<IFieldDateRendererProps, IFieldDateRendererState> {
    constructor(props: IFieldDateRendererProps, state: IFieldDateRendererState);
    render(): JSX.Element;
}
//# sourceMappingURL=FieldDateRenderer.d.ts.map