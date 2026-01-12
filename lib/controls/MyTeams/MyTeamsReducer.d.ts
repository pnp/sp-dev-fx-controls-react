import { EMyTeamsTypes } from './EMyTeamsTypes';
import { IMyTeamsState } from './IMyTeamsState';
export declare const myTeamsReducer: (state: IMyTeamsState, action: {
    type: EMyTeamsTypes;
    payload: any;
}) => {
    myTeams: any;
    message: import("./components/ShowMessage").IShowMessageProps;
    hasError: boolean;
    isLoading: boolean;
} | {
    message: any;
    myTeams: import("./components/Team").ITeam[];
    hasError: boolean;
    isLoading: boolean;
} | {
    hasError: any;
    myTeams: import("./components/Team").ITeam[];
    message: import("./components/ShowMessage").IShowMessageProps;
    isLoading: boolean;
} | {
    isLoading: any;
    myTeams: import("./components/Team").ITeam[];
    message: import("./components/ShowMessage").IShowMessageProps;
    hasError: boolean;
};
//# sourceMappingURL=MyTeamsReducer.d.ts.map