import * as React from 'react';
import { ITermActionsControlProps, ITermActionsControlState } from './ITermsActions';
export default class TermActionsControl extends React.Component<ITermActionsControlProps, ITermActionsControlState> {
    constructor(props: ITermActionsControlProps);
    /**
     * componentWillMount lifecycle hook
     */
    UNSAFE_componentWillMount(): void;
    /**
     * Get the available term actions
     */
    private getAvailableActions;
    /**
     * Sets the visibility of a certain action
     * @param isHidden
     */
    private setActionStateForTerm;
    /**
     * Default React render method
     */
    render(): React.ReactElement<ITermActionsControlProps>;
}
//# sourceMappingURL=TermActionsControl.d.ts.map