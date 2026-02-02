import * as React from 'react';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
export interface IFieldTitleRendererProps extends IFieldRendererProps {
    /**
     * text to be displayed
     */
    text?: string;
    /**
     * true if the Title should be rendered as link
     */
    isLink?: boolean;
    /**
     * web url
     */
    baseUrl?: string;
    /**
     * list id
     */
    listId?: string;
    /**
     * item id
     */
    id?: number;
    /**
     * custom title click event handler. If not set Display form for the item will be displayed
     */
    onClick?: (args: IFieldTitleClickEventArgs) => void;
}
/**
 * For future
 */
export interface IFieldTitleRendererState {
}
/**
 * Title click event arguments
 */
export interface IFieldTitleClickEventArgs {
    listId?: string;
    id?: string;
}
/**
 * Field Title Renderer.
 * Used for:
 *   - Title
 */
export declare class FieldTitleRenderer extends React.Component<IFieldTitleRendererProps, IFieldTitleRendererState> {
    constructor(props: IFieldTitleRendererProps, state: IFieldTitleRendererState);
    render(): JSX.Element;
    private _onClick;
}
//# sourceMappingURL=FieldTitleRenderer.d.ts.map