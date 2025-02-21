import * as React from 'react';

import {
  ArrowDownFilled,
  ArrowDownRegular,
  ArrowUpFilled,
  ArrowUpRegular,
  CalendarTodayRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  SelectDay,
  SelectMonth,
  SelectWeek,
} from '@nuvemerudita/react-controls';

import { Button } from '@fluentui/react-button';
import { ECalendarViews } from './models/ECalendarViews';
import { SelectCalendarView } from './SelectCalendarView';
import {
Stack,
} from '@nuvemerudita/react-controls';
import { Tooltip } from '@fluentui/react-tooltip';
import strings from 'ControlStrings';

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
    const ArrowDown = bundleIcon(ArrowDownFilled, ArrowDownRegular);
    const ArrowUp = bundleIcon(ArrowUpFilled, ArrowUpRegular);

    const onSelectWeek = (week: { startDate: Date; endDate: Date }): void => {
      onWeekChange(week.startDate);
      setCurrentDate(week.startDate);
    };

    const onSelectMonth = (month: Date): void => {
      onMonthChange(month);
      setCurrentDate(month);
    };

    const onSelectDay = (day: Date): void => {
      onDayChange(day);
      setCurrentDate(day);
    };

    const RenderSelectView = (): JSX.Element => {
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
    };

    const RenderToday = (): JSX.Element => (
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
    );

    const handleNavigation = (offset: number): void => {
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
    };

    return (
      <Stack
        width="calc(100% - 40px)"
        height="fit-content"
        horizontal
        horizontalAlign="space-between"
        verticalAlign="center"
        paddingLeft="20px"
        paddingRight="20px"
        paddingBottom="10px"
        paddingTop="10px"
        columnGap={10}
        styles={{ overflow: 'hidden' }}
      >
        <Stack
          horizontal
          horizontalAlign="start"
          verticalAlign="center"
          columnGap={10}
        >
          <RenderToday />
          <RenderSelectView />
          <Tooltip content="Previous" relationship="label">
            <Button
              size="medium"
              icon={<ArrowUp fontSize={14} />}
              onClick={() => handleNavigation(-1)}
            />
          </Tooltip>
          <Tooltip content="Next" relationship="label">
            <Button
              size="medium"
              icon={<ArrowDown fontSize={14} />}
              onClick={() => handleNavigation(1)}
            />
          </Tooltip>
        </Stack>
        <Stack
          horizontal
          horizontalAlign="start"
          verticalAlign="center"
          columnGap={10}
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
