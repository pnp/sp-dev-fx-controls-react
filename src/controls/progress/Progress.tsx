import * as React from 'react';
import { IProgressProps, IProgressAction, ProgressActionState, IProgressState } from './IProgress';
import { Action } from './Action';
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import styles from './Progress.module.scss';
import * as telemetry from "../../common/telemetry";

/**
* Component to show progress of multiple SEQUENTIALLY executed actions
*/
export class Progress extends React.Component<IProgressProps, IProgressState> {

  constructor(props: IProgressProps) {
    super(props);

    telemetry.track('ReactProgress', {});

    this.state = {
      showLongRunningText: props.longRunningText && !props.longRunningTextDisplayDelay
    };
  }

  /**
   * componentDidUpdate lifecycle hook
   */
  public componentDidUpdate(): void {
    // Check if we need to start a timer to display long running text
    if (this.props.longRunningText && this.props.longRunningTextDisplayDelay && this.props.currentActionIndex === 0) {
      setTimeout(() => {
        this.setState({
          showLongRunningText: true
        });
      }, this.props.longRunningTextDisplayDelay);
    }

    // long running text should be hidden if all the actions have been executed
    if (this.state.showLongRunningText && this.props.currentActionIndex >= this.props.actions.length) {
      this.setState({
        showLongRunningText: false
      });
    }
  }

  /**
   * shouldComponentUpdate lifecycle hook
   *
   * @param nextProps
   */
  public shouldComponentUpdate(nextProps: IProgressProps): boolean {
    if (this.props.currentActionIndex !== nextProps.currentActionIndex ||
        this.props.showOverallProgress !== nextProps.showOverallProgress ||
        this.props.title !== nextProps.title ||
        !this._areActionsEqual(this.props.actions, nextProps.actions)) {
      return true;
    }
  }

  /**
   * Default React render method
   */
  public render(): React.ReactElement<IProgressProps> {
    const {
      currentActionIndex,
      showOverallProgress,
      showIndeterminateOverallProgress,
      hideNotStartedActions,
      title,
      actions,
      height,
      longRunningText,
      className,
      headerClassName,
      actionClassName,
      actionsContainerClassName,
      successIconName,
      errorIconName,
      inProgressIconName
    } = this.props;

    // correcting action index if props contain incorrect one
    let actionIndex = currentActionIndex;
    if (actionIndex > actions.length) {
      actionIndex = actions.length;
    }

    // getting actions to be rendered based on hideNotStartedActions flag
    const actionsToRender: IProgressAction[] = hideNotStartedActions ? actions.filter((a, index) => {
      return index <= currentActionIndex;
    }) : actions;

    const actionEls: JSX.Element[] = actionsToRender.map((a, index) => {
      let state = ProgressActionState.notStarted; // by default the state is not started

      if (a.hasError && index <= actionIndex) { // current or prev action has errored
        state = ProgressActionState.errored;
      } else if (actionIndex === index) { // current action is in progress
        state = ProgressActionState.inProgress;
      } else if (index < actionIndex) { // finished with no errors
        state = ProgressActionState.finished;
      }

      return <Action {...a}
                     state={state}
                     key={index}
                     className={actionClassName}
                     successIconName={successIconName}
                     errorIconName={errorIconName}
                     inProgressIconName={inProgressIconName} />;
    });

    // calculating progress and progressSubText based on parameters
    let progress: number | null = 0;
    let progressSubTtext = '';

    if (showIndeterminateOverallProgress) {
      if (actionIndex || actionIndex < actions.length) {
        progress = null;
        progressSubTtext = `${(actionIndex / actions.length * 100).toFixed(0)}%`;
      }
    } else {
      progress = actionIndex ? actionIndex / actions.length : 0;
      progressSubTtext = actionIndex ? `${(progress * 100).toFixed(0)}%` : '';
    }

    //   header is displayed if title, showOverallProgress, or showLongRunnungText are set
    //   progress indicator is shown if showOverallProgress is set to true
    //   progress indicator subtext is shown if showOverallProgress is set to true and there is a text to display (see if section above)
    //   long running text is shown if there is a text and we waited needed delay time
    return (
      <div className={`${styles.progress} ${className || ""}`} style={{ height: height || 'auto' }}>
        {
          (title || showOverallProgress || this.state.showLongRunningText) && (
            <div className={`${styles.header} ${headerClassName || ""}`}>
              <div className={styles.title}>{title}</div>

              {
                showOverallProgress && (
                  <div className={styles.progressIndicator}>
                    <ProgressIndicator percentComplete={progress} />
                  </div>
                )
              }

              {
                (showOverallProgress && progressSubTtext) && <span className={styles.progressSubtext}>{progressSubTtext}</span>
              }

              {
                this.state.showLongRunningText && <div className={styles.longRunningText}>{longRunningText}</div>
              }
            </div>
          )
        }

        <div className={`${styles.actionsContainer} ${actionsContainerClassName || ""}`}>
          {actionEls}
        </div>
      </div>
    );
  }

  private _areActionsEqual(actions: IProgressAction[], nextActions: IProgressAction[]): boolean {
    if (actions.length !== nextActions.length) {
      return false;
    }

    for (let i = 0, len = actions.length; i < len; i++) {
      const action = actions[i];
      const nextAction = nextActions[i];

      // comparing error state only,
      // assuming that actions can't be changed during the progress execution
      if (action.hasError !== nextAction.hasError) {
        return false;
      }
    }

    return true;
  }
}
