import { IStyle } from '@fluentui/react';
import {
  IDynamicFieldStyleProps,
  IDynamicFieldStyles,
} from './IDynamicFieldProps';

export const getFieldStyles = (
  props: IDynamicFieldStyleProps
): IDynamicFieldStyles => {
  const { required, theme } = props;
  const { palette } = theme;
  const globalClassNames = {
    titleContainer: 'titleContainer',
    fieldEditor: 'fieldEditor',
    fieldIcon: 'fieldIcon',
    fieldContainer: 'fieldContainer',
    fieldDisplay: 'fieldDisplay',
    fieldDisplayNoPadding: 'fieldDisplayNoPadding',
    fieldDescription: 'fieldDescription',
    fieldLabel: 'fieldLabel',
    labelContainer: 'labelContainer',
    pickersContainer: 'pickersContainer',
    errormessage: 'errormessage',
    richText: 'richText',
    thumbnailFieldButtons: 'thumbnailFieldButtons',
    selectedFileContainer: 'selectedFileContainer',
    fieldRequired: 'fieldRequired',
  };

  const fieldDisplayNoPadding_style: IStyle = {
    display: 'inline-block',
    'vertical-align': 'top',
    width: '100%',
    'font-size': '14px',
    'font-weight': '400',
    outline: '0',
  };

  const fieldDisplay_style: IStyle = fieldDisplayNoPadding_style && {
    padding: '6px 0 0px 0',
  };

  const fieldRequired_style: IStyle = {
    selectors: {
      '::after': {
        content: `' *'`,
        color: theme.semanticColors.errorText,
        'padding-right': '12px',
      },
    },
  };

  const fontfamily =
    "'Segoe UI', 'Segoe UI Web (West European)',  -apple-system, BlinkMacSystemFont, Roboto,'Helvetica Neue', 'sans-serif'";

  return {
    titleContainer: [
      globalClassNames.titleContainer,
      {
        display: 'flex',
      },
    ],
    fieldIcon: [
      globalClassNames.fieldIcon,
      {
        'align-self': 'center',
        'font-size': '16px',
        color: palette.neutralSecondary,
        'margin-right': '8px',
      },
    ],
    fieldDisplay: [globalClassNames.fieldDisplay, fieldDisplay_style],
    fieldContainer: [
      globalClassNames.fieldContainer,
      { 'padding-bottom': '4px' },
    ],
    fieldDisplayNoPadding: [
      globalClassNames.fieldDisplayNoPadding,
      fieldDisplay_style,
    ],
    fieldEditor: [globalClassNames.fieldEditor, { padding: '4px 3px' }],
    fieldDescription: [
      globalClassNames.fieldDescription,
      {
        'font-weight': '400',
        'font-size': '12px',
        color: '#858585',
        'margin-top': '4px',
        'font-family': fontfamily,
        '-webkit-font-smoothing': 'antialiased',
        '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
        'overflow-wrap': 'break-word',
        display: 'block',
        'user-select': 'none',
        '-webkit-user-select': 'none',
      },
    ],
    fieldLabel: [
      globalClassNames.fieldLabel,
      {
        'font-weight': '600',
        'font-size': '14px',
        'padding-top': '5px',
        'padding-bottom': '5px',
        'font-family': fontfamily,
        '-webkit-font-smoothing': 'antialiased',
        color: palette.neutralPrimary,
        'box-sizing': 'border-box',
        'box-shadow': 'none',
        margin: '0px',
        'overflow-wrap': 'break-word',
        display: 'block',
      },
      required && [globalClassNames.fieldRequired, fieldRequired_style],
    ],
    fieldRequired: [globalClassNames.fieldRequired, fieldRequired_style],
    labelContainer: [
      globalClassNames.labelContainer,
      { 'padding-bottom': '7px' },
    ],
    pickersContainer: [
      globalClassNames.pickersContainer,
      { padding: '6px 0 0px' },
    ],
    selectedFileContainer: [
      globalClassNames.selectedFileContainer,
      { display: 'flex', margin: '10px 0px' },
    ],
    richText: [globalClassNames.richText, { position: 'relative' }],
    thumbnailFieldButtons: [
      globalClassNames.thumbnailFieldButtons,
      { display: 'flex' },
    ],
    errormessage: [
      globalClassNames.errormessage,
      {
        'animation-duration': '0.367s',
        'animation-timing-function': 'cubic-bezier(0.1, 0.9, 0.2, 1)',
        'animation-fill-mode': 'both',
        'font-family': fontfamily,
        'font-size': '12px',
        'font-weight': '400',
        color: theme.semanticColors.errorText,
        margin: '0px',
        'padding-top': '5px',
        display: 'flex',
        'align-items': 'center',
      },
    ],
  };
};
