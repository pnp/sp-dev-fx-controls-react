/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";

import { Provider } from "jotai";
import { has } from "lodash";

import {
  FluentProvider,
  IdPrefixProvider,
  teamsDarkTheme,
  teamsHighContrastTheme,
  teamsLightTheme,
  Theme,
} from "@fluentui/react-components";
import { createV9Theme } from "@fluentui/react-migration-v8-v9";
import { useTheme } from "@fluentui/react-theme-provider";
import { WebPartContext } from "@microsoft/sp-webpart-base";


import { IListToolbarProps } from "./IListToolbarProps";
import ListToolbarControl from "./ListToolbarControl";

export const ListToolbar: React.FunctionComponent<IListToolbarProps> = (
  props: React.PropsWithChildren<IListToolbarProps  >
) => {
  const { theme: themeV8, context } = props;
  const [theme, setTheme] = React.useState<Theme>();
  const currentSPTheme = useTheme();
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false);


  React.useEffect(() => {
    (async () => {
      try {
        if (has(context, "sdks.microsoftTeams.teamsJs.app.getContext")) {
          const teamsContext = await (context as WebPartContext).sdks.microsoftTeams?.teamsJs.app.getContext();
          const teamsTheme = teamsContext.app.theme || "default";
          switch (teamsTheme) {
            case "dark":
              setTheme(teamsDarkTheme);
              break;
            case "contrast":
              setTheme(teamsHighContrastTheme);
              break;
            case "default":
              setTheme(teamsLightTheme);
              break;
            default:
              setTheme(teamsLightTheme);
              break;
          }
        } else if (themeV8 || currentSPTheme) {
          setTheme(createV9Theme(themeV8 ?? currentSPTheme));
        } else {
          setTheme(teamsLightTheme);
        }
      } catch (error) {
        console.warn("ListToolbar: Failed to resolve theme, using default", error);
        setTheme(teamsLightTheme);
      }
      setIsInitialized(true);
    })();
  }, [context, currentSPTheme, themeV8]);

  if (!isInitialized) return <></>;

  return (
    <>
      <IdPrefixProvider value="userPicker-">
      <FluentProvider theme={theme}>
        <Provider>
          <ListToolbarControl {...props} />
        </Provider>
      </FluentProvider>
      </IdPrefixProvider>
    </>
  );
};
