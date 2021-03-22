import * as strings from 'ControlStrings';
import * as React from "react";
import SPservice from "../../services/SPService";
import { TagPicker } from "office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker";
import { Label } from "office-ui-fabric-react/lib/Label";
import { IListItemPickerProps, IListItemPickerState } from ".";
import * as telemetry from '../../common/telemetry';
import isEqual from 'lodash/isEqual';


export class ListItemPicker extends React.Component<IListItemPickerProps, IListItemPickerState> {
  private _spservice: SPservice;

  constructor(props: IListItemPickerProps) {
    super(props);

    telemetry.track('ListItemPicker', {});

    // States
    this.state = {
      noresultsFoundText: !this.props.noResultsFoundText ? strings.genericNoResultsFoundText : this.props.noResultsFoundText,
      showError: false,
      errorMessage: "",
      suggestionsHeaderText: !this.props.suggestionsHeaderText ? strings.ListItemPickerSelectValue : this.props.suggestionsHeaderText,
      selectedItems: props.defaultSelectedItems || []
    };

    // Get SPService Factory
    this._spservice = new SPservice(this.props.context);
  }

  public componentDidMount() {
    this.loadField(this.props);
  }

  public componentWillReceiveProps(nextProps: IListItemPickerProps) {
    let newSelectedItems: any[] | undefined;
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
        this.loadField(nextProps);
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
        <TagPicker onResolveSuggestions={this.onFilterChanged}
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

        {!!errorMessage &&
          (<Label style={{ color: '#FF0000' }}> {errorMessage} </Label>)}
      </div>
    );
  }

  /**
   * Get text from Item
   */
  private getTextFromItem(item: any): string {
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
  private onFilterChanged = async (filterText: string, tagList: { key: string; name: string }[]) => {
    let resolvedSugestions: { key: string; name: string }[] = await this.loadListItems(filterText);

    const {
      selectedItems
    } = this.state;

    // Filter out the already retrieved items, so that they cannot be selected again
    if (selectedItems && selectedItems.length > 0) {
      let filteredSuggestions = [];
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
    let { listId, columnInternalName, keyColumnInternalName, webUrl, filter, orderBy, substringSearch } = this.props;
    const {
      field
    } = this.state;
    let arrayItems: { key: string; name: string }[] = [];
    let keyColumn: string = keyColumnInternalName || 'Id';

    try {
      let listItems = await this._spservice.getListItems(filterText, listId, columnInternalName, field, keyColumn, webUrl, filter, substringSearch, orderBy ? orderBy : ''); // JJ - 20200613 - find by substring as an option
      // Check if the list had items
      if (listItems.length > 0) {
        for (const item of listItems) {
          arrayItems.push({ key: item[keyColumn], name: item[columnInternalName] });
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

    const field = await this._spservice.getField(props.listId, props.columnInternalName, props.webUrl);

    this.setState({
      field
    });
  }
}
