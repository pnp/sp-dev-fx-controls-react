import { Item } from '../../MultiSelectLookup';

const escapeKeyword = (keyword: string) =>
  keyword.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&");

export class MultiSelectLookupUtils {
  public static mapFromListToItem(datas: any[]): Item[] {
    return datas.map(listItem => ({
      label: listItem.Title,
      value: listItem.Value
    }));
  }

  public static getAvailableDataList(
    availableData: Item[],
    selectedData: Item[]
  ) {
    return availableData.map(
      ({ isLocked, label, value, sort }: Item, idx: number) => {
        const selectedItem = selectedData.filter(i => i.value === value)[0];
        return {
          isLocked: isLocked || selectedItem ? selectedItem.isLocked : false,
          isSelected: !!selectedItem,
          sort: sort || idx + 1,
          label,
          value
        };
      }
    );
  }

  public static getSelectedDataList(selectedData: Item[]) {
    return selectedData.map(
      ({ isLocked, label, value, sort }: Item, idx: number) => ({
        isLocked: !!isLocked,
        label,
        sort: sort || idx + 1,
        value
      })
    );
  }

  public static filterData(data: Item[], keyword: string) {
    if (keyword !== "") {
      const regexp = new RegExp(escapeKeyword(keyword), "i");
      return data.filter(i => regexp.test(i.label.toString()));
    }
    return data;
  }
}
