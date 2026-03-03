import * as React from 'react';
import { IFieldRendererProps } from '../fieldCommon/IFieldRendererProps';
export interface IFieldFileTypeRendererProps extends IFieldRendererProps {
    /**
     * file/document path
     */
    path: string;
    /**
     * true if the icon should be rendered for a folder, not file
     */
    isFolder?: boolean;
}
/**
 * For future
 */
export interface IFieldFileTypeRendererState {
}
/**
 * File Type Renderer.
 * Used for:
 *   - File/Document Type
 */
export declare class FieldFileTypeRenderer extends React.Component<IFieldFileTypeRendererProps, IFieldFileTypeRendererState> {
    constructor(props: IFieldFileTypeRendererProps, state: IFieldFileTypeRendererState);
    render(): JSX.Element;
}
//# sourceMappingURL=FieldFileTypeRenderer.d.ts.map