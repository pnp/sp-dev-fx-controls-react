import * as React from 'react';

import {
  Body1,
  FluentProvider,
  IdPrefixProvider,
  webLightTheme,
} from '@fluentui/react-components';
import { addDays, startOfMonth, startOfWeek } from 'date-fns';
import { useEffect, useRef, useState } from 'react';

import { Day } from './Day';
import { DayView } from './DayView';
import { ECalendarViews } from './models/ECalendarViews';
import { ICalendarControlProps } from './models/ICalendarControlProps';
import { ICalendarDay } from './models/ICalendarDay';
import { IEvent } from './models/IEvents';
import { ResizeObserver } from '@juggle/resize-observer';
import { Stack } from '@nuvemerudita/react-controls';
import { Toolbar } from './Toolbar';
import { WeekView } from './WeekView';
import strings from 'ControlStrings';
import { useCalendar } from './hooks/useCalendar';
import { useCalendarStyles } from './hooks/useCalendarStyles';

interface CalendarState {
  currentDate: Date;
}



export const Calendar: React.FC<ICalendarControlProps> = ({
  events,
  height = 800,
  theme,
  onDayChange,
  onMonthChange,
  onWeekChange,
  onViewChange,
  onDaySlotClick,
}: ICalendarControlProps) => {
  const { styles } = useCalendarStyles();
  const calendarRef = useRef<HTMLDivElement>(null);
  const [rowHeight, setRowHeight] = useState<number | null>(null);
  const totalDisplayedDays = 42;
  const rowHeightRef = useRef<number>(0);

  const daysOfWeek: string[] = [
  strings.CalendarControlDayOfWeekSunday ,
  strings.CalendarControlDayOfWeekMonday,
  strings.CalendarControlDayOfWeekTuesday,
  strings.CalendarControlDayOfWeekWednesday,
  strings.CalendarControlDayOfWeekThursday,
  strings.CalendarControlDayOfWeekFriday,
  strings.CalendarControlDayOfWeekSaturday,
];

  // Default current date
  const [currentDate, setCurrentDate] = useState<CalendarState['currentDate']>(
    new Date()
  );
  // Default view
  const [selectedView, setSelectedView] = useState<ECalendarViews>(
    ECalendarViews.Month
  );
  // Get month calendar
  const { getMonthCalendar } = useCalendar(
    events,
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  // Get calendar days
  const getCalendarDays = React.useCallback((date: Date): ICalendarDay[] => {
    // this is to get the first day of the week based on the date parameter
    const month = date.getMonth();
    const firstDayOfMonth = startOfMonth(date);
    const firstDayOfWeek = startOfWeek(firstDayOfMonth);

    // Generate calendar days
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

  // Handle month change
  const handleMonthChange = React.useCallback(
    (date: Date): void => {
      if (onMonthChange) {
        onMonthChange(date);
      }
      setCurrentDate(date);
    },
    [onMonthChange]
  );
  // Handle day change
  const handleDayChange = React.useCallback(
    (date: Date): void => {
      if (onDayChange) {
        onDayChange(date);
      }
      setCurrentDate(date);
    },
    [onDayChange]
  );
  // Handle week change
  const handleWeekChange = React.useCallback(
    (date: Date): void => {
      if (onWeekChange) {
        onWeekChange(date);
      }
      setCurrentDate(date);
    },
    [onWeekChange]
  );
  // Handle view change
  const handleViewChange = React.useCallback(
    (view: ECalendarViews): void => {
      if (onViewChange) {
        onViewChange(view);
      }
      setSelectedView(view);
    },
    [onViewChange]
  );

  // Get events for the day
  const getEventsForDay = React.useCallback(
    (dateObj: ICalendarDay): IEvent[] => {
      const { date } = dateObj;
      const monthEvents = getMonthCalendar(
        currentDate.getFullYear(),
        currentDate.getMonth()
      );
      const dayString = date.toISOString().split('T')[0]; // Get date in YYYY-MM-DD format
      return monthEvents[dayString]?.flatMap((slot) => slot) || [];
    },
    [currentDate]
  );
  // Resize observer
  useEffect(() => {
    const handleResize = (): void => {
      // Get the height of the 8 column cell
      // the first column cell  until 7th column cell are headers
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
    // fallback for resize
    window.addEventListener('resize', handleResize);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
    };
  }, [styles.calendarWrapper]);
  // Toolbar component

  // Render Month View
  const RenderMonthView = React.memo(() => {
    return (
      <Stack
        height={height}
        width={'100%'}
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
            const events = currentMonth ? getEventsForDay(dateObj) : [];
            return (
              <Day
                key={index}
                day={day}
                date={dateObj.date}
                currentMonth={dateObj.currentMonth}
                events={events}
                columnHeight={rowHeight || 0}
                onDayClick={onDaySlotClick}
              />
            );
          })}
        </div>
      </Stack>
    );
  });
  // Render Week View
  const RenderWeekView = React.memo(() => {
    return (
      <>
        <WeekView events={events} currentDay={currentDate} height={height} />
      </>
    );
  });
  // Render Day View
  const RenderDayView = React.memo(() => {
    return (
             <DayView currentDay={currentDate} events={events} height={height} />
    );
  });

  // Render content
  const RenderContent = React.useCallback(() => {
    switch (selectedView) {
      case ECalendarViews.Month:
        return <RenderMonthView />;
      case ECalendarViews.Week:
        return <RenderWeekView />;
      case ECalendarViews.Day:
        return <RenderDayView />;
      default:
        return <RenderMonthView />;
    }
  }, [selectedView, RenderMonthView, RenderWeekView, RenderDayView]);

  return (
    <>
      <IdPrefixProvider value="calendarControl-">
        <FluentProvider theme={theme ?? webLightTheme}>
          <Stack height={'100%'} verticalAlign="start">
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
    </>
  );
};

export default Calendar;
