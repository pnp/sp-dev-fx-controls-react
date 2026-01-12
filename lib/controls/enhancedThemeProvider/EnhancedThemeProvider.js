var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { getVariant, VariantThemeType } from "@fluentui/scheme-utilities";
import { initializeIcons } from '@fluentui/react/lib/Icons';
import { createTheme, getTheme } from "@fluentui/react/lib/Styling";
import * as React from "react";
import { useCallback, useEffect, useState } from 'react';
import { fluentUITeamsDarkTheme } from '../../common/fluentUIThemes/FluentUITeamsDarkTheme';
import { fluentUITeamsDefaultTheme } from '../../common/fluentUIThemes/FluentUITeamsDefaultTheme';
import { fluentUITeamsHighContrastTheme } from '../../common/fluentUIThemes/FluentUITeamsHighContrastTheme';
import { ThemeContext, useTheme } from '@fluentui/react-theme-provider';
import * as telemetry from '../../common/telemetry';
import { WebPartContext } from '@microsoft/sp-webpart-base';
var getDefaultTheme = function () {
    var _a;
    var currentTheme;
    var themeColorsFromWindow = (_a = window.__themeState__) === null || _a === void 0 ? void 0 : _a.theme;
    if (themeColorsFromWindow) {
        currentTheme = createTheme({
            palette: themeColorsFromWindow
        });
    }
    else {
        currentTheme = getTheme();
    }
    return currentTheme;
};
var EnhancedThemeProvider = function (props) {
    var _a = useState(false), isInTeams = _a[0], setIsInTeams = _a[1];
    var _b = useState(null), teamsThemeName = _b[0], setTeamsThemeName = _b[1];
    // track the telemetry as 'ReactEnhancedThemeProvider'
    useEffect(function () {
        telemetry.track('ReactEnhancedThemeProvider');
    }, []);
    // *****
    useEffect(function () {
        initializeIcons();
    }, []);
    useEffect(function () {
        setIsInTeams(props.context instanceof WebPartContext && props.context.sdks.microsoftTeams ? true : false);
    }, [props.context]);
    useEffect(function () {
        var _a, _b;
        if (isInTeams) {
            var teamsInstance = props.context.sdks.microsoftTeams;
            setTeamsThemeName((_a = teamsInstance.context) === null || _a === void 0 ? void 0 : _a.theme);
            (_b = teamsInstance.teamsJs) === null || _b === void 0 ? void 0 : _b.registerOnThemeChangeHandler(function (theme) {
                setTeamsThemeName(theme);
            });
        }
    }, [props.context, isInTeams]);
    var themeToApply = useCallback(function () {
        var workingTheme;
        if (isInTeams) {
            switch (teamsThemeName) {
                case "default":
                    workingTheme = fluentUITeamsDefaultTheme;
                    break;
                case "dark":
                    workingTheme = fluentUITeamsDarkTheme;
                    break;
                case "contrast":
                    workingTheme = fluentUITeamsHighContrastTheme;
                    break;
                default:
                    workingTheme = fluentUITeamsDefaultTheme;
                    break;
            }
        }
        else if (props.theme) {
            workingTheme = getVariant(props.theme, VariantThemeType.None);
        }
        else {
            workingTheme = getDefaultTheme();
        }
        return workingTheme;
    }, [props.theme, teamsThemeName]);
    return (React.createElement(ThemeProvider, __assign({}, props, { theme: themeToApply() }), props.children));
};
export { EnhancedThemeProvider, getDefaultTheme, useTheme, ThemeContext };
//# sourceMappingURL=EnhancedThemeProvider.js.map