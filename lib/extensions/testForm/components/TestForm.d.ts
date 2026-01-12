import * as React from 'react';
import { FormDisplayMode } from '@microsoft/sp-core-library';
import { FormCustomizerContext } from '@microsoft/sp-listview-extensibility';
export interface ITestFormProps {
    context: FormCustomizerContext;
    displayMode: FormDisplayMode;
    onSave: () => void;
    onClose: () => void;
}
interface ITestFormState {
}
export default class TestForm extends React.Component<ITestFormProps, ITestFormState> {
    constructor(props: ITestFormProps);
    componentDidMount(): void;
    componentWillUnmount(): void;
    render(): React.ReactElement<{}>;
}
export {};
//# sourceMappingURL=TestForm.d.ts.map