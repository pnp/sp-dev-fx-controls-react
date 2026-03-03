var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import * as React from 'react';
import findIndex from 'lodash/findIndex';
import orderBy from 'lodash/orderBy';
import { Dropdown, SearchBox, Spinner, SpinnerSize, mergeStyleSets, SelectableOptionMenuItemType, Icon } from '@fluentui/react';
import { useAsync } from '@fluentui/react-hooks';
import * as telemetry from '../../common/telemetry';
import { toRelativeUrl } from '../../common/utilities/GeneralHelper';
import { getAllSites, getAssociatedSites, getHubSites, } from '../../services/SPSitesService';
var styles = mergeStyleSets({
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
export var SitePicker = function (props) {
    var label = props.label, disabled = props.disabled, context = props.context, initialSites = props.initialSites, multiSelect = props.multiSelect, mode = props.mode, limitToCurrentSiteCollection = props.limitToCurrentSiteCollection, allowSearch = props.allowSearch, propOrderBy = props.orderBy, isDesc = props.isDesc, onChange = props.onChange, placeholder = props.placeholder, searchPlaceholder = props.searchPlaceholder, deferredSearchTime = props.deferredSearchTime, className = props.className, selectedSites = props.selectedSites, trimDuplicates = props.trimDuplicates, additionalQuery = props.additionalQuery, hubsiteId = props.hubsiteId;
    var _a = React.useState(), isLoading = _a[0], setIsLoading = _a[1];
    var _b = React.useState(), sites = _b[0], setSites = _b[1];
    var _c = React.useState(), allSites = _c[0], setAllSites = _c[1];
    var _d = React.useState(), filteredSites = _d[0], setFilteredSites = _d[1];
    var _e = React.useState(), searchQuery = _e[0], setSearchQuery = _e[1];
    var async = useAsync();
    var onSearchChange = React.useCallback(function (e, newSearchQuery) {
        if (!allSites) {
            return;
        }
        var loweredNewSearchQuery = newSearchQuery.toLowerCase();
        var newFilteredSites = allSites.filter(function (s) {
            return s.title && s.title.toLowerCase().indexOf(loweredNewSearchQuery) !== -1;
        });
        setSearchQuery(newSearchQuery);
        setFilteredSites(newFilteredSites);
    }, [allSites]);
    var clearItems = React.useCallback(function (event) {
        event.stopPropagation();
        return setSites([]);
    }, [sites]);
    var CustomChevron = function () {
        if (sites && sites.length > 0) {
            return (React.createElement("div", { className: styles.customChevronContainer },
                React.createElement(Icon, { iconName: "Cancel", onClick: clearItems }),
                React.createElement(Icon, { iconName: "ChevronDown" })));
        }
        return (React.createElement("div", { className: styles.customChevronContainer },
            React.createElement(Icon, { iconName: "ChevronDown" })));
    };
    var onSelectionChange = React.useCallback(function (e, item, index) {
        var newSelectedSites = [];
        if (multiSelect !== false) {
            newSelectedSites = sites ? __spreadArray([], sites, true) : [];
            var existingIndex = findIndex(newSelectedSites, function (s) { return s.url === item.key; });
            if (existingIndex >= 0) {
                newSelectedSites.splice(existingIndex, 1);
            }
            else if (item.data) {
                newSelectedSites.push(__assign({}, item.data));
            }
        }
        else if (item.data) {
            newSelectedSites = [
                __assign({}, item.data),
            ];
        }
        if (onChange) {
            onChange(newSelectedSites);
        }
        setSites(newSelectedSites);
        //console.log(`onselction change set sites to ${newSelectedSites[0].title}`);
    }, [sites, multiSelect, onChange]);
    var getOptions = React.useCallback(function () {
        if (!allSites) {
            return [
                {
                    key: 'spinner',
                    text: '',
                    itemType: SelectableOptionMenuItemType.Header,
                },
            ];
        }
        var result = [];
        if (allowSearch !== false) {
            result.push({
                key: 'search',
                text: '',
                itemType: SelectableOptionMenuItemType.Header,
            });
        }
        var selectedSitesIds = sites ? sites.map(function (s) { return s.url; }) : [];
        if (filteredSites) {
            filteredSites.forEach(function (s) {
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
    var onRenderOption = function (option, defaultRender) {
        if (!props) {
            return null;
        }
        if (option.itemType === SelectableOptionMenuItemType.Header) {
            if (option.key === 'search') {
                return (React.createElement(SearchBox, { placeholder: searchPlaceholder, value: searchQuery, onChange: async.debounce(onSearchChange, deferredSearchTime || 200), className: styles.searchBox }));
            }
            else if (option.key === 'spinner') {
                //
                // This happens when the dropdown is opened for the first time.
                // That's when we want to load the sites
                //
                setIsLoading(true);
                return (React.createElement("div", { className: styles.loadingSpinnerContainer },
                    React.createElement(Spinner, { size: SpinnerSize.medium })));
            }
        }
        // {multiSelect !== false && <Checkbox className={styles.siteOptionCheckbox} checked={option.selected} disabled={option.disabled} />}
        return (React.createElement("div", { className: styles.siteOption },
            React.createElement("div", { className: styles.siteOptionContent },
                React.createElement("span", { className: styles.siteOptionTitle }, option.text),
                React.createElement("span", { className: styles.siteOptionUrl }, toRelativeUrl(option.data ? option.data.url : '')))));
    };
    React.useEffect(function () {
        telemetry.track('ReactSitePicker');
    }, []);
    React.useEffect(function () {
        setSites(selectedSites);
        // console.log(`firt useeffect set sites to ${selectedSites[0].title}`);
        if (!allSites) {
            setIsLoading(true);
        }
    }, [selectedSites]);
    React.useEffect(function () {
        if (!initialSites) {
            return;
        }
        setSites(function (osites) {
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
    React.useEffect(function () {
        if (!context || !isLoading) {
            return;
        }
        setSearchQuery('');
        setFilteredSites([]);
        var promise;
        switch (mode) {
            case 'hub':
                promise = getHubSites(context);
                break;
            case 'associatedsites':
                promise = getAssociatedSites(context, trimDuplicates === true, hubsiteId);
                break;
            default:
                promise = getAllSites(context, mode !== 'site', limitToCurrentSiteCollection, trimDuplicates === true, additionalQuery);
                break;
        }
        promise
            .then(function (newSites) {
            var copy = orderBy(newSites, [propOrderBy || 'title'], [isDesc ? 'desc' : 'asc']);
            setAllSites(copy);
            setIsLoading(false);
        })
            .catch(function () {
            // no-op;
        });
    }, [context, isLoading, mode, limitToCurrentSiteCollection]);
    React.useEffect(function () {
        setAllSites(function (s) {
            if (!s) {
                return s;
            }
            var copy = orderBy(s, [propOrderBy || 'title'], [isDesc ? 'desc' : 'asc']);
            return copy;
        });
    }, [propOrderBy, isDesc]);
    React.useEffect(function () {
        if (!allSites) {
            return;
        }
        setFilteredSites(__spreadArray([], allSites, true));
    }, [allSites]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Dropdown, { label: label, placeholder: placeholder, onRenderCaretDown: CustomChevron, options: getOptions(), selectedKey: multiSelect === false && !!sites && !!sites[0] ? sites[0].url : [], selectedKeys: multiSelect !== false && !!sites ? sites.map(function (s) { return s.url; }) : [], disabled: disabled, multiSelect: multiSelect !== false, onRenderOption: onRenderOption, onChange: onSelectionChange, notifyOnReselect: true, className: className, styles: props.styles })));
};
//# sourceMappingURL=SitePicker.js.map