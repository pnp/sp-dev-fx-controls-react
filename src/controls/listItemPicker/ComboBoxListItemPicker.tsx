import * as strings from 'ControlStrings';
import * as React from "react";
import { Label } from "@fluentui/react/lib/Label";
import { IComboBoxListItemPickerProps } from "./IComboBoxListItemPickerProps";
import { IComboBoxListItemPickerState } from "./IComboBoxListItemPickerState";
import * as telemetry from '../../common/telemetry';
import { ComboBox, IComboBoxOption } from "@fluentui/react/lib/ComboBox";
import { ListItemRepository } from '../../common/dal/ListItemRepository';
import styles from './ComboBoxListItemPicker.module.scss';
import { Spinner, SpinnerSize } from '@fluentui/react/lib/Spinner';
import { cloneDeep, isEqual } from 'lodash';
import { Guid } from '@microsoft/sp-core-library';


export class ComboBoxListItemPicker extends React.Component<IComboBoxListItemPickerProps, IComboBoxListItemPickerState> {
  private _listItemRepo: ListItemRepository;
  private _options: any[] = null; // eslint-disable-line @typescript-eslint/no-explicit-any

  constructor(props: IComboBoxListItemPickerProps) {
    super(props);

    telemetry.track('ComboBoxListItemPicker', {});

    // States
    this.state = {
      noresultsFoundText: !this.props.noResultsFoundText ? strings.genericNoResultsFoundText : this.props.noResultsFoundText,
      showError: false,
      errorMessage: "",
      suggestionsHeaderText: !this.props.suggestionsHeaderText ? strings.ListItemPickerSelectValue : this.props.suggestionsHeaderText,
      selectedItems: this.props.defaultSelectedItems || [],
      safeListId: this.props.listId,
    };

    // Get SPService Factory
    this._listItemRepo = new ListItemRepository(this.props.webUrl, this.props.spHttpClient);

  }

  public componentDidMount(): void {
    if(!Guid.tryParse(this.props.listId)) {
      this._listItemRepo.getListId(this.props.listId)
        .then((value) => {
            this.setState({...this.state,
              safeListId: value });
              this.loadOptions(this.props).then(() => { /* no-op; */}).catch(() => { /* no-op; */});
        })
        .catch(() => { /* no-op; */ });
    } else {
      this.loadOptions(this.props).then(() => { /* no-op; */}).catch(() => { /* no-op; */});
    }
  }

  protected async loadOptions(props: IComboBoxListItemPickerProps, isInitialLoad?: boolean): Promise<void> {
    const {
      filter,
      listId,
      keyColumnInternalName,
      columnInternalName,
      webUrl,
      itemLimit,
      onInitialized,
      orderBy
    } = props;
    const { safeListId } = this.state;
    const query = filter || "";
    const keyColumnName = keyColumnInternalName || "Id";

    if (!this._options || listId !== this.props.listId|| filter !== this.props.filter) {
      const listItems = await this._listItemRepo.getListItemsByFilterClause(query,
        safeListId,
        columnInternalName,
        keyColumnInternalName,
        webUrl,
        itemLimit || 100,
        orderBy);

      this._options = listItems.map(option => {
        return {
          key: option[keyColumnName],
          text: option[columnInternalName || "Id"]
        };
      });
    }

    const selectedItems = this._getSelectedItems(props);

    this.setState({
      availableOptions: this._options,
      selectedItems: selectedItems,
    });
    if (onInitialized && isInitialLoad !== false) {
      onInitialized();
    }
  }

  public async UNSAFE_componentWillReceiveProps(nextProps: IComboBoxListItemPickerProps): Promise<void> {
    if (nextProps.listId !== this.props.listId) {
      this.setState({
        selectedItems: [],
      });
      await this.loadOptions(nextProps, false);
    }
    if (nextProps.filter !== this.props.filter) {

      await this.loadOptions(nextProps, false);
    }
    if (!isEqual(nextProps.defaultSelectedItems, this.props.defaultSelectedItems)) {
      const selectedItems = this._getSelectedItems(nextProps);
      this.setState({
        selectedItems: selectedItems,
      });
    }
  }

  private _getSelectedItems(props: IComboBoxListItemPickerProps): any[] { // eslint-disable-line @typescript-eslint/no-explicit-any
    let selectedItems: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any
    const keyColumnName = props.keyColumnInternalName || "Id";
    if (props.defaultSelectedItems) {
      //if passed only ids
      if (!isNaN(props.defaultSelectedItems[0])) {
        selectedItems = this._options.filter(opt => props.defaultSelectedItems.indexOf(opt.key) >= 0);
      }
      else {
        selectedItems = this._options.filter(opt => props.defaultSelectedItems.map(selected => selected[keyColumnName]).indexOf(opt.key) >= 0);
      }
    }
    if (selectedItems?.length > 0) {
      selectedItems = selectedItems.map(item => {
        return {
          [this.props.keyColumnInternalName || "Id"]: item.key,
          [this.props.columnInternalName]: item.text
        };
      });
    }

    return selectedItems;
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
    const selectedKeys = this.state.selectedItems?.map(item => item[this.props.keyColumnInternalName || "Id"]) || [];

    return (
      <div className={styles.comboBoxListItemPickerWrapper}>
        <ComboBox label={this.props.label}
          styles={this.props.styles}
          options={this.state.availableOptions}
          autoComplete={this.props.autoComplete}
          comboBoxOptionStyles={this.props.comboBoxOptionStyles}
          allowFreeform={this.props.allowFreeform}
          onMenuDismissed={this.props.onMenuDismiss}
          onMenuOpen={this.props.onMenuOpen}
          text={this.props.text}
          onChange={(e, value) => this.onChanged(value)}
          multiSelect={this.props.multiSelect}
          selectedKey={selectedKeys}
          className={className}
          disabled={disabled} />
        {!this.state.errorMessage && !this.state.availableOptions && (<Spinner className={styles.loading} size={SpinnerSize.small} />)}
        {!!this.state.errorMessage &&
          (<Label style={{ color: '#FF0000' }}> {this.state.errorMessage} </Label>)}
      </div>
    );
  }

  /**
   * On Selected Item
   */
  private onChanged = (option?: IComboBoxOption, index?: number, value?: string, submitPendingValueEvent?: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    let selectedItems: any[] = cloneDeep(this.state.selectedItems); // eslint-disable-line @typescript-eslint/no-explicit-any
    if (this.props.multiSelect) {
      if (option && option.selected) {
        selectedItems.push({
          [this.props.keyColumnInternalName || "Id"]: option.key,
          [this.props.columnInternalName]: option.text,
          selected: option.selected
        });
      } else {
        selectedItems = selectedItems.filter(o => o[this.props.keyColumnInternalName || "Id"] !== option.key);
      }
    } else {
      selectedItems.push({
        [this.props.keyColumnInternalName || "Id"]: option.key,
        [this.props.columnInternalName]: option.text
      });

      selectedItems = selectedItems.filter(o => o[this.props.keyColumnInternalName || "Id"] === option.key);
    }

    this.setState({
      selectedItems: selectedItems,
    });

    this.props.onSelectedItem(selectedItems);
  }
}
