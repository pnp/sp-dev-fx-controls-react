import React from "react";
import { BasePicker } from "office-ui-fabric-react/lib/components/pickers/BasePicker";
import { IModernTermPickerProps,
         ITermInfoExt,
         ITermItemProps
       } from "./ModernTermPicker.types";
import { TermItem } from "../termItem/TermItem";
import { TermItemSuggestion } from "../termItem/TermItemSuggestion";
import { IBasePickerStyleProps,
         IBasePickerStyles
       } from "office-ui-fabric-react/lib/components/pickers/BasePicker.types";
import { getStyles } from "office-ui-fabric-react/lib/components/pickers/BasePicker.styles";
import { initializeComponentRef,
         styled
       } from "office-ui-fabric-react/lib/Utilities";
import { ISuggestionItemProps } from "office-ui-fabric-react/lib/components/pickers/Suggestions/SuggestionsItem.types";
import { Guid } from "@microsoft/sp-core-library";

export class ModernTermPickerBase extends BasePicker<ITermInfoExt, IModernTermPickerProps> {
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
    onRenderSuggestionsItem: (props: ITermInfoExt, itemProps: ISuggestionItemProps<ITermInfoExt>) => {
      const onLoadParentLabel = async (termId: Guid): Promise<string> => {
        return Promise.resolve("");
      };
      return <TermItemSuggestion term={props} languageTag={props.languageTag} onLoadParentLabel={onLoadParentLabel} termStoreInfo={props.termStoreInfo} {...itemProps} />;
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
