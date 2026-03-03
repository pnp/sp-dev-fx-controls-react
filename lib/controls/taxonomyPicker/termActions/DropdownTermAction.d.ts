import * as React from 'react';
import { IConcreteTermActionProps } from './ITermsActions';
export declare class DropdownTermAction extends React.Component<IConcreteTermActionProps> {
    /**
     * componentWillMount lifecycle hook
     */
    UNSAFE_componentWillMount(): void;
    /**
     * Prepates contextual menu items for dropdown.
     */
    private prepareContextualMenuProps;
    /**
     * Prepare term action button style.
     */
    private getTermActionActionButtonStyle;
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
    render(): React.ReactElement<IConcreteTermActionProps>;
}
//# sourceMappingURL=DropdownTermAction.d.ts.map