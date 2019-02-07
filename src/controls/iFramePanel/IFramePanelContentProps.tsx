export interface IIFramePanelContentProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  close: () => void;
  iframeOnLoad?: (iframe: any) => void;
}
