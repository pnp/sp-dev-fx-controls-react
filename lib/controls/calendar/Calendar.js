import * as React from 'react';
import { Body1, FluentProvider, IdPrefixProvider, webLightTheme, } from '@fluentui/react-components';
import { useCalendarStyles } from './hooks/useCalendarStyles';
import { addDays, startOfMonth, startOfWeek, format } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { Day } from './Day';
import DayView from './DayView';
import { ECalendarViews } from './models/ECalendarViews';
import { ResizeObserver } from '@juggle/resize-observer';
import { Stack } from '@nuvemerudita/react-controls';
import Toolbar from './Toolbar';
import WeekView from './WeekView';
import strings from 'ControlStrings';
import { useCalendar } from './hooks/useCalendar';
var daysOfWeek = [
    strings.CalendarControlDayOfWeekSunday,
    strings.CalendarControlDayOfWeekMonday,
    strings.CalendarControlDayOfWeekTuesday,
    strings.CalendarControlDayOfWeekWednesday,
    strings.CalendarControlDayOfWeekThursday,
    strings.CalendarControlDayOfWeekFriday,
    strings.CalendarControlDayOfWeekSaturday,
];
var RenderMonthView = React.memo(function (_a) {
    var currentDate = _a.currentDate, rowHeight = _a.rowHeight, getCalendarDays = _a.getCalendarDays, getEventsForDay = _a.getEventsForDay, styles = _a.styles, onDaySlotClick = _a.onDaySlotClick, height = _a.height, calendarRef = _a.calendarRef;
    return (React.createElement(Stack, { height: height, width: "100%", verticalAlign: "start", horizontalAlign: "start" },
        React.createElement("div", { className: styles.calendarWrapper, ref: calendarRef },
            daysOfWeek.map(function (day) { return (React.createElement(Body1, { key: day, className: styles.dayHeader }, day)); }),
            getCalendarDays(currentDate).map(function (dateObj, index) {
                var day = dateObj.day, currentMonth = dateObj.currentMonth;
                var dayEvents = currentMonth ? getEventsForDay(dateObj) : [];
                return (React.createElement(Day, { key: index, day: day, date: dateObj.date, currentMonth: dateObj.currentMonth, events: dayEvents, columnHeight: rowHeight || 0, onDayClick: onDaySlotClick }));
            }))));
});
var RenderWeekView = React.memo(function (_a) {
    var events = _a.events, currentDay = _a.currentDay, height = _a.height;
    return React.createElement(WeekView, { events: events, currentDay: currentDay, height: height });
});
var RenderDayView = React.memo(function (_a) {
    var events = _a.events, currentDay = _a.currentDay, height = _a.height;
    return React.createElement(DayView, { currentDay: currentDay, events: events, height: height });
});
export var Calendar = function (_a) {
    var events = _a.events, _b = _a.height, height = _b === void 0 ? 800 : _b, theme = _a.theme, onDayChange = _a.onDayChange, onMonthChange = _a.onMonthChange, onWeekChange = _a.onWeekChange, onViewChange = _a.onViewChange, onDaySlotClick = _a.onDaySlotClick, defaultView = _a.defaultView;
    var styles = useCalendarStyles().styles;
    var calendarRef = useRef(null);
    var _c = useState(null), rowHeight = _c[0], setRowHeight = _c[1];
    var totalDisplayedDays = 42;
    var rowHeightRef = useRef(0);
    // Default current date
    var _d = useState(new Date()), currentDate = _d[0], setCurrentDate = _d[1];
    // Default view
    var _e = useState(defaultView !== null && defaultView !== void 0 ? defaultView : ECalendarViews.Month), selectedView = _e[0], setSelectedView = _e[1];
    var getMonthCalendar = useCalendar(Intl.DateTimeFormat().resolvedOptions().timeZone).getMonthCalendar;
    var getCalendarDays = React.useCallback(function (date) {
        var month = date.getMonth();
        var firstDayOfMonth = startOfMonth(date);
        var firstDayOfWeek = startOfWeek(firstDayOfMonth);
        var calendarDays = Array.from({ length: totalDisplayedDays }, function (_, index) {
            var relativeDay = addDays(firstDayOfWeek, index);
            return {
                day: relativeDay.getDate(),
                currentMonth: relativeDay.getMonth() === month,
                date: relativeDay,
            };
        });
        return calendarDays;
    }, []);
    var handleMonthChange = React.useCallback(function (date) {
        if (onMonthChange) {
            onMonthChange(date);
        }
        setCurrentDate(date);
    }, [onMonthChange]);
    var handleDayChange = React.useCallback(function (date) {
        if (onDayChange) {
            onDayChange(date);
        }
        setCurrentDate(date);
    }, [onDayChange]);
    var handleWeekChange = React.useCallback(function (date) {
        if (onWeekChange) {
            onWeekChange(date);
        }
        setCurrentDate(date);
    }, [onWeekChange]);
    var handleViewChange = React.useCallback(function (view) {
        if (onViewChange) {
            onViewChange(view);
        }
        setSelectedView(view);
    }, [onViewChange]);
    var getEventsForDay = React.useCallback(function (dateObj) {
        var _a;
        var date = dateObj.date;
        var monthEvents = getMonthCalendar(events, currentDate.getFullYear(), currentDate.getMonth());
        var dayString = format(date, 'yyyy-MM-dd');
        var dayEvents = ((_a = monthEvents[dayString]) === null || _a === void 0 ? void 0 : _a.flatMap(function (slot) { return slot; })) || [];
        return dayEvents;
    }, [currentDate, events]);
    useEffect(function () {
        var handleResize = function () {
            if (calendarRef.current) {
                requestAnimationFrame(function () {
                    if (calendarRef.current) {
                        var firstDataColumnCell = calendarRef.current.querySelector(".".concat(styles.calendarWrapper, " > div:nth-child(8)"));
                        if (firstDataColumnCell) {
                            setRowHeight(firstDataColumnCell.offsetHeight);
                            rowHeightRef.current = firstDataColumnCell.offsetHeight;
                        }
                    }
                });
            }
        };
        var observer = new ResizeObserver(handleResize);
        if (calendarRef.current) {
            observer.observe(calendarRef.current);
        }
        handleResize();
        window.addEventListener('resize', handleResize);
        return function () {
            observer.disconnect();
            window.removeEventListener('resize', handleResize);
        };
    }, [styles.calendarWrapper]);
    useEffect(function () {
        setSelectedView(defaultView !== null && defaultView !== void 0 ? defaultView : ECalendarViews.Month);
    }, [defaultView]);
    var RenderContent = React.useCallback(function () {
        switch (selectedView) {
            case ECalendarViews.Month:
                return (React.createElement(RenderMonthView, { events: events, currentDate: currentDate, rowHeight: rowHeight, getCalendarDays: getCalendarDays, getEventsForDay: getEventsForDay, styles: styles, onDaySlotClick: onDaySlotClick, height: height, calendarRef: calendarRef }));
            case ECalendarViews.Week:
                return (React.createElement(RenderWeekView, { events: events, currentDay: currentDate, height: height }));
            case ECalendarViews.Day:
                return (React.createElement(RenderDayView, { events: events, currentDay: currentDate, height: height }));
            default:
                return (React.createElement(RenderMonthView, { events: events, currentDate: currentDate, rowHeight: rowHeight, getCalendarDays: getCalendarDays, getEventsForDay: getEventsForDay, styles: styles, onDaySlotClick: onDaySlotClick, height: height, calendarRef: calendarRef }));
        }
    }, [
        selectedView,
        events,
        currentDate,
        rowHeight,
        getCalendarDays,
        getEventsForDay,
        styles,
        onDaySlotClick,
        height,
    ]);
    return (React.createElement(IdPrefixProvider, { value: "calendarControl-" },
        React.createElement(FluentProvider, { theme: theme !== null && theme !== void 0 ? theme : webLightTheme },
            React.createElement(Stack, { height: "100%", verticalAlign: "start" },
                React.createElement(Toolbar, { selectedView: selectedView, onSelectedView: handleViewChange, currentDate: currentDate, setCurrentDate: setCurrentDate, onWeekChange: handleWeekChange, onMonthChange: handleMonthChange, onDayChange: handleDayChange }),
                React.createElement(RenderContent, null)))));
};
export default Calendar;
//# sourceMappingURL=Calendar.js.map