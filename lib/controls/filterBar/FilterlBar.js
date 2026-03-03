import * as React from 'react';
import styles from "./FilterBar.module.scss";
import { PillGroup } from './PillGroup';
import { Pill } from './Pill';
import { OverflowPill } from './OverflowPill';
import * as strings from "ControlStrings";
import { findLastIndex, uniq } from "lodash";
import { ThemeProvider } from '@fluentui/react/lib/Theme';
import { getTheme } from '@fluentui/react/lib/Styling';
export var FilterBar = function (props) {
    var orderedArray = function (arr) {
        var ret = [];
        arr.map(function (i) {
            var index = findLastIndex(ret, function (r) { return r.label === i.label; });
            if (index > -1) {
                ret.splice(index + 1, 0, i);
            }
            else {
                ret.push(i);
            }
        });
        return ret;
    };
    var groupItems = function (itms) { return itms.reduce(function (acc, itm) {
        var label = itm.label;
        var obj = acc.find(function (i) { return i.label === label; });
        if (!obj) {
            obj = {
                label: label,
                values: [itm.value]
            };
            acc.push(obj);
        }
        else {
            if (!obj.values.find(function (v) { return v === itm.value; })) {
                obj.values.push(itm.value);
            }
        }
        return acc;
    }, []); };
    var clearAll = function () {
        if (props.onClearFilters) {
            props.onClearFilters();
        }
    };
    var pillClick = function (label, value) {
        console.log(label, value);
        if (props.onRemoveFilter) {
            props.onRemoveFilter(label, value);
        }
    };
    //const [items, setItems] = React.useState());
    var defaultInlineItemCount = 5;
    var _a = React.useState(defaultInlineItemCount), inlineCount = _a[0], setInlineCount = _a[1];
    var groupedItems = React.useMemo(function () { return groupItems(orderedArray(uniq(props.items))); }, [props.items]);
    React.useEffect(function () {
        var _a;
        setInlineCount((_a = props.inlineItemCount) !== null && _a !== void 0 ? _a : defaultInlineItemCount);
    }, [props.inlineItemCount]);
    return (React.createElement(React.Fragment, null,
        React.createElement(ThemeProvider, { theme: getTheme() }, groupedItems && groupedItems.length > 0 && (React.createElement("div", { className: styles.container, "aria-label": strings.AppliedFiltersAriaLabel, role: 'region' },
            groupedItems.slice(0, inlineCount).map(function (i, index) { return React.createElement(PillGroup, { item: i, key: index, onRemoveFilter: pillClick }); }),
            groupedItems.length > inlineCount && (React.createElement(OverflowPill, { items: groupedItems.slice(inlineCount), onClick: pillClick })),
            React.createElement(Pill, { clearAll: true, onClick: clearAll }))))));
};
//# sourceMappingURL=FilterlBar.js.map