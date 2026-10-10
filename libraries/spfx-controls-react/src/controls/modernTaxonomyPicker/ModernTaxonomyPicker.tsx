import { BaseComponentContext, IReadonlyTheme } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import {
  ITermInfo,
  ITermSetInfo,
  ITermStoreInfo
} from '../../services/SPTaxonomyService.types';
import { useId } from '@uifabric/react-hooks';
import * as strings from 'ControlStrings';
import {
  DefaultButton, IButtonStyles, IconButton, PrimaryButton
} from '@fluentui/react/lib/Button';
import { IIconProps } from '@fluentui/react/lib/Icon';
import { MessageBar, MessageBarType } from '@fluentui/react/lib/MessageBar';
import { Label } from '@fluentui/react/lib/Label';
import {
  Panel,
  PanelType
} from '@fluentui/react/lib/Panel';
import {
  IBasePickerStyleProps,
  IBasePickerStyles,
  IPickerItemProps,
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
  webAbsoluteUrl?: string;
  initialValues?: Optional<ITermInfo, "childrenCount" | "createdDateTime" | "lastModifiedDateTime" | "descriptions" | "customSortOrder" | "properties" | "localProperties" | "isDeprecated" | "isAvailableForTagging" | "topicRequested">[];
  disabled?: boolean;
  required?: boolean;
  onChange?: (newValue?: ITermInfo[]) => void;
  onRenderItem?: (itemProps: IPickerItemProps<ITermInfo>) => JSX.Element;
  onRenderSuggestionsItem?: (term: ITermInfo, itemProps: ISuggestionItemProps<ITermInfo>) => JSX.Element;
  placeHolder?: string;
  customPanelWidth?: number;
  themeVariant?: IReadonlyTheme;
  termPickerProps?: Optional<IModernTermPickerProps, 'onResolveSuggestions'>;
  isLightDismiss?: boolean;
  isBlocking?: boolean;
  onRenderActionButton?: (
    termStoreInfo: ITermStoreInfo,
    termSetInfo: ITermSetInfo,
    termInfo?: ITermInfo,
    updateTree?: (newTerms?: ITermInfo[], parents?: ITermInfo[], updatedTerms?: ITermInfo[], deletedTerms?: ITermInfo[]) => void
  ) => JSX.Element;
  allowSelectingChildren?: boolean;
}

export function ModernTaxonomyPicker(props: IModernTaxonomyPickerProps): JSX.Element {
  const taxonomyService = useMemo(()=>new SPTaxonomyService(props.context, props.webAbsoluteUrl), [props.context, props.webAbsoluteUrl, props.termSetId, props.anchorTermId]);
  const [panelIsOpen, setPanelIsOpen] = React.useState(false);
  const initialLoadComplete = React.useRef(false);
  const [selectedOptions, setSelectedOptions] = React.useState<ITermInfo[]>([]);
  const [selectedPanelOptions, setSelectedPanelOptions] = React.useState<ITermInfo[]>([]);
  const [currentTermStoreInfo, setCurrentTermStoreInfo] = React.useState<ITermStoreInfo>();
  const [currentTermSetInfo, setCurrentTermSetInfo] = React.useState<ITermSetInfo>();
  const [currentAnchorTermInfo, setCurrentAnchorTermInfo] = React.useState<ITermInfo>();
  const [currentLanguageTag, setCurrentLanguageTag] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>();
  const [loadedService, setLoadedService] = React.useState<SPTaxonomyService>();
  const requestVersion = React.useRef(0);

  function reportError(error: unknown): void {
    console.error('[ModernTaxonomyPicker]', error);
    setErrorMessage(error instanceof Error ? error.message : String(error));
  }

  React.useEffect(() => {
    const version = ++requestVersion.current;
    initialLoadComplete.current = false;
    setErrorMessage(undefined);
    setSelectedOptions([]);
    setSelectedPanelOptions([]);
    Promise.all([
      taxonomyService.getTermStoreInfo(),
      taxonomyService.getTermSetInfo(Guid.parse(props.termSetId)),
      props.anchorTermId && props.anchorTermId !== Guid.empty.toString()
        ? taxonomyService.getTermById(Guid.parse(props.termSetId), Guid.parse(props.anchorTermId))
        : Promise.resolve(undefined)
    ])
      .then(([termStoreInfo, termSetInfo, anchorTermInfo]) => {
        if (version !== requestVersion.current) return;
        setCurrentTermStoreInfo(termStoreInfo);
        setCurrentTermSetInfo(termSetInfo);
        setCurrentAnchorTermInfo(anchorTermInfo);
        const languageTag = props.context.pageContext.cultureInfo.currentUICultureName !== '' && termStoreInfo.languageTags.includes(props.context.pageContext.cultureInfo.currentUICultureName) ?
          props.context.pageContext.cultureInfo.currentUICultureName :
          termStoreInfo.defaultLanguageTag;
        setCurrentLanguageTag(languageTag);
        const initialTerms = Array.isArray(props.initialValues) ?
          props.initialValues.map(term => { return { ...term, languageTag: languageTag, termStoreInfo: termStoreInfo } as ITermInfo; }) :
          [];
        setSelectedOptions(initialTerms);
        setSelectedPanelOptions(initialTerms);
        setLoadedService(taxonomyService);
        initialLoadComplete.current = true;
      })
      .catch(error => {
        if (version === requestVersion.current) reportError(error);
      });
    return () => { requestVersion.current++; taxonomyService.dispose(); };
  }, [taxonomyService, props.termSetId, props.anchorTermId]);

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
    const version = requestVersion.current;
    if (props.isPathRendered) {
      addParentInformationToTerms([...selectedPanelOptions])
        .then((selectedTermsWithPath) => {
          if (version !== requestVersion.current) return;
          setSelectedOptions(selectedTermsWithPath);
        })
        .catch(error => { if (version === requestVersion.current) reportError(error); });
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

  let searchFilter: string = null;

  async function onResolveSuggestions(filter: string, selectedItems?: ITermInfo[]): Promise<ITermInfo[]> {

    searchFilter = filter;
    if (filter === '') {
      return [];
    }
    const version = requestVersion.current;
    let filteredTerms: ITermInfo[];
    try {
      filteredTerms = await taxonomyService.searchTerm(Guid.parse(props.termSetId), filter, currentLanguageTag, props.anchorTermId ? Guid.parse(props.anchorTermId) : Guid.empty, props.allowSelectingChildren);
    } catch (error) {
      if (version === requestVersion.current) reportError(error);
      return [];
    }
    if (version !== requestVersion.current) return [];

    const filteredTermsWithoutSelectedItems = filteredTerms.filter((term) => {
      if (!selectedItems || selectedItems.length === 0) {
        return true;
      }
      return selectedItems.every((item) => item.id !== term.id);
    });

    const filteredTermsAndAvailable = filteredTermsWithoutSelectedItems
      .filter((term) =>
        term.isAvailableForTagging?.some((t) => t.setId === props.termSetId && t.isAvailable));
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
        searchFilter={searchFilter}
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

  function onRenderItem(itemProps: IPickerItemProps<ITermInfo>): JSX.Element {
    const termItemProps = itemProps as ITermItemProps;
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
      <TermItem languageTag={currentLanguageTag} termStoreInfo={currentTermStoreInfo} name={fullParentPrefixes.join(":")} {...termItemProps}>{fullParentPrefixes.join(":")}</TermItem>
    ) : null;
  }

  function onTermPickerChange(itms?: ITermInfo[]): void {
    const version = requestVersion.current;
    if (itms && props.isPathRendered) {
      addParentInformationToTerms(itms)
        .then((itmsWithPath) => {
          if (version !== requestVersion.current) return;
          setSelectedOptions(itmsWithPath || []);
          setSelectedPanelOptions(itmsWithPath || []);
        })
        .catch(error => { if (version === requestVersion.current) reportError(error); });
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
      {errorMessage && <MessageBar messageBarType={MessageBarType.error}>{errorMessage}</MessageBar>}
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
          loadedService === taxonomyService && props.termSetId && currentTermSetInfo && currentTermStoreInfo && (
            <div key={requestVersion.current} >
              <TaxonomyPanelContents
                allowMultipleSelections={props.allowMultipleSelections}
                onResolveSuggestions={props.termPickerProps?.onResolveSuggestions ?? onResolveSuggestions}
                onLoadMoreData={async (...args) => {
                  const version = requestVersion.current;
                  try {
                    return await taxonomyService.getTerms(...args);
                  } catch (error) {
                    if (version === requestVersion.current) reportError(error);
                    throw error;
                  }
                }}
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
