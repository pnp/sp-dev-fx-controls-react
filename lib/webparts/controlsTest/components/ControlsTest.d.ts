import * as React from 'react';
import { IControlsTestProps } from './IControlsTestProps';
import { IControlsTestState } from './IControlsTestState';
/**
 * Component that can be used to test out the React controls from this project
 */
export default class ControlsTest extends React.Component<IControlsTestProps, IControlsTestState> {
    private spTaxonomyService;
    private theme;
    private pickerStylesSingle;
    private onSelectedChannel;
    /**
     * Static array for carousel control example.
     */
    private carouselElements;
    private skypeCheckIcon;
    private treeitems;
    private progressSteps;
    private divRefAddReaction;
    private peoplePickerContext;
    private termSetId;
    constructor(props: IControlsTestProps);
    /**
     * React componentDidMount lifecycle hook
     */
    componentDidMount(): Promise<void>;
    componentDidUpdate(prevProps: Readonly<IControlsTestProps>, prevState: Readonly<IControlsTestState>, snapshot?: any): Promise<void>;
    /**
     * Event handler when changing the icon size in the dropdown
     * @param element
     */
    private _onIconSizeChange;
    /**
     * Open the property pane
     */
    private _onConfigure;
    /**
     * Method that retrieves the selected items in the list view
     * @param items
     */
    private _getSelection;
    /**
    * Method that retrieves files from drag and drop
    * @param files
    */
    private _getDropFiles;
    /**
     *
     *Method that retrieves the selected terms from the taxonomy picker and sets state
     * @private
     * @param {IPickerTerms} terms
     * @memberof ControlsTest
     */
    private onServicePickerChange;
    /**
     * Method that retrieves the selected terms from the taxonomy picker
     * @param terms
     */
    private _onTaxPickerChange;
    /**
     * Method that retrieves the selected date/time from the DateTime picker
     * @param dateTimeValue
     */
    private _onDateTimePickerChange;
    /**
     * Selected lists change event
     * @param lists
     */
    private onListPickerChange;
    /**
     * Selected View change event
     * @param views
     */
    private onViewPickerChange;
    /**
     * Deletes second item from the list
     */
    private deleteItem;
    /**
     * Method that retrieves the selected items from People  Picker
     * @param items
     */
    private _getPeoplePickerItems;
    /**
     * Selected item from the list data picker
     */
    private listItemPickerDataSelected;
    private _startProgress;
    private _initProgressActions;
    /**
     * Triggers element change for the carousel example.
     */
    private triggerNextElement;
    private _onFilePickerSave;
    private onToolbarSelectedFiltersChange;
    private toggleToolbarFilter;
    private rootFolder;
    private _onFolderSelect;
    private addFilter;
    private onClearFilters;
    private onRemoveFilter;
    private _onFileClick;
    private _onRenderGridItem;
    /**
     * Renders the component
     */
    render(): React.ReactElement<IControlsTestProps>;
    private getRandomCollectionFieldData;
    private onExpandCollapseTree;
    private onItemSelected;
    private renderCustomTreeItem;
    private _getPage;
}
//# sourceMappingURL=ControlsTest.d.ts.map