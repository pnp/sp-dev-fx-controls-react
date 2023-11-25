import { IButtonStyles } from "@fluentui/react/lib/Button";
import { IStackStyles, IStackTokens } from "@fluentui/react/lib/Stack";
import {
  mergeStyles,
  mergeStyleSets,
} from "@fluentui/react/lib/Styling";
import { ITextStyles } from "@fluentui/react/lib/Text";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
const currentTheme = window.__themeState__.theme;
export const getMyTeamsStyles = (themeVariant: IReadonlyTheme) => { // eslint-disable-line @typescript-eslint/explicit-function-return-type
  const commentTextStyles: ITextStyles = {
    root: {
      marginBottom: 15,
      padding: "0px 25px 25px 25px",
    },
  };

  const showHideButtonStyles: Partial<IButtonStyles> = {
    labelHovered: {
      textDecoration: "underline",
    },
  };

  const titleStyles: ITextStyles = {
    root: {
      marginBottom: 20,
    },
  };

  const stackStyles: IStackStyles = {
    root: mergeStyles({
      padding: 0,
    }),
  };
  const stackTokens: IStackTokens = {
    childrenGap: 0,
  };

  const styleClasses = mergeStyleSets({
    webPartTitle: {
      marginBottom: 20,
    },
    separator: mergeStyles({
      borderBottomStyle: "solid",
      borderWidth: 1,
      borderBottomColor:
        themeVariant?.palette?.themeLighter ?? currentTheme.themeLighter,
    }),

    styleIcon: mergeStyles({
      maxWidth: 44,
      minWidth: 44,
      minHeight: 30,
      height: 30,
      borderColor:
        themeVariant?.palette?.themePrimary ?? currentTheme.themePrimary,
      borderRightWidth: 0,
      borderRightStyle: "none",
      borderLeftWidth: 1,
      borderLeftStyle: "solid",
      borderTopWidth: 1,
      borderTopStyle: "solid",
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }),
    teamsContainer: mergeStyles({
      // backgroundColor: themeVariant?.palette?.neutralLighterAlt,
      padding: 7,
      maxHeight: "75vh",
      overflowY: "auto",
      display: "grid",
      gridTemplateColumns: "auto-fill, minmax(min(100%, 65px), 1fr)",
      // gridGap:  "6px",
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: themeVariant
          ? themeVariant?.palette?.neutralQuaternaryAlt
          : currentTheme.neutralQuaternaryAlt,
      },
      "&::-webkit-scrollbar": {
        height: 5,
        width: 10,
      },
    }),
    teamContainer: mergeStyles({
      maxWidth: "100%",
      overflow: "auto",
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,

      borderStyle: "solid",
      borderWidth: 1,
      borderColor:
        themeVariant?.palette?.neutralQuaternaryAlt ??
        currentTheme.neutralQuaternaryAlt,
      borderLeftStyle: "solid",
      borderLeftWidth: 3,
      borderLeftColor:
        themeVariant?.palette?.themePrimary ?? currentTheme.themePrimary,
      margin: 3,

      backgroundColor: themeVariant?.palette?.white ?? currentTheme.white,
      boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",
      ":hover": {
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftStyle: "solid",
        borderLeftWidth: 3,
        borderColor:
          themeVariant?.palette?.themePrimary ?? currentTheme.themePrimary,
      },
    }),
  });

  return {
    titleStyles,
    stackStyles,
    stackTokens,
    styleClasses,
    commentTextStyles,
    showHideButtonStyles,
  };
};
