import { BaseComponentContext, IReadonlyTheme } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import { sp } from '@pnp/sp';
import {
  ITermInfo,
  ITermSetInfo,
  ITermStoreInfo
} from '@pnp/sp/taxonomy';
import { useId } from '@uifabric/react-hooks';
import * as strings from 'ControlStrings';
import {
  DefaultButton, IButtonStyles, IconButton, PrimaryButton
} from '@fluentui/react/lib/Button';
import { IIconProps } from '@fluentui/react/lib/components/Icon';
import { Label } from '@fluentui/react/lib/Label';
import {
  Panel,
  PanelType
} from '@fluentui/react/lib/Panel';
import {
  IBasePickerStyleProps,
  IBasePickerStyles,
  ISuggestionItemProps
} from '@fluentui/react/lib/Pickers';
import {
  IStackTokens,
  Stack
} from '@fluentui/react/lib/Stack';
import { ITooltipHostStyles, TooltipHost } from '@fluentui/react/lib/Tooltip';
import { IStyleFunctionOrObject } from '@fluentui/react/lib/Utilities';
import * as React from 'react';
import { useMemo } from 'react';
import { SPTaxonomyService } from '../../services/SPTaxonomyService';
import styles from './ModernTaxonomyPicker.module.scss';
import { ModernTermPicker } from './modernTermPicker/ModernTermPicker';
import { IModernTermPickerProps, ITermItemProps } from './modernTermPicker/ModernTermPicker.types';
import { TaxonomyPanelContents } from './taxonomyPanelContents';
import { TermItem } from './termItem/TermItem';
import { TermItemSuggestion } from './termItem/TermItemSuggestion';

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface IModernTaxonomyPickerProps {
  allowMultipleSelections?: boolean;
  isPathRendered?: boolean;
  termSetId: string;
  anchorTermId?: string;
  panelTitle: string;
  label: string;
  context: BaseComponentContext;
  initialValues?: Optional<ITermInfo, "childrenCount" | "createdDateTime" | "lastModifiedDateTime" | "descriptions" | "customSortOrder" | "properties" | "localProperties" | "isDeprecated" | "isAvailableForTagging" | "topicRequested">[];
  disabled?: boolean;
  required?: boolean;
  onChange?: (newValue?: ITermInfo[]) => void;
  onRenderItem?: (itemProps: ITermItemProps) => JSX.Element;
  onRenderSuggestionsItem?: (term: ITermInfo, itemProps: ISuggestionItemProps<ITermInfo>) => JSX.Element;
  placeHolder?: string;
  customPanelWidth?: number;
  themeVariant?: IReadonlyTheme;
  termPickerProps?: Optional<IModernTermPickerProps, 'onResolveSuggestions'>;
  isLightDismiss?: boolean;
  isBlocking?: boolean;
  onRenderActionButton?: (termStoreInfo: ITermStoreInfo, termSetInfo: ITermSetInfo, termInfo?: ITermInfo) => JSX.Element;
  allowSelectingChildren?: boolean;
}

export function ModernTaxonomyPicker(props: IModernTaxonomyPickerProps): JSX.Element {
  const taxonomyService = useMemo(()=>new SPTaxonomyService(props.context), [props.context]);
  const [panelIsOpen, setPanelIsOpen] = React.useState(false);
  const initialLoadComplete = React.useRef(false);
  const [selectedOptions, setSelectedOptions] = React.useState<ITermInfo[]>([]);
  const [selectedPanelOptions, setSelectedPanelOptions] = React.useState<ITermInfo[]>([]);
  const [currentTermStoreInfo, setCurrentTermStoreInfo] = React.useState<ITermStoreInfo>();
  const [currentTermSetInfo, setCurrentTermSetInfo] = React.useState<ITermSetInfo>();
  const [currentAnchorTermInfo, setCurrentAnchorTermInfo] = React.useState<ITermInfo>();
  const [currentLanguageTag, setCurrentLanguageTag] = React.useState<string>("");

  React.useEffect(() => {
    sp.setup({ pageContext: props.context.pageContext });
    taxonomyService.getTermStoreInfo()
      .then((termStoreInfo) => {
        setCurrentTermStoreInfo(termStoreInfo);
        const languageTag = props.context.pageContext.cultureInfo.currentUICultureName !== '' && termStoreInfo.languageTags.includes(props.context.pageContext.cultureInfo.currentUICultureName) ?
          props.context.pageContext.cultureInfo.currentUICultureName :
          termStoreInfo.defaultLanguageTag;
        setCurrentLanguageTag(languageTag);
        setSelectedOptions(Array.isArray(props.initialValues) ?
          props.initialValues.map(term => { return { ...term, languageTag: languageTag, termStoreInfo: termStoreInfo } as ITermInfo; }) :
          []);
          initialLoadComplete.current = true;
      })
      .catch(() => {
        // no-op;
      });
    taxonomyService.getTermSetInfo(Guid.parse(props.termSetId))
      .then((termSetInfo) => {
        setCurrentTermSetInfo(termSetInfo);
      })
      .catch(() => {
        // no-op;
      });
    if (props.anchorTermId && props.anchorTermId !== Guid.empty.toString()) {
      taxonomyService.getTermById(Guid.parse(props.termSetId), props.anchorTermId ? Guid.parse(props.anchorTermId) : Guid.empty)
        .then((anchorTermInfo) => {
          setCurrentAnchorTermInfo(anchorTermInfo);
        })
        .catch(() => {
          // no-op;
        });
    }
  }, []);

  React.useEffect(() => {
    if (props.onChange && initialLoadComplete.current) {
      props.onChange(selectedOptions);
    }
  }, [selectedOptions]);

  function onOpenPanel(): void {
    if (props.disabled === true) {
      return;
    }
    setSelectedPanelOptions(selectedOptions);
    setPanelIsOpen(true);
  }

  function onClosePanel(): void {
    setSelectedPanelOptions([]);
    setPanelIsOpen(false);
  }

  function onApply(): void {
    if (props.isPathRendered) {
      addParentInformationToTerms([...selectedPanelOptions])
        .then((selectedTermsWithPath) => {
          setSelectedOptions(selectedTermsWithPath);
        })
        .catch(() => {
          // no-op;
        });
    }
    else {
      setSelectedOptions([...selectedPanelOptions]);
    }
    onClosePanel();
  }

  async function getParentTree(term: ITermInfo): Promise<ITermInfo> {
    let currentParent = term.parent;
    if(!currentParent) {
      const fullTerm = await taxonomyService.getTermById(Guid.parse(props.termSetId), Guid.parse(term.id));
      currentParent = fullTerm.parent;
    }
    if(!currentParent) { // Top-level term reached, no parents.
      return undefined;
    } else {
      currentParent.parent = await getParentTree(currentParent);
      return currentParent;
    }
  }

  async function addParentInformationToTerms(terms: ITermInfo[]): Promise<ITermInfo[]> {
    for(const term of terms) {
      const termParent = await getParentTree(term);
      term.parent = termParent;
    }

    return terms;
  }

  async function onResolveSuggestions(filter: string, selectedItems?: ITermInfo[]): Promise<ITermInfo[]> {
    if (filter === '') {
      return [];
    }
    const filteredTerms = await taxonomyService.searchTerm(Guid.parse(props.termSetId), filter, currentLanguageTag, props.anchorTermId ? Guid.parse(props.anchorTermId) : Guid.empty, props.allowSelectingChildren);

    const filteredTermsWithoutSelectedItems = filteredTerms.filter((term) => {
      if (!selectedItems || selectedItems.length === 0) {
        return true;
      }
      return selectedItems.every((item) => item.id !== term.id);
    });

    const filteredTermsAndAvailable = filteredTermsWithoutSelectedItems
      .filter((term) =>
        term.isAvailableForTagging
          .filter((t) => t.setId === props.termSetId)[0].isAvailable);
    return filteredTermsAndAvailable;
  }

  async function onLoadParentLabel(termId: Guid): Promise<string> {
    const termInfo = await taxonomyService.getTermById(Guid.parse(props.termSetId), termId);
    if (termInfo.parent) {
      let labelsWithMatchingLanguageTag = termInfo.parent.labels.filter((termLabel) => (termLabel.languageTag === currentLanguageTag));
      if (labelsWithMatchingLanguageTag.length === 0) {
        labelsWithMatchingLanguageTag = termInfo.parent.labels.filter((termLabel) => (termLabel.languageTag === currentTermStoreInfo.defaultLanguageTag));
      }
      return labelsWithMatchingLanguageTag[0]?.name;
    }
    else {
      let termSetNames = currentTermSetInfo.localizedNames.filter((name) => name.languageTag === currentLanguageTag);
      if (termSetNames.length === 0) {
        termSetNames = currentTermSetInfo.localizedNames.filter((name) => name.languageTag === currentTermStoreInfo.defaultLanguageTag);
      }
      return termSetNames[0].name;
    }
  }

  function onRenderSuggestionsItem(term: ITermInfo, itemProps: ISuggestionItemProps<ITermInfo>): JSX.Element {
    return (
      <TermItemSuggestion
        onLoadParentLabel={onLoadParentLabel}
        term={term}
        termStoreInfo={currentTermStoreInfo}
        languageTag={currentLanguageTag}
        {...itemProps}
      />
    );
  }

  function getLabelsForCurrentLanguage(item: ITermInfo): {
    name: string;
    isDefault: boolean;
    languageTag: string;
}[] {
    let labels = item.labels.filter((name) => name.languageTag === currentLanguageTag && name.isDefault);
    if (labels.length === 0) {
      labels = item.labels.filter((name) => name.languageTag === currentTermStoreInfo.defaultLanguageTag && name.isDefault);
    }
    return labels;
  }

  function onRenderItem(itemProps: ITermItemProps): JSX.Element {
    const labels = getLabelsForCurrentLanguage(itemProps.item);
    let fullParentPrefixes: string[] = [ labels[0].name ];

    if(props.isPathRendered) {
      let currentTermProps = itemProps.item;
      while(currentTermProps.parent !== undefined) {
        const currentParentLabels = getLabelsForCurrentLanguage(currentTermProps.parent);
        fullParentPrefixes.push(currentParentLabels[0].name);
        currentTermProps = currentTermProps.parent;
      }
      fullParentPrefixes = fullParentPrefixes.reverse();
    }
    return labels.length > 0 ? (
      <TermItem languageTag={currentLanguageTag} termStoreInfo={currentTermStoreInfo} name={fullParentPrefixes.join(":")} {...itemProps}>{fullParentPrefixes.join(":")}</TermItem>
    ) : null;
  }

  function onTermPickerChange(itms?: ITermInfo[]): void {
    if (itms && props.isPathRendered) {
      addParentInformationToTerms(itms)
        .then((itmsWithPath) => {
          setSelectedOptions(itmsWithPath || []);
          setSelectedPanelOptions(itmsWithPath || []);
        })
        .catch(() => {
          //no-op;
        });
    }
    else {
      setSelectedOptions(itms || []);
      setSelectedPanelOptions(itms || []);
    }
  }

  function getTextFromItem(termInfo: ITermInfo): string {
    let labelsWithMatchingLanguageTag = termInfo.labels.filter((termLabel) => (termLabel.languageTag === currentLanguageTag));
    if (labelsWithMatchingLanguageTag.length === 0) {
      labelsWithMatchingLanguageTag = termInfo.labels.filter((termLabel) => (termLabel.languageTag === currentTermStoreInfo.defaultLanguageTag));
    }
    return labelsWithMatchingLanguageTag[0]?.name;
  }

  const calloutProps = { gapSpace: 0 };
  const tooltipId = useId('tooltip');
  const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
  const addTermButtonStyles: IButtonStyles = { rootHovered: { backgroundColor: 'inherit' }, rootPressed: { backgroundColor: 'inherit' } };
  const termPickerStyles: IStyleFunctionOrObject<IBasePickerStyleProps, IBasePickerStyles> = { input: { minheight: 34 }, text: { minheight: 34 } };

  return (
    <div className={styles.modernTaxonomyPicker}>
      {props.label && <Label required={props.required}>{props.label}</Label>}
      <div className={styles.termField}>
        <div className={styles.termFieldInput}>
          <ModernTermPicker
            {...props.termPickerProps}
            removeButtonAriaLabel={strings.ModernTaxonomyPickerRemoveButtonText}
            onResolveSuggestions={props.termPickerProps?.onResolveSuggestions ?? onResolveSuggestions}
            itemLimit={props.allowMultipleSelections ? undefined : 1}
            selectedItems={selectedOptions}
            disabled={props.disabled}
            styles={props.termPickerProps?.styles ?? termPickerStyles}
            onChange={onTermPickerChange}
            getTextFromItem={getTextFromItem}
            pickerSuggestionsProps={props.termPickerProps?.pickerSuggestionsProps ?? { noResultsFoundText: strings.ModernTaxonomyPickerNoResultsFound }}
            inputProps={props.termPickerProps?.inputProps ?? {
              'aria-label': props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder,
              placeholder: props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder
            }}
            onRenderSuggestionsItem={props.onRenderSuggestionsItem ?? onRenderSuggestionsItem}
            onRenderItem={props.onRenderItem ?? onRenderItem}
            themeVariant={props.themeVariant}
          />
        </div>
        <div className={styles.termFieldButton}>
          <TooltipHost
            content={strings.ModernTaxonomyPickerAddTagButtonTooltip}
            id={tooltipId}
            calloutProps={calloutProps}
            styles={hostStyles}
          >
            <IconButton disabled={props.disabled} styles={addTermButtonStyles} iconProps={{ iconName: 'Tag' } as IIconProps} onClick={onOpenPanel} aria-describedby={tooltipId} />
          </TooltipHost>
        </div>
      </div>

      <Panel
        isOpen={panelIsOpen}
        hasCloseButton={true}
        closeButtonAriaLabel={strings.ModernTaxonomyPickerPanelCloseButtonText}
        onDismiss={onClosePanel}
        isLightDismiss={props.isLightDismiss}
        isBlocking={props.isBlocking}
        type={props.customPanelWidth ? PanelType.custom : PanelType.medium}
        customWidth={props.customPanelWidth ? `${props.customPanelWidth}px` : undefined}
        headerText={props.panelTitle}
        onRenderFooterContent={() => {
          const horizontalGapStackTokens: IStackTokens = {
            childrenGap: 10,
          };
          return (
            <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
              <PrimaryButton text={strings.ModernTaxonomyPickerApplyButtonText} value='Apply' onClick={onApply} />
              <DefaultButton text={strings.ModernTaxonomyPickerCancelButtonText} value='Cancel' onClick={onClosePanel} />
            </Stack>
          );
        }}>

        {
          props.termSetId && (
            <div key={props.termSetId} >
              <TaxonomyPanelContents
                allowMultipleSelections={props.allowMultipleSelections}
                onResolveSuggestions={props.termPickerProps?.onResolveSuggestions ?? onResolveSuggestions}
                onLoadMoreData={taxonomyService.getTerms}
                anchorTermInfo={currentAnchorTermInfo}
                termSetInfo={currentTermSetInfo}
                termStoreInfo={currentTermStoreInfo}
                pageSize={50}
                selectedPanelOptions={selectedPanelOptions}
                setSelectedPanelOptions={setSelectedPanelOptions}
                placeHolder={props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder}
                onRenderSuggestionsItem={props.onRenderSuggestionsItem ?? onRenderSuggestionsItem}
                onRenderItem={props.onRenderItem ?? onRenderItem}
                getTextFromItem={getTextFromItem}
                languageTag={currentLanguageTag}
                themeVariant={props.themeVariant}
                termPickerProps={props.termPickerProps}
                onRenderActionButton={props.onRenderActionButton}
                allowSelectingChildren={props.allowSelectingChildren}
              />
            </div>
          )
        }
      </Panel>
    </div >
  );
}
