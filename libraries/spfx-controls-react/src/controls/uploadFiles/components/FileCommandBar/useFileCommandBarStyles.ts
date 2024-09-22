import * as React from 'react';

import { useAtom } from 'jotai';
import { IButtonStyles } from '@fluentui/react/lib/Button';
import {
  ICheckboxProps,
  ICheckboxStyles,
} from '@fluentui/react/lib/Checkbox';
import { ICommandBarStyles } from '@fluentui/react/lib/CommandBar';
import { IIconStyles } from '@fluentui/react/lib/Icon';
import { IStackStyles } from '@fluentui/react/lib/Stack';
import {
  mergeStyles,
  mergeStyleSets,
} from '@fluentui/react/lib/Styling';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { globalState } from '../../jotai/atoms';

export const useFileCommandBarStyles = () => {
  const [appGlobalState] = useAtom(globalState);
  const { themeVariant, selectedFiles } = appGlobalState;

  const checkBoxStyles: IStyleFunctionOrObject<ICheckboxProps, ICheckboxStyles> = React.useCallback(
    (props: ICheckboxProps) => {
      return {
        checkbox: {
          borderRadius: "50%",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: `${themeVariant?.palette?.themePrimary} !important`,
          color: `${themeVariant?.semanticColors.bodyText} !important`,
          backgroundColor: !props.checked ? themeVariant?.palette.white : themeVariant?.palette.themeLighter,
        },
        root: {
          alignItems: "center",

          borderColor: `${themeVariant?.palette?.themePrimary} !important`,
          color: `${themeVariant?.semanticColors.bodyText} !important`,
          ":hover": {
            ".ms-Checkbox-checkbox": {
              backgroundColor: `${themeVariant?.palette.themeLight} !important`,
            },
          },
        },
        checkmark: {
          color: `${themeVariant?.semanticColors?.bodyText} !important`,
        },
        text: {
          color: `${themeVariant?.semanticColors.bodyText} !important`,
          ":hover": {
            color: `${themeVariant?.semanticColors.bodyText} !important`,
          },
        },
        label: {
          color: `${themeVariant?.semanticColors.bodyText} !important`,
          ":hover": {
            borderColor: `${themeVariant?.palette?.themePrimary} !important`,
            color: `${themeVariant?.semanticColors.bodyText} !important`,
          },
        },
      };
    },
    [themeVariant]
  );

  const buttonIconStyles: IIconStyles = React.useMemo(() => {
    return {
      root: {
        color: `${themeVariant?.semanticColors.bodyText} !important`,
      },
    };
  }, [themeVariant]);

  const controlStyles = React.useMemo(() => {
    return mergeStyleSets({
      fileIconHeaderIcon: {
        padding: 0,
        fontSize: "16px",
      },
      fileIconCell: mergeStyles({
        textAlign: "center",
        selectors: {
          "&:before": {
            content: ".",
            display: "inline-block",
            verticalAlign: "middle",
            height: "100%",
            width: "0px",
            visibility: "hidden",
          },
        },
      }),
      fileIconImg: mergeStyles({
        verticalAlign: "middle",
        maxHeight: "16px",
        maxWidth: "16px",
      }),

      separator: mergeStyles({
        margin: 20,
        height: "1px",
        backgroundColor: themeVariant?.palette?.neutralLight,
        opacity: themeVariant?.isInverted ? "0.2" : "1",
      }),
      separatorVertrical: mergeStyles({
        height: 25,
        width: "1px",
        borderLeftStyle: "solid",
        borderLeftWidth: "1px",
        borderLeftColor: themeVariant?.palette?.themePrimary,
      }),
    });
  }, [themeVariant]);

  const commandBarStyles: ICommandBarStyles = React.useMemo(() => {
    return {
      root: {
        paddingLeft: 0,
        backgroundColor: themeVariant?.semanticColors.bodyBackground,
      },
    };
  }, [themeVariant]);

  const commandbarButtonStyles: IButtonStyles = React.useMemo((): IButtonStyles => {
    return {
      rootHovered: {
        color: `${themeVariant?.semanticColors.bodyText} !important`,
      },
      labelHovered: {
        color: `${themeVariant?.semanticColors.bodyText} !important`,
      },
      root: {
        paddingLeft: 15,
        display: selectedFiles.length ? "block" : "none",
        color: themeVariant?.semanticColors.bodyText,
      },
    };
  }, [selectedFiles]);

  const stackContainerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        width: "100%",
        padding: "0 20px",
      },
    };
  }, [themeVariant]);

  return {
    buttonIconStyles,
    checkBoxStyles,
    stackContainerStyles,
    controlStyles,
    commandBarStyles,
    commandbarButtonStyles,
  };
};
