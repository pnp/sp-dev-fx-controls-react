import * as React from 'react';
import { BasePicker, IBasePickerProps, IInputProps, IPickerItemProps } from '@fluentui/react/lib/Pickers';
import { IPickerTerm, IPickerTerms } from './ITermPicker';
import SPTermStorePickerService from './../../services/SPTermStorePickerService';
import styles from './TaxonomyPicker.module.scss';
import { ITaxonomyPickerProps } from './ITaxonomyPicker';
import { BaseComponentContext } from '@microsoft/sp-component-base';
import * as strings from 'ControlStrings';
import { Icon } from '@fluentui/react/lib/Icon';
import { ITermSet } from "../../services/ISPTermStorePickerService";
import { Autofill } from '@fluentui/react/lib/components/Autofill/Autofill';
import { LegacyRef, KeyboardEvent } from 'react';

export class TermBasePicker extends BasePicker<IPickerTerm, IBasePickerProps<IPickerTerm>>
{

}

export interface ITermPickerState {
  terms: IPickerTerms;
  elRef?: LegacyRef<TermBasePicker> & LegacyRef<any>; // eslint-disable-line @typescript-eslint/no-explicit-any
}

export interface ITermPickerProps {
  termPickerHostProps: ITaxonomyPickerProps;
  context: BaseComponentContext;
  disabled: boolean;
  value: IPickerTerms;
  allowMultipleSelections : boolean;
  isTermSetSelectable?: boolean;
  disabledTermIds?: string[];
  disableChildrenOfDisabledParents?: boolean;
  placeholder?: string;

  /** Called when text is in the input field and the enter key is pressed.  */
  onNewTerm?: (newLabel: string) => void;
  onChanged: (items: IPickerTerm[]) => void;
  onInputChange: (input: string) => string;
  onBlur: (ev: React.FocusEvent<HTMLElement | Autofill>) => void;
}

export default class TermPicker extends React.Component<ITermPickerProps, ITermPickerState> {
  private allTerms: ITermSet = null;
  private termsService: SPTermStorePickerService;
  /**
   * Constructor method
   */
  constructor(props: ITermPickerProps) {
    super(props);
    this.onRenderItem = this.onRenderItem.bind(this);
    this.onRenderSuggestionsItem = this.onRenderSuggestionsItem.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onGetTextFromItem = this.onGetTextFromItem.bind(this);

    this.state = {
      terms: this.props.value
    };
    this.termsService = new SPTermStorePickerService(this.props.termPickerHostProps, this.props.context);
  }

  /**
   * componentWillReceiveProps method
   */
  public UNSAFE_componentWillReceiveProps(nextProps: ITermPickerProps): void {
    // check to see if props is different to avoid re-rendering
    const newKeys = nextProps.value.map(a => a.key);
    const currentKeys = this.state.terms.map(a => a.key);
    if (newKeys.sort().join(',') !== currentKeys.sort().join(',')) {
      this.setState({ terms: nextProps.value });
    }
  }

  /**
   * Renders the item in the picker
   */
  protected onRenderItem(term: IPickerItemProps<IPickerTerm>): JSX.Element {
    return (
      <div className={styles.pickedTermRoot}
           key={term.index}
           data-selection-index={term.index}
           data-is-focusable={!term.disabled && true}>
        <span className={styles.pickedTermText}>{term.item.name}</span>
        {
          !term.disabled && (
            <span className={styles.pickedTermCloseIcon}
              onClick={term.onRemoveItem}>
              <Icon iconName="Cancel" />
            </span>
          )
        }
      </div>
    );
  }

  /**
   * Renders the suggestions in the picker
   */
  protected onRenderSuggestionsItem(term: IPickerTerm): JSX.Element {
    let termParent = term.termSetName;
    let termTitle = `${term.name} [${term.termSetName}]`;
    if (term.path.indexOf(";") !== -1) {
      const splitPath = term.path.split(";");
      termParent = splitPath[splitPath.length - 2];
      splitPath.pop();
      termTitle = `${term.name} [${term.termSetName}:${splitPath.join(':')}]`;
    }
    return (
      <div className={styles.termSuggestion} title={termTitle}>
        <div>{term.name}</div>
        <div className={styles.termSuggestionSubTitle}> {strings.TaxonomyPickerInLabel} {termParent ? termParent : strings.TaxonomyPickerTermSetLabel}</div>
      </div>
    );
  }

  /**
   * When Filter Changes a new search for suggestions
   */
  private async onFilterChanged(filterText: string, tagList: IPickerTerm[]): Promise<IPickerTerm[]> {
    if (filterText !== "") {
      const {
        termPickerHostProps,
        isTermSetSelectable
      } = this.props;

      const terms: IPickerTerm[] = await this.termsService.searchTermsByName(filterText);
      // Check if the termset can be selected
      if (isTermSetSelectable && !termPickerHostProps.anchorId) {
        // Retrieve the current termset
        const termSet = await this.termsService.getTermSet();
        // Check if termset was retrieved and if it contains the filter value
        if (termSet && termSet.Name.toLowerCase().indexOf(filterText.toLowerCase()) === 0) {
          // Add the termset to the suggestion list
          terms.push({
            key: this.termsService.cleanGuid(termSet.Id),
            name: termSet.Name,
            path: "",
            termSet: this.termsService.cleanGuid(termSet.Id)
          });
        }
      }
      // Filter out the terms which are already set
      const filteredTerms: IPickerTerm[] = [];
      const { disabledTermIds, disableChildrenOfDisabledParents } = this.props;
      for (const term of terms) {
        let canBePicked = true;

        // Check if term is not disabled
        if (disabledTermIds && disabledTermIds.length > 0) {
          // Check if current term need to be disabled
          if (disabledTermIds.indexOf(term.key) !== -1) {
            canBePicked = false;
          } else {
            // Check if child terms need to be disabled
            if (disableChildrenOfDisabledParents) {
              // Check if terms were already retrieved
              if (!this.allTerms) {
                this.allTerms = await this.termsService.getAllTerms(this.props.termPickerHostProps.termsetNameOrID,
                  this.props.termPickerHostProps.hideDeprecatedTags,
                  this.props.termPickerHostProps.hideTagsNotAvailableForTagging);
              }

              // Check if there are terms retrieved
              if (this.allTerms.Terms && this.allTerms.Terms.length > 0) {
                // Find the disabled parents
                const disabledParents = this.allTerms.Terms.filter(t => disabledTermIds.indexOf(t.Id) !== -1);
                // Check if disabled parents were found
                if (disabledParents && disabledParents.length > 0) {
                  // Check if the current term lives underneath a disabled parent
                  const findTerm = disabledParents.filter(pt => term.path.indexOf(pt.PathOfTerm) !== -1);
                  if (findTerm && findTerm.length > 0) {
                    canBePicked = false;
                  }
                }
              }
            }
          }
        }

        if (canBePicked) {
          // Only retrieve the terms which are not yet tagged
          if (tagList.filter(tag => tag.key === term.key).length === 0) {
            filteredTerms.push(term);
          }
        }
      }
      return filteredTerms;
    } else {
      return Promise.resolve([]);
    }
  }

  /**
   * gets the text from an item
   */
  private onGetTextFromItem(item: any): any { // eslint-disable-line @typescript-eslint/no-explicit-any
    return item.name;
  }

  /**
   * Render method
   */
  public render(): JSX.Element {
    const {
      disabled,
      value,
      onChanged,
      onInputChange,
      onBlur,
      onNewTerm,
      allowMultipleSelections,
      placeholder
    } = this.props;

    const {
      terms
    } = this.state;

    const clearDisplayValue = (): void => {
      const picker = this.state.elRef as unknown as TermBasePicker;
      const autoFill = picker?.['input']?.current as Autofill; // eslint-disable-line dot-notation
      if (autoFill) {
        autoFill['_value'] = ''; // eslint-disable-line dot-notation
        autoFill.setState({ inputValue: '' });
      } else {
        throw new Error(`TermPicker.TermBasePicker.render.clearDisplayValue no autoFill to reset displayValue`);
      }
  };

    const inputProps: IInputProps = { placeholder: placeholder };

    if(onNewTerm) {
      inputProps.onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e && e.key === 'Enter' && (! (e.ctrlKey || e.altKey || e.shiftKey)) && e.target?.['value'] ) { // eslint-disable-line dot-notation
          onNewTerm(e.target['value']); // eslint-disable-line dot-notation
          clearDisplayValue();
        }
      };
    }

    return (
      <div>
        <TermBasePicker
          ref={(elRef) => {
            if (!this.state.elRef) {
              this.setState({ elRef });
            }
          }}
          disabled={disabled}
          onResolveSuggestions={this.onFilterChanged}
          onRenderSuggestionsItem={this.onRenderSuggestionsItem}
          getTextFromItem={this.onGetTextFromItem}
          onRenderItem={this.onRenderItem}
          defaultSelectedItems={value}
          selectedItems={terms}
          onChange={onChanged}
          onInputChange={onInputChange}
          onBlur={onBlur}
          itemLimit={!allowMultipleSelections ? 1 : undefined}
          className={styles.termBasePicker}
          inputProps={inputProps}
        />
      </div>
    );

  }
}
