import { ComponentEventHandler, ObjectShorthandCollection, PopupProps, TreeItemProps } from "@fluentui/react-northstar";
import { TToolbarLayout } from "./ToolbarActionsUtils";
export interface IExtendedToolbarFilterProps {
    layout: TToolbarLayout;
    filters: ObjectShorthandCollection<TreeItemProps, never>;
    selectedFilterIds?: string[];
    singleSelect: boolean;
    open: boolean;
    onOpenChange: ComponentEventHandler<PopupProps>;
    toolbarMenuProps: any;
    toolbarButtonStyles?: any;
    onSelectedFiltersChange?: (selectedFilters: string[]) => string[] | void;
}
export declare const ToolbarFilter: (props: IExtendedToolbarFilterProps) => JSX.Element;
//# sourceMappingURL=ToolbarFilter.d.ts.map