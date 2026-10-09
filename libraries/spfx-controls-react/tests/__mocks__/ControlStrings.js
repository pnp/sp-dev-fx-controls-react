const strings = {
  DetailsListAriaLabel: 'Details list',
  DetailsListHeaderAriaLabel: 'List header',
  DetailsListSelectAllRowsAriaLabel: 'Select all rows',
  DetailsListSelectionAriaLabel: 'Selection',
  DetailsListSelectRowAriaLabel: 'Select row {0}',
  DetailsListResizeColumnAriaLabel: 'Resize {0} column',
  DetailsListLoading: 'Loading',
  DetailsListLoadingMore: 'Loading more items',
  DetailsListNoItems: 'No items to display',
};

module.exports = new Proxy(strings, {
  get(target, property) {
    if (property in target) {
      return target[property];
    }

    return typeof property === 'string' ? property : undefined;
  },
});
