import * as strings from 'ControlStrings';
import * as React from "react";
import SPservice from "../../services/SPService";
import { escape } from "@microsoft/sp-lodash-subset";
import { TagPicker } from "office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker";
import { Label } from "office-ui-fabric-react/lib/Label";
import { IListItemPickerProps, IListItemPickerState } from ".";
import * as telemetry from '../../common/telemetry';


export class ListItemPicker extends React.Component<IListItemPickerProps, IListItemPickerState> {
  private _spservice: SPservice;
  private selectedItems: any[];

  constructor(props: IListItemPickerProps) {
    super(props);

    telemetry.track('ListItemPicker', {});

    // States
    this.state = {
      noresultsFoundText: !this.props.noResultsFoundText ? strings.genericNoResultsFoundText : this.props.noResultsFoundText,
      showError: false,
      errorMessage: "",
      suggestionsHeaderText: !this.props.suggestionsHeaderText ? strings.ListItemPickerSelectValue : this.props.suggestionsHeaderText
    };

    // Get SPService Factory
    this._spservice = new SPservice(this.props.context);

    this.selectedItems = [];
  }

  public componentDidUpdate(prevProps: IListItemPickerProps, prevState: IListItemPickerState): void {
    if (this.props.listId !== prevProps.listId) {
      this.selectedItems = [];
    }
  }

  /**
   * Render the field
   */
  public render(): React.ReactElement<IListItemPickerProps> {
    const { className, disabled, itemLimit } = this.props;

    return (
      <div>
        <TagPicker onResolveSuggestions={this.onFilterChanged}
                   //   getTextFromItem={(item: any) => { return item.name; }}
                   getTextFromItem={this.getTextFromItem}
                   pickerSuggestionsProps={{
                     suggestionsHeaderText: this.state.suggestionsHeaderText,
                     noResultsFoundText: this.state.noresultsFoundText
                   }}
                   defaultSelectedItems={this.props.defaultSelectedItems || []}
                   onChange={this.onItemChanged}
                   className={className}
                   itemLimit={itemLimit}
                   disabled={disabled} />

        <Label style={{color:'#FF0000'}}> {this.state.errorMessage} </Label>
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
    this.selectedItems = selectedItems;
    this.props.onSelectedItem(selectedItems);
  }

  /**
   * Filter Change
   */
  private onFilterChanged = async (filterText: string, tagList: { key: string; name: string }[]) => {
    let resolvedSugestions: { key: string; name: string }[] = await this.loadListItems(filterText);

    // Filter out the already retrieved items, so that they cannot be selected again
    if (this.selectedItems && this.selectedItems.length > 0) {
      let filteredSuggestions = [];
      for (const suggestion of resolvedSugestions) {
        const exists = this.selectedItems.filter(sItem => sItem.key === suggestion.key);
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
    let { listId, columnInternalName, webUrl } = this.props;
    let arrayItems: { key: string; name: string }[] = [];

    try {
      let listItems = await this._spservice.getListItems(filterText, listId, columnInternalName, webUrl);
      // Check if the list had items
      if (listItems.length > 0) {
        for (const item of listItems) {
          arrayItems.push({ key: item.Id, name: item[columnInternalName] });
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
}
