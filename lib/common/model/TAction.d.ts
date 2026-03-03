import { ComponentEventHandler, ToolbarItemProps } from "@fluentui/react-northstar";
export type TAction = {
    title: string;
    iconName?: string;
    multi?: boolean;
    onClick?: ComponentEventHandler<ToolbarItemProps>;
};
export type TActions = {
    [actionKey: string]: TAction;
};
//# sourceMappingURL=TAction.d.ts.map