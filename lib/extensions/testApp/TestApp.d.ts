import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import * as React from 'react';
export interface ITestAppProps {
    context: ApplicationCustomizerContext;
}
interface ITestAppState {
}
export default class TestApp extends React.Component<ITestAppProps, ITestAppState> {
    constructor(props: ITestAppProps);
    render(): React.ReactElement<ITestAppProps>;
}
export {};
//# sourceMappingURL=TestApp.d.ts.map