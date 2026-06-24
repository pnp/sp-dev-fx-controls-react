/* eslint-disable no-unmodified-loop-condition */
import { IEvent } from '../models/IEvents';
import { getDateKey, parseCalendarDate } from '../utils/dateUtils';
import { useCallback, } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Use UUID for generating unique IDs

export interface TimeSlot {
  time: string;
  events: IEvent[];
}

export interface DayEvents {
  date: string;
  fullDayEvents: IEvent[]; // Add full-day events for the day
  timeSlots: TimeSlot[];
}

export interface IUseCalendar {
  getMonthCalendar: (
    events: IEvent[],
    year: number,
    month: number
  ) => Record<string, IEvent[]>;

  getWeekEvents: (events: IEvent[], startDate: string) => DayEvents[];
}

export const useCalendar = (timezone: string): IUseCalendar => {
  // Initialize events with a unique ID

  const initializeEventsWithId = useCallback(
    (events: IEvent[]): IEvent[] =>
      events.map(event => ({
        ...event,
        id: event.id || uuidv4(),
      })),
    []
  );

  // Memoized helper for timezone handling
  const toLocalDate = useCallback(
    (dateString: string): Date => {
      return parseCalendarDate(dateString, timezone);
    },
    [timezone]
  );

  // Memoize getMonthCalendar to avoid re-creation unless dependencies change
  const getMonthCalendar = useCallback(
    (
      events: IEvent[],
      year: number,
      month: number
    ): Record<string, IEvent[]> => {
      const eventsWithId = initializeEventsWithId(events);
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const calendarEventsByDay: Record<string, IEvent[]> = {};

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateString = getDateKey(date);
        calendarEventsByDay[dateString] = [];
      }

      eventsWithId.forEach(event => {
        const eventStart = toLocalDate(event.start);
        const eventEnd = toLocalDate(event.end);
        const currentDate = new Date(eventStart);

        while (currentDate <= eventEnd) {
          const dateString = getDateKey(currentDate);
          if (calendarEventsByDay[dateString]) {
            calendarEventsByDay[dateString].push(event);
          }
          currentDate.setDate(currentDate.getDate() + 1);
        }
      });

      return calendarEventsByDay;
    },
    [initializeEventsWithId, toLocalDate]
  );

  // Memoize getWeekEvents to avoid unnecessary re-computation
  const getWeekEvents = useCallback(
    (events: IEvent[], startDate: string): DayEvents[] => {
      const weekEvents: DayEvents[] = [];
      const start = toLocalDate(startDate);
      const eventsWithId = initializeEventsWithId(events);
      for (let i = 0; i < 7; i++) {
        const currentDate = new Date(start);
        currentDate.setDate(start.getDate() + i);
        const dateString = getDateKey(currentDate);

        const dayTimeSlots: TimeSlot[] = Array.from(
          { length: 48 },
          (_, index) => ({
            time: `${String(Math.floor(index / 2)).padStart(2, '0')}:${
              index % 2 === 0 ? '00' : '30'
            }`,
            events: [] as IEvent[],
          })
        );

        const fullDayEvents: IEvent[] = [];

        eventsWithId.forEach(event => {
          const eventStart = toLocalDate(event.start);
          const eventEnd = toLocalDate(event.end);

          if (event.isFullDay) {
            if (
              getDateKey(eventStart) <= dateString &&
              getDateKey(eventEnd) >= dateString
            ) {
              fullDayEvents.push(event);
            }
            return;
          }

          if (
            getDateKey(eventStart) <= dateString &&
            getDateKey(eventEnd) >= dateString
          ) {
            const currentSlot = new Date(eventStart);
            while (currentSlot <= eventEnd) {
              const slotDateString = getDateKey(currentSlot);
              if (slotDateString === dateString) {
                const slotIndex =
                  currentSlot.getHours() * 2 +
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
          fullDayEvents,
          timeSlots: dayTimeSlots,
        });
      }

      return weekEvents;
    },
    [initializeEventsWithId, toLocalDate]
  );

  return {
    getMonthCalendar,

    getWeekEvents,
  };
};

export default useCalendar;
