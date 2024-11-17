import { ILabelStyles, IProcessedStyleSet, IStackStyles, IStyle, mergeStyleSets } from '@fluentui/react';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

export const getProgressStepsIndicatorStyles: (themeVariant: IReadonlyTheme) => {
  labelStepTitleCurrentStyle: ILabelStyles;
  stackStepsStyles: IStackStyles;
  labelStepStyles: ILabelStyles;
  labelStepTitleStyle: ILabelStyles;
  /* eslint-disable @typescript-eslint/no-explicit-any */
  componentClasses: IProcessedStyleSet<{
    bulletCurrent: any;
    bulletCompleted: any;
    bullet: any;
    line: IStyle;
  }>;
  /* eslint-enable @typescript-eslint/no-explicit-any */
} = (
  themeVariant: IReadonlyTheme
) => {
  const labelStepTitleCurrentStyle: ILabelStyles = {
    root: {
      fontWeight: 700,
      width: 150,
      textAlign: 'center',
    },
  };

  const labelStepTitleStyle: ILabelStyles = {
    root: {
      width: 150,
      textAlign: 'center',
    },
  };

  const labelStepStyles: ILabelStyles = {
    root: {
      fontWeight: 400,
    },
  };

  const stackStepsStyles: IStackStyles = {
    root: { marginLeft: 50, marginRight: 50 },
  };

  const componentClasses = mergeStyleSets({
    bulletCurrent: {
      borderStyle: 'solid',
      borderWidth: 2,
      borderColor: themeVariant?.palette?.themePrimary,
      width: 34,
      height: 34,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      horizontalAlign: 'center',
      zIndex: 111,
      backgroundColor: themeVariant?.palette?.neutralLighter,
      fontSize: 16,
      alignItems: 'center',
    },
    bulletCompleted: {
      cursor: 'default',
      width: 34,
      height: 34,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      horizontalAlign: 'center',
      zIndex: 111,
      backgroundColor: themeVariant?.palette?.themePrimary,
      color: themeVariant?.palette?.themeLighter,
      fontSize: 16,
      alignItems: 'center',
    },
    bullet: {
      borderColor: themeVariant?.palette?.neutralTertiaryAlt,
      borderStyle: 'solid',
      borderWidth: 2,
      width: 34,
      height: 34,
      borderRadius: '50%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      horizontalAlign: 'center',
      verticalAlign: 'center',
      backgroundColor: themeVariant?.palette?.neutralLight,
      fontSize: 16,
      zIndex: 111,
    },
    line: {
      height: 2,
      backgroundColor: themeVariant?.palette?.neutralQuaternaryAlt,
      width: '100%',
      position: 'relative',
      top: 17,
      zIndex: 0,
    } as IStyle,
  });

  return {
    labelStepTitleCurrentStyle,
    stackStepsStyles,
    labelStepStyles,
    labelStepTitleStyle,
    componentClasses,
  };
};
