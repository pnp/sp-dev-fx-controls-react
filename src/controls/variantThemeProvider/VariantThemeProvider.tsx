import * as React from 'react';
import { useCallback } from 'react';
import { ThemeProvider } from '@fluentui/react-theme-provider';
import { IPartialTheme, ITheme } from '@fluentui/react';
import {
  generateThemeFromColors,
  generateThemeVariant,
  getDefaultTheme,
} from './VariantThemeProviderHelpers';
import {
  VariantThemeProviderProps,
  VariantType,
} from './VariantThemeProviderProps';

export const VariantThemeProvider = (
  props: VariantThemeProviderProps
): JSX.Element => {
  const themeToApply = useCallback(() => {
    const workingVariantType = props.variantType
      ? props.variantType
      : VariantType.None;
    let workingTheme: IPartialTheme | ITheme;

    if (props.themeColors) {
      workingTheme = generateThemeFromColors(
        props.themeColors.primaryColor,
        props.themeColors.textColor,
        props.themeColors.backgroundColor
      );
    } else {
      if (props.theme) {
        workingTheme = props.theme;
      } else {
        workingTheme = getDefaultTheme();
      }
    }

    const themeVariantToApply =
      props.variantType === VariantType.None
        ? workingTheme
        : generateThemeVariant(workingTheme, workingVariantType);

    return themeVariantToApply;
  }, [props.theme, props.themeColors, props.variantType]);

  return (
    <ThemeProvider {...props} theme={themeToApply()}>
      {props.children}
    </ThemeProvider>
  );
};
