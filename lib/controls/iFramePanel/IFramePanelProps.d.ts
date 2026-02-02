import { IPanelProps } from "@fluentui/react/lib/Panel";
export interface IIFramePanelProps extends IPanelProps {
    /**
      * iframe Url
      */
    url: string;
    /**
    * iframe height, if null then hight is calculated
    */
    height?: string;
    /**
     * Specifies if iframe content can be displayed in a full screen.
     * Usage: <IFrameDialog allowFullScreen />
     */
    allowFullScreen?: boolean;
    /**
     * iframe's onload event handler
     */
    iframeOnLoad?: (iframe: HTMLIFrameElement) => void;
    /**
     * Specifies if transparency is allowed in iframe
     */
    allowTransparency?: boolean;
    /**
     * Specifies the name of an <iframe>
     */
    name?: string;
    /**
     * Enables an extra set of restrictions for the content in an <iframe>
     */
    sandbox?: string;
    /**
     * Specifies whether or not to display scrollbars in an <iframe>
     */
    scrolling?: string;
    /**
     * When present, it specifies that the <iframe> should look like it is a part of the containing document (no borders or scrollbars)
     */
    seamless?: boolean;
}
//# sourceMappingURL=IFramePanelProps.d.ts.map