import * as React from 'react';
import { CalendarDayFilled, CalendarDayRegular, CalendarMonthFilled, CalendarMonthRegular, CalendarWorkWeekFilled, CalendarWorkWeekRegular, bundleIcon, } from '@fluentui/react-icons';
import { Menu, MenuButton, MenuItemRadio, MenuList, MenuPopover, MenuTrigger, } from '@fluentui/react-components';
import { ECalendarViews } from './models/ECalendarViews';
import strings from 'ControlStrings';
export var SelectCalendarView = function (props) {
    var onSelected = props.onSelected, value = props.value;
    // State for selected view
    var _a = React.useState(value !== null && value !== void 0 ? value : ECalendarViews.Month), selectedView = _a[0], setSelectedView = _a[1];
    var _b = React.useState({
        view: [value !== null && value !== void 0 ? value : ECalendarViews.Month],
    }), checkedValues = _b[0], setCheckedValues = _b[1];
    var DayView = React.useMemo(function () { return bundleIcon(CalendarDayFilled, CalendarDayRegular); }, []);
    var MonthView = React.useMemo(function () { return bundleIcon(CalendarMonthFilled, CalendarMonthRegular); }, []);
    var WeekView = React.useMemo(function () { return bundleIcon(CalendarWorkWeekFilled, CalendarWorkWeekRegular); }, []);
    React.useEffect(function () {
        if (value !== undefined) {
            setSelectedView(value);
            setCheckedValues({ view: [value] });
        }
    }, [value]);
    var _c = React.useState(false), open = _c[0], setOpen = _c[1];
    var onOpenChange = React.useCallback(function (_e, data) {
        setOpen(data.open);
    }, []);
    var viewIcon = React.useCallback(function () {
        switch (selectedView) {
            case ECalendarViews.Month:
                return React.createElement(MonthView, null);
            case ECalendarViews.Week:
                return React.createElement(WeekView, null);
            case ECalendarViews.Day:
                return React.createElement(DayView, null);
            default:
                return React.createElement(MonthView, null);
        }
    }, [selectedView]);
    var getViewLabel = React.useCallback(function (view) {
        switch (view) {
            case ECalendarViews.Month:
                return strings.CalendarControlViewMonthLabel;
            case ECalendarViews.Week:
                return strings.CalendarControlViewWeekLabel;
            case ECalendarViews.Day:
                return strings.CalendarControlViewDayLabel;
            default:
                return strings.CalendarControlViewMonthLabel;
        }
    }, []);
    var onCheckedValueChange = React.useCallback(function (_e, _a) {
        var name = _a.name, checkedItems = _a.checkedItems;
        if (name === 'view') {
            var newView = checkedItems[0];
            setSelectedView(newView);
            setCheckedValues({ view: checkedItems });
            onSelected(newView);
        }
    }, [onSelected]);
    return (React.createElement(React.Fragment, null,
        React.createElement(Menu, { open: open, onOpenChange: onOpenChange },
            React.createElement(MenuTrigger, { disableButtonEnhancement: true },
                React.createElement(MenuButton, { shape: "circular", icon: viewIcon(), style: { minWidth: '150px' } }, getViewLabel(selectedView))),
            React.createElement(MenuPopover, null,
                React.createElement(MenuList, { onCheckedValueChange: onCheckedValueChange, checkedValues: checkedValues },
                    React.createElement(MenuItemRadio, { icon: React.createElement(DayView, null), name: "view", value: ECalendarViews.Day }, strings.CalendarControlViewDayLabel),
                    React.createElement(MenuItemRadio, { icon: React.createElement(WeekView, null), name: "view", value: ECalendarViews.Week }, strings.CalendarControlViewWeekLabel),
                    React.createElement(MenuItemRadio, { icon: React.createElement(MonthView, null), name: "view", value: ECalendarViews.Month }, strings.CalendarControlViewMonthLabel))))));
};
//# sourceMappingURL=SelectCalendarView.js.map