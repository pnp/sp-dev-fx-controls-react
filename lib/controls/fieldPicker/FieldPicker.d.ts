import * as React from 'react';
import { IFieldPickerProps, IFieldPickerState } from './IFieldPicker';
export declare class FieldPicker extends React.Component<IFieldPickerProps, IFieldPickerState> {
    private _selectedFields;
    constructor(props: IFieldPickerProps);
    componentDidMount(): void;
    /**
     * Loads the fields from the provided SharePoint site and updates the options state.
     */
    private loadFields;
    /**
     * Set the currently selected field(s);
     */
    private setSelectedFields;
    componentDidUpdate(prevProps: Readonly<IFieldPickerProps>, prevState: Readonly<IFieldPickerState>): void;
    /**
     * Fires when a field has been selected from the dropdown.
     * @param option The new selection.
     * @param index Index of the selection.
     */
    private onChange;
    render(): React.ReactElement<IFieldPickerProps>;
}
//# sourceMappingURL=FieldPicker.d.ts.map