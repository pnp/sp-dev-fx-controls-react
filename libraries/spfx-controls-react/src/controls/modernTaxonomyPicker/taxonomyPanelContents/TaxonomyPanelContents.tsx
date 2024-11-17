import * as React from 'react';
import styles from './TaxonomyPanelContents.module.scss';
import { IBasePickerStyleProps,
         IBasePickerStyles,
         IPickerItemProps,
         IStyleFunctionOrObject,
         ISuggestionItemProps,
         Label,
         Selection,
       } from '@fluentui/react';
import { ITermInfo,
         ITermSetInfo,
         ITermStoreInfo
       } from '@pnp/sp/taxonomy';
import { Guid } from '@microsoft/sp-core-library';
import * as strings from 'ControlStrings';
import { useForceUpdate } from '@uifabric/react-hooks';
import { ModernTermPicker } from '../modernTermPicker/ModernTermPicker';
import { IReadonlyTheme } from "@microsoft/sp-component-base";
import { IModernTermPickerProps } from '../modernTermPicker/ModernTermPicker.types';
import { Optional } from '../ModernTaxonomyPicker';
import { TaxonomyTree } from '../taxonomyTree/TaxonomyTree';

export interface ITaxonomyPanelContentsProps {
  allowMultipleSelections?: boolean;
  pageSize: number;
  selectedPanelOptions: ITermInfo[];
  setSelectedPanelOptions: React.Dispatch<React.SetStateAction<ITermInfo[]>>;
  onResolveSuggestions: (filter: string, selectedItems?: ITermInfo[]) => ITermInfo[] | PromiseLike<ITermInfo[]>;
  onLoadMoreData: (termSetId: Guid, parentTermId?: Guid, skiptoken?: string, hideDeprecatedTerms?: boolean, pageSize?: number) => Promise<{ value: ITermInfo[], skiptoken: string }>;
  anchorTermInfo: ITermInfo;
  termSetInfo: ITermSetInfo;
  termStoreInfo: ITermStoreInfo;
  placeHolder: string;
  onRenderSuggestionsItem?: (props: ITermInfo, itemProps: ISuggestionItemProps<ITermInfo>) => JSX.Element;
  onRenderItem?: (props: IPickerItemProps<ITermInfo>) => JSX.Element;
  getTextFromItem: (item: ITermInfo, currentValue?: string) => string;
  languageTag: string;
  themeVariant?: IReadonlyTheme;
  termPickerProps?: Optional<IModernTermPickerProps, 'onResolveSuggestions'>;
  onRenderActionButton?: (termStoreInfo: ITermStoreInfo, termSetInfo: ITermSetInfo, termInfo: ITermInfo, updateTaxonomyTreeViewCallback?: (newTermItems?: ITermInfo[], updatedTermItems?: ITermInfo[], deletedTermItems?: ITermInfo[]) => void) => JSX.Element;
  allowSelectingChildren?: boolean;
}

export function TaxonomyPanelContents(props: ITaxonomyPanelContentsProps): React.ReactElement<ITaxonomyPanelContentsProps> {
  const [terms, setTerms] = React.useState<ITermInfo[]>(props.selectedPanelOptions?.length > 0 ? [...props.selectedPanelOptions] : []);

  const forceUpdate = useForceUpdate();

  const selection = React.useMemo(() => {
    const s = new Selection({
      onSelectionChanged: () => {
        props.setSelectedPanelOptions((prevOptions) => [...selection.getSelection()]);
        forceUpdate();
      }, getKey: (term: any) => term.id // eslint-disable-line @typescript-eslint/no-explicit-any
    });
    s.setItems(terms);
    for (const selectedOption of props.selectedPanelOptions) {
      if (s.canSelectItem) {
        s.setKeySelected(selectedOption.id.toString(), true, true);
      }
    }
    return s;
  }, [terms]);

  const onPickerChange = (items?: ITermInfo[]): void => {
    const itemsToAdd = items.filter((item) => terms.every((term) => term.id !== item.id));
    setTerms((prevTerms) => [...prevTerms, ...itemsToAdd]);
    selection.setItems([...selection.getItems(), ...itemsToAdd], true);
    for (const item of items) {
      if (selection.canSelectItem(item)) {
        selection.setKeySelected(item.id.toString(), true, false);
      }
    }
  };

  const termPickerStyles: IStyleFunctionOrObject<IBasePickerStyleProps, IBasePickerStyles> = { root: {paddingTop: 4, paddingBottom: 4, paddingRight: 4, minheight: 34}, input: {minheight: 34}, text: { minheight: 34, borderStyle: 'none', borderWidth: '0px' } };

  return (
    <div className={styles.taxonomyPanelContents}>
      <div className={styles.taxonomyTreeSelector}>
        <div>
          <ModernTermPicker
            {...props.termPickerProps}
            removeButtonAriaLabel={strings.ModernTaxonomyPickerRemoveButtonText}
            onResolveSuggestions={props.termPickerProps?.onResolveSuggestions ?? props.onResolveSuggestions}
            itemLimit={props.allowMultipleSelections ? undefined : 1}
            selectedItems={props.selectedPanelOptions}
            styles={props.termPickerProps?.styles ?? termPickerStyles}
            onChange={onPickerChange}
            getTextFromItem={props.getTextFromItem}
            pickerSuggestionsProps={props.termPickerProps?.pickerSuggestionsProps ?? { noResultsFoundText: strings.ModernTaxonomyPickerNoResultsFound }}
            inputProps={props.termPickerProps?.inputProps ?? {
              'aria-label': props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder,
              placeholder: props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder
            }}
            onRenderSuggestionsItem={props.termPickerProps?.onRenderSuggestionsItem ?? props.onRenderSuggestionsItem}
            onRenderItem={props.onRenderItem}
            themeVariant={props.themeVariant}
          />
        </div>
      </div>
      <Label className={styles.taxonomyTreeLabel}>{props.allowMultipleSelections ? strings.ModernTaxonomyPickerTreeTitleMulti : strings.ModernTaxonomyPickerTreeTitleSingle}</Label>
      <TaxonomyTree
        anchorTermInfo={props.anchorTermInfo}
        languageTag={props.languageTag}
        onLoadMoreData={props.onLoadMoreData}
        pageSize={props.pageSize}
        selection={selection}
        setTerms={setTerms}
        termSetInfo={props.termSetInfo}
        termStoreInfo={props.termStoreInfo}
        terms={terms}
        allowMultipleSelections={props.allowMultipleSelections}
        onRenderActionButton={props.onRenderActionButton}
        hideDeprecatedTerms={true}
        showIcons={false}
        allowSelectingChildren={props.allowSelectingChildren}
      />
    </div>
  );
}

