import { IBasePickerStyles } from "@fluentui/react/lib/Pickers";

import { IButtonStyles } from "@fluentui/react/lib/Button";
import { IStackStyles } from "@fluentui/react/lib/Stack";
import {
  mergeStyles,
  mergeStyleSets,
} from "@fluentui/react/lib/Styling";
import { IReadonlyTheme } from "@microsoft/sp-component-base";
const theme = window.__themeState__.theme;

export const useTeamChannelPickerStyles = (themeVariant:IReadonlyTheme | undefined) => { // eslint-disable-line @typescript-eslint/explicit-function-return-type

  const renderIconButtonRemoveStyles: Partial<IButtonStyles> = {
    root: {
      height: 26,
      lineHeight: 26,
    },
  };

  const renderItemStylesMulti: Partial<IStackStyles> = {
    root: {
      height: 26,
      lineHeight: 26,
      paddingLeft: 10,
      marginLeft: 5,
      marginBottom: 5,
      cursor: "default",
      backgroundColor:  themeVariant?.palette?.themeLighterAlt ?? theme.themeLighterAlt,
      ":hover": {
        backgroundColor:themeVariant?.palette?.themeLighter ?? theme.themeLighter,
      },
    },
  };

  const renderItemStylesSingle: Partial<IStackStyles> = {
    root: {
      height: 26,
      lineHeight: 26,
      paddingLeft: 10,
      cursor: "default",
      margin: 2,
      backgroundColor: themeVariant?.palette?.themeLighterAlt ?? theme.themeLighterAlt,
      ":hover": {
        backgroundColor: themeVariant?.palette?.themeLighter ?? theme.themeLighter,
      },
    },
  };

  const pickerStylesSingle: Partial<IBasePickerStyles> = {
    root: {
      width: " 100%",
      borderRadius: 0,
    },

    input: {
      width: "100%",
      backgroundColor: themeVariant?.palette?.white ?? theme.white,
    },
    itemsWrapper: {},
    text: {
      borderStyle: "solid",
      width: "100%",
      borderWidth: 1,
      backgroundColor: themeVariant?.palette?.white ?? theme.white,
      borderRadius: 0,
      borderColor: themeVariant?.palette?.neutralQuaternaryAlt ?? theme.neutralQuaternaryAlt,
      ":focus": {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:  themeVariant?.palette?.themePrimary ?? theme.themePrimary,
      },
      ":hover": {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:  themeVariant?.palette?.themePrimary ?? theme.themePrimary,
      },
      ":after": {
        borderWidth: 0,
        borderRadius: 0,
      },
    },
  };

  const pickerStylesMulti: Partial<IBasePickerStyles> = {
    root: {
      width: " 100%",
      borderRadius: 0,
    },

    input: {
      width: "100%",
      backgroundColor: themeVariant?.palette?.white ?? theme.white,
    },
    itemsWrapper: {
      padding: 3,
    },
    text: {
      borderStyle: "solid",
      width: "100%",
      borderWidth: 1,
      backgroundColor: themeVariant?.palette?.white ?? theme.white,
      borderRadius: 0,
      borderColor: themeVariant?.palette?.neutralQuaternaryAlt ?? theme.neutralQuaternaryAlt,
      ":focus": {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:  themeVariant?.palette?.themePrimary ?? theme.themePrimary,
      },
      ":hover": {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:  themeVariant?.palette?.themePrimary ?? theme.themePrimary,
      },
      ":after": {
        borderStyle: "solid",
        borderWidth: 1,
        // borderColor: theme.neutralQuaternaryAlt,
        borderColor:  themeVariant?.palette?.themePrimary ?? theme.themePrimary,
      },
    },
  };

  const pickerStyles: Partial<IBasePickerStyles> = {
    root: {
      width: " 100%",
      borderRadius: 0,
    },
    input: {
      borderTopStyle: "solid",
      width: "100%",
      borderTopWidth: 0,
      backgroundColor: themeVariant?.palette?.white ?? theme.white,
      borderRadius: 0,
    },
    itemsWrapper: {
      padding: 5,
    },
    text: {
      borderStyle: "solid",
      width: "100%",
      borderWidth: 1,
      backgroundColor: themeVariant?.palette?.white ?? theme.white,
      borderRadius: 0,
      borderColor: themeVariant?.palette?.neutralQuaternaryAlt ?? theme.neutralQuaternaryAlt,
      ":focus": {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:  themeVariant?.palette?.themePrimary ??  theme.themePrimary,
      },
      ":hover": {
        borderStyle: "solid",
        borderWidth: 1,
        borderColor:  themeVariant?.palette?.themePrimary ??  theme.themePrimary,
      },
      ":after": {
        borderStyle: "solid",
        borderWidth: 1,
        // borderColor: theme.neutralQuaternaryAlt,
        borderColor:  themeVariant?.palette?.themePrimary ??  theme.themePrimary,
      },
    },
  };

  const componentClasses = mergeStyleSets({

    separator: mergeStyles({
      marginTop: 25,
      marginLeft: 20,
      marginRight: 20,
      borderBottomWidth: 1,
      borderBottomColor:  themeVariant?.palette?.neutralQuaternaryAlt ??    theme?.neutralQuaternaryAlt,
      borderBottomStyle: "solid",
    }),

    iconChannelItemStyles: {
      fontSize: 14,
      color: themeVariant?.palette?.themePrimary ?? theme.themePrimary
    },
    iconChannelInfoStyles: {
      fontSize: 12,
      color: themeVariant?.palette?.themePrimary ?? theme.themePrimary
    },

  });

  return {
    renderIconButtonRemoveStyles,
    pickerStyles,
    renderItemStylesSingle,
    renderItemStylesMulti,
    pickerStylesMulti,
    pickerStylesSingle,
    componentClasses
  };
};
