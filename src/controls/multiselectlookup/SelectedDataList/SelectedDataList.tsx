import * as React from 'react';

import styles from '../MultiSelectLookup.module.scss';
import { ISelectedDataListProps } from './ISelectedDataList';
import { ItemElement } from './ItemElement';

export class SelectedDataList extends React.Component<ISelectedDataListProps> {
  constructor(props: ISelectedDataListProps) {
    super(props);

    this.handleItemRemove = this.handleItemRemove.bind(this);
  }

  public render(): JSX.Element {
    return (
      <div className={styles.multiSelectLookup_contentDataList}>
        {this.props.items.map(item => (
          <ItemElement
            key={item.value}
            item={item}
            handleItemRemove={this.handleItemRemove(item)}
            showRemoveIcon={this.props.showRemoveIcon}
          />
        ))}
      </div>
    );
  }

  public handleItemRemove(item: any): () => void {
    return () => {
      this.props.onRemoveItem(item);
    };
  }
}
