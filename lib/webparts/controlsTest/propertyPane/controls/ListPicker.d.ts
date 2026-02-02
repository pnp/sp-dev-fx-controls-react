import * as React from 'react';
import { IDropdownOption } from '@fluentui/react/lib/Dropdown';
import { WebPartContext } from '@microsoft/sp-webpart-base';
export interface IListPickerProps {
    label: string;
    wpContext: WebPartContext;
    onChange: (option: IDropdownOption) => void;
    selectedKey: string | number;
    disabled: boolean;
}
export interface IListPickerState {
    loading: boolean;
    options: IDropdownOption[];
    error: string;
}
export declare class ListPicker extends React.Component<IListPickerProps, IListPickerState> {
    private selectedKey;
    constructor(props: IListPickerProps, state: IListPickerState);
    componentDidMount(): void;
    componentDidUpdate(prevProps: IListPickerProps, prevState: IListPickerState): void;
    private loadOptions;
    render(): JSX.Element;
    private onChange;
}
//# sourceMappingURL=ListPicker.d.ts.map