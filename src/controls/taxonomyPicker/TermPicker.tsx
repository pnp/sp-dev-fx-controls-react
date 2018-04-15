import * as React from 'react';
import { BasePicker, IBasePickerProps, IPickerItemProps } from 'office-ui-fabric-react/lib/Pickers';
import { IPickerTerm, IPickerTerms } from './ITermPicker';
import SPTermStorePickerService from './../../services/SPTermStorePickerService';
import styles from './TaxonomyPicker.Module.scss';
import { ITaxonomyPickerProps } from './ITaxonomyPicker';
import { IWebPartContext } from '@microsoft/sp-webpart-base';

export class TermBasePicker extends BasePicker<IPickerTerm, IBasePickerProps<IPickerTerm>>
{

}

export interface ITermPickerState {
  terms: IPickerTerms;
}

export interface ITermPickerProps {
  termPickerHostProps: ITaxonomyPickerProps;
  context: IWebPartContext;
  disabled: boolean;
  value: IPickerTerms;
  onChanged: (items: IPickerTerm[]) => void;
  allowMultipleSelections : boolean;
}

export default class TermPicker extends React.Component<ITermPickerProps, ITermPickerState> {

  /**
   * Constructor method
   */
  constructor(props: any) {
    super(props);
    this.onRenderItem = this.onRenderItem.bind(this);
    this.onRenderSuggestionsItem = this.onRenderSuggestionsItem.bind(this);
    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.onGetTextFromItem = this.onGetTextFromItem.bind(this);

    this.state = {
      terms: this.props.value
    };

  }

  /**
   * componentWillReceiveProps method
   */
  public componentWillReceiveProps(nextProps: ITermPickerProps) {
    // check to see if props is different to avoid re-rendering
    let newKeys = nextProps.value.map(a => a.key);
    let currentKeys = this.state.terms.map(a => a.key);
    if (newKeys.sort().join(',') !== currentKeys.sort().join(',')) {
      this.setState({ terms: nextProps.value });
    }
  }

  /**
   * Renders the item in the picker
   */
  protected onRenderItem(term: IPickerItemProps<IPickerTerm>) {
    return (<div className={styles.pickedTermRoot}
      key={term.index}
      data-selection-index={term.index}
      data-is-focusable={!term.disabled && true}>
      <span className={styles.pickedTermText}>{term.item.name}</span>
      {!term.disabled &&
        <span className={styles.pickedTermCloseIcon}
          onClick={term.onRemoveItem}>
          <i className="ms-Icon ms-Icon--Cancel" aria-hidden="true"></i>
        </span>
      }
    </div>);
  }

  /**
   * Renders the suggestions in the picker
   */
  protected onRenderSuggestionsItem(term: IPickerTerm, props) {
    let termParent = term.termSetName;
    let termTitle = `${term.name} [${term.termSetName}]`;
    if (term.path.indexOf(";") !== -1) {
      let splitPath = term.path.split(";");
      termParent = splitPath[splitPath.length - 2];
      splitPath.pop();
      termTitle = `${term.name} [${term.termSetName}:${splitPath.join(':')}]`;
    }
    return (<div className={styles.termSuggestion} title={termTitle}>
      <div>{term.name}</div>
      <div className={styles.termSuggestionSubTitle}> in {termParent}</div>
    </div>);
  }

  /**
   * When Filter Changes a new search for suggestions
   */
  private onFilterChanged(filterText: string, tagList: IPickerTerm[]): Promise<IPickerTerm[]> {
    
    if (filterText !== "") {
      let termsService = new SPTermStorePickerService(this.props.termPickerHostProps, this.props.context);
      let terms = termsService.searchTermsByName(filterText);
      return terms;
    }
    
  }


  /**
   * gets the text from an item
   */
  private onGetTextFromItem(item: any): any {
    return item.name;
  }

    /**
   * Render method
   */
  public render(): JSX.Element {

    // set to 1 if mutiple selections is false
    let itemLimit;
    if (!this.props.allowMultipleSelections)
    {
      itemLimit = 1;
    }

    return (
      <div>
        <TermBasePicker
          disabled={this.props.disabled}
          onResolveSuggestions={this.onFilterChanged}
          onRenderSuggestionsItem={this.onRenderSuggestionsItem}
          getTextFromItem={this.onGetTextFromItem}
          onRenderItem={this.onRenderItem}
          defaultSelectedItems={this.props.value}
          selectedItems={this.state.terms}
          onChange={this.props.onChanged}
          itemLimit={itemLimit}
          className={styles.termBasePicker}
        />
      </div>
    );

  }
}
