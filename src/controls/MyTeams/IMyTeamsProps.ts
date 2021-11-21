import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { SPFxContext } from "../../common/Types";

export interface IMyTeamsProps {
  /**
    /**
     * Title of MyTeams
     */
  title?: string;
  /**
   *  themeVariant
   */
  themeVariant?: IReadonlyTheme;
  /**
   *  webPart COntext
   */
  webPartContext: SPFxContext;
  /**
    /**
     *  onSelectedChannel callBack return teamId and ChannelId if this is not defined default handler open channel
     */
  onSelectedChannel?: (teamsId: string, channelId: string) => void;
  /**
   *  Enable Hover Card on Person
   */
  enablePersonCardInteraction?: boolean;
}
