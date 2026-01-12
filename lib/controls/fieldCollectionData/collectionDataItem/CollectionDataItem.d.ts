import * as React from 'react';
import { ICollectionDataItemProps } from './ICollectionDataItemProps';
import { ICollectionDataItemState } from './ICollectionDataItemState';
export declare class CollectionDataItem extends React.Component<ICollectionDataItemProps, ICollectionDataItemState> {
    private emptyItem;
    private validation;
    private calloutCellRef;
    constructor(props: ICollectionDataItemProps);
    /**
     * componentDidUpdate lifecycle hook
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: ICollectionDataItemProps): void;
    /**
     * Update the item value on the field change
     */
    private onValueChanged;
    private onValueChangedComboBoxSingle;
    private onValueChangedComboBoxMulti;
    /**
     * Perform all required field checks at once
     */
    private doAllFieldChecks;
    /**
     * Check if all values of the required fields are provided
     */
    private checkAllRequiredFieldsValid;
    /**
     * Check if any of the fields contain a value
     * @param item
     */
    private checkAnyFieldContainsValue;
    /**
     * Check if the add action needs to be disabled
     */
    private disableAdd;
    /**
     * Checks if all fields are valid
     */
    private checkAllFieldsAreValid;
    /**
     * Add the current row to the collection
     */
    private addRow;
    /**
     * Add the current row to the collection
     */
    private updateItem;
    /**
     * Delete the item from the collection
     */
    private deleteRow;
    /**
     * Allow custom field validation
     *
     * @param field
     * @param value
     */
    private fieldValidation;
    /**
     * Custom field validation
     */
    private onCustomFieldValidation;
    /**
     * URL field validation
     *
     * @param field
     * @param value
     * @param item
     */
    private urlFieldValidation;
    private peoplepickerValidation;
    private comboboxValidation;
    /**
     * Error callout message handler
     *
     * @param field
     * @param message
     */
    private errorCalloutHandler;
    /**
     * Toggle the error callout
     */
    private toggleErrorCallout;
    private hideErrorCallout;
    /**
     * Render the field
     *
     * @param field
     * @param item
     */
    private renderField;
    /**
     * Retrieve all dropdown options
     */
    private getSortingOptions;
    /**
    * Creates an empty item with a unique id
    */
    private generateEmptyItem;
    /**
     * Default React render
     */
    render(): React.ReactElement<ICollectionDataItemProps>;
}
//# sourceMappingURL=CollectionDataItem.d.ts.map