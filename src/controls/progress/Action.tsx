import * as React from 'react';
import { IActionProps, ProgressActionState } from './IProgress';
import styles from './Progress.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { Icon } from '@fluentui/react/lib/Icon';
import { Label } from '@fluentui/react/lib/Label';
import { css } from '@fluentui/react/lib/Utilities';

export class Action extends React.Component<IActionProps, {}> {

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IActionProps> {
    const { state, subActionsTitles, errorMessage, title, className, successIconName, errorIconName, inProgressIconName } = this.props;

    const inactive: boolean = state === ProgressActionState.notStarted;
    const labelClassName = inactive ? css(styles.label, styles.inactive) : styles.label;

    let iconName = '';
    let iconClassName = '';

    switch (state) {
      case ProgressActionState.finished:
        iconName = successIconName || 'CheckMark';
        iconClassName = styles.successIcon;
        break;
      case ProgressActionState.notStarted:
        iconName = successIconName || 'CheckMark';
        iconClassName = styles.inactiveIcon;
        break;
      case ProgressActionState.errored:
        iconName = errorIconName || 'Error';
        iconClassName = styles.errorIcon;
        break;
      case ProgressActionState.inProgress:
        iconName = inProgressIconName;
        break;
    }

    return (
      <div className={css(styles.actionContainer, className)}>
        <div className={styles.actionHeader}>
          {
            iconName ? (
              <Icon className={css(styles.actionIcon, iconClassName)} iconName={iconName} />
            ): (
              <Spinner className={css(styles.actionIcon, styles.spinner)} size={SpinnerSize.small} />
            )
          }

          <div className={labelClassName}>{title}</div>
        </div>

        {
          subActionsTitles && (
            <div className={styles.subActionsContainer}>
              {
                subActionsTitles.map((saTitle, index) => (
                  <div className={labelClassName} key={index}>{saTitle}</div>
                ))
              }
            </div>
          )
        }

        {
          state === ProgressActionState.errored && (
            <div className={styles.errorContainer}>
              <Label className={styles.errorMessage}>{errorMessage}</Label>
            </div>
          )
        }
      </div>
    );
  }
}
