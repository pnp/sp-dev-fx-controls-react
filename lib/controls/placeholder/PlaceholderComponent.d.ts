import * as React from 'react';
import { IPlaceholderState } from '.';
import { IPlaceholderProps } from './IPlaceholderComponent';
/**
 * Placeholder component
 */
export declare class Placeholder extends React.Component<IPlaceholderProps, IPlaceholderState> {
    private _crntElm;
    /**
     * Constructor
     */
    constructor(props: IPlaceholderProps);
    /**
     * componentDidMount lifecycle hook
     */
    componentDidMount(): void;
    /**
     * componentDidUpdate lifecycle hook
     * @param prevProps
     * @param prevState
     */
    componentDidUpdate(prevProps: IPlaceholderProps, prevState: IPlaceholderState): void;
    /**
     * shouldComponentUpdate lifecycle hook
     * @param nextProps
     * @param nextState
     */
    shouldComponentUpdate(nextProps: IPlaceholderProps, nextState: IPlaceholderState): boolean;
    /**
     * Execute the onConfigure function
     */
    private _handleBtnClick;
    /**
     * Set the current zone width
     */
    private _setZoneWidth;
    /**
     * Stores the current element
     */
    private _linkElm;
    /**
     * Default React component render method
     */
    render(): React.ReactElement<IPlaceholderProps>;
}
//# sourceMappingURL=PlaceholderComponent.d.ts.map