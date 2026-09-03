import * as React from 'react';

import {
  ArrowDownFilled,
  ArrowDownRegular,
  ArrowUpFilled,
  ArrowUpRegular,
  CalendarTodayRegular,
  bundleIcon,
} from '@fluentui/react-icons';

import { Button } from '@fluentui/react-button';
import { ECalendarViews } from './models/ECalendarViews';
import { SelectCalendarView } from './SelectCalendarView';

import { Tooltip } from '@fluentui/react-tooltip';
import strings from 'ControlStrings';

import { SelectDay } from './selectDay';
import { SelectMonth } from './selectMonth';
import { SelectWeek } from './selectWeek/SelectWeek';
import { Stack } from './stack';

interface ToolbarProps {
  selectedView: ECalendarViews;
  onSelectedView: (view: ECalendarViews) => void;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  onWeekChange: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  onDayChange: (date: Date) => void;
}

export const Toolbar: React.FC<ToolbarProps> = React.memo(
  ({
    selectedView,
    onSelectedView,
    currentDate,
    setCurrentDate,
    onWeekChange,
    onMonthChange,
    onDayChange,
  }) => {
    const ArrowDown = React.useMemo(
      () => bundleIcon(ArrowDownFilled, ArrowDownRegular),
      []
    );
    const ArrowUp = React.useMemo(
      () => bundleIcon(ArrowUpFilled, ArrowUpRegular),
      []
    );

    const onSelectWeek = React.useCallback(
      (week: { startDate: Date; endDate: Date }): void => {
        onWeekChange(week.startDate);
        setCurrentDate(week.startDate);
      },
      [onWeekChange, setCurrentDate]
    );

    const onSelectMonth = React.useCallback(
      (month: Date): void => {
        onMonthChange(month);
        setCurrentDate(month);
      },
      [onMonthChange, setCurrentDate]
    );

    const onSelectDay = React.useCallback(
      (day: Date): void => {
        onDayChange(day);
        setCurrentDate(day);
      },
      [onDayChange, setCurrentDate]
    );

    const RenderSelectView = React.useCallback((): JSX.Element => {
      switch (selectedView) {
        case ECalendarViews.Month:
          return <SelectMonth onSelected={onSelectMonth} value={currentDate} />;
        case ECalendarViews.Week:
          return <SelectWeek onSelected={onSelectWeek} value={currentDate} />;
        case ECalendarViews.Day:
          return <SelectDay onSelected={onSelectDay} value={currentDate} />;
        default:
          return <SelectMonth onSelected={onSelectMonth} value={currentDate} />;
      }
    }, [selectedView, onSelectMonth, onSelectWeek, onSelectDay, currentDate]);

    const RenderToday = React.useCallback(
      (): JSX.Element => (
        <Tooltip content="Today" relationship="label">
          <Button
            shape="circular"
            icon={<CalendarTodayRegular />}
            size="medium"
            onClick={() => onDayChange(new Date())}
          >
            {strings.CalendarControlTodayLabel}
          </Button>
        </Tooltip>
      ),
      [onDayChange]
    );

    const handleNavigation = React.useCallback(
      (offset: number): void => {
        const newDate = new Date(currentDate);
        switch (selectedView) {
          case ECalendarViews.Month:
            newDate.setMonth(newDate.getMonth() + offset);
            onMonthChange(newDate);
            break;
          case ECalendarViews.Week:
            newDate.setDate(newDate.getDate() + offset * 7);
            onWeekChange(newDate);
            break;
          case ECalendarViews.Day:
            newDate.setDate(newDate.getDate() + offset);
            onDayChange(newDate);
            break;
          default:
            break;
        }
        setCurrentDate(newDate);
      },
      [
        currentDate,
        selectedView,
        onMonthChange,
        onWeekChange,
        onDayChange,
        setCurrentDate,
      ]
    );

    return (
      <Stack
        width="calc(100% - 40px)"
        height="fit-content"
        direction="horizontal"
        justifyContent="space-between"
        alignItems="center"
        paddingLeft="20px"
        paddingRight="20px"
        paddingBottom="10px"
        paddingTop="10px"
        columnGap={'10px'}
        style={{ overflow: 'hidden' }}
      >
        <Stack
          direction="horizontal"
          justifyContent="start"
          alignItems="center"
          columnGap={'10px'}
        >
          <RenderToday />
          <RenderSelectView />
          <Tooltip content={strings.CalendarControlPreviousLabel} relationship="label">
            <Button
              size="medium"
              icon={<ArrowUp fontSize={14} />}
              onClick={() => handleNavigation(-1)}
            />
          </Tooltip>
          <Tooltip content={strings.CalendarControlNextLabel} relationship="label">
            <Button
              size="medium"
              icon={<ArrowDown fontSize={14} />}
              onClick={() => handleNavigation(1)}
            />
          </Tooltip>
        </Stack>
        <Stack
          direction="horizontal"
          justifyContent="start"
          alignItems="center"
          columnGap={'10px'}
        >
          <SelectCalendarView
            onSelected={onSelectedView}
            value={selectedView}
          />
        </Stack>
      </Stack>
    );
  }
);

export default Toolbar;
