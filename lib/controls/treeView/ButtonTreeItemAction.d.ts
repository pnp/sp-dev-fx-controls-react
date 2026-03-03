import * as React from 'react';
import { IConcreteTreeItemActionProps } from './ITreeItemActions';
/**
 * Renders the controls for Button TreeItem action component
 */
export default class ButtonTreeItemAction extends React.Component<IConcreteTreeItemActionProps> {
    /**
     * componentWillMount lifecycle hook
     */
    UNSAFE_componentWillMount(): void;
    /**
     * Prepares the command bar button
     */
    private prepareCommandBarButton;
    /**
     * Check if there are action to immediatly invoke
     */
    private checkForImmediateInvocations;
    /**
     * On action execution
     */
    private onActionExecute;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IConcreteTreeItemActionProps>;
}
//# sourceMappingURL=ButtonTreeItemAction.d.ts.map