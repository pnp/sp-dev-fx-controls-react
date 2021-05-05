import { IContextualMenuProps } from "office-ui-fabric-react/lib/ContextualMenu";
import { IShowMessageProps } from "../ShowMessage";
export interface ITeamState {
  teamMembers: string[];
  teamsOwners:string;
  channelsMenu:IContextualMenuProps;
  message: IShowMessageProps;
  hasError: boolean;
  isLoading:boolean;
}
