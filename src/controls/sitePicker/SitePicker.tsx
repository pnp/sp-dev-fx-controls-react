import * as React from 'react';

import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import {
  Dropdown,
  type IDropdownOption,
  SearchBox,
  Spinner,
  SpinnerSize,
  mergeStyleSets,
  type ISelectableOption,
  SelectableOptionMenuItemType,
  Icon
} from '@fluentui/react';
import { useAsync } from '@fluentui/react-hooks';

import * as telemetry from '../../common/telemetry';
import { toRelativeUrl } from '../../common/utilities/GeneralHelper';
import {
  getAllSites,
  getAssociatedSites,
  getHubSites,
} from '../../services/SPSitesService';
import { ISite, ISitePickerProps } from './ISitePicker';

const styles = mergeStyleSets({
  loadingSpinnerContainer: {
    width: '100%',
    textAlign: 'center',
    marginTop: '8px',
  },
  searchBox: {
    margin: '4px 0',
  },
  siteOption: {
    display: 'flex',
    whiteSpace: 'nowrap',
    alignItems: 'center',
  },
  siteOptionCheckbox: {
    display: 'inline-block',
    marginRight: '4px',
  },
  siteOptionContent: {
    display: 'flex',
    flexDirection: 'column',
    minWidth: '0',
    padding: '4px 0',
  },
  siteOptionTitle: {
    lineHeight: '18px',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  siteOptionUrl: {
    fontSize: '12px',
    lineHeight: '14px',
    fontWeight: '300',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  customChevronContainer: {
    display: 'flex',
    gap: '10px',
  },
});

export const SitePicker: React.FunctionComponent<ISitePickerProps> = (
  props: React.PropsWithChildren<ISitePickerProps>
) => {
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
    className,
    selectedSites,
    trimDuplicates,
    additionalQuery,
    hubsiteId,
  } = props;

  const [isLoading, setIsLoading] = React.useState<boolean>();
  const [sites, setSites] = React.useState<ISite[]>();
  const [allSites, setAllSites] = React.useState<ISite[]>();
  const [filteredSites, setFilteredSites] = React.useState<ISite[]>();
  const [searchQuery, setSearchQuery] = React.useState<string>();
  const async = useAsync();

  const onSearchChange = React.useCallback(
    (e, newSearchQuery: string) => {
      if (!allSites) {
        return;
      }

      const loweredNewSearchQuery = newSearchQuery.toLowerCase();
      const newFilteredSites = allSites.filter(
        (s) =>
          s.title && s.title.toLowerCase().indexOf(loweredNewSearchQuery) !== -1
      );

      setSearchQuery(newSearchQuery);
      setFilteredSites(newFilteredSites);
    },
    [allSites]
  );

  const clearItems = React.useCallback(
    (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
      event.stopPropagation();
      return setSites([]);
    },
    [sites]
  );

  const CustomChevron = (): JSX.Element => {
    if (sites && sites.length > 0) {
      return (
        <div className={styles.customChevronContainer}>
          <Icon iconName="Cancel" onClick={clearItems} />
          <Icon iconName="ChevronDown" />
        </div>
      );
    }
    return (
      <div className={styles.customChevronContainer}>
        <Icon iconName="ChevronDown" />
      </div>
    );
  };

  const onSelectionChange = React.useCallback(
    (e, item: IDropdownOption, index: number) => {
      let newSelectedSites: ISite[] = [];
      if (multiSelect !== false) {
        newSelectedSites = sites ? [...sites] : [];
        const existingIndex = findIndex(
          newSelectedSites,
          (s) => s.url === item.key
        );

        if (existingIndex >= 0) {
          newSelectedSites.splice(existingIndex, 1);
        } else if (item.data) {
          newSelectedSites.push({
            ...item.data,
          });
        }
      } else if (item.data) {
        newSelectedSites = [
          {
            ...item.data,
          },
        ];
      }

      if (onChange) {
        onChange(newSelectedSites);
      }

      setSites(newSelectedSites);
      //console.log(`onselction change set sites to ${newSelectedSites[0].title}`);
    },
    [sites, multiSelect, onChange]
  );

  const getOptions = React.useCallback((): IDropdownOption[] => {
    if (!allSites) {
      return [
        {
          key: 'spinner',
          text: '',
          itemType: SelectableOptionMenuItemType.Header,
        },
      ];
    }

    const result: IDropdownOption[] = [];

    if (allowSearch !== false) {
      result.push({
        key: 'search',
        text: '',
        itemType: SelectableOptionMenuItemType.Header,
      });
    }

    const selectedSitesIds: string[] = sites ? sites.map((s) => s.url) : [];

    if (filteredSites) {
      filteredSites.forEach((s) => {
        result.push({
          key: s.url,
          text: s.title,
          data: s,
          selected: selectedSitesIds.indexOf(s.url) !== -1,
        });
      });
    }

    return result;
  }, [allowSearch, sites, filteredSites, allSites]);

  const onRenderOption = (
    option?: ISelectableOption,
    defaultRender?: (props?: ISelectableOption) => JSX.Element | null
  ): JSX.Element | null => {
    if (!props) {
      return null;
    }

    if (option.itemType === SelectableOptionMenuItemType.Header) {
      if (option.key === 'search') {
        return (
          <SearchBox
            placeholder={searchPlaceholder}
            value={searchQuery}
            onChange={async.debounce(onSearchChange, deferredSearchTime || 200)}
            className={styles.searchBox}
          />
        );
      } else if (option.key === 'spinner') {
        //
        // This happens when the dropdown is opened for the first time.
        // That's when we want to load the sites
        //
        setIsLoading(true);

        return (
          <div className={styles.loadingSpinnerContainer}>
            <Spinner size={SpinnerSize.medium} />
          </div>
        );
      }
    }
    // {multiSelect !== false && <Checkbox className={styles.siteOptionCheckbox} checked={option.selected} disabled={option.disabled} />}
    return (
      <div className={styles.siteOption}>
        <div className={styles.siteOptionContent}>
          <span className={styles.siteOptionTitle}>{option.text}</span>
          <span className={styles.siteOptionUrl}>
            {toRelativeUrl(option.data ? option.data.url : '')}
          </span>
        </div>
      </div>
    );
  };

  React.useEffect(() => {
    telemetry.track('ReactSitePicker');
  }, []);

  React.useEffect(() => {
    setSites(selectedSites);
    // console.log(`firt useeffect set sites to ${selectedSites[0].title}`);
    if (!allSites) {
      setIsLoading(true);
    }
  }, [selectedSites]);

  React.useEffect(() => {
    if (!initialSites) {
      return;
    }

    setSites((osites) => {
      if (!osites) {
        // we want to set the state one time only
        //  console.log(`second  useeffect part a  set sites to ${initialSites[0].title}`);
        return initialSites;
      }
      //  console.log(`second  useeffect part b  set sites to ${sites[0].title}`);
      return sites;
    });

    if (!allSites) {
      setIsLoading(true);
    }
  }, [initialSites, allSites]);

  React.useEffect(() => {
    if (!context || !isLoading) {
      return;
    }

    setSearchQuery('');
    setFilteredSites([]);

    let promise: Promise<ISite[]>;
    switch (mode) {
      case 'hub':
        promise = getHubSites(context);
        break;

      case 'associatedsites':
        promise = getAssociatedSites(
          context,
          trimDuplicates === true,
          hubsiteId
        );
        break;

      default:
        promise = getAllSites(
          context,
          mode !== 'site',
          limitToCurrentSiteCollection,
          trimDuplicates === true,
          additionalQuery
        );
        break;
    }

    promise
      .then((newSites) => {
        const copy = orderBy(
          newSites,
          [propOrderBy || 'title'],
          [isDesc ? 'desc' : 'asc']
        );
        setAllSites(copy);
        setIsLoading(false);
      })
      .catch(() => {
        // no-op;
      });
  }, [context, isLoading, mode, limitToCurrentSiteCollection]);

  React.useEffect(() => {
    setAllSites((s) => {
      if (!s) {
        return s;
      }

      const copy = orderBy(
        s,
        [propOrderBy || 'title'],
        [isDesc ? 'desc' : 'asc']
      );
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
        onRenderCaretDown={CustomChevron}
        options={getOptions()}
        selectedKey={
          multiSelect === false && !!sites && !!sites[0] ? sites[0].url : []
        }
        selectedKeys={
          multiSelect !== false && !!sites ? sites.map((s) => s.url) : []
        }
        disabled={disabled}
        multiSelect={multiSelect !== false}
        onRenderOption={onRenderOption}
        onChange={onSelectionChange}
        notifyOnReselect={true}
        className={className}
        styles={props.styles}
      />
    </>
  );
};
