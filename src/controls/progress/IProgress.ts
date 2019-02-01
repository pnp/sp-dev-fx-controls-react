export interface IProgressActionExecutionResult {
    hasError?: boolean;
    isCriticalError?: boolean;
    errorMessage?: boolean;
    actionParameters?: any;
}

export interface IProgressAction {
    title: string;
    subActionsTitles?: string[];
}

export enum ProgressActionState {
    notStarted,
    inProgress,
    finished,
    errored
}

export interface IProgressActionInternal extends IProgressAction {
    state: ProgressActionState;
    errorMessage?: string;
}

export interface IProgressProps {
    title: string;
    showOverallProgress: boolean;
    actions: IProgressAction[];
    executeAction: (action: IProgressAction, actionParameters: any) => Promise<IProgressActionExecutionResult>;
    onConfigurationComplete: () => void;
    onConfigurationFailed: () => void;
}

export interface IProgressState {
    actions?: IProgressActionInternal[];
    currentStep?: number;
    hasError?: boolean;
}