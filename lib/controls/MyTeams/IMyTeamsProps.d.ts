import { IReadonlyTheme, BaseComponentContext } from "@microsoft/sp-component-base";
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
    webPartContext: BaseComponentContext;
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
//# sourceMappingURL=IMyTeamsProps.d.ts.map