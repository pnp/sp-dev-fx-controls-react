import { ETeamTypes } from './ETeamTypes';
import { ITeamState } from './ITeamState';
export declare const teamsReducer: (state: ITeamState, action: {
    type: ETeamTypes;
    payload: any;
}) => {
    teamMembers: any;
    teamsOwners: string;
    channelsMenu: import("@fluentui/react").IContextualMenuProps;
    message: import("../ShowMessage").IShowMessageProps;
    hasError: boolean;
    isLoading: boolean;
} | {
    teamsOwners: any;
    teamMembers: string[];
    channelsMenu: import("@fluentui/react").IContextualMenuProps;
    message: import("../ShowMessage").IShowMessageProps;
    hasError: boolean;
    isLoading: boolean;
} | {
    channelsMenu: any;
    teamMembers: string[];
    teamsOwners: string;
    message: import("../ShowMessage").IShowMessageProps;
    hasError: boolean;
    isLoading: boolean;
} | {
    hasError: any;
    teamMembers: string[];
    teamsOwners: string;
    channelsMenu: import("@fluentui/react").IContextualMenuProps;
    message: import("../ShowMessage").IShowMessageProps;
    isLoading: boolean;
} | {
    isLoading: any;
    teamMembers: string[];
    teamsOwners: string;
    channelsMenu: import("@fluentui/react").IContextualMenuProps;
    message: import("../ShowMessage").IShowMessageProps;
    hasError: boolean;
};
//# sourceMappingURL=TeamReducer.d.ts.map