import * as React from 'react';
import { IListPickerProps, IListPickerState } from './IListPicker';
/**
* Renders the controls for the ListPicker component
*/
export declare class ListPicker extends React.Component<IListPickerProps, IListPickerState> {
    private _selectedList;
    /**
    * Constructor method
    */
    constructor(props: IListPickerProps);
    /**
    * Lifecycle hook when component is mounted
    */
    componentDidMount(): void;
    /**
     * componentDidUpdate lifecycle hook
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: IListPickerProps, prevState: IListPickerState): void;
    /**
    * Loads the list from SharePoint current web site
    */
    private loadLists;
    /**
     * Set the currently selected list
     */
    private setSelectedLists;
    /**
    * Raises when a list has been selected
    * @param option the new selection
    * @param index the index of the selection
    */
    private onChanged;
    /**
    * Renders the ListPicker controls with Office UI Fabric
    */
    render(): JSX.Element;
}
//# sourceMappingURL=ListPicker.d.ts.map