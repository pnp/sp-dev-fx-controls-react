import * as React from "react";
import {
  ProviderConsumer as FluentUIThemeConsumer,
  Box,
  teamsTheme
} from "@fluentui/react-northstar";
import {
  Widget,
  WidgetTitle,
  WidgetBody,
  WidgetFooter,
} from "./widget/DashboardWidget";
import { DashboardTheme } from "./DashboardTheme";
import Toolbar from "../toolbar";
import { IWidget } from "./widget/IWidget";
import { IToolbarProps } from "../toolbar/Toolbar";
import styles from "./Dashboard.module.scss";

interface IDashboard {
  widgets: IWidget[];
  allowHidingWidget?: boolean;
  onWidgetHiding?: (widget: IWidget) => void;
  toolbarProps?: IToolbarProps;
}

export function Dashboard({
  widgets,
  allowHidingWidget,
  onWidgetHiding,
  toolbarProps }: IDashboard) {
  const [stateWidgets, setWidgets] = React.useState(widgets);

  React.useEffect(() => {
    setWidgets(widgets);
  }, [widgets]);
  return (
    <FluentUIThemeConsumer
      render={(globalTheme) => {
        if (!globalTheme || globalTheme.fontFaces.length == 0) {
          globalTheme = teamsTheme;
        }
        return <DashboardTheme globalTheme={globalTheme}>
          {toolbarProps && <Toolbar {...toolbarProps} />}
          <Box className={styles.dashboardBox} >
            {stateWidgets &&
              stateWidgets.map(
                (
                  widget: IWidget,
                  key: number
                ) => (
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
                      <WidgetBody
                        widget={widget}
                        siteVariables={globalTheme.siteVariables}
                      />
                      {widget.link && <WidgetFooter widget={widget} />}
                    </Widget>
                  )
              )}
          </Box>
        </DashboardTheme>;
      }}
    />
  );
}
