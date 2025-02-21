import * as React from 'react';
import styles from './ErrorMessage.module.scss';
import { Icon } from '@fluentui/react/lib/Icon';

export interface IFieldErrorMessageProps {
  errorMessage: string;
  className?: string;
}

/**
 * Component that shows an error message when something went wront with the property control
 */
export default class FieldErrorMessage extends React.Component<IFieldErrorMessageProps> {
  public render(): JSX.Element {
    const {
      errorMessage,
      className
    } = this.props;
    if (errorMessage !== undefined && errorMessage !== null && errorMessage !== '') {
      return (
        <div aria-live="assertive">
          <p className={`ms-TextField-errorMessage ${styles.errorMessage} ${className || ''}`}>
            <Icon iconName='Error' className={styles.errorIcon} />
            <span data-automation-id="error-message">{errorMessage}</span>
          </p>
        </div>
      );
    } else {
      return null;
    }
  }
}
