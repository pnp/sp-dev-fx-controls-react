import { IContextualMenuProps } from "@fluentui/react/lib/ContextualMenu";
import { IShowMessageProps } from "../ShowMessage";
export interface ITeamState {
    teamMembers: string[];
    teamsOwners: string;
    channelsMenu: IContextualMenuProps;
    message: IShowMessageProps;
    hasError: boolean;
    isLoading: boolean;
}
//# sourceMappingURL=ITeamState.d.ts.map