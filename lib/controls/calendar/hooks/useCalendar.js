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
import { useCallback, } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Use UUID for generating unique IDs
export var useCalendar = function (timezone) {
    // Initialize events with a unique ID
    var initializeEventsWithId = useCallback(function (events) {
        return events.map(function (event) { return (__assign(__assign({}, event), { id: event.id || uuidv4() })); });
    }, []);
    // Memoized helper for timezone handling
    var toLocalDate = useCallback(function (dateString) {
        return new Date(new Date(dateString).toLocaleString(undefined, { timeZone: timezone }));
    }, [timezone]);
    // Memoize getMonthCalendar to avoid re-creation unless dependencies change
    var getMonthCalendar = useCallback(function (events, year, month) {
        var eventsWithId = initializeEventsWithId(events);
        var daysInMonth = new Date(year, month + 1, 0).getDate();
        var calendarEventsByDay = {};
        for (var day = 1; day <= daysInMonth; day++) {
            var date = new Date(year, month, day);
            var dateString = date.toISOString().split('T')[0];
            calendarEventsByDay[dateString] = [];
        }
        eventsWithId.forEach(function (event) {
            var eventStart = toLocalDate(event.start);
            var eventEnd = toLocalDate(event.end);
            var currentDate = new Date(eventStart);
            while (currentDate <= eventEnd) {
                var dateString = currentDate.toISOString().split('T')[0];
                if (calendarEventsByDay[dateString]) {
                    calendarEventsByDay[dateString].push(event);
                }
                currentDate.setDate(currentDate.getDate() + 1);
            }
        });
        return calendarEventsByDay;
    }, [toLocalDate]);
    // Memoize getWeekEvents to avoid unnecessary re-computation
    var getWeekEvents = useCallback(function (events, startDate) {
        var weekEvents = [];
        var start = toLocalDate(startDate);
        var eventsWithId = initializeEventsWithId(events);
        var _loop_1 = function (i) {
            var currentDate = new Date(start);
            currentDate.setDate(start.getDate() + i);
            var dateString = currentDate.toISOString().split('T')[0];
            var dayTimeSlots = Array.from({ length: 48 }, function (_, index) { return ({
                time: "".concat(String(Math.floor(index / 2)).padStart(2, '0'), ":").concat(index % 2 === 0 ? '00' : '30'),
                events: [],
            }); });
            var fullDayEvents = [];
            eventsWithId.forEach(function (event) {
                var eventStart = toLocalDate(event.start);
                var eventEnd = toLocalDate(event.end);
                if (event.isFullDay) {
                    if (eventStart.toISOString().split('T')[0] <= dateString &&
                        eventEnd.toISOString().split('T')[0] >= dateString) {
                        fullDayEvents.push(event);
                    }
                    return;
                }
                if (eventStart.toISOString().split('T')[0] <= dateString &&
                    eventEnd.toISOString().split('T')[0] >= dateString) {
                    var currentSlot = new Date(eventStart);
                    while (currentSlot <= eventEnd) {
                        var slotDateString = currentSlot.toISOString().split('T')[0];
                        if (slotDateString === dateString) {
                            var slotIndex = currentSlot.getHours() * 2 +
                                (currentSlot.getMinutes() >= 30 ? 1 : 0);
                            if (dayTimeSlots[slotIndex]) {
                                dayTimeSlots[slotIndex].events.push(event);
                            }
                        }
                        currentSlot.setMinutes(currentSlot.getMinutes() + 30);
                    }
                }
            });
            weekEvents.push({
                date: dateString,
                fullDayEvents: fullDayEvents,
                timeSlots: dayTimeSlots,
            });
        };
        for (var i = 0; i < 7; i++) {
            _loop_1(i);
        }
        return weekEvents;
    }, [toLocalDate]);
    return {
        getMonthCalendar: getMonthCalendar,
        getWeekEvents: getWeekEvents,
    };
};
export default useCalendar;
//# sourceMappingURL=useCalendar.js.map