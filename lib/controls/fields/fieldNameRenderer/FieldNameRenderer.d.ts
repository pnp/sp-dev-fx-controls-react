import * as React from 'react';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
export interface IFieldNameRendererProps extends IFieldRendererProps {
    /**
     * text to display
     */
    text?: string;
    /**
     * if the Name should be rendered as link
     */
    isLink: boolean;
    /**
     * path to the document
     */
    filePath?: string;
    /**
     * true if the document is new
     */
    isNew?: boolean;
    /**
     * true if the document type has preview (true by default).
     * The flag impacts on the link's href:
     * if the flag is tru then the href is constructed like #id=${filePath}&parent=${filePath.substring(0, filePath.lastIndexOf('/'))},
     * otherwise the href will contain filePath only.
     */
    hasPreview?: boolean;
    /**
     * custom handler for link click. If not set link click will lead to rendering document preview
     */
    onClick?: (args: IFieldNameClickEventArgs) => void;
    /**
     * custom handler for link double click. If not set link will use OOTB behavior.
     */
    onDoubleClick?: (args: IFieldNameClickEventArgs) => void;
}
/**
 * For future
 */
export interface IFieldNameRendererState {
}
/**
 * Name click event arguments
 */
export interface IFieldNameClickEventArgs {
    filePath?: string;
}
/**
 * Field Title Renderer.
 * Used for:
 *   - Title
 */
export declare class FieldNameRenderer extends React.Component<IFieldNameRendererProps, IFieldNameRendererState> {
    private _button;
    constructor(props: IFieldNameRendererProps, state: IFieldNameRendererState);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): JSX.Element;
    private _onClick;
    private _onDoubleClick;
}
//# sourceMappingURL=FieldNameRenderer.d.ts.map