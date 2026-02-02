import * as React from 'react';
import { IRteColorPickerProps, IRteColorPickerState } from './RteColorPicker.types';
export default class RteColorPicker extends React.Component<IRteColorPickerProps, IRteColorPickerState> {
    private wrapperRef;
    constructor(props: IRteColorPickerProps);
    /**
     * Default React render method
     */
    render(): React.ReactElement<IRteColorPickerProps>;
    /**
     * Handle switch to default
     */
    private handleSwitchToDefault;
    /**
     * Handle color change
     */
    private handleColorChanged;
    /**
     * Get swatch color picker group
     */
    private getSwatchColorPickerGroup;
}
//# sourceMappingURL=RteColorPicker.d.ts.map