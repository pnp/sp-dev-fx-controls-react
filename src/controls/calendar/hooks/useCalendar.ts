/* eslint-disable no-unmodified-loop-condition */
import { IEvent } from "../models/IEvents";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid"; // Use UUID for generating unique IDs

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
  getMonthCalendar: (year: number, month: number) => Record<string, IEvent[]>;
  addEvent: (event: IEvent) => void;
  getWeekEvents: (startDate: string) => DayEvents[];
}

export const useCalendar = (initialEvents: IEvent[], timezone: string):IUseCalendar => {
  // Add a unique id to each event on initialization
  const initializeEventsWithId = (events: IEvent[]): IEvent[] => {
    return events.map((event) => ({
      ...event,
      id: event.id || uuidv4(), // Use existing id or generate a new one
    }));
  };

  const [calendarEvents, setCalendarEvents] = useState<IEvent[]>(
    initializeEventsWithId(initialEvents || [])
  );

  // Helper function to handle timezone and daylight savings
  const toLocalDate = (dateString: string): Date => {
    return new Date(
      new Date(dateString).toLocaleString(undefined, { timeZone: timezone })
    );
  };

  // Function to generate all events grouped by day for a specific month
  const getMonthCalendar = (
    year: number,
    month: number
  ): Record<string, IEvent[]> => {
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Days in the given month

    const calendarEventsByDay: Record<string, IEvent[]> = {};

    // Initialize the structure with empty arrays for each day
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split("T")[0];
      calendarEventsByDay[dateString] = [];
    }

    // Loop through events and group them by their start and end dates
    calendarEvents.forEach((event) => {
      const eventStart = toLocalDate(event.start);
      const eventEnd = toLocalDate(event.end);

      const currentDate = new Date(eventStart);

      while (currentDate <= eventEnd) {
        const dateString = currentDate.toISOString().split("T")[0];

        // If the event falls within the month and day, add it to the list
        if (calendarEventsByDay[dateString]) {
          calendarEventsByDay[dateString].push(event);
        }

        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
      }
    });

    return calendarEventsByDay;
  };

  // Function to add a new event
  const addEvent = (event: IEvent): void => {
    const eventWithId: IEvent = {
      ...event,
      id: event.id || uuidv4(), // Add unique id if not provided
    };
    setCalendarEvents((prevEvents) => [...prevEvents, eventWithId]);
  };

  // Function to get events for a specific week
  const getWeekEvents = (startDate: string): DayEvents[] => {
    const weekEvents: DayEvents[] = [];
    const start = toLocalDate(startDate);

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(start);
      currentDate.setDate(start.getDate() + i);
      const dateString = currentDate.toISOString().split("T")[0];

      const dayTimeSlots: TimeSlot[] = Array.from(
        { length: 48 },
        (_, index) => ({
          time: `${String(Math.floor(index / 2)).padStart(2, "0")}:${
            index % 2 === 0 ? "00" : "30"
          }`,
          events: [],
        })
      );

      const fullDayEvents: IEvent[] = [];

      calendarEvents.forEach((event) => {
        const eventStart = toLocalDate(event.start);
        const eventEnd = toLocalDate(event.end);

        if (event.isFullDay) {
          if (
            eventStart.toISOString().split("T")[0] <= dateString &&
            eventEnd.toISOString().split("T")[0] >= dateString
          ) {
            fullDayEvents.push(event);
          }
          return; // Skip further processing for full-day events
        }

        if (
          eventStart.toISOString().split("T")[0] <= dateString &&
          eventEnd.toISOString().split("T")[0] >= dateString
        ) {
          const currentSlot = new Date(eventStart);

          while (currentSlot <= eventEnd) {
            const slotDateString = currentSlot.toISOString().split("T")[0];
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
  };

  return {
    getMonthCalendar,
    addEvent,
    getWeekEvents,
  };
};

export default useCalendar;
