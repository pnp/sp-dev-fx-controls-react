import * as strings from 'ControlStrings';
import * as React from "react";
import SPservice from "../../services/SPService";
import { ITag, TagPicker } from '@fluentui/react/lib/Pickers';
import { Label } from "@fluentui/react/lib/Label";
import { getId } from '@fluentui/react/lib/Utilities';
import { IListItemPickerProps } from "./IListItemPickerProps";
import { IListItemPickerState } from "./IListItemPickerState";
import * as telemetry from '../../common/telemetry';
import isEqual from 'lodash/isEqual';
import { SPHelper } from '../../common/utilities/SPHelper';
import { Guid } from "@microsoft/sp-core-library"

export class ListItemPicker extends React.Component<IListItemPickerProps, IListItemPickerState> {
  private _spservice: SPservice;
  private _tagPickerId = getId('tagPicker');

  constructor(props: IListItemPickerProps) {
    super(props);

    telemetry.track('ListItemPicker', {});

    // States
    this.state = {
      noresultsFoundText: !this.props.noResultsFoundText ? strings.genericNoResultsFoundText : this.props.noResultsFoundText,
      showError: false,
      errorMessage: "",
      suggestionsHeaderText: !this.props.suggestionsHeaderText ? strings.ListItemPickerSelectValue : this.props.suggestionsHeaderText,
      selectedItems: props.defaultSelectedItems || [],
      safeListId: props.listId,
    };

    // Get SPService Factory
    this._spservice = new SPservice(this.props.context);
  }

  private ensureLoadField(): void {
    this.loadField(this.props).then(() => { /* no-op; */ }).catch(() => { /* no-op; */ });
  }

  public componentDidMount(): void {
    // Ensure list ID if a list name is passed in listId parameter
    if(!Guid.tryParse(this.props.listId)) {
      this._spservice.getListId(this.props.listId)
        .then((value) => {
            this.setState({...this.state,
              safeListId: value });
            this.ensureLoadField();
        })
        .catch(() => { /* no-op; */ });
    } else {
      this.ensureLoadField();
    }
  }

  public UNSAFE_componentWillReceiveProps(nextProps: IListItemPickerProps): void {
    let newSelectedItems: any[] | undefined; // eslint-disable-line @typescript-eslint/no-explicit-any
    if (this.props.listId !== nextProps.listId) {
      newSelectedItems = [];
    }
    if (!isEqual(this.props.defaultSelectedItems, nextProps.defaultSelectedItems)) {
      newSelectedItems = nextProps.defaultSelectedItems;
    }

    this.setState({
      selectedItems: newSelectedItems
    });

    if (this.props.listId !== nextProps.listId
      || this.props.columnInternalName !== nextProps.columnInternalName
      || this.props.webUrl !== nextProps.webUrl) {
        this.ensureLoadField();
      }
  }

  /**
   * Render the field
   */
  public render(): React.ReactElement<IListItemPickerProps> {
    const { className, disabled, itemLimit, placeholder } = this.props;
    const {
      suggestionsHeaderText,
      noresultsFoundText,
      errorMessage,
      selectedItems
    } = this.state;

    return (
      <div>
        {!!this.props.label &&
          <Label htmlFor={this._tagPickerId} >{this.props.label}</Label>
        }
        <div id={this._tagPickerId}>
          <TagPicker onResolveSuggestions={this.onFilterChanged}
          styles={this.props.styles}
            onEmptyResolveSuggestions={(selectLists) => {
              if (this.props.enableDefaultSuggestions) {
                return this.onFilterChanged("", selectLists);
              }
            }}
            //   getTextFromItem={(item: any) => { return item.name; }}
            getTextFromItem={this.getTextFromItem}
            pickerSuggestionsProps={{
              suggestionsHeaderText: suggestionsHeaderText,
              noResultsFoundText: noresultsFoundText
            }}
            selectedItems={selectedItems}
            onChange={this.onItemChanged}
            className={className}
            itemLimit={itemLimit}
            disabled={disabled}
            inputProps={{
              placeholder: placeholder
            }} />
        </div>
        {!!errorMessage &&
          (<Label style={{ color: '#FF0000' }}> {errorMessage} </Label>)}
      </div>
    );
  }

  /**
   * Get text from Item
   */
  private getTextFromItem(item: any): string { // eslint-disable-line @typescript-eslint/no-explicit-any
    return item.name;
  }

  /**
   * On Selected Item
   */
  private onItemChanged = (selectedItems: { key: string; name: string }[]): void => {
    this.setState({
      selectedItems: selectedItems
    });
    this.props.onSelectedItem(selectedItems);
  }

  /**
   * Filter Change
   */
  private onFilterChanged = async (filterText: string, tagList: ITag[]): Promise<ITag[]> => {
    let resolvedSugestions: ITag[] = await this.loadListItems(filterText);

    const {
      selectedItems
    } = this.state;

    // Filter out the already retrieved items, so that they cannot be selected again
    if (selectedItems && selectedItems.length > 0) {
      const filteredSuggestions = [];
      for (const suggestion of resolvedSugestions) {
        const exists = selectedItems.filter(sItem => sItem.key === suggestion.key);
        if (!exists || exists.length === 0) {
          filteredSuggestions.push(suggestion);
        }
      }
      resolvedSugestions = filteredSuggestions;
    }

    if (resolvedSugestions) {
      this.setState({
        errorMessage: "",
        showError: false
      });

      return resolvedSugestions;
    } else {
      return [];
    }
  }

  /**
   * Function to load List Items
   */
  private loadListItems = async (filterText: string): Promise<{ key: string; name: string }[]> => {
    const { columnInternalName, keyColumnInternalName, webUrl, filter, orderBy, substringSearch, itemsQueryCountLimit } = this.props;
    const {
      field, safeListId
    } = this.state;
    const arrayItems: { key: string; name: string }[] = [];
    const keyColumn: string = keyColumnInternalName || 'Id';

    try {
      const listItems = await this._spservice.getListItems(filterText, safeListId, columnInternalName, field, keyColumn, webUrl, filter, substringSearch, orderBy ? orderBy : '', itemsQueryCountLimit); // JJ - 20200613 - find by substring as an option
      // Check if the list had items
      if (listItems.length > 0) {
        for (const item of listItems) {
          arrayItems.push({ key: item[keyColumn], name: SPHelper.isTextFieldType(field.TypeAsString === 'Calculated' ? field.ResultType : field.TypeAsString) ? item[columnInternalName] : item.FieldValuesAsText[columnInternalName] });
        }
      }
      return arrayItems;
    } catch (error) {
      console.log(`Error get Items`, error);
      this.setState({
        showError: true,
        errorMessage: error.message,
        noresultsFoundText: error.message
      });
      return null;
    }
  }

  private loadField = async (props: IListItemPickerProps): Promise<void> => {
    this.setState({
      field: undefined
    });

    const field = await this._spservice.getField(this.state.safeListId, props.columnInternalName, props.webUrl);

    this.setState({
      field
    });
  }
}
