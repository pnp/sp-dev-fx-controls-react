import * as React from 'react';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import { IIconProps } from 'office-ui-fabric-react/lib/components/Icon';
import { PrimaryButton, DefaultButton, IconButton } from 'office-ui-fabric-react/lib/Button';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { ITag, TagPicker } from 'office-ui-fabric-react/lib/Pickers';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { IStackTokens, Stack } from 'office-ui-fabric-react/lib/Stack';
import { sp } from '@pnp/sp';
import { ITermInfo } from '@pnp/sp/taxonomy';
import { SPTaxonomyService } from '../../services/SPTaxonomyService';
import FieldErrorMessage from '../errorMessage/ErrorMessage';
import { TaxonomyForm } from './taxonomyForm';
import styles from './ModernTaxonomyPicker.module.scss';
import * as strings from 'ControlStrings';

// TODO: remove/replace interface IPickerTerm
export interface IPickerTerm {
  name: string;
  key: string;
  path: string;
  termSet: string;
  termSetName?: string;
}

// TODO: remove/replace interface IPickerTerms
export interface IPickerTerms extends Array<IPickerTerm> { }

export interface IModernTaxonomyPickerProps {
  allowMultipleSelections: boolean;
  termSetId: string;
  anchorTermId?: string;
  panelTitle: string;
  label: string;
  context: BaseComponentContext;
  initialValues?: ITag[];
  errorMessage?: string; // TODO: is this needed?
  disabled?: boolean;
  required?: boolean;
}

export function ModernTaxonomyPicker(props: IModernTaxonomyPickerProps) {
  const [termsService] = React.useState(() => new SPTaxonomyService(props.context));
  const [terms, setTerms] = React.useState<ITermInfo[]>([]);
  const [errorMessage, setErrorMessage] = React.useState(props.errorMessage);
  const [internalErrorMessage, setInternalErrorMessage] = React.useState<string>();
  const [panelIsOpen, setPanelIsOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false); // was called loaded
  const [selectedOptions, setSelectedOptions] = React.useState<ITag[]>([]);
  const [selectedPanelOptions, setSelectedPanelOptions] = React.useState<ITag[]>([]);

  const invalidTerm = React.useRef<string>(null);

  React.useEffect(() => {
    sp.setup(props.context);
  }, []);

  React.useEffect(() => {
    setSelectedOptions(props.initialValues || []);
  }, [props.initialValues]);

  React.useEffect(() => {
    setErrorMessage(props.errorMessage);
  }, [props.errorMessage]);

  async function onOpenPanel(): Promise<void> {
    if (props.disabled === true) {
      return;
    }
    setLoading(true);
    const siteUrl = props.context.pageContext.site.absoluteUrl;
    const newTerms = await termsService.getTerms(Guid.parse(props.termSetId), Guid.empty, '', true, 50);
    setTerms(newTerms.value);
    setLoading(false);
    setPanelIsOpen(true);
  }

  function onClosePanel(): void {
    setLoading(false);
    setPanelIsOpen(false);
  }

  function onSave(): void {
    setSelectedOptions([...selectedPanelOptions]);
    onClosePanel();
  }

  async function onResolveSuggestions(filter: string, selectedItems?: ITag[]): Promise<ITag[]> {
    const languageTag = props.context.pageContext.cultureInfo.currentUICultureName !== '' ? props.context.pageContext.cultureInfo.currentUICultureName : props.context.pageContext.web.languageName;
    if (filter === '') {
      return [];
    }
    const filteredTerms = await termsService.searchTerm(Guid.parse(props.termSetId), filter, languageTag, props.anchorTermId ? Guid.parse(props.anchorTermId) : undefined);
    const filteredTermsWithoutSelectedItems = filteredTerms.filter((term) => {
      if (!selectedItems || selectedItems.length === 0) {
        return true;
      }
      for (const selectedItem of selectedItems) {
        return selectedItem.key !== term.id;
      }
    });
    const filteredTermsAndAvailable = filteredTermsWithoutSelectedItems.filter((term) => term.isAvailableForTagging.filter((t) => t.setId === props.termSetId)[0].isAvailable);
    const filteredTags = filteredTermsAndAvailable.map((term) => {
      const key = term.id;
      const name = term.labels.filter((termLabel) => (languageTag === '' || termLabel.languageTag === languageTag) &&
        termLabel.name.toLowerCase().indexOf(filter.toLowerCase()) === 0)[0]?.name;
      return { key: key, name: name };
    });
    return filteredTags;
  }

  const { label, disabled, allowMultipleSelections, panelTitle, required } = props;
  return (
    <div className={styles.modernTaxonomyPicker}>
      {label && <Label required={required}>{label}</Label>}
      <div className={styles.termField}>
        <div className={styles.termFieldInput}>
          <TagPicker
            removeButtonAriaLabel="Remove"
            onResolveSuggestions={onResolveSuggestions}
            itemLimit={allowMultipleSelections ? undefined : 1}
            selectedItems={selectedOptions}
            onChange={(itms?: ITag[]) => {
              setSelectedOptions(itms || []);
              setSelectedPanelOptions(itms || []);
            }}
            getTextFromItem={(tag: ITag, currentValue?: string) => tag.name}
            inputProps={{
              'aria-label': 'Tag Picker',
              placeholder: 'Ange en term som du vill tagga'
            }}
          />
        </div>
        <div className={styles.termFieldButton}>
          <IconButton disabled={disabled} iconProps={{ iconName: 'Tag' } as IIconProps} onClick={onOpenPanel} />
        </div>
      </div>

      <FieldErrorMessage errorMessage={errorMessage || internalErrorMessage} />

      <Panel
        isOpen={panelIsOpen}
        hasCloseButton={true}
        onDismiss={onClosePanel}
        isLightDismiss={true}
        type={PanelType.medium}
        headerText={panelTitle}
        onRenderFooterContent={() => {
          const horizontalGapStackTokens: IStackTokens = {
            childrenGap: 10,
          };
          return (
            <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
              <PrimaryButton text={strings.SaveButtonLabel} value="Save" onClick={onSave} />
              <DefaultButton text={strings.CancelButtonLabel} value="Cancel" onClick={onClosePanel} />
            </Stack>
          );
        }}>

        {
          /* Show spinner in the panel while retrieving terms */
          loading === true ? <Spinner size={SpinnerSize.medium} /> : ''
        }
        {
          loading === false && props.termSetId && (
            <div key={props.termSetId} >
              <TaxonomyForm
                allowMultipleSelections={allowMultipleSelections}
                terms={terms}
                onResolveSuggestions={onResolveSuggestions}
                onLoadMoreData={termsService.getTerms}
                getTermSetInfo={termsService.getTermSetInfo}
                context={props.context}
                termSetId={Guid.parse(props.termSetId)}
                pageSize={50}
                selectedPanelOptions={selectedPanelOptions}
                setSelectedPanelOptions={setSelectedPanelOptions}
              />
            </div>
          )
        }
      </Panel>
    </div >
  );
}
