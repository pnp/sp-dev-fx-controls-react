import { Position } from "@fluentui/react-northstar";
import { TAction } from "../../common/model/TAction";
import { TToolbarLayout } from "./ToolbarActionsUtils";
interface IInFlowToolbarItemProps {
    action: TAction;
    layout: TToolbarLayout;
}
export declare const toolbarMenuProps: {
    offset: [number, number];
    position: Position;
};
export declare const InFlowToolbarItem: ({ action, layout }: IInFlowToolbarItemProps) => JSX.Element;
export {};
//# sourceMappingURL=InFlowToolbarItem.d.ts.map