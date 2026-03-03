import { BaseComponentContext } from "@microsoft/sp-component-base";
import { IBasePickerStyles, ITag } from "@fluentui/react/lib/Pickers";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
export interface ITeamChannelPickerProps {
    teamId: string | number;
    appcontext: BaseComponentContext;
    onSelectedChannels: (tagsList: ITag[]) => void;
    selectedChannels?: ITag[];
    itemLimit?: number;
    label?: string;
    styles?: IBasePickerStyles;
    themeVariant?: IReadonlyTheme;
}
//# sourceMappingURL=ITeamChannelPickerProps.d.ts.map