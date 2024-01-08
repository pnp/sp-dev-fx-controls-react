import React from 'react';
import { BasePicker } from '@fluentui/react/lib/components/pickers/BasePicker';
import { IModernTermPickerProps,
         ITermItemProps
       } from './ModernTermPicker.types';
import { TermItem } from '../termItem/TermItem';
import { TermItemSuggestion } from '../termItem/TermItemSuggestion';
import { IBasePickerStyleProps,
         IBasePickerStyles
       } from '@fluentui/react/lib/components/pickers/BasePicker.types';
import { getStyles } from '@fluentui/react/lib/components/pickers/BasePicker.styles';
import { initializeComponentRef,
         styled
       } from '@fluentui/react/lib/Utilities';
import { ISuggestionItemProps } from '@fluentui/react/lib/components/pickers/Suggestions/SuggestionsItem.types';
import { ITermInfo } from '@pnp/sp/taxonomy';

export class ModernTermPickerBase extends BasePicker<ITermInfo, IModernTermPickerProps> {
  public static defaultProps = {
    onRenderItem: (props: ITermItemProps) => {
      let labels = props.item.labels.filter((name) => name.languageTag === props.languageTag && name.isDefault);
      if (labels.length === 0) {
        labels = props.item.labels.filter((name) => name.languageTag === props.termStoreInfo?.defaultLanguageTag && name.isDefault);
      }

      return labels.length > 0 ? (
        <TermItem {...props}>{labels[0].name}</TermItem>
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
