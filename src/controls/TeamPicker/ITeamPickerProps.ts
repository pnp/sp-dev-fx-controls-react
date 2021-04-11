 import { BaseComponentContext} from "@microsoft/sp-component-base";
import { IBasePickerStyles, ITag } from "office-ui-fabric-react/lib/Pickers";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
export interface ITeamPickerProps {
  appcontext:  BaseComponentContext;
  onSelectedTeams: (tagsList:ITag[]) => void;
  selectedTeams: ITag[];
  itemLimit?: number;
  label?:string;
  styles?:IBasePickerStyles;
  themeVariant?:IReadonlyTheme;
}
