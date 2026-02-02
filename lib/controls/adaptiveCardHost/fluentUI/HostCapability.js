import { fluentUIDefaultTheme } from "../../../common/fluentUIThemes/FluentUIDefaultTheme";
export var hostCapabilitiesFluentUIThemeKey = "fluentUITheme";
export var setFluentUIThemeAsHostCapability = function (hostConfig, theme) {
    hostConfig.hostCapabilities.setCustomProperty(hostCapabilitiesFluentUIThemeKey, theme);
};
export var getFluentUIThemeFromHostCapability = function (hostConfig) {
    var theme = hostConfig.hostCapabilities.getCustomProperty(hostCapabilitiesFluentUIThemeKey);
    if (!theme) {
        theme = fluentUIDefaultTheme();
    }
    return theme;
};
//# sourceMappingURL=HostCapability.js.map