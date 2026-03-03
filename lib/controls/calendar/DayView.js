import * as React from 'react';
import { Body1, Body1Strong, Caption1Strong, Subtitle1, Text, mergeClasses, } from '@fluentui/react-components';
import { addDays, format, isToday } from 'date-fns';
import { EventRenderer } from './EventRender';
import { useCalendar } from './hooks/useCalendar';
import { useDayViewStyles } from './hooks/useDayViewStyles';
import { useRef, } from 'react';
import { useUtils } from './hooks/useUtils';
var ROW_HEIGHT = 33;
export var DayView = function (props) {
    var events = props.events, currentDay = props.currentDay, height = props.height;
    var styles = useDayViewStyles().styles;
    var calendarRef = useRef(null);
    var _a = useUtils(), getSpanSlots = _a.getSpanSlots, getEventColors = _a.getEventColors, getCalendarColors = _a.getCalendarColors;
    var timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    var getWeekEvents = useCalendar(timeZone).getWeekEvents;
    var renderTimeColumn = React.useCallback(function () {
        return Array.from({ length: 24 }, function (_, hour) { return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.timeCell },
                React.createElement(Body1Strong, null,
                    " ",
                    hour,
                    ":00 ")),
            React.createElement("div", { className: styles.timeCell }))); });
    }, [styles.timeCell]);
    var renderDayHeaders = React.useCallback(function () {
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.blankHeader }),
            Array.from({ length: 1 }, function (_, dayIndex) {
                var day = addDays(currentDay, dayIndex);
                var isTodayClass = isToday(day) ? styles.todayHeaderCell : '';
                return (React.createElement("div", { key: dayIndex, className: mergeClasses(styles.dayHeaderCell, isTodayClass) },
                    React.createElement(Text, { weight: "semibold", size: 600, style: { paddingRight: 10 } }, format(day, 'dd')),
                    React.createElement(Subtitle1, null, format(day, 'LLLL, yyyy'))));
            })));
    }, [
        currentDay,
        styles.blankHeader,
        styles.dayHeaderCell,
        styles.todayHeaderCell,
    ]);
    var renderFullDayEvents = React.useCallback(function () {
        var weekEvents = getWeekEvents(events, currentDay.toISOString());
        return (React.createElement(React.Fragment, null,
            React.createElement("div", { className: styles.fullDayLabel },
                React.createElement(Body1, null, "All Day")),
            Array.from({ length: 1 }, function (_, dayIndex) {
                var weekDay = format(addDays(currentDay, dayIndex), 'yyyy-MM-dd');
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
        currentDay,
        getWeekEvents,
        styles.fullDayCell,
        styles.fullDayEvent,
        styles.fullDayLabel,
        styles.eventTitle,
        getCalendarColors,
        getEventColors,
    ]);
    // Render the events for the current day
    var renderDayCells = React.useCallback(function () {
        var weekEvents = getWeekEvents(events, currentDay.toISOString());
        // Render the events for the current day
        return Array.from({ length: 1 }, function (_, dayIndex) {
            var weekDay = format(addDays(currentDay, dayIndex), 'yyyy-MM-dd');
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
                        return (React.createElement(EventRenderer, { key: event.id, event: event, eventCount: eventCount, spanSlots: spanSlots, rowHeight: ROW_HEIGHT, eventIndex: eventIndex, view: "day" }));
                    }
                    return null; // Skip rendering for non-starting slots
                })));
            })));
        });
    }, [currentDay, getSpanSlots, getWeekEvents, styles.dayCell]);
    return (React.createElement("div", { className: styles.container, style: { height: height } },
        React.createElement("div", { ref: calendarRef, className: styles.dayGrid },
            React.createElement("div", { className: styles.timeColumn }, renderTimeColumn()),
            renderDayHeaders(),
            renderFullDayEvents(),
            renderDayCells())));
};
export default DayView;
//# sourceMappingURL=DayView.js.map