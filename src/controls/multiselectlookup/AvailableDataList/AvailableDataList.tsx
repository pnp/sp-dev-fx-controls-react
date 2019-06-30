import { Checkbox } from 'office-ui-fabric-react';
import * as React from 'react';

import { Item } from '../IMultiSelectLookup';
import styles from '../MultiSelectLookup.module.scss';
import { MultiSelectLookupUtils } from '../Utlis';
import { IAvailableDataListProps, IAvailableDataListState } from './IAvailableDataList';

export class AvailableDataList extends React.Component<
  IAvailableDataListProps,
  IAvailableDataListState
> {
  constructor(props: IAvailableDataListProps) {
    super(props);

    this.state = {
      visibleItems: props.avaiableItems
    };

    this.handleItemClick = this.handleItemClick.bind(this);
  }

  public componentWillUpdate(
    nextProps: IAvailableDataListProps,
    nextState: IAvailableDataListState
  ) {
    nextState.visibleItems = MultiSelectLookupUtils.filterData(
      nextProps.avaiableItems,
      nextProps.searchKeyword || ""
    );
  }

  public render(): JSX.Element | null {
    const { disabled } = this.props;

    return (
      <div className={styles.multiSelectLookup_contentDataList}>
        {this.state.visibleItems.map(item => (
          <div
            key={item.value}
            className={styles.multiSelectLookup_contentDataList_available}
          >
            <Checkbox
              checked={item.isSelected}
              disabled={item.isLocked || disabled}
              onChange={this.handleItemClick(item)}
            />
            <span
              className={
                styles.multiSelectLookup_contentDataList_available_text
              }
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    );
  }

  public handleItemClick(item: Item) {
    return (event: any, checked: boolean) => {
      this.props.onSelectItem(item, checked);
    };
  }
}
