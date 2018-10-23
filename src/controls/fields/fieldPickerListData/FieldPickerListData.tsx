import * as React from "react";
import { IFieldPickerListDataProps } from "./IFieldPickerListDataProps";
import { IFieldPickerListDataState } from "./IFieldPickerListDataState";
import { escape } from "@microsoft/sp-lodash-subset";
import { TagPicker } from "office-ui-fabric-react/lib/components/pickers/TagPicker/TagPicker";
import SPservice from "../services/SPservice";
import { Label } from "office-ui-fabric-react/lib/Label";


export class FieldPickerListData extends React.Component<
  IFieldPickerListDataProps,
  IFieldPickerListDataState
> {
  private _value: Array<any>;
  private _spservice: SPservice;
  constructor(props: IFieldPickerListDataProps) {
    super(props);
    // States
    this.state = {
      noresultsFoundText:
        typeof this.props.noresultsFoundText === undefined
          ? "No Items Found"
          : this.props.noresultsFoundText,
      showError: false,
      errorMessage: "",
      suggestionsHeaderText:
        typeof this.props.sugestedHeaderText === undefined
          ? "Select Value"
          : this.props.sugestedHeaderText
    };

    // Get SPService Factory
    this._spservice = new SPservice(this.props.context);

    // handlers
    this.onFilterChanged = this.onFilterChanged.bind(this);
    this.getTextFromItem = this.getTextFromItem.bind(this);
    this.onItemChanged = this.onItemChanged.bind(this);

    // Teste Parameters
    this._value = this.props.value !== undefined ? this.props.value : [];
  }
  // Render Field
  public render(): React.ReactElement<IFieldPickerListDataProps> {
    const { className, disabled, itemLimit } = this.props;
    return (
      <div>
        <TagPicker
          onResolveSuggestions={this.onFilterChanged}
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
          disabled={disabled}
        />
        <Label color="red"> {this.state.errorMessage} </Label>
      </div>
    );
  }
  // Get text from Item
  private getTextFromItem(item: any): string {
    return item.name;
  }
  /*
  On Selected Item
*/
  private onItemChanged(selectedItems: { key: string; name: string }[]): void {
    let item: { key: string; name: string } = selectedItems[0];
    console.log(`selected items nr: ${selectedItems.length}`);
    this.props.onSelectedItem(selectedItems);
  }
  // Filter Change
  private onFilterChanged(
    filterText: string,
    tagList: { key: string; name: string }[]
  ) {
    return new Promise<{ key: string; name: string }[]>((resolve, reject) => {
      this.loadListItems(filterText)
        .then((resolvedSugestions: { key: string; name: string }[]) => {
          this.setState({
            errorMessage: "",
            showError: false
          });
          resolve(resolvedSugestions);
        })
        .catch((reason: any) => {
          console.log(`Error get Items ${reason}`);
          this.setState({
            showError: true,
            errorMessage: reason.message,
            noresultsFoundText: reason.message
          });
          resolve([]);
        });
    });
  }
  /*
Function to load List Items
*/
  private async loadListItems(
    filterText: string
  ): Promise<{ key: string; name: string }[]> {
    let { listId, columnInternalName, webUrl } = this.props;
    let arrayItems: { key: string; name: string }[] = [];
    try {
      let listItems = await this._spservice.getListItems(
        filterText,
        listId,
        columnInternalName,
        webUrl
      );
      // has Items ?
      if (listItems.length > 0) {
        listItems.map((item, i) => {
          arrayItems.push({ key: item.Id, name: item[columnInternalName] });
        });
      }
      return Promise.resolve(arrayItems);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
