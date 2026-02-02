import * as React from 'react';
import { IProgressProps, IProgressState } from './IProgress';
/**
* Component to show progress of multiple SEQUENTIALLY executed actions
*/
export declare class Progress extends React.Component<IProgressProps, IProgressState> {
    constructor(props: IProgressProps);
    /**
     * componentDidUpdate lifecycle hook
     */
    componentDidUpdate(): void;
    /**
     * shouldComponentUpdate lifecycle hook
     *
     * @param nextProps
     */
    shouldComponentUpdate(nextProps: IProgressProps): boolean;
    /**
     * Default React render method
     */
    render(): React.ReactElement<IProgressProps>;
    private _areActionsEqual;
}
//# sourceMappingURL=Progress.d.ts.map