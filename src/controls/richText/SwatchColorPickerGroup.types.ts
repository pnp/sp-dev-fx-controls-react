export interface ISwatchColorPickerGroupProps {
  groupColors: ISwatchColor[];
  groupText: string;
  onColorChanged: (color: string) => void;
  selectedColor?: string;
}

export interface ISwatchColorPickerGroupState {

}

export interface ISwatchColor {
  color:string;
  id: string;
  label: string;
}
