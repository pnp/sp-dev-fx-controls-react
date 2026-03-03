import * as React from "react";
export interface IIFrameDialogContentProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
    close: () => void;
    iframeOnLoad?: (iframe: HTMLIFrameElement) => void;
}
export interface IIFrameDialogContentState {
    isContentVisible?: boolean;
}
/**
 * IFrame Dialog content
 */
export declare class IFrameDialogContent extends React.Component<IIFrameDialogContentProps, IIFrameDialogContentState> {
    private _iframe;
    constructor(props: IIFrameDialogContentProps);
    render(): JSX.Element;
    private _iframeOnLoad;
}
//# sourceMappingURL=IFrameDialogContent.d.ts.map