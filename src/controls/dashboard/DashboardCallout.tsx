import * as React from "react";
import {
  Popup,
  Button,
  MoreIcon,
  ComponentEventHandler,
  PopupProps,
  Menu,
  mergeThemes,
  ComponentVariablesInput,
  Provider as FluentUIThemeProvider,
  ThemePrepared,
  EyeSlashIcon,
} from "@fluentui/react-northstar";
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

const getLocalTheme = () => {
  return {
    componentVariables: {
      PopupContent: ({
        colorScheme,
        borderRadius,
        borderWidth,
        shadowLevel1,
        shadowLevel4,
        theme,
      }: ComponentVariablesInput) => {
        return {
          backgroundColor: colorScheme.grey.background,
          backgroundColorHover: colorScheme.grey.background,
          boxShadow: `${shadowLevel1}, ${shadowLevel4}`,
          borderRadius,
          borderSize: borderWidth,
          borderColor:
            theme === "teamsHighContrastTheme"
              ? colorScheme.grey.background2
              : "transparent",
          borderColorHover:
            theme === "teamsHighContrastTheme"
              ? colorScheme.grey.background2
              : "transparent",
        };
      },
    },
    componentStyles: {
      Menu: {
        root: {
          width: "100%",
          marginRight: "0",
          marginLeft: "0",
          border: "none",
          padding: "0 0.25rem",
        },
      },
      MenuDivider: {
        root: { margin: "0.25rem 0" },
      },
      PopupContent: {
        content: {
          width: "12.5rem",
          padding: "0",
          boxShadow:
            " 0px 1.2px 3.6px rgba(0, 0, 0, 0.11), 0px 6.4px 14.4px rgba(0, 0, 0, 0.13)",
        },
      },
    },
  };
};

export const DashboardCallout = ({
  open,
  onOpenChange,
  menuProps,
  globalTheme,
  widgetActionGroup,
  actionHandlers
}: IDashboardCallout) => {
  
  const theme = mergeThemes(globalTheme, getLocalTheme());
  const getMenuItems = () => {
    let result = [];
    if (widgetActionGroup) {
      result.push(...widgetActionGroup.map(
        (widgetAction: IWidgetActionKey) => {
          return {
            ...widgetAction,
            key: widgetAction.id,
            content: widgetAction.title,
          };
        }
      ));
    }
    if (actionHandlers && !actionHandlers.hideHideButton) {
      if (result.length > 0) {
        result.push({ kind: "divider" });
      }
      result.push({
        id: "hide_widget",
        content: "Hide widget",
        onClick: actionHandlers.onHide,
        icon: <EyeSlashIcon />,
      });
    }
    return result;
  };
  let items = getMenuItems();
  if(items.length === 0){
    return null;
  }
  return (
    <FluentUIThemeProvider theme={theme}>
      <Popup
        {...menuProps}
        open={open}
        onOpenChange={onOpenChange}
        trigger={
          <Button
            text
            iconOnly
            aria-label="More actions"
            icon={<MoreIcon />}
            styles={{
              margin: "0 -0.35rem",
            }}
          />
        }
        content={{
          styles: { width: "12.5rem" },
          content: (
            <Menu
              items={items}
              vertical
            />
          ),
        }}
        trapFocus={{
          firstFocusableSelector:
            ".extended-toolbar__filters-menu__tree [data-is-focusable=true]",
        }}
      />
    </FluentUIThemeProvider>
  );
};
