import * as React from "react";

import {
  Provider as FluentUIThemeProvider,
  mergeThemes,
} from "@fluentui/react-northstar";

import { ThemePrepared, ComponentVariablesInput } from "@fluentui/styles";

export interface IToolbarThemeProps {
  globalTheme: ThemePrepared;
  children: React.ReactNode;
}

const getLocalTheme = () => {
  return {
    componentVariables: {
      Card: ({
        colorScheme,
        borderRadius,
        borderWidth,
        shadowLevel1,
        theme,
      }: ComponentVariablesInput) => {
        return {
          backgroundColor: colorScheme.grey.background,
          backgroundColorHover: colorScheme.grey.background,
          boxShadow: shadowLevel1,
          boxShadowHover: shadowLevel1,
          borderRadius,
          borderSize: borderWidth,
          borderColor:
            theme === "teamsHighContrastTheme"
              ? colorScheme.grey.backgroundFocus
              : "transparent",
          borderColorHover:
            theme === "teamsHighContrastTheme"
              ? colorScheme.grey.backgroundFocus
              : "transparent",
        };
      },
      Menu: ({ colorScheme }: ComponentVariablesInput) => ({
        color: colorScheme.default.foreground2,
      }),
    },
    componentStyles: {
      Menu: {
        root: {
          marginLeft: "-0.25rem",
          marginRight: "-0.25rem",
        },
      },
    },
  };
};

export const DashboardTheme = ({
  globalTheme,
  children,
}: IToolbarThemeProps) => {
  const theme = mergeThemes(globalTheme, getLocalTheme());
  return (
    <FluentUIThemeProvider
      theme={theme}
      style={{
        minHeight: "100vh",
        backgroundColor:
          theme.siteVariables.theme === "teamsHighContrastTheme"
            ? theme.siteVariables.colorScheme.grey.background
            : theme.siteVariables.colorScheme.grey.background2,
      }}
    >
      {children}
    </FluentUIThemeProvider>
  );
};
