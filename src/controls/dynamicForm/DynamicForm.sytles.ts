import { IStyle } from '@fluentui/react';
import { getFluentUIThemeOrDefault } from '../../common/utilities/ThemeUtility';
import { getFieldStyles } from './dynamicField/DynamicField.styles';
import type {
  IDynamicFormStyleProps,
  IDynamicFormStyles,
} from './IDynamicFormProps';

export const getStyles = (
  props: IDynamicFormStyleProps
): IDynamicFormStyles => {
  const className = props.className;
  const globalClassNames = {
    sectionFormField: 'sectionFormField',
    sectionFormFields: 'sectionFormFields',
    sectionTitle: 'sectionTitle',
    sectionLine: 'sectionLine',
    header:'header',
    footer:'footer',
    validationErrorDialog: 'validationErrorDialog',
    buttons: 'buttons',
    actions: 'actions',
    action: 'action',
    actionsRight: 'actionsRight',
  };
  const theme = getFluentUIThemeOrDefault();

  const paddingleft_style: IStyle = {
    'padding-left': '20px'
  };

  return {
    root: [
      className,
      {
        selectors: {
          '.sp-field-customFormatter': {
            'min-height': 'inherit',
            display: 'flex',
            'align-items': 'center',
          },
        },
      },
    ],
    sectionFormField: [
      globalClassNames.sectionFormField,
      {
        selectors: {
          ':has(div)': {
            'max-width': '50vmin',
            'min-width': '25vmax',
            padding: '20px',
            [`@media (min-width: 480px)`]: {
              width: '90%',
            },
          },
        },
      },
    ],
    sectionFormFields: [
      globalClassNames.sectionFormFields,
      {
        display: 'flex',
        'flex-wrap': 'wrap',
      },
    ],

    sectionTitle: [
      globalClassNames.sectionTitle,
      {
        color: '#000000',
        'font-weight': '600',
        'font-size': '16px',
        'margin-top': '6px',
        'margin-bottom': '12px',
        clear: 'both',
        'padding-left': '20px'
      },
    ],
    header: [
      globalClassNames.header,
      paddingleft_style 
     
    ],
    footer: [
      globalClassNames.footer,
      paddingleft_style 
    ],
    sectionLine: [
      globalClassNames.sectionLine,
      {
        width: '100%',
        'border-top': '1px solid #edebe9',
        'border-bottom-width': '0',
        'border-left-width': '0',
        'border-right-width': '0',
        clear: 'both',
      },
    ],
    validationErrorDialog: [
      globalClassNames.validationErrorDialog,
      {
        selectors: {
          '.ms-Dialog-main': {
            'max-width': '540px',
            width: '540px',
          },
        },
      },
    ],
    buttons: [
      globalClassNames.buttons,
      {
        padding: '15px 4px',
      },
    ],
    actions: [
      globalClassNames.actions,
      {
        position: 'relative',
        width: '100%',
        'min-height': '24px',
        'line-height': '24px',
        'margin-top': '20px',
        'margin-right': '0px',
        'margin-bottom': '0px',
        'margin-left': '0px',
        'font-size': '0px',
      },
    ],
    action: [
      globalClassNames.action,
      {
        'margin-top': '0px',
        'margin-right': '4px',
        'margin-bottom': '0px',
        'margin-left': '4px',
      },
    ],
    actionsRight: [
      globalClassNames.actionsRight,
      {
        'text-align': 'right',
        'margin-right': '-4px',
        'font-size': '0px',
      },
    ],
    subComponentStyles: {
      fieldStyles: getFieldStyles({ theme: theme }),
    },
  };
};
