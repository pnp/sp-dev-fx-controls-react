import * as React from "react";
import { IDialogProps } from '@fluentui/react/lib/Dialog';
export interface IFrameDialogProps extends IDialogProps {
    /**
     * iframe Url
     */
    url: string;
    /**
     * iframe's onload event handler
     */
    iframeOnLoad?: (iframe: HTMLIFrameElement) => void;
    /**
     * iframe width
     */
    width: string;
    /**
     * iframe height
     */
    height: string;
    /**
     * Specifies if iframe content can be displayed in a full screen.
     * Usage: <IFrameDialog allowFullScreen />
     */
    allowFullScreen?: boolean;
    /**
     * Specifies if transparency is allowed in iframe
     */
    allowTransparency?: boolean;
    /**
     * Specifies the top and bottom margins of the content of an <iframe>
     */
    marginHeight?: number;
    /**
     * Specifies the left and right margins of the content of an <iframe>
     */
    marginWidth?: number;
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
export interface IFrameDialogState {
    dialogId: string | undefined;
    isStylingSet?: boolean;
}
/**
 * Dialog component to display content in iframe
 */
export declare class IFrameDialog extends React.Component<IFrameDialogProps, IFrameDialogState> {
    constructor(props: IFrameDialogProps, state: IFrameDialogState);
    /**
     * componentWillMount lifecycle hook
     */
    UNSAFE_componentWillMount(): void;
    /**
     * componentDidMount lifecycle hook
     */
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IFrameDialogProps): void;
    componentDidUpdate(prevProps: IFrameDialogProps, prevState: IFrameDialogState): void;
    render(): JSX.Element;
    /**
     * Set the dialog style
     */
    private setDialogStyling;
}
//# sourceMappingURL=IFrameDialog.d.ts.map