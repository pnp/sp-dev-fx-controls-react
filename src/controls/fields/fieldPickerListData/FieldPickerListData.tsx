import * as strings from 'ControlStrings';
import * as React from "react";
import SPservice from "../../../services/SPService";
import { escape } from "@microsoft/sp-lodash-subset";
import { TagPicker } from "office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker";
import { Label } from "office-ui-fabric-react/lib/Label";
import { IFieldPickerListDataProps, IFieldPickerListDataState } from ".";


export class FieldPickerListData extends React.Component<IFieldPickerListDataProps, IFieldPickerListDataState> {
  private _value: Array<any>;
  private _spservice: SPservice;

  constructor(props: IFieldPickerListDataProps) {
    super(props);

    // States
    this.state = {
      noresultsFoundText: typeof this.props.noresultsFoundText === undefined ? strings.genericNoResultsFoundText : this.props.noresultsFoundText,
      showError: false,
      errorMessage: "",
      suggestionsHeaderText: typeof this.props.sugestedHeaderText === undefined ? strings.FieldPickerListDataSelectValue : this.props.sugestedHeaderText
    };

    // Get SPService Factory
    this._spservice = new SPservice(this.props.context);

    // Teste Parameters
    this._value = this.props.value !== undefined ? this.props.value : [];
  }

  /**
   * Render the field
   */
  public render(): React.ReactElement<IFieldPickerListDataProps> {
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
                   defaultSelectedItems={this._value}
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
    let item: { key: string; name: string } = selectedItems[0];
    console.log(`selected items nr: ${selectedItems.length}`);
    this.props.onSelectedItem(selectedItems);
  }

  /**
   * Filter Change
   */
  private onFilterChanged = async (filterText: string, tagList: { key: string; name: string }[]) => {
    const resolvedSugestions: { key: string; name: string }[] = await this.loadListItems(filterText);

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
