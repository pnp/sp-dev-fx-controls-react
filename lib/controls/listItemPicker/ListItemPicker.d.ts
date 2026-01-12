import * as React from "react";
import { IListItemPickerProps } from "./IListItemPickerProps";
import { IListItemPickerState } from "./IListItemPickerState";
export declare class ListItemPicker extends React.Component<IListItemPickerProps, IListItemPickerState> {
    private _spservice;
    private _tagPickerId;
    constructor(props: IListItemPickerProps);
    private ensureLoadField;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: IListItemPickerProps): void;
    /**
     * Render the field
     */
    render(): React.ReactElement<IListItemPickerProps>;
    /**
     * Get text from Item
     */
    private getTextFromItem;
    /**
     * On Selected Item
     */
    private onItemChanged;
    /**
     * Filter Change
     */
    private onFilterChanged;
    /**
     * Function to load List Items
     */
    private loadListItems;
    private loadField;
}
//# sourceMappingURL=ListItemPicker.d.ts.map