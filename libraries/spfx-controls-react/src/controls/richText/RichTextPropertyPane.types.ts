import type { Quill } from 'quill';
import { ISwatchColor } from './SwatchColorPickerGroup.types';

export interface IRichTextPropertyPaneProps {
  className?: string;
  editor: Quill;
  isOpen: boolean;
  customColors?: ISwatchColor[];
  onClose: () => void;
  onLink: () => void;
}

export interface IRichTextPropertyPaneState {
  formats: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
