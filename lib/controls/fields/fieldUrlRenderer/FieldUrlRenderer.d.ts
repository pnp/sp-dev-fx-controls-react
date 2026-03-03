import * as React from 'react';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
export interface IFieldUrlRendererProps extends IFieldRendererProps {
    /**
     * text to be displayed
     */
    text?: string;
    /**
     * url
     */
    url: string;
    /**
     * if the field should be rendered as image
     */
    isImageUrl?: boolean;
}
/**
 * For future
 */
export interface IFieldUrlRendererState {
}
/**
 * Field URL Renderer.
 * Used for:
 *   - URL (Hyperlink, Image)
 */
export declare class FieldUrlRenderer extends React.Component<IFieldUrlRendererProps, IFieldUrlRendererState> {
    constructor(props: IFieldUrlRendererProps, state: IFieldUrlRendererState);
    render(): JSX.Element;
    private _onImgClick;
}
//# sourceMappingURL=FieldUrlRenderer.d.ts.map