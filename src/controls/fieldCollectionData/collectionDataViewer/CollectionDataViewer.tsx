import * as React from 'react';
import styles from '../FieldCollectionData.module.scss';
import { ICollectionDataViewerProps } from './ICollectionDataViewerProps';
import { ICollectionDataViewerState } from './ICollectionDataViewerState';
import { CollectionDataItem } from '../collectionDataItem';
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button';
import { Icon } from '@fluentui/react/lib/Icon';
import * as strings from 'ControlStrings';
import { cloneDeep, sortBy, isEmpty, findIndex } from '@microsoft/sp-lodash-subset';
import { Pagination } from '../../pagination';
import { SearchBox } from '@fluentui/react/lib/SearchBox';
import { Guid } from '@microsoft/sp-core-library';

export class CollectionDataViewer extends React.Component<ICollectionDataViewerProps, ICollectionDataViewerState> {
  private readonly SORT_IDX = "sortIdx";

  constructor(props: ICollectionDataViewerProps) {
    super(props);

    this.state = {
      crntItems: [],
      inCreationItem: null,
      validation: {},
      currentPage: 1
    };
  }

  /**
   * componentDidMount lifecycle hook
   */
  public componentDidMount(): void {
    let crntItems = this.props.value ? sortBy(cloneDeep(this.props.value), this.SORT_IDX) : [];
    crntItems = crntItems.map((item, idx) => {
      if (!item[this.SORT_IDX]) {
        item[this.SORT_IDX] = idx + 1;
      }
      if (!item.uniqueId) {
        item.uniqueId = Guid.newGuid();
      }
      return item;
    });
    // Update the sort propety
    crntItems = this.updateSortProperty(crntItems);
    this.setState({
      crntItems: sortBy(crntItems, this.SORT_IDX)
    });
  }

  /**
   * Add a new item to the collection
   */
  private addItem = (item: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (!item.uniqueId) {
      item.uniqueId = Guid.newGuid();
    }
    this.setState((prevState: ICollectionDataViewerState): ICollectionDataViewerState => {
      let crntItems = [...prevState.crntItems, item];
      crntItems = this.updateSortProperty(crntItems);
      const pagesCount = this.getPagesCount(crntItems);
      const currentPage = pagesCount < 1 ? 1 : pagesCount;
      return {
        crntItems,
        inCreationItem: null,
        currentPage
      };
    }, () => {
      // if panel is not used save directly
      if (typeof this.props.usePanel === "boolean" && this.props.usePanel === false) {
        this.props.fOnSave(this.state.crntItems);
      }
    });
  }

  /**
   * Remove an item from the collection
   */
  private updateItem = (idx: number, item: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    this.setState((prevState: ICollectionDataViewerState): ICollectionDataViewerState => {
      const { crntItems } = prevState;
      // Update the item in the array
      crntItems[idx] = item;
      return {
        crntItems,
        currentPage: prevState.currentPage
      };
    }, () => {
      // if panel is not used save directly
      if (typeof this.props.usePanel === "boolean" && this.props.usePanel === false) {
        this.props.fOnSave(this.state.crntItems);
      }
    });
  }

  /**
   * Remove an item from the collection
   */
  private deleteItem = (idx: number): void => {
    this.setState((prevState: ICollectionDataViewerState): ICollectionDataViewerState => {
      let { crntItems } = prevState;
      crntItems.splice(idx, 1);

      // Update the sort propety
      crntItems = this.updateSortProperty(crntItems);
      // Calculate current page

      const pagesCount = this.getPagesCount(crntItems);
      const currentPage = this.state.currentPage > pagesCount ? pagesCount : this.state.currentPage;
      return {
        crntItems: sortBy(crntItems, this.SORT_IDX),
        currentPage
      };
    }, () => {
      // if panel is not used save directly
      if (typeof this.props.usePanel === "boolean" && this.props.usePanel === false) {
        this.props.fOnSave(this.state.crntItems);
      }
    });
  }



  /**
   * Validate every item
   */
  private validateItem = (idx: number, isValid: boolean): void => {
    this.setState((prevState: ICollectionDataViewerState) => {
      const { validation } = prevState;
      validation[idx] = isValid;
      return {
        validation: prevState.validation
      };
    });
  }

  /**
   * Check if all items are valid
   */
  private allItemsValid(): boolean {
    const { validation } = this.state;
    if (validation) {
      const keys = Object.keys(validation);
      for (const key of keys) {
        if (!validation[key]) {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Currently in creation
   */
  private addInCreation = (item: any): void => { // eslint-disable-line @typescript-eslint/no-explicit-any
    this.setState({
      inCreationItem: item
    });
  }

  /**
   * Add the item and save the form
   */
  private addAndSave = (): void => {
    // Check if the item is not empty
    if (this.state.inCreationItem) {
      let crntItems = [...this.state.crntItems, this.state.inCreationItem];
      crntItems = this.updateSortProperty(crntItems);
      this.props.fOnSave(crntItems);
    } else {
      this.onSave();
    }
  }

  /**
   * Move an item in the array
   *
   * @param crntItems
   * @param oldIdx
   * @param newIdx
   */
  private moveItemTo(crntItems: any[], oldIdx: number, newIdx: number): any[] { // eslint-disable-line @typescript-eslint/no-explicit-any
    if (newIdx > -1 && newIdx < crntItems.length) {
      const removedElement = crntItems.splice(oldIdx, 1)[0];
      if (removedElement) {
        crntItems.splice(newIdx, 0, removedElement);
      }
    }
    return crntItems;
  }

  /**
   * Update the sort property
   *
   * @param crntItems
   */
  private updateSortProperty(crntItems: any[]): any[] { // eslint-disable-line @typescript-eslint/no-explicit-any
    // Update the sort order
    return crntItems.map((item, itemIdx) => {
      item[this.SORT_IDX] = itemIdx + 1;
      return item;
    });
  }

  /**
   * Update the sort order
   */
  private updateSortOrder = (oldIdx: number, newIdx: number): void => {
    this.setState((prevState: ICollectionDataViewerState) => {
      const { crntItems } = prevState;
      let newOrderedItems = cloneDeep(crntItems);
      newOrderedItems = this.moveItemTo(newOrderedItems, oldIdx, newIdx - 1);
      newOrderedItems = this.updateSortProperty(newOrderedItems);
      newOrderedItems = sortBy(newOrderedItems, this.SORT_IDX);

      return {
        crntItems: newOrderedItems
      };
    });
  }

  /**
   * Save the collection data
   */
  private onSave = (): void => {
    this.props.fOnSave(this.state.crntItems);
  }

  /**
   * Cancel
   */
  private onCancel = (): void => {
    this.props.fOnClose();
  }

  private getPagesCount = (items): number => {
    if (!this.isPagingEnabled()) {
      return 1;
    }

    return Math.ceil(items.length / this.props.itemsPerPage);
  }

  private getPageItems = (currentPageIndex: number | undefined = null, currentItems: any[] | undefined = null): any[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { crntItems, currentPage } = this.state;

    const items = !currentItems ? crntItems : currentItems;
    const pageIndex = !currentPageIndex ? currentPage : currentPageIndex;

    if (!this.isPagingEnabled || !items) {
      return items;
    }

    const startIndex = this.getFirstElementIndex(pageIndex, items);
    const endIndex = this.getLastElementIndex(pageIndex, items);

    return items.slice(startIndex, endIndex);
  }

  private getFirstElementIndex = (currentPage: number, crntItems: any[] | undefined): number => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { itemsPerPage } = this.props;

    if (!crntItems) {
      return null;
    }
    const isPginingEnabled = this.isPagingEnabled();
    if (!isPginingEnabled || currentPage <= 1) {
      return 0;
    }

    const firstElementIndex = (currentPage - 1) * itemsPerPage;
    return firstElementIndex;
  }
  private getLastElementIndex = (currentPage: number, crntItems: any[] | undefined): number => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { itemsPerPage } = this.props;

    if (!crntItems) {
      return null;
    }

    const isPginingEnabled = this.isPagingEnabled();
    if (!isPginingEnabled) {
      return crntItems.length;
    }

    const lastElementIndex = currentPage * itemsPerPage > crntItems.length ? crntItems.length : currentPage * itemsPerPage;
    return lastElementIndex;
  }

  private getCollectionDataItem = (item: any, idx: number, allItems: any[]): JSX.Element => { // eslint-disable-line @typescript-eslint/no-explicit-any
    return <CollectionDataItem
    context={this.props.context}
      key={item.uniqueId}
      fields={this.props.fields}
      index={idx}
      item={item}
      totalItems={allItems.length}
      sortingEnabled={this.props.enableSorting}
      disableItemDeletion={this.props.disableItemDeletion}
      fUpdateItem={this.updateItem}
      fDeleteItem={this.deleteItem}
      fValidation={this.validateItem}
      fOnSorting={this.updateSortOrder} />;
  }

  private isPagingEnabled = (): boolean => {
    const isPagingEnabled = !!this.props.itemsPerPage && this.props.itemsPerPage > 0;
    return isPagingEnabled;
  }

  private executeItemsFiltering = (items: any[]): boolean => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { executeFiltering } = this.props;
    const { searchFilter } = this.state;

    if (!items || items.length <= 0) {
      return false;
    }
    if (executeFiltering === null) {
      return false;
    }
    if (isEmpty(searchFilter)) {
      return false;
    }
    return true;
  }

  private getFilteredItems = (items: any[]): any[] => { // eslint-disable-line @typescript-eslint/no-explicit-any
    const { executeFiltering } = this.props;
    const { searchFilter } = this.state;

    return items.filter((item) => { return executeFiltering(searchFilter, item); });
  }

  /**
   * Default React render
   */
  public render(): React.ReactElement<ICollectionDataViewerProps> {
    const { currentPage } = this.state;
    let crntItems = this.state.crntItems;

    const isPagingEnabled = this.isPagingEnabled();

    if (this.executeItemsFiltering(crntItems)) {
      crntItems = this.getFilteredItems(crntItems);
    }
    const pageCount = this.getPagesCount(crntItems);
    const elements = this.getPageItems(currentPage, crntItems);

    return (
      <div>
        {
          this.props.executeFiltering &&
          <SearchBox onChanged={(newValue) => { this.setState({ searchFilter: newValue, currentPage: 1 }); }} placeholder={strings.CollectionDataSearch} className="FieldCollectionData__panel__search-box" />
        }
        <div className={`FieldCollectionData__panel__table ${styles.table} ${this.props.tableClassName || ""}`}>
          <div className={`FieldCollectionData__panel__table-head ${styles.tableRow} ${styles.tableHead}`}>
            {
              this.props.enableSorting && (
                <span className={`FieldCollectionData__panel__table-cell ${styles.tableCell}`} />
              )
            }
            {
              this.props.fields.map(f => (
                <span key={`dataviewer-${f.id}`} className={`FieldCollectionData__panel__table-cell ${styles.tableCell}`}>{f.title} {f.required && <Icon className={styles.required} iconName="Asterisk" />}</span>
              ))
            }
            <span className={`FieldCollectionData__panel__table-cell ${styles.tableCell}`} />
            <span className={`FieldCollectionData__panel__table-cell ${styles.tableCell}`} />
          </div>
          {
            (this.state.crntItems && this.state.crntItems.length > 0) &&
            this.state.crntItems.map((item, idx, allItems) => {
              const elementIndex = findIndex(elements, (x: any) => { return x.uniqueId === item.uniqueId; }); // eslint-disable-line @typescript-eslint/no-explicit-any
              if (elementIndex >= 0) {
                return this.getCollectionDataItem(item, idx, allItems);
              } else {
                return null;
              }
            })
          }

          {
            !this.props.disableItemCreation && (
              <CollectionDataItem fields={this.props.fields}
                context={this.props.context}
                index={null}
                item={null}
                sortingEnabled={this.props.enableSorting}
                totalItems={null}
                fAddItem={this.addItem}
                fAddInCreation={this.addInCreation} />
            )
          }

        </div>

        {
          isPagingEnabled && this.state.crntItems && this.state.crntItems.length > 0 &&
          <div className={`FieldCollectionData__panel__pagination`}>
            <Pagination currentPage={currentPage} totalPages={pageCount} onChange={(page: number) => { this.setState({ currentPage: page }); }} />
          </div>
        }

        {
          (!this.state.crntItems || this.state.crntItems.length === 0) && (
            <p className={`FieldCollectionData__panel__no-collection-data ${styles.noCollectionData}`}>{typeof this.props.noDataMessage === "string" ? this.props.noDataMessage : strings.CollectionDataEmptyValue}</p>
          )
        }

        {
          // Only display the save and cancel buttons when Panel is used
          (typeof this.props.usePanel !== "boolean" || this.props.usePanel !== false) && (
            <div className={`FieldCollectionData__panel__actions ${styles.panelActions}`}>
              {this.state.inCreationItem && <PrimaryButton text={this.props.saveAndAddBtnLabel || strings.CollectionSaveAndAddButtonLabel} onClick={this.addAndSave} disabled={!this.allItemsValid()} className="FieldCollectionData__panel__action__add" />}
              {!this.state.inCreationItem && <PrimaryButton text={this.props.saveBtnLabel || strings.SaveButtonLabel} onClick={this.onSave} disabled={!this.allItemsValid()} className="FieldCollectionData__panel__action__save" />}
              <DefaultButton text={this.props.cancelBtnLabel || strings.CancelButtonLabel} onClick={this.onCancel} className="FieldCollectionData__panel__action__cancel" />
            </div>
          )
        }
      </div>
    );
  }
}
