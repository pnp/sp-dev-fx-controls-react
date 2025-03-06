import * as React from 'react';

import {
  Body1,
  Body1Strong,
  Caption1Strong,
  Text,
  mergeClasses,
} from '@fluentui/react-components';
import { addDays, format, isToday, startOfWeek } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

import { EventRenderer } from './EventRender';
import { IEvent } from './models/IEvents';
import { ResizeObserver } from '@juggle/resize-observer';
import strings from 'ControlStrings';
import { useCalendar } from './hooks/useCalendar';
import { useUtils } from './hooks/useUtils';
import { useWeekViewStyles } from './hooks/useWeekViewStyles';

export interface IWeekViewProps {
  events: IEvent[];
  currentDay: Date;
  height?: string | number;
}

export const WeekView: React.FC<IWeekViewProps> = (props: IWeekViewProps) => {
  const { events, currentDay, height } = props;
  const { styles } = useWeekViewStyles();
  const [currentDate] = useState(currentDay);
  const [rowHeight, setRowHeight] = useState<number>(32); // Default row height
  const calendarRef = useRef<HTMLDivElement>(null);
  const { getSpanSlots, getEventColors, getCalendarColors, formatDate } =
    useUtils();
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 0 });
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const { getWeekEvents } = useCalendar(timeZone);

  // Dynamic row height calculation using ResizeObserver
  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (calendarRef.current) {
        const firstRowCell = calendarRef.current.querySelector(
          '.dayCell'
        ) as HTMLDivElement;
        if (firstRowCell) {
          setRowHeight(firstRowCell.offsetHeight);
        }
      }
    });
    if (calendarRef.current) {
      observer.observe(calendarRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);

  const renderTimeColumn = React.useCallback((): JSX.Element[] => {
    return Array.from({ length: 24 }, (_, hour) => (
      <>
        <div className={styles.timeCell}>
          <Body1Strong> {hour}:00 </Body1Strong>
        </div>
        <div className={styles.timeCell} />
      </>
    ));
  }, []);

  const renderDayHeaders = React.useCallback((): JSX.Element => {
    return (
      <>
        {/* Blank Header Cell */}
        <div className={styles.blankHeader} />
        {/* Day Headers */}
        {Array.from({ length: 7 }, (_, dayIndex) => {
          const day = addDays(weekStart, dayIndex);
          const isTodayClass = isToday(day) ? styles.todayHeaderCell : '';
          return (
            <div
              key={dayIndex}
              className={mergeClasses(styles.dayHeaderCell, isTodayClass)}
            >
              <Text weight="regular" size={600} style={{ paddingRight: 10 }}>
                {formatDate(day.toISOString(), 'dd')}
              </Text>
              <Body1>{formatDate(day.toISOString(), 'EEE')}</Body1>
            </div>
          );
        })}
      </>
    );
  }, [weekStart, styles]);

  const renderFullDayEvents = React.useCallback((): JSX.Element => {
    const weekEvents = getWeekEvents(events, weekStart.toISOString());
    return (
      <>
        <div className={styles.fullDayLabel}>
          <Body1>{strings.CalendarControlFullDaylabel}</Body1>
        </div>
        {Array.from({ length: 7 }, (_, dayIndex) => {
          const weekDay = formatDate(
            addDays(weekStart, dayIndex).toISOString(),
            'yyyy-MM-dd'
          );
          const dayEvents = weekEvents.find((day) => day.date === weekDay);
          const fullDayEvents = dayEvents?.fullDayEvents || [];

          return (
            <div key={dayIndex} className={styles.fullDayCell}>
              {fullDayEvents.map((event) => (
                <div
                  key={event.id}
                  className={styles.fullDayEvent}
                  style={{
                    gridColumn: `${dayIndex + 2}`, // Position event in the correct day column
                    backgroundColor: event.color
                      ? getCalendarColors(event.color).backgroundColor
                      : getEventColors(event.category!).backgroundColor,
                  }}
                >
                  <Caption1Strong className={styles.eventTitle}>
                    {event.title}
                  </Caption1Strong>
                </div>
              ))}
            </div>
          );
        })}
      </>
    );
  }, [
    weekStart,
    styles,
    getWeekEvents,
    getCalendarColors,
    getEventColors,
    events,
  ]);

  const renderDayCells = React.useCallback((): JSX.Element[] => {
    const weekEvents = getWeekEvents(events, weekStart.toISOString());
    return Array.from({ length: 7 }, (_, dayIndex) => {
      const weekDay = format(addDays(weekStart, dayIndex), 'yyyy-MM-dd');
      const dayEvents = weekEvents.find((day) => day.date === weekDay);

      return (
        <>
          {dayEvents?.timeSlots.map((timeSlot, slotIndex) => {
            const eventCount = timeSlot.events.length; // Total events in the slot

            return (
              <div
                key={slotIndex}
                className={styles.dayCell}
                style={{
                  gridRow: slotIndex + 3, // Offset to account for header and full-day row
                }}
              >
                {timeSlot.events.map((event, eventIndex) => {
                  const startDate = new Date(event.start);
                  const endDate = new Date(event.end);
                  // Calculate the start and end slots based on event times
                  const { spanSlots, startSlot } = getSpanSlots(
                    startDate,
                    endDate
                  );
                  // Only render the event in its starting timeslot
                  if (slotIndex === startSlot) {
                    // Event Render
                    return (
                      <EventRenderer
                        key={event.id}
                        event={event}
                        eventCount={eventCount}
                        spanSlots={spanSlots}
                        rowHeight={rowHeight}
                        eventIndex={eventIndex}
                        view="week"
                      />
                    );
                  }
                  return null; // Skip rendering for non-starting slots
                })}
              </div>
            );
          })}
        </>
      );
    });
  }, [weekStart, styles, getWeekEvents, getSpanSlots, rowHeight, events]);

  return (
    <div className={styles.container} style={{ height: height }}>
      {/* Week Grid */}
      <div ref={calendarRef} className={styles.weekGrid}>
        <div className={styles.timeColumn}>{renderTimeColumn()}</div>
        {renderDayHeaders()}
        {renderFullDayEvents()}
        {renderDayCells()}
      </div>
    </div>
  );
};

export default WeekView;
