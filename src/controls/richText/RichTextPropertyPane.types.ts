import ReactQuill, { Quill } from 'react-quill';

export interface IRichTextPropertyPaneProps {
  className?: string;
  editor: Quill;
  isOpen: boolean;
  onClose: () => void;
  onLink: () => void;
}

export interface IRichTextPropertyPaneState {
  formats: any;
}
