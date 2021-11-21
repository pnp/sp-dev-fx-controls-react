import {  ITeam } from './ITeam';
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { SPFxServiceScope } from '../../../../common/Types';
export interface ITeamProps {
  team:ITeam;
  serviceScope: SPFxServiceScope;
  onSelectedChannel?: (teamId:string, channelId:string) => void;
  themeVariant: IReadonlyTheme;
  enablePersonCardInteraction?: boolean;
}
