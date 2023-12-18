import { Theme } from '@fluentui/theme';
import { createTheme } from "@fluentui/react/lib/Styling";

export const fluentUITeamsDefaultTheme: Theme = createTheme({
    palette: {
        themePrimary: "#6264A7",
        themeLighterAlt: "#f7f7fb",
        themeLighter: "#e1e1f1",
        themeLight: "#c8c9e4",
        themeTertiary: "#989ac9",
        themeSecondary: "#7173b0",
        themeDarkAlt: "#585a95",
        themeDark: "#4a4c7e",
        themeDarker: "#37385d",
        neutralLighterAlt: "#eeeeee",
        neutralLighter: "#eaeaea",
        neutralLight: "#e1e1e1",
        neutralQuaternaryAlt: "#d1d1d1",
        neutralQuaternary: "#c8c8c8",
        neutralTertiaryAlt: "#c0c0c0",
        neutralTertiary: "#acacac",
        neutralSecondary: "#919191",
        neutralPrimaryAlt: "#767676",
        neutralPrimary: "#0b0b0b",
        neutralDark: "#404040",
        black: "#252525",
        white: "#F5F5F5"
    },
    isInverted: false
});
