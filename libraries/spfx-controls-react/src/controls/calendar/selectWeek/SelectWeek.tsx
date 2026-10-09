import * as React from 'react';

import {
  Calendar,
  DateRangeType,
} from '@fluentui/react-calendar-compat';
import {
  CalendarMonthFilled,
  CalendarMonthRegular,
  bundleIcon,
} from '@fluentui/react-icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuPopover,
  MenuProps,
  MenuTrigger,
} from '@fluentui/react-components';
import { format, utcToZonedTime } from 'date-fns-tz';

import strings from 'ControlStrings';

export interface ISelectWeekStrings {
  selectWeekPlaceholder: string;
}

interface IWeekRange {
  start: Date;
  end: Date;
}

export const defaultSelectWeekStrings: ISelectWeekStrings = {
  selectWeekPlaceholder: strings.CalendarControlSelectWeekLabel,
};

export interface ISelectWeekProps {
  onSelected: (week: { startDate: Date; endDate: Date }) => void;
  value?: Date;
  strings?: ISelectWeekStrings;
}

const formatWeekLabel = (week: IWeekRange): string => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const startMonth = format(week.start, 'MMM', { timeZone });
  const endMonth = format(week.end, 'MMM', { timeZone });
  const startYear = format(week.start, 'yyyy', { timeZone });
  const endYear = format(week.end, 'yyyy', { timeZone });

  if (startYear !== endYear) {
    return `${format(week.start, 'dd MMM yyyy', { timeZone })} - ${format(week.end, 'dd MMM yyyy', { timeZone })}`;
  }

  if (startMonth !== endMonth) {
    return `${format(week.start, 'dd MMM', { timeZone })} - ${format(week.end, 'dd MMM yyyy', { timeZone })}`;
  }

  return `${format(week.start, 'dd', { timeZone })} - ${format(week.end, 'dd MMM yyyy', { timeZone })}`;
};

const getWeekRange = (date: Date): IWeekRange => {
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const zonedDate = utcToZonedTime(date, timeZone);

  const start = new Date(zonedDate);
  start.setDate(zonedDate.getDate() - zonedDate.getDay());

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  return {
    start: utcToZonedTime(start, timeZone),
    end: utcToZonedTime(end, timeZone),
  };
};

export const SelectWeek: React.FunctionComponent<ISelectWeekProps> = React.memo(
  (props: React.PropsWithChildren<ISelectWeekProps>) => {
    const { onSelected, value, strings: selectWeekStrings = defaultSelectWeekStrings } = props;

    const dateRangeType: DateRangeType = DateRangeType.Week;

    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
      value ?? new Date()
    );
    const [selectedWeek, setSelectedWeek] = React.useState<string>(() => {
      const newValue = value ?? new Date();
      if (newValue) {
        const weekRange = getWeekRange(newValue);
        return formatWeekLabel(weekRange);
      }
      return selectWeekStrings.selectWeekPlaceholder;
    });

    const [open, setOpen] = React.useState(false);

    const onOpenChange: MenuProps['onOpenChange'] = React.useCallback(
      (_e, data) => {
        setOpen(data.open);
      },
      []
    );

    const MonthIcon = React.useMemo(
      () => bundleIcon(CalendarMonthFilled, CalendarMonthRegular),
      []
    );

    const onSelectDate = React.useCallback(
      (date: Date | null | undefined) => {
        if (date) {
          setSelectedDate(date);
          const weekRange = getWeekRange(date);
          const weekLabel = formatWeekLabel(weekRange);

          setSelectedWeek(weekLabel);
          onSelected({ startDate: weekRange.start, endDate: weekRange.end });
          setOpen(false);
        }
      },
      [onSelected]
    );

    const firstDayOfWeek = React.useMemo(() => 0, []);

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton
            shape="circular"
            icon={<MonthIcon />}
            style={{ minWidth: '200px' }}
            aria-label={`${strings.CalendarControlSelectWeekLabel}: ${selectedWeek}`}
          >
            {selectedWeek}
          </MenuButton>
        </MenuTrigger>
        <MenuPopover style={{ maxWidth: 'fit-content' }}>
          <MenuList>
            <Calendar
              dateRangeType={dateRangeType}
              highlightSelectedMonth
              showGoToToday
              onSelectDate={onSelectDate}
              value={selectedDate}
              firstDayOfWeek={firstDayOfWeek}
            />
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  }
);
