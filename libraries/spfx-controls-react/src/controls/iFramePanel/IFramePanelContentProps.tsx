export interface IIFramePanelContentProps extends React.IframeHTMLAttributes<HTMLIFrameElement> {
  close: () => void;
  iframeOnLoad?: (iframe: HTMLIFrameElement) => void;
}
