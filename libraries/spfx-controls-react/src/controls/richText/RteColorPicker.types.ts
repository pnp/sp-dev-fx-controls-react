import { ISwatchColor } from './SwatchColorPickerGroup.types';

export interface IRteColorPickerProps {
  id: string;
  buttonLabel: string;
  colorPickerGroups: string[];
  defaultButtonLabel?: string;
  fillThemeColor?: boolean;
  onColorChanged: (color: string) => void;
  previewColor: string;
  selectedColor: string;
  switchToDefaultColor: () => void;
  customColors?: ISwatchColor[];
}

export interface IRteColorPickerState {
  isCalloutVisible: boolean;
}
