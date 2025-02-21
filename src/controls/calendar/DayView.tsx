import * as React from 'react';

import {
  Body1,
  Body1Strong,
  Subtitle1,
  Text,
  mergeClasses,
} from '@fluentui/react-components';
import { addDays, format, isToday } from 'date-fns';
import { useRef, useState } from 'react';

import { EventRenderer } from './EventRender';
import { IEvent } from './models/IEvents';
import { useCalendar } from './hooks/useCalendar';
import { useDayViewStyles } from './hooks/useDayViewStyles';
import { useUtils } from './hooks/useUtils';

export interface IDayViewProps {
  events: IEvent[];
  currentDay: Date;
  height?: string | number;
}

const ROW_HEIGHT = 33;

export const DayView: React.FC<IDayViewProps> = (props: IDayViewProps) => {
  const { events, currentDay, height } = props;
  const { styles } = useDayViewStyles();
  const [currentDate] = useState(currentDay);
  const calendarRef = useRef<HTMLDivElement>(null);
  const { getSpanSlots, generateColor } = useUtils();
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const { getWeekEvents } = useCalendar(events, timeZone);
  const renderTimeColumn = React.useCallback((): JSX.Element[] => {
    return Array.from({ length: 24 }, (_, hour) => (
      <>
        <div className={styles.timeCell}>
          <Body1Strong> {hour}:00 </Body1Strong>
        </div>
        <div className={styles.timeCell} />
      </>
    ));
  }, [styles.timeCell]);

  const RenderDayHeaders = React.useCallback((): JSX.Element => {
    return (
      <>
        {/* Blank Header Cell */}
        <div className={styles.blankHeader} />
        {/* Day Headers */}
        {Array.from({ length: 1 }, (_, dayIndex) => {
          const day = addDays(currentDate, dayIndex);
          const isTodayClass = isToday(day) ? styles.todayHeaderCell : '';

          return (
            <div
              key={dayIndex}
              className={mergeClasses(styles.dayHeaderCell, isTodayClass)}
            >
              <Text weight="semibold" size={600} style={{ paddingRight: 10 }}>
                {format(day, 'dd')}
              </Text>
              <Subtitle1>{format(day, 'LLLL, yyyy')}</Subtitle1>
            </div>
          );
        })}
      </>
    );
  }, [
    currentDate,
    styles.blankHeader,
    styles.dayHeaderCell,
    styles.todayHeaderCell,
  ]);
  const RenderFullDayEvents = React.useCallback((): JSX.Element => {
    const weekEvents = getWeekEvents(currentDate.toISOString());
    return (
      <>
        <div className={styles.fullDayLabel}>
          <Body1>All Day</Body1>
        </div>
        {Array.from({ length: 1 }, (_, dayIndex) => {
          const weekDay = format(addDays(currentDate, dayIndex), 'yyyy-MM-dd');
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
                    backgroundColor: generateColor(event.title),
                  }}
                >
                  <Body1 className={styles.eventTitle}>{event.title}</Body1>
                </div>
              ))}
            </div>
          );
        })}
      </>
    );
  }, [
    currentDate,
    generateColor,
    getWeekEvents,
    styles.fullDayCell,
    styles.fullDayEvent,
    styles.fullDayLabel,
    styles.eventTitle,
  ]);
  // Render the events for the current day
  const renderDayCells = React.useCallback((): JSX.Element[] => {
    const weekEvents = getWeekEvents(currentDate.toISOString());
    // Render the events for the current day
    return Array.from({ length: 1 }, (_, dayIndex) => {
      const weekDay = format(addDays(currentDate, dayIndex), 'yyyy-MM-dd');
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
                    const customRender = event?.onRenderInDayView;
                    // If the event has a custom renderer, use it
                    if (React.isValidElement(customRender)) {
                      return React.cloneElement(
                        customRender as React.ReactElement,
                        {}
                      );
                    }

                    // Event Render
                    return (
                      <EventRenderer
                        key={event.id}
                        event={event}
                        eventCount={eventCount}
                        spanSlots={spanSlots}
                        rowHeight={ROW_HEIGHT}
                        eventIndex={eventIndex}
                        view="day"
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
  }, [currentDate, getSpanSlots, getWeekEvents, styles.dayCell]);

  return (
    <div className={styles.container} style={{ height: height }}>
      {/* DayGrid */}
      <div ref={calendarRef} className={styles.dayGrid}>
        <div className={styles.timeColumn}>{renderTimeColumn()}</div>
        <RenderDayHeaders />
        <RenderFullDayEvents />
        {renderDayCells()}
      </div>
    </div>
  );
};

export default DayView;
