import * as React from 'react';
import styles from './{{pascalCase name}}.module.scss';
import { I{{pascalCase name}}Props, I{{pascalCase name}}State } from '.';

export class {{pascalCase name}} extends React.Component<I{{pascalCase name}}Props, I{{pascalCase name}}State> {

  constructor(props: I{{pascalCase name}}Props) {
    super(props);

    this.state = {};
  }


  /**
   * Default React render method
   */
  public render(): React.ReactElement<I{{pascalCase name}}Props> {
    return (
      <div className={ styles.{{camelCase name}} }>

      </div>
    );
  }
}
