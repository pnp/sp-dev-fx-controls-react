export interface IIconPickerProps {
    /**
     * call-back function when icon selection has been confirmed
     */
    onSave(iconName: string): void;
    /**
     * call-back function when cancel is clicked
     */
    onCancel?(): void;
    /**
     * call-back function when icon has changed
     */
    onChange?(iconName: string): void;
    /**
     * Specifies the label of the icon picker button
     */
    buttonLabel?: string;
    /**
     * Specifies if the picker button is disabled
     */
    disabled?: boolean;
    /**
     * Specifies a custom className for the picker button
     */
    buttonClassName?: string;
    /**
     * Specifies a custom className for the panel element
     */
    panelClassName?: string;
    /**
     * initially selected icon
     */
    currentIcon?: string;
    /**
    * irender option:  panel, dialog
    */
    renderOption?: 'panel' | 'dialog';
    /**
     * Specifies if we need to use `startsWith` when searching for the icons.
     * Default: false
     */
    useStartsWithSearch?: boolean;
}
//# sourceMappingURL=IIconPickerProps.d.ts.map