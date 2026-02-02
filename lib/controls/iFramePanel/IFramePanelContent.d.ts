import * as React from "react";
import { IIFramePanelContentProps, IIFramePanelContentState } from ".";
/**
 * IFrame Panel content
 */
export declare class IFramePanelContent extends React.Component<IIFramePanelContentProps, IIFramePanelContentState> {
    private _iframe;
    constructor(props: IIFramePanelContentProps);
    /**
     * Resize the iframe element
     */
    private resizeIframe;
    /**
     * Find the parent element
     *
     * @param elm
     * @param className
     */
    private findParent;
    /**
     * Get the element its height
     *
     * @param elm
     */
    private getTrueHeight;
    /**
     * On iframe load event
     */
    private iframeOnLoad;
    /**
     * Default React render
     */
    render(): JSX.Element;
}
//# sourceMappingURL=IFramePanelContent.d.ts.map