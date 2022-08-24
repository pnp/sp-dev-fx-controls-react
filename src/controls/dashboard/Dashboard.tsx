import * as React from "react";
import {
  ProviderConsumer as FluentUIThemeConsumer,
  Box,
  teamsTheme,
  ThemePrepared,
} from "@fluentui/react-northstar";
import {
  Widget,
  WidgetTitle,
  WidgetBody,
  WidgetFooter,
} from "./widget/DashboardWidget";
import { DashboardTheme } from "./DashboardTheme";
import { Toolbar } from "../toolbar";
import { IWidget } from "./widget/IWidget";
import { IToolbarProps } from "../toolbar/Toolbar";
import styles from "./Dashboard.module.scss";
import { useTelemetry } from "../../common/telemetry";

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
  WidgetContentWrapper?: React.ComponentType<React.PropsWithChildren<any>>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export function Dashboard({
  widgets,
  allowHidingWidget,
  onWidgetHiding,
  toolbarProps,
  WidgetContentWrapper: WidgetWrapperComponent,
}: IDashboardProps): JSX.Element {
  const [stateWidgets, setWidgets] = React.useState(widgets);
  const widgetRenderer = WidgetWrapperComponent
    ? renderWidgetWithWrappedContent
    : renderWidget;

  useTelemetry("ReactDashboard", {});

  React.useEffect(() => {
    setWidgets(widgets);
  }, [widgets]);
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        if (!globalTheme || globalTheme.fontFaces.length === 0) {
          globalTheme = teamsTheme;
        }
        return (
          <DashboardTheme globalTheme={globalTheme}>
            {toolbarProps && <Toolbar {...toolbarProps} />}
            <Box className={styles.dashboardBox}>
              {stateWidgets && stateWidgets.map(widgetRenderer(globalTheme))}
            </Box>
          </DashboardTheme>
        );
      }}
    />
  );

  function renderWidgetWithWrappedContent(
    globalTheme: ThemePrepared<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  ): (value?: IWidget, index?: number) => JSX.Element {
    return (widget: IWidget, key: number) => {
      return (
        <WidgetWrapperComponent>
          {renderWidget(globalTheme)(widget, key)}
        </WidgetWrapperComponent>
      );
    };
  }

  function renderWidget(
    globalTheme: ThemePrepared<any> // eslint-disable-line @typescript-eslint/no-explicit-any
  ): (value?: IWidget, index?: number) => JSX.Element {
    return (widget: IWidget, key: number) => (
      <Widget key={key} widget={widget}>
        <WidgetTitle
          widget={widget}
          allowHidingWidget={allowHidingWidget}
          onWidgetHiding={(hidingWidget: IWidget) => {
            if (onWidgetHiding) {
              onWidgetHiding(hidingWidget);
            }
            if (!hidingWidget.controlOptions) {
              hidingWidget.controlOptions = {};
            }
            hidingWidget.controlOptions.isHidden = true;
            setWidgets([...widgets]);
          }}
          globalTheme={globalTheme}
        />
        <WidgetBody widget={widget} siteVariables={globalTheme.siteVariables} />
        {widget.link && <WidgetFooter widget={widget} />}
      </Widget>
    );
  }
}
