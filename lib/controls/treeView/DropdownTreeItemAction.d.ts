import * as React from 'react';
import { IConcreteTreeItemActionProps } from './ITreeItemActions';
/**
 * Renders the controls for Dropdown TreeItem action component
 */
export declare class DropdownTreeItemAction extends React.Component<IConcreteTreeItemActionProps> {
    /**
     * componentWillMount lifecycle hook
     */
    UNSAFE_componentWillMount(): void;
    /**
     * Prepates contextual menu items for dropdown.
     */
    private prepareContextualMenuProps;
    /**
     * Check if there are action to immediatly invoke
     */
    private checkForImmediateInvocations;
    /**
     * Handler to execute selected action.
     */
    private onActionExecute;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IConcreteTreeItemActionProps>;
}
//# sourceMappingURL=DropdownTreeItemAction.d.ts.map