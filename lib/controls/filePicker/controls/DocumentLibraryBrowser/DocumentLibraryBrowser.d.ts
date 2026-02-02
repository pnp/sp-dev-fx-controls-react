import * as React from "react";
import { IDocumentLibraryBrowserProps } from "./IDocumentLibraryBrowserProps";
import { IDocumentLibraryBrowserState } from "./IDocumentLibraryBrowserState";
/**
 * This would have been better done as an Office Fabric TileList, but it isn't available yet for production use
 */
export declare class DocumentLibraryBrowser extends React.Component<IDocumentLibraryBrowserProps, IDocumentLibraryBrowserState> {
    constructor(props: IDocumentLibraryBrowserProps);
    componentDidMount(): Promise<void>;
    render(): React.ReactElement<IDocumentLibraryBrowserProps>;
    /**
    * Renders a cell for search suggestions
    */
    private _onRenderLibraryTile;
    /**
     * Calls parent when library is opened
     */
    private _handleOpenLibrary;
}
//# sourceMappingURL=DocumentLibraryBrowser.d.ts.map