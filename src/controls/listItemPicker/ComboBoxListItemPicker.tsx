import * as strings from 'ControlStrings';
import * as React from "react";
import { Label } from "office-ui-fabric-react/lib/Label";
import { IComboBoxListItemPickerProps, IComboBoxListItemPickerState } from ".";
import * as telemetry from '../../common/telemetry';
import { ComboBox, IComboBoxOption } from "office-ui-fabric-react/lib/ComboBox";
import { ListItemRepository } from '../../common/dal/ListItemRepository';


export class ComboBoxListItemPicker extends React.Component<IComboBoxListItemPickerProps, IComboBoxListItemPickerState> {
  private _listItemRepo: ListItemRepository;
  public selectedItems: any[];

  constructor(props: IComboBoxListItemPickerProps) {
    super(props);

    telemetry.track('ComboBoxListItemPicker', {});

    // States
    this.state = {
      noresultsFoundText: !this.props.noResultsFoundText ? strings.genericNoResultsFoundText : this.props.noResultsFoundText,
      showError: false,
      errorMessage: "",
      suggestionsHeaderText: !this.props.suggestionsHeaderText ? strings.ListItemPickerSelectValue : this.props.suggestionsHeaderText
    };

    // Get SPService Factory
    this._listItemRepo = new ListItemRepository(this.props.webUrl, this.props.spHttpClient);

    this.selectedItems = [];
  }

  public componentDidMount(): void {
    this.loadOptions(this.props);
  }

  protected async loadOptions(props: IComboBoxListItemPickerProps, isInitialLoad?: boolean): Promise<void> {
    const {
      filter,
      keyColumnInternalName,
      listId,
      columnInternalName,
      webUrl,
      itemLimit,
      defaultSelectedItems,
      onInitialized
    } = props;
    let query = filter || "";
    //query += filter;
    let keyColumnName = keyColumnInternalName || "Id";
    let listItems = await this._listItemRepo.getListItemsByFilterClause(query,
      listId,
      columnInternalName,
      keyColumnInternalName,
      webUrl,
      itemLimit || 100);

    let options = listItems.map(option => {
      return {
        key: option[keyColumnName],
        text: option[columnInternalName || "Id"]
      };
    });
    if (defaultSelectedItems) {
      //if passed only ids
      if (!isNaN(defaultSelectedItems[0])) {
        this.selectedItems = options.filter(opt => defaultSelectedItems.indexOf(opt.key) >= 0);
      }
      else {
        this.selectedItems = options.filter(opt => defaultSelectedItems.map(selected => selected[keyColumnName]).indexOf(opt.key) >= 0);
      }
    }
    this.setState({
      availableOptions: options
    });
    if(onInitialized && isInitialLoad !== false){
      onInitialized();
    }
  }

  public async componentWillReceiveProps(nextProps: IComboBoxListItemPickerProps): Promise<void> {
    if (nextProps.listId !== this.props.listId) {
      await this.loadOptions(nextProps, false);
      this.selectedItems = [];
    }
  }

  /*public componentDidUpdate(prevProps: IComboBoxListItemPickerProps, prevState: IComboBoxListItemPickerState): void {
    if (this.props.listId !== prevProps.listId) {

    }
  }*/

  /**
   * Render the field
   */
  public render(): React.ReactElement<IComboBoxListItemPickerProps> {
    const { className, disabled } = this.props;

    return (this.state.availableOptions ? (
      <div>
        <ComboBox options={this.state.availableOptions}
                  autoComplete={this.props.autoComplete}
                  comboBoxOptionStyles={this.props.comboBoxOptionStyles}
                  allowFreeform={this.props.allowFreeform}
                  keytipProps={this.props.keytipProps}
                  onMenuDismissed={this.props.onMenuDismiss}
                  onMenuOpen={this.props.onMenuOpen}
                  text={this.props.text}
                  onChange={(e, value) => this.onChanged(value)}
                  multiSelect={this.props.multiSelect}
                  defaultSelectedKey={this.selectedItems.map(item=>item.key) || []}
                  className={className}
                  disabled={disabled} />

        {!!this.state.errorMessage &&
          (<Label style={{ color: '#FF0000' }}> {this.state.errorMessage} </Label>)}
      </div>) : <span>Loading...</span>
    );
  }

  /**
   * On Selected Item
   */
  private onChanged = (option?: IComboBoxOption, index?: number, value?: string, submitPendingValueEvent?: any): void => {
    if(this.props.multiSelect){
      if (option && option.selected) {
        this.selectedItems.push({
          [this.props.keyColumnInternalName || "Id"]: option.key,
          [this.props.columnInternalName]: option.text,
          selected: option.selected
        });
      } else {
        this.selectedItems = this.selectedItems.filter(o => o[this.props.keyColumnInternalName || "Id"] !== option.key);
      }
    }else{
      this.selectedItems.push({
        [this.props.keyColumnInternalName || "Id"]: option.key,
        [this.props.columnInternalName]: option.text
      });

      this.selectedItems = this.selectedItems.filter(o => o[this.props.keyColumnInternalName || "Id"] === option.key);
    }

    this.props.onSelectedItem(this.selectedItems);
  }
}
