import * as React from 'react';
import { ITreeViewProps } from './ITreeViewProps';
import { ITreeViewState } from './ITreeViewState';
/**
 * Renders the controls for TreeItem component
 */
export declare class TreeView extends React.Component<ITreeViewProps, ITreeViewState> {
    private nodesToExpand;
    private divToInjectCssVariables;
    /**
     * Constructor method
     * @param props properties interface
     */
    constructor(props: ITreeViewProps);
    private pathTo;
    private getSelectedItems;
    /**
     * Fires When expand / collapse item in TreeView
     * @argument item The expanded / collapsed item
     * @argument isExpanded The status of item  (expanded / collapsed)
     */
    private handleTreeExpandCollapse;
    /**
     * Selects all child nodes when parent node is selected.
     * @param item current tree item
     */
    private selectAllChildren;
    /**
     * Unselects all child nodes of selected parent.
     */
    private unSelectChildren;
    /**
     * Fires When Tree Item is selected in TreeView
     * @argument item The selected item
     * @argument isSelected The status of item selection
     */
    private handleOnSelect;
    private checkIfChildrenShouldBeSelected;
    componentDidMount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: ITreeViewProps): void;
    /**
     * Default React render method
     */
    render(): JSX.Element;
}
//# sourceMappingURL=TreeView.d.ts.map