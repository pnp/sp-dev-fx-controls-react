import type { Quill } from 'quill';
import type { ISwatchColor } from './SwatchColorPickerGroup.types';
import type { IRichTextCustomFormattingStyles } from './RichText.types';

export interface IRichTextPropertyPaneProps {
  className?: string;
  editor: Quill;
  isOpen: boolean;
  customColors?: ISwatchColor[];
  customStyles?: IRichTextCustomFormattingStyles;
  onClose: () => void;
  onLink: () => void;
}

export interface IRichTextPropertyPaneState {
  formats: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
