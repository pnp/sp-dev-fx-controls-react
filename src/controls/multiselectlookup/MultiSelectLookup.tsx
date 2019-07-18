import * as strings from 'ControlStrings';
import { debounce } from 'lodash';
import { Checkbox, css, Label, SearchBox } from 'office-ui-fabric-react';
import { initializeIcons } from 'office-ui-fabric-react/lib/Icons';
import * as React from 'react';

import SPService from '../../services/SPService';
import { AvailableDataList } from './AvailableDataList';
import { IMultiSelectLookupProps, IOnChangeState, Item } from './IMultiSelectLookup';
import { IMultiSelectLookupState } from './IMultiSelectLookupState';
import styles from './MultiSelectLookup.module.scss';
import { SelectedDataList } from './SelectedDataList';
import { MultiSelectLookupUtils } from './Utlis';

/** TODO: add some sortable to selected datas in the feature */

initializeIcons();

export class MultiSelectLookup extends React.Component<
  IMultiSelectLookupProps,
  IMultiSelectLookupState
  > {
  private _id: string = "";
  public static defaultProps: IMultiSelectLookupProps = {
    disabled: false,
    required: false,
    showSearchBox: true,
    searchPlaceholder: strings.MultiSelectLookup.searchplaceholder,
    checkboxLabel: strings.MultiSelectLookup.checkboxLabel,
    availableData: [],
    selectedData: [],
    className: ""
  };

  constructor(props: IMultiSelectLookupProps) {
    super(props);

    this._id = props.id || "MultiSelectLookup";
    this.handleSearch = debounce(this.handleSearch, 30);

    this.onSelectItem = this.onSelectItem.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAllSelectedChange = this.handleAllSelectedChange.bind(this);
    this.handleUnselectItem = this.handleUnselectItem.bind(this);
    this.handleChange = this.handleChange.bind(this);

    const availableData = MultiSelectLookup.defaultProps.availableData;
    const selectedData = MultiSelectLookup.defaultProps.selectedData;

    this.state = {
      keyword: "",
      checked: availableData.length === selectedData.length,
      availableData,
      selectedData
    };
  }

  public componentWillUpdate(
    nextProps: IMultiSelectLookupProps,
    nextState: IMultiSelectLookupState
  ) {
    nextState.selectedData = MultiSelectLookupUtils.getSelectedDataList(
      nextProps.selectedData
    );

    nextState.availableData = MultiSelectLookupUtils.getAvailableDataList(
      nextState.availableData,
      nextState.selectedData
    );

    const filteredAvailable = MultiSelectLookupUtils.filterData(
      nextState.availableData,
      nextState.keyword
    );
    const filteredSelected = MultiSelectLookupUtils.filterData(
      nextState.selectedData,
      nextState.keyword
    );
    nextState.checked =
      filteredAvailable.length > 0 &&
      filteredAvailable.length === filteredSelected.length;
  }

  public componentDidMount() {
    this.getDatas();
  }

  public handleChange(value: IOnChangeState) {
    if (this.props.disabled) {
      return;
    }

    if (this.props.onChanged) {
      this.props.onChanged(value);
    }
  }

  public render(): JSX.Element {
    const {
      disabled,
      showSearchBox,
      searchPlaceholder,
      checkboxLabel,
      className
    } = this.props;

    return (
      <div className={css(styles.multiSelectLookup, className)} id={this._id}>
        {this.createLabel()}
        {showSearchBox && (
          <SearchBox
            placeholder={searchPlaceholder}
            value={this.state.keyword}
            onChange={this.handleSearch}
            disabled={disabled}
          />
        )}
        <div className={styles.multiSelectLookup_listBox_select}>
          <Checkbox
            label={checkboxLabel}
            onChange={this.handleAllSelectedChange}
            checked={this.state.checked}
            disabled={disabled}
          />
        </div>
        <div className={styles.multiSelectLookup_wrapper}>
          {this.createAvailableDataList()}
          {this.createSelectedDataList()}
        </div>
      </div>
    );
  }

  private createLabel(): JSX.Element | null {
    const { label, required } = this.props;

    if (label) {
      return (
        <Label
          required={required}
          className={styles.multiSelectLookup_wrapper_label}
        >
          {label}
        </Label>
      );
    }
    return null;
  }

  private createAvailableDataList() {
    return (
      <div className={styles.multiSelectLookup_listBox}>
        <AvailableDataList
          avaiableItems={this.state.availableData}
          onSelectItem={this.onSelectItem}
          searchKeyword={this.state.keyword}
          disabled={this.props.disabled}
        />
      </div>
    );
  }

  private createSelectedDataList() {
    const { disabled } = this.props;

    return (
      <div className={styles.multiSelectLookup_listBox}>
        <SelectedDataList
          items={this.state.selectedData}
          onRemoveItem={this.handleUnselectItem}
          showRemoveIcon={!disabled}
          disabled={disabled}
        />
      </div>
    );
  }

  private onSelectItem(item: Item, checked: boolean) {
    const selectedData = checked
      ? [...this.state.selectedData, item]
      : this.state.selectedData.filter(i => i.value !== item.value);

    this.handleChange({
      allSelected: selectedData.length === this.state.availableData.length,
      selectedData
    });
  }

  private handleSearch(keyword: string) {
    this.setState({ keyword });
  }

  private handleAllSelectedChange() {
    let selectedData = [];
    if (!this.state.checked) {
      selectedData = [
        ...this.state.selectedData,
        ...MultiSelectLookupUtils.filterData(
          this.state.availableData,
          this.state.keyword
        )
      ];
    } else {
      const filtered = MultiSelectLookupUtils.filterData(
        this.state.selectedData,
        this.state.keyword
      );

      selectedData = this.state.selectedData.filter(data => {
        if (data.isLocked) {
          return true;
        } else {
          const element = filtered.filter(item => item.value === data.value)[0];
          if (element) {
            return false;
          }
        }
        return true;
      });
    }

    this.handleChange({ allSelected: !this.state.checked, selectedData });
    this.setState(({ checked }) => ({ checked: !checked }));
  }

  private handleUnselectItem(item: Item) {
    this.handleChange({
      allSelected: false,
      selectedData: this.state.selectedData.filter(i => i.value !== item.value)
    });
  }

  private async getDatas() {
    let availableData = this.props.availableData;
    if (this.props.listName) {
      const datas = await SPService.getListItemsByListName(this.props.listName, ["Title", "Value"], this.props.web);
      availableData = MultiSelectLookupUtils.mapFromListToItem(datas);
    }

    const selectedData = MultiSelectLookupUtils.getSelectedDataList(
      this.props.selectedData
    );

    availableData = MultiSelectLookupUtils.getAvailableDataList(
      availableData,
      selectedData
    );

    this.setState({
      checked: availableData.length === selectedData.length,
      availableData,
      selectedData
    });
  }
}
