import * as React from 'react';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import { Guid } from '@microsoft/sp-core-library';
import { IIconProps } from 'office-ui-fabric-react/lib/components/Icon';
import { PrimaryButton, DefaultButton, IconButton, IButtonStyles } from 'office-ui-fabric-react/lib/Button';
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
import { TooltipHost } from '@microsoft/office-ui-fabric-react-bundle';
import { useId } from '@uifabric/react-hooks';
import { ITooltipHostStyles } from 'office-ui-fabric-react';
export interface IModernTaxonomyPickerProps {
  allowMultipleSelections: boolean;
  termSetId: string;
  anchorTermId?: string;
  panelTitle: string;
  label: string;
  context: BaseComponentContext;
  initialValues?: ITag[];
  disabled?: boolean;
  required?: boolean;
  onChange?: (newValue?: ITag[]) => void;
  placeHolder?: string;
}

export function ModernTaxonomyPicker(props: IModernTaxonomyPickerProps) {
  const [termsService] = React.useState(() => new SPTaxonomyService(props.context));
  const [panelIsOpen, setPanelIsOpen] = React.useState(false);
  const [selectedOptions, setSelectedOptions] = React.useState<ITag[]>(Object.prototype.toString.call(props.initialValues) === '[object Array]' ? props.initialValues : []);
  const [selectedPanelOptions, setSelectedPanelOptions] = React.useState<ITag[]>([]);

  React.useEffect(() => {
    sp.setup(props.context);
  }, []);

  // React.useEffect(() => {
  //   if(Object.prototype.toString.call(props.initialValues) === '[object Array]' ) {
  //     setSelectedOptions(props.initialValues);
  //   }
  //   else {
  //     setSelectedOptions([]);
  //   }
  // }, []);

  React.useEffect(() => {
    if (props.onChange) {
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

  const calloutProps = { gapSpace: 0 };
  const tooltipId = useId('tooltip');
  const hostStyles: Partial<ITooltipHostStyles> = { root: { display: 'inline-block' } };
  const addTermButtonStyles: IButtonStyles = {rootHovered: {backgroundColor: "inherit"}, rootPressed: {backgroundColor: "inherit"}};

  return (
    <div className={styles.modernTaxonomyPicker}>
      {props.label && <Label required={props.required}>{props.label}</Label>}
      <div className={styles.termField}>
        <div className={styles.termFieldInput}>
          <TagPicker
            removeButtonAriaLabel={strings.ModernTaxonomyPickerRemoveButtonText}
            onResolveSuggestions={onResolveSuggestions}
            itemLimit={props.allowMultipleSelections ? undefined : 1}
            selectedItems={selectedOptions}
            disabled={props.disabled}
            onChange={(itms?: ITag[]) => {
              setSelectedOptions(itms || []);
              setSelectedPanelOptions(itms || []);
            }}
            getTextFromItem={(tag: ITag) => tag.name}
            inputProps={{
              'aria-label': props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder,
              placeholder: props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder
            }}
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
        isLightDismiss={true}
        type={PanelType.medium}
        headerText={props.panelTitle}
        onRenderFooterContent={() => {
          const horizontalGapStackTokens: IStackTokens = {
            childrenGap: 10,
          };
          return (
            <Stack horizontal disableShrink tokens={horizontalGapStackTokens}>
              <PrimaryButton text={strings.ModernTaxonomyPickerApplyButtonText} value="Apply" onClick={onApply} />
              <DefaultButton text={strings.ModernTaxonomyPickerCancelButtonText} value="Cancel" onClick={onClosePanel} />
            </Stack>
          );
        }}>

        {
          props.termSetId && (
            <div key={props.termSetId} >
              <TaxonomyForm
                allowMultipleSelections={props.allowMultipleSelections}
                onResolveSuggestions={onResolveSuggestions}
                onLoadMoreData={termsService.getTerms}
                getTermSetInfo={termsService.getTermSetInfo}
                context={props.context}
                termSetId={Guid.parse(props.termSetId)}
                pageSize={50}
                selectedPanelOptions={selectedPanelOptions}
                setSelectedPanelOptions={setSelectedPanelOptions}
                placeHolder={props.placeHolder || strings.ModernTaxonomyPickerDefaultPlaceHolder}
              />
            </div>
          )
        }
      </Panel>
    </div >
  );
}
