import * as React from 'react';
import { IViewPickerProps, IViewPickerState } from './IViewPicker';
export declare class ViewPicker extends React.Component<IViewPickerProps, IViewPickerState> {
    private selectedKey;
    private async;
    constructor(props: IViewPickerProps);
    componentDidMount(): Promise<void>;
    /**
     * componentDidUpdate lifecycle hook
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: IViewPickerProps, _prevState: IViewPickerState): Promise<void>;
    /**
     * Called when the component will unmount
    */
    componentWillUnmount(): void;
    private loadViews;
    /**
     * Set the currently selected views(s);
     */
    private setSelectedViews;
    /**
     * Fires when a view has been selected from the dropdown.
     * @param option The new selection.
     * @param index Index of the selection.
     */
    private onChange;
    /**
     * Renders the ViewPicker controls with Office UI Fabric
     */
    render(): JSX.Element;
}
//# sourceMappingURL=ViewPicker.d.ts.map