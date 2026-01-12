/**
 * Progress Action
 */
export interface IProgressAction {
    /**
     * Action title
     */
    title: string;
    /**
     * Sub actions titles
     */
    subActionsTitles?: string[];
    /**
     * Flag in the action has errored during the execution. Needed to correctly display action's icon
     */
    hasError?: boolean;
    /**
     * Error message
     */
    errorMessage?: string;
}
/**
 * Possible action's states
 */
export declare enum ProgressActionState {
    /**
     * Not started yet
     */
    notStarted = 0,
    /**
     * Currently in progress
     */
    inProgress = 1,
    /**
     * Finished with no errors
     */
    finished = 2,
    /**
     * Errored
     */
    errored = 3
}
/**
 * Progress component properties
 */
export interface IProgressProps {
    /**
     * Title (header)
     */
    title?: string;
    /**
     * Flag if overall progress indicator should be shown
     */
    showOverallProgress: boolean;
    /**
     * Flag if indeterminate progress animation will be shown
     */
    showIndeterminateOverallProgress?: boolean;
    /**
     * Flag if not started actions should not be rendered
     */
    hideNotStartedActions: boolean;
    /**
     * Progress actions
     */
    actions: IProgressAction[];
    /**
     * Current executing action
     */
    currentActionIndex?: number;
    /**
     * Height of the component
     */
    height?: string;
    /**
     * Text to display for long running operations
     */
    longRunningText?: string;
    /**
     * Delay until longRunningText is displayed im milliseconds.
     * If not set or 0 longRunningText is displayed right away.
     */
    longRunningTextDisplayDelay?: number;
    /**
     * Class name to be applied to the component
     */
    className?: string;
    /**
     * Header class name. Header contains title, progress indicator, and delay text
     */
    headerClassName?: string;
    /**
     * Actions container class name
     */
    actionsContainerClassName?: string;
    /**
     * Single action class name
     */
    actionClassName?: string;
    /**
     * Success icon name. Default is CheckMark
     */
    successIconName?: string;
    /**
     * Error icon name. Default is Error
     */
    errorIconName?: string;
    /**
     * InProgress icon name. Default is '', spinner is displayed.
     */
    inProgressIconName?: string;
}
/**
 * Progress component state
 */
export interface IProgressState {
    /**
     * flag if long running text should be displayed
     */
    showLongRunningText?: boolean;
}
/**
 * Action component properties
 */
export interface IActionProps extends IProgressAction {
    /**
     * Action state
     */
    state: ProgressActionState;
    /**
     * Action class name
     */
    className?: string;
    /**
     * Success icon name. Default is CheckMark
     */
    successIconName?: string;
    /**
     * Error icon name. Default is Error
     */
    errorIconName?: string;
    /**
     * InProgress icon name. Default is '', spinner is displayed.
     */
    inProgressIconName?: string;
}
//# sourceMappingURL=IProgress.d.ts.map