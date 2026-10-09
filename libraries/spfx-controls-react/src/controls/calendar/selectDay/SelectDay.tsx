import * as React from 'react';

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

import { Calendar } from '@fluentui/react-calendar-compat';
import strings from 'ControlStrings';

export interface ISelectDayProps {
  onSelected: (date: Date) => void;
  value?: Date;
}

export const SelectDay: React.FunctionComponent<ISelectDayProps> = React.memo(
  (props: React.PropsWithChildren<ISelectDayProps>) => {
    const { onSelected, value } = props;


    const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(
      value ?? new Date()
    );
    const [selectedLabel, setSelectedLabel] = React.useState<string>(() => {
      const initialDate = value ?? new Date();
      return format(initialDate, 'dd MMM, yyyy');
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
          const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
          const zonedDate = utcToZonedTime(date, timeZone);

          setSelectedDate(zonedDate);
          setSelectedLabel(format(zonedDate, 'dd MMM, yyyy'));
          onSelected(zonedDate);
          setOpen(false);
        }
      },
      [onSelected]
    );

    return (
      <Menu open={open} onOpenChange={onOpenChange}>
        <MenuTrigger disableButtonEnhancement>
          <MenuButton
            shape="circular"
            icon={<MonthIcon />}
            style={{ minWidth: '200px' }}
            aria-label={`${strings.CalendarControlSelectDayLabel}: ${selectedLabel}`}
          >
            {selectedLabel}
          </MenuButton>
        </MenuTrigger>
        <MenuPopover style={{ maxWidth: 'fit-content' }}>
          <MenuList>
            <Calendar
              highlightSelectedMonth
              showGoToToday
              onSelectDate={onSelectDate}
              value={selectedDate}
            />
          </MenuList>
        </MenuPopover>
      </Menu>
    );
  }
);
