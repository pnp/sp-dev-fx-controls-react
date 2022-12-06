import * as React from 'react';

import { useAtomValue } from 'jotai/utils';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  FontSizes,
  FontWeights,
  ICheckboxProps,
  ICheckboxStyles,
  IDocumentCardStyles,
  IStackStyles,
  IStyleFunctionOrObject,
  ITextStyles,
} from 'office-ui-fabric-react';

import { globalState } from '../../jotai/atoms';

export const useFileStyles = () => {
  const appGlobalState = useAtomValue(globalState);
  const { themeVariant } = appGlobalState;

  const checkBoxStyles: IStyleFunctionOrObject<ICheckboxProps, ICheckboxStyles> = React.useCallback(
    (props: ICheckboxProps) => {
      return {
        checkbox: {
          borderRadius: "50%",
          borderWidth: 1,
          borderStyle: "solid",
          backgroundColor: !props.checked ? themeVariant?.palette.white : "",
          borderColor: themeVariant?.palette?.neutralQuaternaryAlt,
          ":hover": {
            borderColor: `${themeVariant?.palette?.themePrimary} !important`,
          },
        },
        root: {
          ":hover": {
            borderColor: `${themeVariant?.palette?.themePrimary} !important`,
          },
        },
        checkmark: {
          color: themeVariant?.palette?.white,
        },
      };
    },
    [themeVariant]
  );

  const documentCardStyles: IDocumentCardStyles = React.useMemo(() => {
    return {
      root: {
        minWidth: 160,
        minHeight: 180,
        ":hover": {
          borderColor: themeVariant?.palette?.themeLight,
        },
      },
    };
  }, [themeVariant]);

  const documentCardCompactStyles: IDocumentCardStyles = React.useMemo(() => {
    return {
      root: {
        width: "100%",
        maxWidth: "100%",
        ":hover": {
          borderColor: themeVariant?.palette?.themeLight,
        },
      },
    };
  }, [themeVariant]);

  const stackCheckboxStyles: IStackStyles = React.useMemo(() => {
    return { root: { position: "absolute", top: 0, right: 0, zIndex: 1, padding: 5 } };
  }, [themeVariant]);

  const fileNameStyles: ITextStyles = React.useMemo(() => {
    return { root: { fontWeight: FontWeights.semibold } };
  }, [themeVariant]);

  const nameStyles: ITextStyles = React.useMemo(() => {
    return {
      root: {
        textTransform: "uppercase",
        fontSize: FontSizes.size12,
        fontWeight: 600,
        display: "-webkit-box",
        "-webkit-line-clamp": "1",
        "-webkit-box-orient": "vertical",
        overflow: "hidden",
        textAlign: "start",
        wordBreak: "break-word",
      },
    };
  }, [themeVariant]);

  return {
    documentCardCompactStyles,
    checkBoxStyles,
    documentCardStyles,
    stackCheckboxStyles,
    fileNameStyles,
    nameStyles,
  };
};
