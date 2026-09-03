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

import { IUserPickerProps } from "./IUserPickerProps";
import { UserPickerControl } from "./UserPickerControl";

export const UserPicker: React.FunctionComponent<IUserPickerProps> = (
  props: React.PropsWithChildren<IUserPickerProps>
) => {
  const { theme: themeV8, context } = props;
  const [theme, setTheme] = React.useState<Theme>();
  const currentSPTheme = useTheme();
  const [isInitialized, setIsInitialized] = React.useState<boolean>(false);


  React.useEffect(() => {
    (async () => {
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
      } else {
        setTheme(createV9Theme(currentSPTheme));
      }
      setIsInitialized(true);
    })();
  }, [context, currentSPTheme]);

  if (!isInitialized) return <></>;

  return (
    <>
      <IdPrefixProvider value="userPicker-">
      <FluentProvider theme={theme}>
        <Provider>
          <UserPickerControl {...props} />
        </Provider>
      </FluentProvider>
      </IdPrefixProvider>
    </>
  );
};
