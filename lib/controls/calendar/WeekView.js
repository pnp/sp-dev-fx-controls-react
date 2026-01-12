import * as React from 'react';
import { Body1, Body1Strong, Caption1Strong, Text, mergeClasses, } from '@fluentui/react-components';
import { addDays, format, isToday, startOfWeek } from 'date-fns';
import { useEffect, useRef, useState } from 'react';
import { EventRenderer } from './EventRender';
import { ResizeObserver } from '@juggle/resize-observer';
import strings from 'ControlStrings';
import { useCalendar } from './hooks/useCalendar';
import { useUtils } from './hooks/useUtils';
import { useWeekViewStyles } from './hooks/useWeekViewStyles';
export var WeekView = function (props) {
    var events = props.events, currentDay = props.currentDay, height = props.height;
    var styles = useWeekViewStyles().styles;
    var currentDate = useState(currentDay)[0];
    var _a = useState(32), rowHeight = _a[0], setRowHeight = _a[1]; // Default row height
    var calendarRef = useRef(null);
    var _b = useUtils(), getSpanSlots = _b.getSpanSlots, getEventColors = _b.getEventColors, getCalendarColors = _b.getCalendarColors, formatDate = _b.formatDate;
    var weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var getWeekEvents = useCalendar(timeZone).getWeekEvents;
    // Dynamic row height calculation using ResizeObserver
    useEffect(function () {
        var observer = new ResizeObserver(function () {
            if (calendarRef.current) {
                var firstRowCell = calendarRef.current.querySelector('.dayCell');
                if (firstRowCell) {
                    setRowHeight(firstRowCell.offsetHeight);
                }
            }
        });
        if (calendarRef.current) {
            observer.observe(calendarRef.current);
        }
        return function () {
            observer.disconnect();
        };
    }, []);
    var renderTimeColumn = React.useCallback(function () {
        return Array.from({ length: 24 }, function (_, hour) { return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.timeCell },
                React.createElement(Body1Strong, null,
                    " ",
                    hour,
                    ":00 ")),
            React.createElement("div", { className: styles.timeCell }))); });
    }, []);
    var renderDayHeaders = React.useCallback(function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.blankHeader }),
            Array.from({ length: 7 }, function (_, dayIndex) {
                var day = addDays(weekStart, dayIndex);
                var isTodayClass = isToday(day) ? styles.todayHeaderCell : '';
                return (React.createElement("div", { key: dayIndex, className: mergeClasses(styles.dayHeaderCell, isTodayClass) },
                    React.createElement(Text, { weight: "regular", size: 600, style: { paddingRight: 10 } }, formatDate(day.toISOString(), 'dd')),
                    React.createElement(Body1, null, formatDate(day.toISOString(), 'EEE'))));
            })));
    }, [weekStart, styles]);
    var renderFullDayEvents = React.useCallback(function () {
        var weekEvents = getWeekEvents(events, weekStart.toISOString());
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.fullDayLabel },
                React.createElement(Body1, null, strings.CalendarControlFullDaylabel)),
            Array.from({ length: 7 }, function (_, dayIndex) {
                var weekDay = formatDate(addDays(weekStart, dayIndex).toISOString(), 'yyyy-MM-dd');
                var dayEvents = weekEvents.find(function (day) { return day.date === weekDay; });
                var fullDayEvents = (dayEvents === null || dayEvents === void 0 ? void 0 : dayEvents.fullDayEvents) || [];
                return (React.createElement("div", { key: dayIndex, className: styles.fullDayCell }, fullDayEvents.map(function (event) { return (React.createElement("div", { key: event.id, className: styles.fullDayEvent, style: {
                        gridColumn: "".concat(dayIndex + 2), // Position event in the correct day column
                        backgroundColor: event.color
                            ? getCalendarColors(event.color).backgroundColor
                            : getEventColors(event.category).backgroundColor,
                    } },
                    React.createElement(Caption1Strong, { className: styles.eventTitle }, event.title))); })));
            })));
    }, [
        weekStart,
        styles,
        getWeekEvents,
        getCalendarColors,
        getEventColors,
        events,
    ]);
    var renderDayCells = React.useCallback(function () {
        var weekEvents = getWeekEvents(events, weekStart.toISOString());
        return Array.from({ length: 7 }, function (_, dayIndex) {
            var weekDay = format(addDays(weekStart, dayIndex), 'yyyy-MM-dd');
            var dayEvents = weekEvents.find(function (day) { return day.date === weekDay; });
            return (React.createElement(React.Fragment, null, dayEvents === null || dayEvents === void 0 ? void 0 : dayEvents.timeSlots.map(function (timeSlot, slotIndex) {
                var eventCount = timeSlot.events.length; // Total events in the slot
                return (React.createElement("div", { key: slotIndex, className: styles.dayCell, style: {
                        gridRow: slotIndex + 3, // Offset to account for header and full-day row
                    } }, timeSlot.events.map(function (event, eventIndex) {
                    var startDate = new Date(event.start);
                    var endDate = new Date(event.end);
                    // Calculate the start and end slots based on event times
                    var _a = getSpanSlots(startDate, endDate), spanSlots = _a.spanSlots, startSlot = _a.startSlot;
                    // Only render the event in its starting timeslot
                    if (slotIndex === startSlot) {
                        // Event Render
                        return (React.createElement(EventRenderer, { key: event.id, event: event, eventCount: eventCount, spanSlots: spanSlots, rowHeight: rowHeight, eventIndex: eventIndex, view: "week" }));
                    }
                    return null; // Skip rendering for non-starting slots
                })));
            })));
        });
    }, [weekStart, styles, getWeekEvents, getSpanSlots, rowHeight, events]);
    return (React.createElement("div", { className: styles.container, style: { height: height } },
        React.createElement("div", { ref: calendarRef, className: styles.weekGrid },
            React.createElement("div", { className: styles.timeColumn }, renderTimeColumn()),
            renderDayHeaders(),
            renderFullDayEvents(),
            renderDayCells())));
};
export default WeekView;
//# sourceMappingURL=WeekView.js.map