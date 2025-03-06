import * as React from 'react';

import {
  Body1,
  FluentProvider,
  IdPrefixProvider,
  webLightTheme,
} from '@fluentui/react-components';
import { ICalendarStyles, useCalendarStyles } from './hooks/useCalendarStyles';
import { addDays, startOfMonth, startOfWeek } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

import { Day } from './Day';
import DayView from './DayView';
import { ECalendarViews } from './models/ECalendarViews';
import { ICalendarControlProps } from './models/ICalendarControlProps';
import { ICalendarDay } from './models/ICalendarDay';
import { IEvent } from './models/IEvents';
import { ResizeObserver } from '@juggle/resize-observer';
import { Stack } from '@nuvemerudita/react-controls';
import Toolbar from './Toolbar';
import WeekView from './WeekView';
import strings from 'ControlStrings';
import { useCalendar } from './hooks/useCalendar';

interface CalendarState {
  currentDate: Date;
}

const daysOfWeek: string[] = [
  strings.CalendarControlDayOfWeekSunday,
  strings.CalendarControlDayOfWeekMonday,
  strings.CalendarControlDayOfWeekTuesday,
  strings.CalendarControlDayOfWeekWednesday,
  strings.CalendarControlDayOfWeekThursday,
  strings.CalendarControlDayOfWeekFriday,
  strings.CalendarControlDayOfWeekSaturday,
];

interface RenderMonthViewProps {
  events: IEvent[];
  currentDate: Date;
  rowHeight: number;
  getCalendarDays: (date: Date) => ICalendarDay[];
  getEventsForDay: (dateObj: ICalendarDay) => IEvent[];
  styles: ICalendarStyles;
  onDaySlotClick?: (date: Date) => void;
  height: number;
  calendarRef: React.RefObject<HTMLDivElement>;
}

const RenderMonthView: React.FC<RenderMonthViewProps> = React.memo(
  ({
    currentDate,
    rowHeight,
    getCalendarDays,
    getEventsForDay,
    styles,
    onDaySlotClick,
    height,
    calendarRef,
  }) => {
    return (
      <Stack
        height={height}
        width="100%"
        verticalAlign="start"
        horizontalAlign="start"
      >
        <div className={styles.calendarWrapper} ref={calendarRef}>
          {daysOfWeek.map((day) => (
            <Body1 key={day} className={styles.dayHeader}>
              {day}
            </Body1>
          ))}
          {getCalendarDays(currentDate).map((dateObj, index) => {
            const { day, currentMonth } = dateObj;
            const dayEvents = currentMonth ? getEventsForDay(dateObj) : [];
            return (
              <Day
                key={index}
                day={day}
                date={dateObj.date}
                currentMonth={dateObj.currentMonth}
                events={dayEvents}
                columnHeight={rowHeight || 0}
                onDayClick={onDaySlotClick}
              />
            );
          })}
        </div>
      </Stack>
    );
  }
);

interface RenderWeekViewProps {
  events: IEvent[];
  currentDay: Date;
  height: number;
}

const RenderWeekView: React.FC<RenderWeekViewProps> = React.memo(
  ({ events, currentDay, height }) => {
    return <WeekView events={events} currentDay={currentDay} height={height} />;
  }
);

interface RenderDayViewProps {
  events: IEvent[];
  currentDay: Date;
  height: number;
}

const RenderDayView: React.FC<RenderDayViewProps> = React.memo(
  ({ events, currentDay, height }) => {
    return <DayView currentDay={currentDay} events={events} height={height} />;
  }
);

export const Calendar: React.FC<ICalendarControlProps> = ({
  events,
  height = 800,
  theme,
  onDayChange,
  onMonthChange,
  onWeekChange,
  onViewChange,
  onDaySlotClick,
  defaultView,
}: ICalendarControlProps) => {
  const { styles } = useCalendarStyles();
  const calendarRef = useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = useState<number | null>(null);
  const totalDisplayedDays = 42;
  const rowHeightRef = useRef<number>(0);

  // Default current date
  const [currentDate, setCurrentDate] = useState<CalendarState['currentDate']>(
    new Date()
  );
  // Default view
  const [selectedView, setSelectedView] = useState<ECalendarViews>(
    defaultView ?? ECalendarViews.Month
  );
  const { getMonthCalendar } = useCalendar(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );

  const getCalendarDays = React.useCallback((date: Date): ICalendarDay[] => {
    const month = date.getMonth();
    const firstDayOfMonth = startOfMonth(date);
    const firstDayOfWeek = startOfWeek(firstDayOfMonth);
    const calendarDays = Array.from(
      { length: totalDisplayedDays },
      (_, index): ICalendarDay => {
        const relativeDay = addDays(firstDayOfWeek, index);
        return {
          day: relativeDay.getDate(),
          currentMonth: relativeDay.getMonth() === month,
          date: relativeDay,
        };
      }
    );
    return calendarDays;
  }, []);

  const handleMonthChange = React.useCallback(
    (date: Date): void => {
      if (onMonthChange) {
        onMonthChange(date);
      }
      setCurrentDate(date);
    },
    [onMonthChange]
  );

  const handleDayChange = React.useCallback(
    (date: Date): void => {
      if (onDayChange) {
        onDayChange(date);
      }
      setCurrentDate(date);
    },
    [onDayChange]
  );

  const handleWeekChange = React.useCallback(
    (date: Date): void => {
      if (onWeekChange) {
        onWeekChange(date);
      }
      setCurrentDate(date);
    },
    [onWeekChange]
  );

  const handleViewChange = React.useCallback(
    (view: ECalendarViews): void => {
      if (onViewChange) {
        onViewChange(view);
      }
      setSelectedView(view);
    },
    [onViewChange]
  );

  const getEventsForDay = React.useCallback(
    (dateObj: ICalendarDay): IEvent[] => {
      const { date } = dateObj;
      const monthEvents = getMonthCalendar(
        events,
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
      const dayString = date.toISOString().split('T')[0];
      return monthEvents[dayString]?.flatMap((slot) => slot) || [];
    },
    [currentDate, events]
  );

  useEffect(() => {
    const handleResize = (): void => {
      if (calendarRef.current) {
        requestAnimationFrame(() => {
          if (calendarRef.current) {
            const firstDataColumnCell = calendarRef.current.querySelector(
              `.${styles.calendarWrapper} > div:nth-child(8)`
            ) as HTMLDivElement;
            if (firstDataColumnCell) {
              setRowHeight(firstDataColumnCell.offsetHeight);
              rowHeightRef.current = firstDataColumnCell.offsetHeight;
            }
          }
        });
      }
    };
    const observer = new ResizeObserver(handleResize);
    if (calendarRef.current) {
      observer.observe(calendarRef.current);
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [styles.calendarWrapper]);

  useEffect(() => {
    setSelectedView(defaultView ?? ECalendarViews.Month);
  }, [defaultView]);

  const RenderContent = React.useCallback(() => {
    switch (selectedView) {
      case ECalendarViews.Month:
        return (
          <RenderMonthView
            events={events}
            currentDate={currentDate}
            rowHeight={rowHeight}
            getCalendarDays={getCalendarDays}
            getEventsForDay={getEventsForDay}
            styles={styles}
            onDaySlotClick={onDaySlotClick}
            height={height as number}
            calendarRef={calendarRef}
          />
        );
      case ECalendarViews.Week:
        return (
          <RenderWeekView
            events={events}
            currentDay={currentDate}
            height={height as number}
          />
        );
      case ECalendarViews.Day:
        return (
          <RenderDayView
            events={events}
            currentDay={currentDate}
            height={height as number}
          />
        );
      default:
        return (
          <RenderMonthView
            events={events}
            currentDate={currentDate}
            rowHeight={rowHeight}
            getCalendarDays={getCalendarDays}
            getEventsForDay={getEventsForDay}
            styles={styles}
            onDaySlotClick={onDaySlotClick}
            height={height as number}
            calendarRef={calendarRef}
          />
        );
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

  return (
    <IdPrefixProvider value="calendarControl-">
      <FluentProvider theme={theme ?? webLightTheme}>
        <Stack height="100%" verticalAlign="start">
          <Toolbar
            selectedView={selectedView}
            onSelectedView={handleViewChange}
            currentDate={currentDate}
            setCurrentDate={setCurrentDate}
            onWeekChange={handleWeekChange}
            onMonthChange={handleMonthChange}
            onDayChange={handleDayChange}
          />
          <RenderContent />
        </Stack>
      </FluentProvider>
    </IdPrefixProvider>
  );
};

export default Calendar;
