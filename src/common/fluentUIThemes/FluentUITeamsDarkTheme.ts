import { Theme } from "@fluentui/theme";
import { createTheme } from "@fluentui/react/lib/Styling";

export const fluentUITeamsDarkTheme : Theme = createTheme({
    palette: {
        themePrimary: "#7f85f5",
        themeLighterAlt: "#05050a",
        themeLighter: "#141527",
        themeLight: "#262849",
        themeTertiary: "#4c5093",
        themeSecondary: "#7075d7",
        themeDarkAlt: "#8c91f6",
        themeDark: "#9da2f7",
        themeDarker: "#b6baf9",
        neutralLighterAlt: "#282828",
        neutralLighter: "#313131",
        neutralLight: "#3f3f3f",
        neutralQuaternaryAlt: "#484848",
        neutralQuaternary: "#4f4f4f",
        neutralTertiaryAlt: "#6d6d6d",
        neutralTertiary: "#c8c8c8",
        neutralSecondary: "#d0d0d0",
        neutralPrimaryAlt: "#dadada",
        neutralPrimary: "#ffff",
        neutralDark: "#f4f4f4",
        black: "#ffffff",
        white: "#1f1f1f"
    },
    isInverted: true
});
