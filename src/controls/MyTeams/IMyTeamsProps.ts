
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IMyTeamsProps {
  /**
    /**
     * Title of MyTeams
     */
  title?: string;
    /**
     *  themeVariant
     */
  themeVariant?: IReadonlyTheme ;
    /**
     *  webPart COntext
     */
  webPartContext: WebPartContext;
  /**
    /**
     *  onSelectedChannel callBack return teamId and ChannelId if this is not defined default handler open channel
     */
  onSelectedChannel?: (teamsId:string, channelId:string) => void;
}
