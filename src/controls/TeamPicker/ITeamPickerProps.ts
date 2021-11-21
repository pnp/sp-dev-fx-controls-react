import { IBasePickerStyles, ITag } from "office-ui-fabric-react/lib/Pickers";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { SPFxContext } from "../../common/Types";
export interface ITeamPickerProps {
  appcontext:  SPFxContext;
  onSelectedTeams: (tagsList:ITag[]) => void;
  selectedTeams: ITag[];
  itemLimit?: number;
  label?:string;
  styles?:IBasePickerStyles;
  themeVariant?:IReadonlyTheme;
}
