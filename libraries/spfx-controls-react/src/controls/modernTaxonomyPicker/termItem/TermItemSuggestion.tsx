import React, { useEffect } from 'react';
import { ISuggestionItemProps } from '@fluentui/react/lib/Pickers';
import styles from './TermItemSuggestions.module.scss';
import * as strings from 'ControlStrings';
import { Guid } from '@microsoft/sp-core-library';
import { ITermInfo, ITermStoreInfo } from '@pnp/sp/taxonomy';

export interface ITermItemSuggestionProps<T> extends ISuggestionItemProps<T> {
  term: ITermInfo;
  languageTag?: string;
  termStoreInfo?: ITermStoreInfo;
  searchFilter?: string;
  onLoadParentLabel?: (termId: Guid) => Promise<string>;
}

export function TermItemSuggestion(props: ITermItemSuggestionProps<ITermInfo>): JSX.Element {
  const [parentLabel, setParentLabel] = React.useState<string>("");

  useEffect(() => {
    if (props.onLoadParentLabel) {
      props.onLoadParentLabel(Guid.parse(props.term.id.toString()))
      .then((localParentInfo) => {
        setParentLabel(localParentInfo);
      })
      .catch(() => {
        // no-op;
      });
    }
  }, []);

  const filterLabels = (isDefault: boolean, nameFilter?: (name: string) => boolean): {
      name: string;
      isDefault: boolean;
      languageTag: string;
    }[] => {

    nameFilter = nameFilter || (() => true);

    if (props.languageTag && props.termStoreInfo) {
      let labels = props.term.labels.filter((name) => name.languageTag === props.languageTag && name.isDefault === isDefault && nameFilter(name.name));
      if (labels.length === 0) {
        labels = props.term.labels.filter((name) => name.languageTag === props.termStoreInfo.defaultLanguageTag && name.isDefault === isDefault && nameFilter(name.name));
      }
      return labels;
    }
    else {
      return props.term.labels.filter((name) => name.isDefault === isDefault && nameFilter(name.name));
    }
  }

  const labels = filterLabels(true);
  const synonyms = props.searchFilter ? filterLabels(false, (name) => {
    const prefix = props.searchFilter!;
    if (prefix.length > name.length)
      return false;
    const compareTo = name.substring(0, prefix.length);
    return compareTo.localeCompare(prefix, undefined, { sensitivity: 'base' }) === 0;
  }) : [];

  return (
    <div className={styles.termSuggestionContainer} title={labels[0]?.name}>
      {labels[0]?.name}
      {parentLabel !== "" && <div>
        <span className={styles.termSuggestionPath}>{`${strings.ModernTaxonomyPickerSuggestionInLabel} ${parentLabel}`}</span>
      </div>}
      {synonyms.length > 0 && <ul className={styles.termSynonymList}>
        {synonyms.map((synonym) => <li key={synonym.name}><span className={styles.synonymPrefix}>{synonym.name.substring(0, props.searchFilter!.length)}</span><span>{synonym.name.substring(props.searchFilter!.length)}</span></li>)}
      </ul>}
    </div>
  );
}
