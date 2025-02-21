import { Text } from '@microsoft/sp-core-library';
import { ITheme } from '@fluentui/react/lib/Styling';
import { fluentUITeamsDarkTheme, fluentUITeamsDefaultTheme, fluentUITeamsHighContrastTheme } from '../../common/fluentUIThemes';
import { setFluentUIThemeAsHostCapability } from './fluentUI/HostCapability';
import { createDarkTeamsHostConfig, createDefaultTeamsHostConfig, createHighContrastTeamsHostConfig, createSharePointHostConfig } from './fluentUI/HostConfig';
import { applyAdaptiveCardHostStyles } from './fluentUI/Styles';
import { AdaptiveCardHostThemeType } from './models/AdaptiveCardHostThemeType';
import { IAdaptiveCardHostConfigResult } from './models/IAdaptiveCardHostConfigResult';

export const initializeAdaptiveCardHost = (themeType: AdaptiveCardHostThemeType, currentTheme: ITheme): IAdaptiveCardHostConfigResult => {

  let hostConfigResult: IAdaptiveCardHostConfigResult;

  switch (themeType) {
    case AdaptiveCardHostThemeType.SharePoint:
      hostConfigResult = {
        theme: currentTheme,
        hostConfig: createSharePointHostConfig(currentTheme)
      };
      break;
    case AdaptiveCardHostThemeType.Teams:
      hostConfigResult = {
        theme: fluentUITeamsDefaultTheme,
        hostConfig: createDefaultTeamsHostConfig(fluentUITeamsDefaultTheme)
      };
      break;
    case AdaptiveCardHostThemeType.TeamsDark:
      hostConfigResult = {
        theme: fluentUITeamsDarkTheme,
        hostConfig: createDarkTeamsHostConfig(fluentUITeamsDarkTheme)
      };
    break;
    case AdaptiveCardHostThemeType.TeamsHighContrast:
      hostConfigResult = {
        theme: fluentUITeamsHighContrastTheme,
        hostConfig: createHighContrastTeamsHostConfig(fluentUITeamsHighContrastTheme)
      };
      break;
    default:
      hostConfigResult = {
        theme: currentTheme,
        hostConfig: createSharePointHostConfig(currentTheme)
      };
      break;
  }

  hostConfigResult.hostConfig.cssClassNamePrefix = `ach${Text.replaceAll(Math.random().toString(), ".", "")}`;
  setFluentUIThemeAsHostCapability(hostConfigResult.hostConfig, hostConfigResult.theme);
  applyAdaptiveCardHostStyles(hostConfigResult.theme, hostConfigResult.hostConfig.cssClassNamePrefix);

  return hostConfigResult;
};

