import * as React from 'react';
import { ILocationPickerProps, ILocationPickerState } from './ILocationPicker';
export declare class LocationPicker extends React.Component<ILocationPickerProps, ILocationPickerState> {
    private _token;
    private focusRef;
    /**
    * Constructor method
    */
    constructor(props: ILocationPickerProps);
    UNSAFE_componentWillReceiveProps(nextProps: ILocationPickerProps): void;
    /**
    * Renders the LocationPicker controls with Office UI Fabric
    */
    render(): JSX.Element;
    private onRenderOption;
    private getMainContent;
    private getLocationText;
    private onIconButtonClick;
    private onClick;
    private onBlur;
    private onChange;
    private customRenderInitials;
    private getToken;
    private getLocatios;
}
//# sourceMappingURL=LocationPicker.d.ts.map