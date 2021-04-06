import { BaseComponentContext} from "@microsoft/sp-component-base";
import { IBasePickerStyles, ITag } from "office-ui-fabric-react/lib/Pickers";
export interface ITeamChannelPickerProps {
  teamId:string | number;
  appcontext:  BaseComponentContext;
  onSelectedChannels: (tagsList:ITag[]) => void;
  selectedChannels?: ITag[];
  itemLimit?: number;
  label?:string;
  styles?:IBasePickerStyles ;

}
