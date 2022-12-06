import * as React from 'react';

import { useAtomValue } from 'jotai/utils';
import {
  IButtonStyles,
  ICheckboxProps,
  ICheckboxStyles,
  ICommandBarStyles,
  IStackStyles,
  IStyleFunctionOrObject,
  mergeStyles,
  mergeStyleSets,
} from 'office-ui-fabric-react';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { globalState } from '../../jotai/atoms';

export const useFileCommandBarStyles = () => {
  const appGlobalState = useAtomValue(globalState);
  const { themeVariant ,  selectedFiles} = appGlobalState;

  const checkBoxStyles: IStyleFunctionOrObject<ICheckboxProps, ICheckboxStyles> = React.useCallback((props: ICheckboxProps) => {
    return {
      checkbox: {
        borderRadius: "50%",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: `${themeVariant?.palette?.themePrimary} !important`,
        color: `${themeVariant?.palette?.themePrimary} !important`,
        backgroundColor:  !props.checked ? themeVariant?.palette.white : '',
      },
      root: {
        alignItems: "center",

        borderColor: `${themeVariant?.palette?.themePrimary} !important`,
        color: `${themeVariant?.palette?.themePrimary} !important`,
      },
      checkmark: {
        color: themeVariant?.palette?.white,
      },
      text:{
        ":hover": {

          color: `${themeVariant?.palette?.themePrimary} !important`,
        },
      },
      label:{
        ":hover": {
          borderColor: `${themeVariant?.palette?.themePrimary} !important`,
          color: `${themeVariant?.palette?.themePrimary} !important`,
        }
      },

    };
  }, [themeVariant, ]);


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
        margin: 10,
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

  const commandbarButtonStyles = React.useCallback((): IButtonStyles => {
    return {
      root: {
        paddingLeft: 15,

        display: selectedFiles.length ? "block" : "none",
      },
    };
  }, [selectedFiles]);

  const stackContainerStyles: IStackStyles = React.useMemo(() => {
    return {
      root: {
        width: "100%",
        padding: "0 20px",
        /*  backgroundColor: themeVariant?.palette?.neutralLighterAlt, */
      },
    };
  }, [themeVariant]);

  return {checkBoxStyles, stackContainerStyles, controlStyles, commandBarStyles, commandbarButtonStyles };
};
