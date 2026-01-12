import * as React from 'react';
import { ITermParentProps, ITermParentState } from './ITaxonomyPicker';
/**
 * Term Parent component, represents termset or term if anchorId
 */
export default class TermParent extends React.Component<ITermParentProps, ITermParentState> {
    private _terms;
    private _anchorName;
    constructor(props: ITermParentProps);
    /**
     * componentWillMount
     */
    UNSAFE_componentWillMount(): void;
    /**
     * Handle the click event: collapse or expand
     */
    private _handleClick;
    /**
     * The term set selection changed
     */
    private termSetSelectionChange;
    /**
     * Default React render method
     */
    render(): JSX.Element;
}
//# sourceMappingURL=TermParent.d.ts.map