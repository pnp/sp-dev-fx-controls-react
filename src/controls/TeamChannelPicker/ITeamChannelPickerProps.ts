import { IBasePickerStyles, ITag } from "office-ui-fabric-react/lib/Pickers";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { SPFxContext } from "../../common/Types";
export interface ITeamChannelPickerProps {
  teamId:string | number;
  appcontext:  SPFxContext;
  onSelectedChannels: (tagsList:ITag[]) => void;
  selectedChannels?: ITag[];
  itemLimit?: number;
  label?:string;
  styles?:IBasePickerStyles ;
  themeVariant?:IReadonlyTheme;
}
