import * as React from "react";
import { IWidget } from "./widget/IWidget";
import { IToolbarProps } from "../toolbar/Toolbar";
/**
 * Dashboard component props
 */
export interface IDashboardProps {
    /**
     * Widgets collection
     */
    widgets: IWidget[];
    /**
     * Specifies if widgets can be hidden from the dashboard
     */
    allowHidingWidget?: boolean;
    /**
     * Handler of widget hiding event
     */
    onWidgetHiding?: (widget: IWidget) => void;
    /**
     * Dashboard toolbar props
     */
    toolbarProps?: IToolbarProps;
    /**
     * Optional component which wraps every Widget component. Useful for a custom error handling or styling.
     */
    WidgetContentWrapper?: React.ComponentType<React.PropsWithChildren<any>>;
}
export declare function Dashboard({ widgets, allowHidingWidget, onWidgetHiding, toolbarProps, WidgetContentWrapper: WidgetWrapperComponent, }: IDashboardProps): JSX.Element;
//# sourceMappingURL=Dashboard.d.ts.map