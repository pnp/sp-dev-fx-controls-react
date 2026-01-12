import { ComponentEventHandler, PopupProps, ThemePrepared } from "@fluentui/react-northstar";
import { IWidgetActionKey } from "./widget/IWidget";
export interface IDashboardCallout {
    open: boolean;
    onOpenChange: ComponentEventHandler<PopupProps>;
    menuProps: PopupProps;
    globalTheme: ThemePrepared;
    widgetActionGroup?: IWidgetActionKey[];
    actionHandlers?: {
        hideHideButton?: boolean;
        onHide: () => void;
    };
}
export declare const DashboardCallout: ({ open, onOpenChange, menuProps, globalTheme, widgetActionGroup, actionHandlers }: IDashboardCallout) => JSX.Element;
//# sourceMappingURL=DashboardCallout.d.ts.map