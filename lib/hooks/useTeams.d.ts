import { ServiceScope } from "@microsoft/sp-core-library";
import { ITeamMenber } from "../common/model/ITeamMember";
import { ITeam } from "./../common/model/ITeam";
import { ITeamChannel } from "./../common/model/ITeamChannel";
export declare const useTeams: (serviceScope: ServiceScope) => {
    init: () => Promise<void>;
    getMyTeams: (filter?: string) => Promise<ITeam[]>;
    getTeamChannels: (teamId: string, filter?: string) => Promise<ITeamChannel[]>;
    getTeamMembers: (teamId: string) => Promise<ITeamMenber[]>;
    getTeamOwners: (teamId: string) => Promise<ITeamMenber[]>;
};
//# sourceMappingURL=useTeams.d.ts.map