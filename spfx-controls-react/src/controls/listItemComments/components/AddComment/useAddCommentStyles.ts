import * as React from "react";
import { IDocumentCardStyles } from "@fluentui/react/lib/DocumentCard";
import { IStackStyles } from "@fluentui/react/lib/Stack";
import { IStyle, mergeStyleSets } from "@fluentui/react/lib/Styling";
import { AppContext } from "../../common";

export const useAddCommentStyles = () => { // eslint-disable-line @typescript-eslint/explicit-function-return-type
  const { theme } = React.useContext(AppContext);
  const itemContainerStyles: IStackStyles = {
    root: { paddingTop: 0, paddingLeft: 20, paddingRight: 20, paddingBottom: 20 } as IStyle,
  };

  const deleteButtonContainerStyles: Partial<IStackStyles> = {
    root: {
      position: "absolute",
      top: 0,
      right: 0,
    },
  };

  const searchMentionContainerStyles: Partial<IStackStyles> = {
    root: {
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "silver",
      width: 322,
      ":focus": {
        borderColor: theme.themePrimary,
      },
      ":hover": {
        borderColor: theme.themePrimary,
      },
    },
  };

  const documentCardUserStyles: Partial<IDocumentCardStyles> = {
    root: {
      marginTop: 2,
      backgroundColor: theme?.white,
      boxShadow: "0 5px 15px rgba(50, 50, 90, .1)",
      ":hover": {
        borderColor: theme.themePrimary,
        backgroundColor: theme.neutralLighterAlt,
        borderWidth: 1,
      } as IStyle,
    } as IStyle,
  };

  const componentClasses = mergeStyleSets({
    container: {
      borderWidth: 1,
      borderStyle: "solid",
      display: "block",
      borderColor: "silver",
      overflow: "hidden",
      width: 320,
      ":focus": {
        borderWidth: 2,
        borderColor: theme.themePrimary,
      },
      ":hover": {
        borderWidth: 2,
        borderColor: theme.themePrimary,
      },
    } as IStyle,
  });

  const mentionsClasses = mergeStyleSets({
    mention: {
      position: "relative",
      zIndex: 9999,
      color: theme.themePrimary,
      pointerEvents: "none",
    } as IStyle,
  });

  const reactMentionStyles = {
    control: {
      backgroundColor: "#fff",
      fontSize: 12,
      border: "none",
      fontWeight: "normal",
      outlineColor: theme.themePrimary,
      borderRadius: 0,
    } as IStyle,
    "&multiLine": {
      control: {
        border: "none",
        fontFamily:
          '"Segoe UI", "Segoe UI Web (West European)", "Segoe UI", -apple-system, BlinkMacSystemFont, Roboto, "Helvetica Neue"',
        minHeight: 35,
        fontSize: 14,
        fontWeight: 400,
        borderRadius: 0,
      } as IStyle,
      highlighter: {
        padding: 9,
        border: "none",
        borderWidth: 0,
        borderRadius: 0,
      } as IStyle,
      input: {
        padding: 9,
        border: "none",
        outline: "none",
      } as IStyle,
    },

    "&singleLine": {
      display: "inline-block",
      height: 50,
      outlineColor: theme.themePrimary,
      border: "none",
      highlighter: {
        padding: 1,
        border: "1px inset transparent",
      },
      input: {
        padding: 1,
        width: "100%",
        borderRadius: 0,
        border: "none",
      },
    },

    suggestions: {
      list: {
        backgroundColor: "white",
        border: "1px solid rgba(0,0,0,0.15)",
        fontSize: 14,
      },
      item: {
        padding: "5px 15px",
        borderBottom: "1px solid",
        borderBottomColor: theme.themeLight,
        "&focused": {
          backgroundColor: theme.neutralLighterAlt,
        },
      },
    },
  };

  return {
    documentCardUserStyles,
    deleteButtonContainerStyles,
    reactMentionStyles,
    itemContainerStyles,
    searchMentionContainerStyles,
    mentionsClasses,
    componentClasses,
  };
};
