var ThemeColorHelper = /** @class */ (function () {
    function ThemeColorHelper() {
    }
    /**
     * Extracts the color from a theme string
     * @param value The theme string (e.g.: "[theme:neutralDark, default: #212121]")
     */
    ThemeColorHelper.GetThemeColor = function (value) {
        try {
            if (value.indexOf('theme:') > 0) {
                // This value has a theme substitution
                var themeParts = value.replace('[', '').replace(']', '').replace('"', '').split(',');
                var defaultValue_1 = undefined;
                var themeValue_1 = undefined;
                // Break the theme string into it's components
                themeParts.forEach(function (themePart) {
                    if (themePart.indexOf('theme:') >= 0) {
                        themeValue_1 = themePart.replace('theme:', '');
                    }
                    else if (themePart.indexOf('default:') >= 0) {
                        defaultValue_1 = themePart.replace('default:', '').replace('"', '').trim();
                    }
                });
                // If there is a theme value, try to read from environment
                if (themeValue_1 !== undefined) {
                    try {
                        // This should definitely be easier to do in SPFx!
                        // tslint:disable-next-line
                        var themeStateVariable = window.__themeState__;
                        if (themeStateVariable === undefined) {
                            return defaultValue_1;
                        }
                        var themeState = themeStateVariable.theme;
                        if (themeState === undefined) {
                            return defaultValue_1;
                        }
                        for (var varName in themeState) {
                            if (!Object.prototype.hasOwnProperty.call(themeState, varName)) {
                                continue;
                            }
                            // Cheesy cleanup of variables to remove extra quotes
                            if (varName === themeValue_1) {
                                return themeState[varName].replace('"', '').trim();
                            }
                        }
                    }
                    catch (_a) {
                        // do nothing
                    }
                    return defaultValue_1;
                }
            }
        }
        catch (_b) {
            // do nothing
        }
        return value;
    };
    return ThemeColorHelper;
}());
export { ThemeColorHelper };
//# sourceMappingURL=ThemeColorHelper.js.map