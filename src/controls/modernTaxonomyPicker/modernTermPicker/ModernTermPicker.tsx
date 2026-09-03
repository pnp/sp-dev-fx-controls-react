import React from 'react';
import { IModernTermPickerProps,
         ITermItemProps
       } from './ModernTermPicker.types';
import { TermItem } from '../termItem/TermItem';
import { TermItemSuggestion } from '../termItem/TermItemSuggestion';

import { initializeComponentRef,
         styled
       } from '@fluentui/react/lib/Utilities';

import { ITermInfo } from '@pnp/sp/taxonomy';
import { BasePicker, IBasePickerStyleProps, IBasePickerStyles, IPickerItemProps, ISuggestionItemProps } from '@fluentui/react/lib/Pickers';
import { getStyles } from '@fluentui/react/lib/components/pickers/BasePicker.styles';

export class ModernTermPickerBase extends BasePicker<ITermInfo, IModernTermPickerProps> {
  public static defaultProps = {
    onRenderItem: (props: IPickerItemProps<ITermInfo>) => {
      const termItemProps = props as ITermItemProps;
      let labels = termItemProps.item.labels.filter((name) => name.languageTag === termItemProps.languageTag && name.isDefault);
      if (labels.length === 0) {
        labels = termItemProps.item.labels.filter((name) => name.languageTag === termItemProps.termStoreInfo?.defaultLanguageTag && name.isDefault);
      }

      return labels.length > 0 ? (
        <TermItem {...termItemProps}>{labels[0].name}</TermItem>
      ) : null;
    },
    onRenderSuggestionsItem: (props: ITermInfo, itemProps: ISuggestionItemProps<ITermInfo>) => {
      return <TermItemSuggestion term={props} {...itemProps} />;
    },
  };

  constructor(props: IModernTermPickerProps) {
    super(props);
    initializeComponentRef(this);
  }
}

export const ModernTermPicker = styled<IModernTermPickerProps, IBasePickerStyleProps, IBasePickerStyles>(
  ModernTermPickerBase,
  getStyles,
  undefined,
  {
    scope: 'ModernTermPicker',
  },
);
