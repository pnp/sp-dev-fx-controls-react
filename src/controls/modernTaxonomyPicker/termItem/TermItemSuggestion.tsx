import React, { useEffect } from "react";
import { ISuggestionItemProps } from "office-ui-fabric-react";
import styles from './TermItemSuggestions.module.scss';
import * as strings from 'ControlStrings';
import { Guid } from "@microsoft/sp-core-library";
import { ITermStoreInfo } from "@pnp/sp/taxonomy";
import { ITermInfoExt } from "../modernTermPicker/ModernTermPicker.types";

export interface ITermItemSuggestionProps<T> extends ISuggestionItemProps<T> {
  term: ITermInfoExt;
  languageTag: string;
  termStoreInfo: ITermStoreInfo;
  onLoadParentLabel: (termId: Guid) => Promise<string>;
}

export function TermItemSuggestion(props: ITermItemSuggestionProps<ITermInfoExt>): JSX.Element {
  const [parentLabel, setParentLabel] = React.useState<string>("");

  useEffect(() => {
    props.onLoadParentLabel(Guid.parse(props.term.id.toString()))
      .then((localParentInfo) => {
        setParentLabel(localParentInfo);
      });
  }, []);

  let labels = props.term.labels.filter((name) => name.languageTag === props.languageTag && name.isDefault);
  if (labels.length === 0) {
    labels = props.term.labels.filter((name) => name.languageTag === props.termStoreInfo.defaultLanguageTag && name.isDefault);
  }

  return (
    <div className={styles.termSuggestionContainer} title={labels[0].name}>
      {labels[0].name}
      {parentLabel !== "" && <div>
        <span className={styles.termSuggestionPath}>{`${strings.ModernTaxonomyPickerSuggestionInLabel} ${parentLabel}`}</span>
      </div>}
    </div>
  );
}
