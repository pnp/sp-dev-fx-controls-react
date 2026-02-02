import * as React from 'react';
import { ITaxonomyPickerProps, ITaxonomyPickerState } from './ITaxonomyPicker';
/**
 * Image URLs / Base64
 */
export declare const COLLAPSED_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAIJJREFUOE/NkjEKwCAMRdu7ewZXJ/EqHkJwE9TBCwR+a6FLUQsRwYBTeD8/35wADnZVmPvY4OOYO3UNbK1FKeUWH+fRtK21hjEG3vuhQBdOKUEpBedcV6ALExFijJBSIufcFBjCVSCEACEEqpNvBmsmT+3MTnvqn/+O4+1vdtv7274APmNjtuXVz6sAAAAASUVORK5CYII=";
export declare const EXPANDED_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAUCAYAAABSx2cSAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABh0RVh0U29mdHdhcmUAUGFpbnQuTkVUIHYzLjEwcrIlkgAAAFtJREFUOE9j/P//PwPZAKSZXEy2RrCLybV1CGjetWvX/46ODqBLUQOXoJ9BGtXU1MCYJM0wjZGRkaRpRtZIkmZ0jSRpBgUOzJ8wmqwAw5eICIb2qGYSkyfNAgwAasU+UQcFvD8AAAAASUVORK5CYII=";
export declare const GROUP_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAC9SURBVDhPY2CgNXh1qEkdiJ8D8X90TNBuJM0V6IpBhoHFgIxebKYTIwYzAMNpxGhGdsFwNoBgNEFjAWsYgOSKiorMgPgbEP/Hgj8AxXpB0Yg1gQAldYuLix8/efLkzn8s4O7du9eAan7iM+DV/v37z546der/jx8/sJkBdhVOA5qbm08ePnwYrOjQoUOkGwDU+AFowLmjR4/idwGukAYaYAkMgxfPnj27h816kDg4DPABoAI/IP6DIxZA4l0AOd9H3QXl5+cAAAAASUVORK5CYII=";
export declare const TERMSET_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACaSURBVDhPrZLRCcAgDERdpZMIjuQA7uWH4CqdxMY0EQtNjKWB0A/77sxF55SKMTalk8a61lqCFqsLiwKac84ZRUUBi7MoYHVmAfjfjzE6vJqZQfie0AcwBQVW8ATi7AR7zGGGNSE6Q2cyLSPIjRswjO7qKhcPDN2hK46w05wZMcEUIG+HrzzcrRsQBIJ5hS8C9fGAPmRwu/9RFxW6L8CM4Ry8AAAAAElFTkSuQmCC";
export declare const TERM_IMG = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACzSURBVDhPY2AYNKCoqIgTiOcD8X8S8F6wB4Aa1IH4akNDw+mPHz++/E8EuHTp0jmQRSDNCcXFxa/XrVt3gAh9KEpgBvx/9OjRLVI1g9TDDYBp3rlz5//Kysr/IJoYgGEASPPatWsbQDQxAMOAbdu2gZ0FookBcAOePHlyhxgN6GqQY+Hdhg0bDpJqCNgAaDrQAnJuNDY2nvr06dMbYgw6e/bsabgBUEN4yEiJ2wdNViLfIQC3sTh2vtJcswAAAABJRU5ErkJggg==";
/**
 * Renders the controls for PropertyFieldTermPicker component
 */
export declare class TaxonomyPicker extends React.Component<ITaxonomyPickerProps, ITaxonomyPickerState> {
    private termsService;
    private previousValues;
    private invalidTerm;
    private cancel;
    /**
     * Constructor method
     */
    constructor(props: ITaxonomyPickerProps);
    /**
     * componentDidMount lifecycle hook
     */
    componentDidMount(): void;
    /**
     * componentWillMount lifecycle hook
     */
    UNSAFE_componentWillMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: ITaxonomyPickerProps): void;
    /**
     * it checks, if all entries still exist in term store. if allowMultipleSelections is true. it have to validate all values
     */
    private validateTerms;
    /**
     * Loads the list from SharePoint current web site
     */
    private loadTermStores;
    /**
     * Force update of the taxonomy tree - required by term action in case the term has been added, deleted or moved.
     */
    private updateTaxonomyTree;
    /**
     * Open the right Panel
     */
    private onOpenPanel;
    /**
     * Close the panel
     */
    private onClosePanel;
    /**
     * On save click action
     */
    private onSave;
    /**
     * Clicks on a node
     * @param node
     */
    private termsChanged;
    /**
     * Fires When Items Changed in TermPicker
     * @param node
     */
    private termsFromPickerChanged;
    /**
     * Shows an error message for any invalid input inside taxonomy picker control
     */
    private validateInputText;
    /**
     * Triggers when input of taxonomy picker control changes
     */
    private onInputChange;
    private validateOnGetErrorMessage;
    private onNewTerm;
    /**
     * Triggers when taxonomy picker control loses focus
     */
    private onBlur;
    /**
     * Gets the given node position in the active nodes collection
     * @param node
     */
    private getSelectedNodePosition;
    /**
     * TermSet selection handler
     * @param termSet
     * @param isChecked
     */
    private termSetSelectedChange;
    private validate;
    private validated;
    /**
     * Renders the SPListpicker controls with Office UI  Fabric
     */
    render(): JSX.Element;
}
//# sourceMappingURL=TaxonomyPicker.d.ts.map