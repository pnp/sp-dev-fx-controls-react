import * as React from "react";
import { IComboBoxListItemPickerProps } from "./IComboBoxListItemPickerProps";
import { IComboBoxListItemPickerState } from "./IComboBoxListItemPickerState";
export declare class ComboBoxListItemPicker extends React.Component<IComboBoxListItemPickerProps, IComboBoxListItemPickerState> {
    private _listItemRepo;
    private _options;
    constructor(props: IComboBoxListItemPickerProps);
    componentDidMount(): void;
    protected loadOptions(props: IComboBoxListItemPickerProps, isInitialLoad?: boolean): Promise<void>;
    UNSAFE_componentWillReceiveProps(nextProps: IComboBoxListItemPickerProps): Promise<void>;
    private _getSelectedItems;
    /**
     * Render the field
     */
    render(): React.ReactElement<IComboBoxListItemPickerProps>;
    /**
     * On Selected Item
     */
    private onChanged;
}
//# sourceMappingURL=ComboBoxListItemPicker.d.ts.map