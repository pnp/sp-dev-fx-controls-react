import * as React from 'react';

import { useAtom } from 'jotai';
import {
  ICheckboxProps,
  ICheckboxStyles,
} from '@fluentui/react/lib/Checkbox';
import {
  IDocumentCardImageStyles,
  IDocumentCardStyles,
} from '@fluentui/react/lib/DocumentCard';
import { IStackStyles } from '@fluentui/react/lib/Stack';
import {
  FontSizes,
  FontWeights,
  mergeStyleSets,
} from '@fluentui/react/lib/Styling';
import { ITextStyles } from '@fluentui/react/lib/Text';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';

/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { globalState } from '../../jotai/atoms';

export const useFileStyles = () => {
  const [appGlobalState] = useAtom(globalState);
  const { themeVariant } = appGlobalState;


  const documentImageStyles: Partial<IDocumentCardImageStyles> = React.useMemo(() => {
    return {
      root: {

      },
    }
  }, []);

  const checkBoxStyles: IStyleFunctionOrObject<ICheckboxProps, ICheckboxStyles> = React.useCallback(
    (props: ICheckboxProps) => {
      return {
        checkbox: {
          color: `${themeVariant?.semanticColors?.bodyText} !important`,
          borderRadius: "50%",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: themeVariant?.palette?.neutralQuaternaryAlt,
          ":hover": {
            borderColor: `${themeVariant?.palette?.themePrimary} !important`,
          },
          backgroundColor: !props.checked ? themeVariant?.palette.white : themeVariant?.palette.themeLighter,
        },
        root: {
          ":hover": {
            borderColor: `${themeVariant?.palette?.themePrimary} !important`,
            color: `${themeVariant?.semanticColors.bodyText} !important`,
            ":hover": {
              ".ms-Checkbox-checkbox": {
              backgroundColor: `${themeVariant?.palette.themeLight} !important`,
            }},
          },
        },
        checkmark: {
          color:`${themeVariant?.semanticColors?.bodyText} !important`,
        },
      };
    },
    [themeVariant]
  );

  const documentCardStyles: IDocumentCardStyles = React.useMemo(() => {
    return {
      root: {
        color: themeVariant?.semanticColors.bodyText,
        backgroundColor: themeVariant?.semanticColors.bodyBackground,
        borderColor: themeVariant?.palette.neutralLight,
        minWidth: 160,
        minHeight: 180,
        ":hover": {
          borderColor: themeVariant?.palette?.neutralQuaternary,
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
  }, []);

  const fileNameStyles: ITextStyles = React.useMemo(() => {
    return { root: { fontWeight: FontWeights.semibold,
      color: themeVariant?.semanticColors.bodyText,
    } };
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
        color: themeVariant?.semanticColors.bodyText,
      },
    };
  }, [themeVariant]);

  const controlStyles = React.useMemo(() => {
    return mergeStyleSets({
      ".ms-Checkbox-text": {
         color: `${themeVariant?.semanticColors?.bodyText} !important`,
      },

    });
  }, [themeVariant]);

  return {
    documentCardCompactStyles,
    checkBoxStyles,
    documentCardStyles,
    stackCheckboxStyles,
    fileNameStyles,
    nameStyles,
    documentImageStyles,
    controlStyles
  };
};
