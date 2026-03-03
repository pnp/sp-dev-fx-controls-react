import { ITeam } from './ITeam';
import { ServiceScope } from "@microsoft/sp-core-library";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
export interface ITeamProps {
    team: ITeam;
    serviceScope: ServiceScope;
    onSelectedChannel?: (teamId: string, channelId: string) => void;
    themeVariant: IReadonlyTheme;
    enablePersonCardInteraction?: boolean;
}
//# sourceMappingURL=ITeamProps.d.ts.map