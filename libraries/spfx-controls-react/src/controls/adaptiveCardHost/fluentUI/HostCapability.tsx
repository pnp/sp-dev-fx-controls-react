import { HostConfig } from "adaptivecards";
import { ITheme } from "@fluentui/react/lib/Styling";
import { fluentUIDefaultTheme } from "../../../common/fluentUIThemes/FluentUIDefaultTheme";

export const hostCapabilitiesFluentUIThemeKey = "fluentUITheme";

export const setFluentUIThemeAsHostCapability = (hostConfig: HostConfig, theme: ITheme): void => {
    hostConfig.hostCapabilities.setCustomProperty(hostCapabilitiesFluentUIThemeKey, theme);
};

export const getFluentUIThemeFromHostCapability = (hostConfig: HostConfig): ITheme => {
    let theme: ITheme = hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
    if (!theme) {
        theme = fluentUIDefaultTheme();
    }

    return theme;
};
