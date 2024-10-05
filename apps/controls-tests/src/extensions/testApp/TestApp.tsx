import { ApplicationCustomizerContext } from '@microsoft/sp-application-base';
import { DefaultButton } from '@fluentui/react';
import * as React from 'react';

// import styles from './TestApp.module.scss';

export interface ITestAppProps {
  context: ApplicationCustomizerContext
}

interface ITestAppState { }

export default class TestApp extends React.Component<ITestAppProps, ITestAppState> {

  constructor(props: ITestAppProps) {
    super(props);

    this.state = {

    };
  }

  public render(): React.ReactElement<ITestAppProps> {
    return (
      <DefaultButton text="test" />
    );
  }
}
