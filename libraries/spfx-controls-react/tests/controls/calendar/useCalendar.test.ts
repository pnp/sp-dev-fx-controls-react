/**
 * @jest-environment jsdom
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { act } from 'react-dom/test-utils';

import { IEvent } from '../../../src/controls/calendar/models/IEvents';
import { IUseCalendar, useCalendar } from '../../../src/controls/calendar/hooks/useCalendar';

interface ICalendarHookProbeProps {
  timeZone: string;
  onCalendarReady: (calendar: IUseCalendar) => void;
}

const CalendarHookProbe: React.FC<ICalendarHookProbeProps> = ({
  timeZone,
  onCalendarReady,
}: ICalendarHookProbeProps) => {
  onCalendarReady(useCalendar(timeZone));
  return null;
};

const createCalendar = (timeZone: string): IUseCalendar => {
  let calendar: IUseCalendar | undefined;
  const container = document.createElement('div');

  document.body.appendChild(container);

  act(() => {
    ReactDOM.render(
      React.createElement(CalendarHookProbe, {
        timeZone,
        onCalendarReady: (calendarApi: IUseCalendar) => {
          calendar = calendarApi;
        },
      }),
      container
    );
  });

  ReactDOM.unmountComponentAtNode(container);
  container.remove();

  return calendar as IUseCalendar;
};

const createEvent = (
  id: string,
  start: string,
  end: string,
  isFullDay: boolean = false
): IEvent => ({
  id,
  title: id,
  start,
  end,
  isFullDay,
  category: 'Meeting',
});

describe('useCalendar timezone event handling', () => {
  it.each([
    {
      timeZone: 'Pacific/Honolulu',
      event: createEvent('honolulu-previous-day', '2025-02-15T09:30:00Z', '2025-02-15T10:00:00Z'),
      year: 2025,
      month: 1,
      expectedDate: '2025-02-14',
    },
    {
      timeZone: 'America/New_York',
      event: createEvent('new-york-dst-start', '2025-03-09T06:30:00Z', '2025-03-09T07:00:00Z'),
      year: 2025,
      month: 2,
      expectedDate: '2025-03-09',
    },
    {
      timeZone: 'Europe/London',
      event: createEvent('london-dst-end', '2025-10-26T01:30:00Z', '2025-10-26T02:00:00Z'),
      year: 2025,
      month: 9,
      expectedDate: '2025-10-26',
    },
    {
      timeZone: 'Asia/Kolkata',
      event: createEvent('kolkata-next-day', '2025-02-14T18:45:00Z', '2025-02-14T19:15:00Z'),
      year: 2025,
      month: 1,
      expectedDate: '2025-02-15',
    },
    {
      timeZone: 'Australia/Sydney',
      event: createEvent('sydney-aest-local', '2025-02-15T10:00:00', '2025-02-15T11:00:00'),
      year: 2025,
      month: 1,
      expectedDate: '2025-02-15',
    },
    {
      timeZone: 'Pacific/Kiritimati',
      event: createEvent('kiritimati-next-day', '2025-02-14T11:30:00Z', '2025-02-14T12:00:00Z'),
      year: 2025,
      month: 1,
      expectedDate: '2025-02-15',
    },
  ])('buckets an event on the correct local day for $timeZone', ({ timeZone, event, year, month, expectedDate }) => {
    const calendar = createCalendar(timeZone);

    const monthCalendar = calendar.getMonthCalendar([event], year, month);

    expect(monthCalendar[expectedDate].map((calendarEvent) => calendarEvent.id)).toContain(event.id);
  });

  it('places local ISO events in the expected AEST weekly time slot', () => {
    const calendar = createCalendar('Australia/Sydney');
    const event = createEvent('aest-weekly-sync', '2025-02-15T10:00:00', '2025-02-15T11:00:00');

    const weekEvents = calendar.getWeekEvents([event], '2025-02-09T00:00:00');
    const eventDay = weekEvents.find((day) => day.date === '2025-02-15');

    expect(eventDay?.timeSlots[20].events.map((calendarEvent) => calendarEvent.id)).toContain(event.id);
  });

  it('tracks full-day events across local date boundaries in different zones', () => {
    const events = [
      createEvent('tokyo-full-day', '2025-02-15', '2025-02-16', true),
      createEvent('los-angeles-full-day', '2025-02-15', '2025-02-16', true),
    ];

    const tokyoCalendar = createCalendar('Asia/Tokyo');
    const losAngelesCalendar = createCalendar('America/Los_Angeles');

    const tokyoWeekEvents = tokyoCalendar.getWeekEvents([events[0]], '2025-02-10T00:00:00');
    const losAngelesWeekEvents = losAngelesCalendar.getWeekEvents([events[1]], '2025-02-10T00:00:00');

    expect(tokyoWeekEvents.find((day) => day.date === '2025-02-15')?.fullDayEvents).toHaveLength(1);
    expect(tokyoWeekEvents.find((day) => day.date === '2025-02-16')?.fullDayEvents).toHaveLength(1);
    expect(losAngelesWeekEvents.find((day) => day.date === '2025-02-15')?.fullDayEvents).toHaveLength(1);
    expect(losAngelesWeekEvents.find((day) => day.date === '2025-02-16')?.fullDayEvents).toHaveLength(1);
  });
});