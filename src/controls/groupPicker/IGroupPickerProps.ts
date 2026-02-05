import { BaseComponentContext } from "@microsoft/sp-component-base";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { IBasePickerStyles, ITag } from "@fluentui/react/lib/Pickers";

export type GroupTypeFilter = "All" | "M365" | "Security";

export interface IGroupPickerProps {
  appcontext: BaseComponentContext;
  onSelectedGroups: (tagsList: ITag[]) => void;
  selectedGroups: ITag[];
  themeVariant?: IReadonlyTheme;
  /** Filter groups by type. Defaults to "All". */
  groupType?: GroupTypeFilter;
  itemLimit?: number;
  /** Optional mode indicates if multi-choice selections is allowed. Default is true. */
  multiSelect?: boolean;
  label?: string;
  styles?: IBasePickerStyles;
}
