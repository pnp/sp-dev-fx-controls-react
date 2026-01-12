export interface ISwatchColorPickerGroupProps {
    groupColors: ISwatchColor[];
    groupText: string;
    onColorChanged: (string: any) => void;
    selectedColor?: string;
}
export interface ISwatchColorPickerGroupState {
}
export interface ISwatchColor {
    color: string;
    id: string;
    label: string;
}
//# sourceMappingURL=SwatchColorPickerGroup.types.d.ts.map