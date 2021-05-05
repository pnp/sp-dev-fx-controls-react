import * as React from 'react';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Spinner, SpinnerSize } from 'office-ui-fabric-react/lib/Spinner';
import { ISite, ISitePickerProps } from './ISitePicker';
import { getAllSites, getHubSites } from '../../services/SPSitesService';
import { IDropdownOption, Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { ISelectableOption, SelectableOptionMenuItemType } from 'office-ui-fabric-react/lib/utilities/selectableOption/SelectableOption.types';
import orderBy from 'lodash/orderBy';
import findIndex from 'lodash/findIndex';
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { toRelativeUrl } from '../../common/utilities/GeneralHelper';
import { Async } from '@uifabric/utilities/lib/Async';
import * as telemetry from '../../common/telemetry';

const styles = mergeStyleSets({
  loadingSpinnerContainer: {
    width: '100%',
    textAlign: 'center',
    marginTop: '8px'
  },
  searchBox: {
    margin: '4px 0'
  },
  siteOption: {
    display: 'flex',
    whiteSpace: 'nowrap',
    alignItems: 'center'
  },
  siteOptionCheckbox: {
    display: 'inline-block',
    marginRight: '4px'
  },
  siteOptionContent: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    padding: '4px 0'
  },
  siteOptionTitle: {
    lineHeight: '18px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  siteOptionUrl: {
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '300',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  }
});

const async = new Async();

export const SitePicker: React.FunctionComponent<ISitePickerProps> = (props: React.PropsWithChildren<ISitePickerProps>) => {

  const {
    label,
    disabled,
    context,
    initialSites,
    multiSelect,
    mode,
    limitToCurrentSiteCollection,
    allowSearch,
    orderBy: propOrderBy,
    isDesc,
    onChange,
    placeholder,
    searchPlaceholder,
    deferredSearchTime,
    className
  } = props;

  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [selectedSites, setSelectedSites] = React.useState<ISite[]>();
  const [allSites, setAllSites] = React.useState<ISite[]>();
  const [filteredSites, setFilteredSites] = React.useState<ISite[]>();
  const [searchQuery, setSearchQuery] = React.useState<string>();

  const onSearchChange = React.useCallback((e, newSearchQuery: string) => {
    if (!allSites) {
      return;
    }

    const loweredNewSearchQuery = newSearchQuery.toLowerCase();
    const newFilteredSites = allSites.filter(s => s.title && s.title.toLowerCase().indexOf(loweredNewSearchQuery) !== -1);

    setSearchQuery(newSearchQuery);
    setFilteredSites(newFilteredSites);
  }, [allSites]);

  const onSelectionChange = React.useCallback((e, item: IDropdownOption, index: number) => {
    let newSelectedSites: ISite[] = [];

    if (multiSelect !== false) {
      newSelectedSites = selectedSites ? [...selectedSites] : [];
      const existingIndex = findIndex(newSelectedSites, s => s.url === item.key);

      if (existingIndex >= 0) {
        newSelectedSites.splice(existingIndex, 1);
      }
      else {
        newSelectedSites.push({
          ...item.data!
        });
      }
    }
    else {
      newSelectedSites = [{
        ...item.data!
      }];
    }

    if (onChange) {
      onChange(newSelectedSites);
    }

    setSelectedSites(newSelectedSites);

  }, [selectedSites, multiSelect, onChange]);

  const getOptions = React.useCallback((): IDropdownOption[] => {

    if (!allSites) {
      return [{
        key: 'spinner',
        text: '',
        itemType: SelectableOptionMenuItemType.Header
      }];
    }

    const result: IDropdownOption[] = [];

    if (allowSearch !== false) {
      result.push({
        key: 'search',
        text: '',
        itemType: SelectableOptionMenuItemType.Header
      });
    }

    const selectedSitesIds: string[] = selectedSites ? selectedSites.map(s => s.url!) : [];

    if (filteredSites) {
      filteredSites.forEach(s => {
        result.push({
          key: s.url,
          text: s.title,
          data: s,
          selected: selectedSitesIds.indexOf(s.url) !== -1
        });
      });
    }

    return result;
  }, [allowSearch, selectedSites, filteredSites, allSites]);

  const onRenderOption = (option?: ISelectableOption, defaultRender?: (props?: ISelectableOption) => JSX.Element | null): JSX.Element | null => {
    if (!props) {
      return null;
    }

    if (option.itemType === SelectableOptionMenuItemType.Header) {
      if (option.key === 'search') {
        return <SearchBox
          placeholder={searchPlaceholder}
          value={searchQuery}
          onChange={async.debounce(onSearchChange, deferredSearchTime || 200)}
          className={styles.searchBox} />;
      }
      else if (option.key === 'spinner') {
        //
        // This happens when the dropdown is opened for the first time.
        // That's when we want to load the sites
        //
        setIsLoading(true);

        return <div className={styles.loadingSpinnerContainer}>
          <Spinner size={SpinnerSize.medium} />
        </div>;
      }
    }
    // {multiSelect !== false && <Checkbox className={styles.siteOptionCheckbox} checked={option.selected} disabled={option.disabled} />}
    return <div className={styles.siteOption}>
      <div className={styles.siteOptionContent}>
        <span className={styles.siteOptionTitle}>{option.text}</span>
        <span className={styles.siteOptionUrl}>{toRelativeUrl(option.data!.url)}</span>
      </div>
    </div>;
  };

  React.useEffect(() => {
    telemetry.track('ReactSitePicker');
  }, []);


  React.useEffect(() => {
    if (!initialSites) {
      return;
    }

    setSelectedSites(sites => {
      if (!sites) { // we want to set the state one time only
        return initialSites;
      }

      return sites;
    });
  }, [initialSites]);

  React.useEffect(() => {
    if (!context || !isLoading) {
      return;
    }

    setSearchQuery('');
    setFilteredSites([]);

    let promise: Promise<ISite[]>;
    if (mode === 'hub') {
      promise = getHubSites(context);
    }
    else {
      promise = getAllSites(context, mode !== 'site', limitToCurrentSiteCollection);
    }

    promise.then(sites => {
      const copy = orderBy(sites, [propOrderBy || 'title'], [isDesc ? 'desc' : 'asc']);
      setAllSites(copy);
      setIsLoading(false);
    });

  }, [context, isLoading, mode, limitToCurrentSiteCollection]);

  React.useEffect(() => {
    setAllSites(sites => {
      if (!sites) {
        return sites;
      }

      const copy = orderBy(sites, [propOrderBy || 'title'], [isDesc ? 'desc' : 'asc']);
      return copy;
    });
  }, [propOrderBy, isDesc]);

  React.useEffect(() => {
    if (!allSites) {
      return;
    }
    setFilteredSites([...allSites]);
  }, [allSites]);

  return (
    <>
      <Dropdown
        label={label}
        placeholder={placeholder}
        options={getOptions()}
        selectedKey={multiSelect === false && !!selectedSites && !!selectedSites[0] ? selectedSites[0].url : undefined}
        selectedKeys={multiSelect !== false && !!selectedSites ? selectedSites.map(s => s.url) : undefined}
        disabled={disabled}
        multiSelect={multiSelect !== false}
        onRenderOption={onRenderOption}
        onChange={onSelectionChange}
        notifyOnReselect={true}
        className={className}
      />
    </>
  );
};
