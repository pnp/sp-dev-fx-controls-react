import * as React from 'react';
import { IProgressActionInternal, ProgressActionState } from './IProgress';
import styles from './Progress.module.scss';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { css } from 'office-ui-fabric-react/lib/Utilities';

export class Action extends React.Component<IProgressActionInternal, {}> {
    public render(): React.ReactElement<IProgressActionInternal> {
        const {
            state,
            subActionsTitles,
            errorMessage,
            title
        } = this.props;
        const inactive: boolean = state === ProgressActionState.notStarted;
        const labelClassName = inactive ? css(styles.label, styles.inactive) : styles.label;
        let iconName = '';
        let className = '';
        switch (state) {
            case ProgressActionState.finished:
                iconName = 'CheckMark';
                className = styles.successIcon;
                break;
            case ProgressActionState.notStarted:
                iconName = 'CheckMark';
                className = styles.inactiveIcon;
                break;
            case ProgressActionState.errored:
                iconName = 'Cancel';
                className = styles.errorIcon;
                break;
        }
        return (
            <div className={styles.actionContainer}>
                <div className={styles.actionHeader}>
                    {iconName ? <Icon className={css(styles.actionIcon, className)} iconName={iconName} /> : <Spinner className={css(styles.actionIcon, styles.spinner)} size={SpinnerSize.small} />}
                    <div className={labelClassName}>{title}</div>
                </div>
                {subActionsTitles &&
                    <div className={styles.subActionsContainer}>
                        {subActionsTitles.map(saTitle => {
                            return <div className={labelClassName}>{saTitle}</div>;
                        })}
                    </div>}
                {state === ProgressActionState.errored &&
                    <div className={styles.errorContainer}>
                        <Label className={styles.errorMessage}>{errorMessage}</Label>
                    </div>}
            </div>
        );
    }
}