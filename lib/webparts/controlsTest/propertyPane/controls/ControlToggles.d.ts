import * as React from 'react';
import { ValidControls } from '../../IControlsTestWebPartProps';
export interface IControlTogglesProps {
    label: string;
    onChange: (controlName: string, enabled: boolean) => void;
    controlVisibility: {
        [K in ValidControls]: boolean;
    };
}
export interface IControlTogglesState {
    filter: string;
}
export declare class ControlToggles extends React.Component<IControlTogglesProps, IControlTogglesState> {
    private selectedKey;
    constructor(props: IControlTogglesProps, state: IControlTogglesState);
    render(): JSX.Element;
    private getValidControls;
    private getProperCase;
}
//# sourceMappingURL=ControlToggles.d.ts.map