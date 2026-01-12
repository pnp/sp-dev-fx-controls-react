import * as React from 'react';
import { ITreeItemActionsControlProps, ITreeItemActionsControlState } from './ITreeItemActions';
/**
 * Renders the controls for TreeItem actions component
 */
export default class TreeItemActionsControl extends React.Component<ITreeItemActionsControlProps, ITreeItemActionsControlState> {
    /**
     * Constructor method
     * @param props properties interface
     */
    constructor(props: ITreeItemActionsControlProps);
    /**
     * componentWillMount lifecycle hook
     */
    UNSAFE_componentWillMount(): void;
    /**
     * Get the available treeItem actions
     */
    private getAvailableActions;
    /**
     * Default React render method
     */
    render(): React.ReactElement<ITreeItemActionsControlProps>;
}
//# sourceMappingURL=TreeItemActionsControl.d.ts.map